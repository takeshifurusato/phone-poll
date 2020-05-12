exports.handler = function (context, event, callback) {
    const env = {
        'PHONE_NUMBER_A': context.PHONE_NUMBER_A,
        'PHONE_NUMBER_B': context.PHONE_NUMBER_B,
        'TITLE_A': context.TITLE_A,
        'TITLE_B': context.TITLE_B,
    };
    callback(null, env);
};