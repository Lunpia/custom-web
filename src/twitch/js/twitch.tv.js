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

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
class ShowFavStreamers {

    constructor (streamerLists) {
        this.streamerLists = streamerLists;
        this.streamerData;

        this.init();
    }

    init () {
        this.getStreamerData();
        this.renderVieuwToggler();
        this.renderTable();

        this.showTable();

        this.initListeners();
    }

    getStreamerData () {
        let streamerData = [];

        $('.live-channel-card').parent().each(function (i) {
            const streamEl = $(this);
            const name = streamEl.find($('a[data-a-target="preview-card-channel-link"]'))[0].innerText;
            const game = streamEl.find($('a[data-a-target="preview-card-game-link"]'))[0].innerText;
            const title = streamEl.find($('a[data-a-target="preview-card-title-link"] h3'))[0].innerText;
            const thumbnail = streamEl.find($('.tw-image'))[1].src;
            const avatar = streamEl.find($('.tw-image'))[0].src;
            const viewers = streamEl.find($('.ScMediaCardStatWrapper-sc-1ncw7wk-0.bfxdoE.tw-media-card-stat p'))[0].innerHTML.replace(/viewers/g,'');
            const url = streamEl.find($('a[data-a-target="preview-card-image-link'))[0].href;

            streamerData.push(
                {
                    name: name,
                    game: game,
                    title: title,
                    thumbnail: thumbnail,
                    avatar: avatar,
                    viewers: viewers,
                    url: url
                }
            )
        });

        this.streamerData = streamerData;
    }

    renderVieuwToggler () {
        const tabBar = $('.InjectLayout-sc-588ddc-0.kNuFSG');

        const toggeler = document.createElement('div');
        toggeler.classList.add('hopp__toggeler');

        toggeler.innerHTML += `
            <div class="hopp__toggeler__button" data-hopp-toggeler="default"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg></div>
            <div class="hopp__toggeler__button" data-hopp-toggeler="table"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line></svg></div>
        `;

        insertAfter(toggeler, tabBar[0]);
    }

    renderTable () {
        const originalDisplay = $('.Layout-sc-nxg1ff-0.fLCwOX > div:nth-child(3)');
        originalDisplay.addClass('hopp__default');

        const table = document.createElement('div');
        table.classList.add('hopp__table');

        table.innerHTML += `<div class="Layout-sc-nxg1ff-0 kamdZy"><h4 data-a-target="live-channels-header" class="CoreText-sc-cpl358-0 gyzpTM">Live channels</h4></div>`

        this.streamerData.forEach(streamer => {
            table.innerHTML += `
                <a href="${streamer.url}" class="hopp__table__row">
                    <img class="hopp__table__col hopp__table__avatar" src="${streamer.avatar}"/>
                    <div class="hopp__table__col hopp__table__name">${streamer.name}</div>
                    <div class="hopp__table__col hopp__table__title">${streamer.title}</div>
                    <div class="hopp__table__col hopp__table__game">${streamer.game}</div>
                    <div class="hopp__table__col hopp__table__viewers">${streamer.viewers}</div>
                </a>
            `;
        });

        insertAfter(table, originalDisplay[0]);
    }

    handleviewToggelerActiveState (displayType) {
        $('.hopp__toggeler__button').removeClass('hopp__toggeler__button--active');
        $(`.hopp__toggeler__button[data-hopp-toggeler="${displayType}"]`).addClass('hopp__toggeler__button--active');  
    }

    showTable () {
        this.handleviewToggelerActiveState('table');
            
        // show table
        $('.hopp__default').addClass('hide');
        $('.hopp__table').removeClass('hide');
    }

    showDefault (displayType) {
        this.handleviewToggelerActiveState('default');
            
        // show default
        $('.hopp__default').removeClass('hide');
        $('.hopp__table').addClass('hide');
    }

    initListeners () {
        const that = this;

        $('.hopp__toggeler__button').on('click', function() {
            const displayType = $(this).data('hoppToggeler');          

            if (displayType === 'table') {
                that.showTable();
            }
            if (displayType === 'default') {
                that.showDefault();
            }
        });
    }
}

 

if (window.location.href == 'https://www.twitch.tv/directory/following/live') {
    var checkExist = setInterval(function () {
        if ($('.live-channel-card').length) {

            const favStreamers = new ShowFavStreamers(streamerLists); 

            clearInterval(checkExist);
        }
    }, 100);
}

