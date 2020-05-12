exports.handler = function (context, event, callback) {
    now = new Date().getTime();
    let payload = {
        'to': event.To,
        'from': event.From,
        'call_sid': event.CallSid,
        'at_time': now
    };

    let sync = Runtime.getSync({serviceName: context.SYNC_SERVICE_SID});
    if (event.CallSid) {
        let map_sid = 'poll-item-a';
        let title = context.TITLE_A;
        if (context.PHONE_NUMBER_B === event.To) {
            map_sid = 'poll-item-b';
            title = context.TITLE_B;
        }

        sync.maps('Poll').syncMapItems(map_sid).fetch().then(item => {
            item.data.list.push(payload)
            return sync.maps('Poll').syncMapItems(map_sid).update({data: item.data});
        }).then(response => {
            const twiml = new Twilio.twiml.VoiceResponse();
            twiml.say({voice: 'woman', language: 'ja-JP',}, title + 'に投票しました。ありがとうございました。');
            callback(null, twiml);
        }).catch(error => {
            console.log(error);
            const twiml = new Twilio.twiml.VoiceResponse();
            twiml.say({voice: 'woman', language: 'ja-JP',}, '受付は終了しました。');
            callback(null, twiml);
        });

    } else {
        const twiml = new Twilio.twiml.VoiceResponse();
        twiml.say({voice: 'woman', language: 'ja-JP',}, 'エラーが発生しました。');
        callback(null, twiml);
    }

};