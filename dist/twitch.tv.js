
// @include "../../jquery.js"

const streamerLists = [
    {
        title: 'Top tier',
        cssClass: 'top-tier',
        streamers: [
            'Lekkerspelen',
            'etho'
        ],
    },
    {
        title: 'Beta tier',
        cssClass: 'beta-tier',
        streamers: [
            'iitztimmy',
            'xqcow',
            'eskay'
        ],
    },
    {
        title: 'Overwatch streamers',
        cssClass: 'overwatch',
        streamers: [
            'ml7supprort',
            'emongg',
            'redshell'
        ]
    },
    {
        title: 'wink',
        cssClass: 'wink',
        streamers: [
            'amouranth'
        ]
    }
]
class ShowFavStreamers {

    constructor(streamerLists) {
        this.streamerLists = streamerLists;
        this.allOnlineStreamerNames = this.getAllOnlineStreamerNames();

        this.init();
    }

    init() {
        this.setStreamerOrder();

        console.log(`Your fav streamers are:`, this.streamerLists);
    }

    getAllOnlineStreamerNames() {
        let allStreamerNames = [];

        $('.live-channel-card').parent().each(function (i) {
            const streamEl = $(this);
            const streamerName = streamEl.find($('a[data-a-target="preview-card-channel-link"]'))[0].innerText; // string

            allStreamerNames.push(streamerName)
        });

        return allStreamerNames;
    }
    
    setStreamerOrder() {   
        const that = this;

        $('.live-channel-card').parent().each(function (i) {
            const streamEl = $(this);
            const onlineStreamerName = streamEl.find($('a[data-a-target="preview-card-channel-link"]'))[0].innerText.toLowerCase();

            that.streamerLists.forEach((singleStreamerList, i) => {
                const cssClass = singleStreamerList.cssClass;
                const favStreamers = singleStreamerList.streamers;
                const order = -100 + i;
                
                favStreamers.forEach(favStreamerName => {
                    if (favStreamerName == onlineStreamerName) {
                        streamEl.addClass(cssClass);
                        streamEl.css({order: order});
                    }
                });
            });
        });
    }
}


const favStreamers = new ShowFavStreamers(streamerLists);

if (window.location.href == 'https://www.twitch.tv/directory/following/live') {
    var checkExist = setInterval(function () {
        if ($('.live-channel-card').length) {

            favStreamers.init();

            clearInterval(checkExist);
        }
    }, 100);
}

$(document).on("click", function () {
    favStreamers.init();
});
