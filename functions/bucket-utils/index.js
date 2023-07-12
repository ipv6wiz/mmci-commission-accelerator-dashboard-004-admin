const {getAuth} = require("firebase-admin/auth");
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { initializeApp, getApp} = require('firebase-admin/app');
const {Storage} = require("@google-cloud/storage");

exports.bucketUtils = onRequest(async (req, res) => {
    const allowedOrigins = [
        'https://comm-acc-dash-001.web.app',
        'http://localhost:4200',
        'http://localhost:4500',
        'http://portal.local:4200',
        'http://portal.local:4500'
    ];
    const origin = req.headers.origin;
    logger.warn('Origin: ', origin);
    let errorData = '';
    let statusCode = 200;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else {
        try {
            if (!req.headers.authorization) {
                statusCode = 401;
                throw new Error('Not Authorized.');
            }
            const idToken = req.headers.authorization.split(' ')[1];
            const config = process.env.FIREBASE_CONFIG;
            logger.log('config: ', config);
            let app;
            try {
                app = getApp('createBucketAdmin');
            } catch (error) {
                app = initializeApp({projectId: 'comm-acc-demo'}, 'createBucketAdmin');
            }
            const appAuth = getAuth(app);
            const tokenVerified = await appAuth.verifyIdToken(idToken);
            logger.warn('tokenVerified: ', tokenVerified);

            if (!tokenVerified) {
                statusCode = 403;
                throw new Error('Invalid Token.');
            } else {
            // All Authentication checks above here, that code is used in the other Cloud Functions
            // therefore any changes need to be applied to the other Cloud Functions as well
                const {Storage} = require('@google-cloud/storage');
                const storage = new Storage();
                const bucketName = req.query.bucket.toString();
                const action = req.query.action.toLowerCase();
                logger.warn(`Entered Bucket Utils - action: ${action} - bucket: ${bucketName}`);
                const validActions = ['create', 'upload', 'download', 'list']
                if (!validActions.includes(action)) {
                    statusCode = 400;
                    throw new Error('Invalid Action');
                } else {
                    const path = require('path');
                    const os = require('os');
                    const fs = require('fs-extra');
                    const tmpdir = os.tmpdir();
                    logger.log('Ensuring that /tmp exists');
                    try {
                        await fs.ensureDir(tmpdir);
                    } catch (err) {
                        statusCode = 400;
                        throw new Error('Error Ensuring that /tmp exists');
                    }
                    switch (action) {
                        case 'create' :
                            /**
                             * @TODO: Add permissions to bucket: SuperAdmin, Admin, ClientsAdmin
                             * @TODO: https://github.com/googleapis/nodejs-storage/blob/main/samples/addBucketIamMember.js
                             * @type {[Bucket, any]}
                             */
                            try {
                                const createResponse = await storage.createBucket(bucketName);
                                logger.log('createResponse: ', createResponse)
                                const metaResponse = await storage.bucket(bucketName).setMetadata({
                                    iamConfiguration: {
                                        uniformBucketLevelAccess: {
                                            enabled: true,
                                        },
                                        makePrivate: true
                                    }
                                });
                                logger.log('metaResponse: ', metaResponse);
                                res.json({
                                    statusCode: 201,
                                    msg: `Bucket ${bucketName} created`,
                                    data: {bucket: bucketName}
                                });
                            } catch (err) {
                                if (err.message.indexOf('Your previous request to create the named bucket succeeded and you already own it.') !== -1) {
                                    res.json({
                                        statusCode: 201,
                                        msg: `Bucket ${bucketName} already exists and you own it.`,
                                        data: {bucket: bucketName}
                                    });
                                } else {
                                    statusCode = 400;
                                    throw new Error('Error creating Bucket. ' + err.message);
                                }
                            }

                            break;
                        case 'upload':
                            // POST
                            if (req.method !== 'POST') {
                                statusCode = 405;
                                throw new Error('Method Not Allowed');
                            }
                            // const fileName = req.query.filename + '';
                            const body = req.body;
                            let folder = req.query.folder.toString(); // the CommAcc file type
                            // errorData = body;
                            if (!body || !bucketName || !folder) {
                                let msg = '';
                                if (!body) {
                                    msg = msg + 'Body missing. ';
                                }
                                if (!bucketName) {
                                    msg = msg + 'Bucket Name missing. ';
                                }
                                if(!folder) {
                                    msg = msg + 'Folder name missing. '
                                }
                                statusCode = 400;
                                throw new Error('File data required for upload: ' + msg);
                            } else {
                                logger.log('Starting file upload');
                                folder = folder.toLowerCase();
                                const Busboy = require('busboy');
                                const busboy = Busboy({headers: req.headers});
                                // This object will accumulate all the fields, keyed by their name
                                const fields = [];
                                // This object will accumulate all the uploaded files, keyed by their name.
                                const uploads = [];
                                // This code will process each non-file field in the form.
                                busboy.on('field', (fieldname, val) => {
                                    /**
                                     *  TODO(developer): Process submitted field values here
                                     */
                                    logger.log(`Processed field ${fieldname}: ${val}.`);
                                    fields.push({key: fieldname, value: val});
                                });

                                const fileWrites = [];

                                // This code will process each file uploaded.
                                busboy.on('file', (fieldname, file, {filename}) => {
                                    // Note: os.tmpdir() points to an in-memory file system on GCF
                                    // Thus, any files in it must fit in the instance's memory.
                                    logger.log(`Processing uploaded file ${filename} in fieldName ${fieldname}`);
                                    const filepath = path.join(tmpdir, filename);
                                    uploads.push(filepath);

                                    const writeStream = fs.createWriteStream(filepath);
                                    file.pipe(writeStream);

                                    // File was processed by Busboy; wait for it to be written.
                                    // Note: GCF may not persist saved files across invocations.
                                    // Persistent files must be kept in other locations
                                    // (such as Cloud Storage buckets).
                                    const promise = new Promise((resolve, reject) => {
                                        file.on('end', () => {
                                            writeStream.end();
                                        });
                                        writeStream.on('close', resolve);
                                        writeStream.on('error', reject);
                                    });
                                    fileWrites.push(promise);
                                });

                                // Triggered once all uploaded files are processed by Busboy.
                                // We still need to wait for the disk writes (saves) to complete.
                                busboy.on('finish', async () => {
                                    await Promise.all(fileWrites);
                                    logger.log('About to move files to bucket');
                                    errorData = uploads;

                                    for (let file of uploads) {
                                        const fileName = file.split('/').pop();
                                        const destName = `${folder}/${fileName}`;
                                        logger.warn('destName: ' + destName);
                                        const options = {
                                            destination: destName
                                        }
                                        // file = file + ' ';
                                        let filePath = file.toString();
                                        logger.warn('Uploading file with name: ' + fileName + ' from path: ' + filePath);
                                        await storage.bucket(bucketName).upload(filePath, options)
                                            .then((resp) => {
                                                logger.log('Upload Response: ' + JSON.stringify(resp));
                                                fs.removeSync(filePath);
                                            })
                                            .catch((err) => {
                                                logger.error('Bucket Upload error: ' + err.message);
                                            })
                                    }
                                    // res.send();
                                    statusCode = 200;
                                    res.json({statusCode, msg: 'Processed file(s)', data: errorData});
                                });
                                busboy.end(req.rawBody);
                            }

                            break;
                        case 'download':
                            const fileName = req.query.filename + '';
                            if (!fileName) {
                                statusCode = 400;
                                throw new Error('File info needed for download');
                            } else {
                                const fileTempDest = `/tmp/${fileName}`;
                                const options = {
                                    destination: fileTempDest
                                }
                                try {
                                    await storage.bucket(bucketName).file(fileName).download(options);
                                } catch (err) {
                                    statusCode = 400;
                                    throw new Error('Error downloading file from bucket. ' + err.message);
                                }
                                res.download(fileTempDest, (err) => {
                                    if (err) {
                                        statusCode = 400;
                                        throw new Error('Error returning file');
                                    }
                                });
                            }

                            break;
                        case 'list':
                            /**
                             * Perhaps offer list types :
                             * raw - full info from bucket
                             * small - item.name & item.metadata
                             * manager - formatted into a hierarchy
                             */
                            let listType = req.query.listtype || 'small';
                            listType = listType.toString();
                            logger.log('List - bucketName: ' + bucketName);
                            const smallList = [];
                            const rawList = await storage.bucket(bucketName).getFiles();
                            // logger.log('Raw list: ', rawList);
                            if(listType === 'small') {
                                const list = rawList.shift();
                                list.forEach((item) => {
                                    // logger.log('List item: ', item);
                                    smallList.push({name: item.name, path: item.metadata.name, meta: item.metadata})
                                });
                                // logger.log('List - smallList: ', smallList);
                                res.json({
                                    statusCode: 200,
                                    msg: 'List of files in bucket',
                                    data: {bucket: bucketName, list: smallList}
                                })
                            } else if(listType === 'raw') {
                                res.json({
                                    statusCode: 200,
                                    msg: 'List of files in bucket',
                                    data: {bucket: bucketName, list: rawList}
                                })
                            }

                            break;
                    }
                }
            }
        } catch (err) {
            const errMsg = err.message + '';
            logger.error('Bucket Utils error msg: ' + errMsg);
            res.json({statusCode, msg: `Invalid Request. ${err.message}`, data: errorData})
        }
    }
});
