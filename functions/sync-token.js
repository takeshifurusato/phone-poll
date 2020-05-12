exports.handler = function(context, event, callback) {
    const ACCOUNT_SID = context.MASTER_ACCOUNT_SID;
    const SERVICE_SID = context.SYNC_SERVICE_SID;
    const API_KEY = context.SYNC_ACCOUNT_SID;
    const API_SECRET = context.SYNC_AUTH_TOKEN;
    const IDENTITY = context.DOMAIN_NAME;
    const AccessToken = Twilio.jwt.AccessToken;
    const SyncGrant = AccessToken.SyncGrant;

    const syncGrant = new SyncGrant({
        serviceSid: SERVICE_SID
    });

    const accessToken = new AccessToken(
        ACCOUNT_SID,
        API_KEY,
        API_SECRET
    );

    accessToken.addGrant(syncGrant);
    accessToken.identity = IDENTITY;
    callback(null, {
        token: accessToken.toJwt()
    });
};