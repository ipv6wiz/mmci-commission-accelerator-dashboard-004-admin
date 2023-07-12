const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const qs = require("querystring");
const {Curl, curly} = require("node-libcurl");


exports.verifyStreetAddress = onRequest(async (req, res) => {
    const { Curl, curly } = require("node-libcurl");
    const qs = require('querystring');
    const street = req.query.addr;
    const authId= '3c70325b-9734-2c0c-5903-0feb092bb0f1';
    const authToken = 'ebY8HfpPmtCxL7m0YIHG';
    const license = 'us-core-cloud';

    if(street) {
        const url = 'https://us-street.api.smartystreets.com/street-address';
        const qsFields = qs.stringify({
            'auth-id': authId,
            'auth-token': authToken,
            license,
            street
        });
        const {statusCode, data, headers} = await curly.get(`${url}?${qsFields}`);
        res.json({statusCode, data});
    } else {
        res.json({statusCode: 404, data: "Missing Address Param"})
    }
});

exports.verifyDreLicense = onRequest(async (req, res) => {
    const { Curl, curly } = require("node-libcurl");
    const qs = require('querystring');
    const dreNumber = req.query.dre;
    if(dreNumber) {
        const curlCall = new Curl();
        const url = 'https://www2.dre.ca.gov/PublicASP/pplinfo.asp';
        const qsFields = qs.stringify(
            {
                h_nextstep: 'SEARCH',
                LICENSEE_NAME: '',
                CITY_STATE: '',
                LICENSE_ID: dreNumber
            }
        );
        const {statusCode, data, headers} = await curly.post(url, {
            POSTFIELDS: qsFields,
        });
        res.json({statusCode, data});
    } else {
        res.json({statusCode: 404, data: "Missing DRE number"});
    }
});

exports.createBucket = onRequest(async (req, res) => {
    const {Storage} = require('@google-cloud/storage');
    const storage = new Storage();
    const bucketName = req.query.bucket + '';
    try {
        await storage.createBucket(bucketName);
        await storage.bucket(bucketName).setMetadata({
            iamConfiguration: {
                uniformBucketLevelAccess: {
                    enabled: true,
                },
                makePrivate: true
            }
        });
        res.json({statusCode: 201, data: `Bucket ${bucketName} created`});
    } catch (err)  {
        res.json({statusCode: 400, data: `Invalid Bucket Name. ${err.message}`})
    }
});
