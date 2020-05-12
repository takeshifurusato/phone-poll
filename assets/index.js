let syncMap, syncClient;
$(function () {
    $.getJSON('./env', function (env) {
        $('.item-a .project-item-number').html(E164_to_0ABJ(env.PHONE_NUMBER_A));
        $('.item-b .project-item-number').html(E164_to_0ABJ(env.PHONE_NUMBER_B));
        $('.item-a .project-item-title').html(env.TITLE_A);
        $('.item-b .project-item-title').html(env.TITLE_B);
    });

    $.getJSON('./sync-token', function (tokenResponse) {
        syncClient = new Twilio.Sync.Client(tokenResponse.token, {logLevel: 'info'});
        syncClient.map('Poll').then(function (map) {
            syncMap = map;
            syncMap.on('itemUpdated', function (o) {
                updateList();
            });
            syncMap.on('itemAdded', function (o) {
                updateList();
            });
            updateList();
        }).catch(function (error) {
            console.log(error);
        });
        syncClient.on('tokenAboutToExpire', () => {
            $.getJSON('./sync-token', function (tokenResponse) {
                syncClient.updateToken(tokenResponse.token);
            });
        });
    });

    let updateList = function () {
        $.each(['item-a', 'item-b'], function (i, item_name) {
            syncMap.get('poll-' + item_name).then(function (item) {
                $('.status').html('受付中');
                $('.' + item_name + ' .project-item-count').html(item.value.list.length);
                if (item.value.list.length == 0) {
                    $('.phone-number-' + item_name).html('');
                }
                $.each(item.value.list, function (i, poll) {
                    if (!$("#" + poll.call_sid)[0]) {
                        const at_time = new Date(poll.at_time);
                        const t = at_time.getHours() + ":" + at_time.getMinutes() + ":" + at_time.getSeconds();
                        poll_html = '<div class="phone-number" id="' + poll.call_sid + '">' + t + " " + poll.from + '</div>';
                        $('.phone-number-' + item_name).append(poll_html);
                    }
                });
            }).catch(function (error) {
                console.log(error);
            });
        });
    };

    $('#btnStart').on('click', function () {
        start_count();
    });
    $('#btnRemoveMap').on('click', function () {
        remove_map();
    });

    let start_count = function () {
        $.each(['item-a', 'item-b'], function (i, item_name) {
            syncMap.set('poll-' + item_name, {'list': []}).catch(function (err) {
                console.error(err);
            });
        });
    }

    let remove_map = function () {
        syncClient.map('Poll').then(function (map) {
            syncMap = map;
            syncMap.removeMap().then(function () {
                clear_view();
                alert("データを消去しました。ページを閉じてください。");
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    let E164_to_0ABJ = function (target) {
        let phone_number = target.match(/\+81(..)(....)(....)/);
        return "0" + phone_number[1] + "-" + phone_number[2] + "-" + phone_number[3];
    }

    let clear_view = function () {
        $('.status').html('');
        $('.phone-number-item-a').html('');
        $('.phone-number-item-b').html('');
        $('.item-a .project-item-count').html('0');
        $('.item-b .project-item-count').html('0');
    }
});