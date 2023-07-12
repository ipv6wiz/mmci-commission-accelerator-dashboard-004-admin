const {onRequest} = require("firebase-functions/v2/https");

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
