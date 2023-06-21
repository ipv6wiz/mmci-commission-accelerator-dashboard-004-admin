/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const qs = require("querystring");
const {Curl, curly} = require("node-libcurl");


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
