const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { initializeApp, getApp} = require('firebase-admin/app');
const {getAuth} = require("firebase-admin/auth");
exports.verifyDreLicense = onRequest(async (req, res) => {
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
                app = getApp('verifyDreAdmin');
            } catch (error) {
                app = initializeApp({projectId: 'comm-acc-demo'}, 'verifyDreAdmin');
            }
            const appAuth = getAuth(app);
            const tokenVerified = await appAuth.verifyIdToken(idToken);
            logger.warn('tokenVerified: ', tokenVerified);

            if (!tokenVerified) {
                statusCode = 403;
                throw new Error('Invalid Token.');
            } else {
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
            }
        } catch (err) {
            const errMsg = err.message + '';
            logger.error('Verify DRE License error msg: ' + errMsg);
            res.json({statusCode, msg: `Invalid Request. ${err.message}`, data: errorData})
        }
    }
});
