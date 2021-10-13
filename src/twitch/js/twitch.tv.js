// @include "../../jquery.js"

const favStreamersLists = [
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
            'mL7support',
            'emongg',
            'redshell'
        ]
    }
]

const insertAfter = (newNode, referenceNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

const getStreamerData = () => {
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

    return streamerData;
}

class LayoutHandler {

    constructor (streamerData, defaultLayout = 'grid') {
        this.streamerData = streamerData;
        this.defaultLayout = defaultLayout;

        this.init();
    }

    init () {
        this.renderLayoutToggler();
        this.renderTable();

        this.showLayout(this.defaultLayout);

        this.initListeners();
    }

    renderLayoutToggler () {
        const tabBar = $('.InjectLayout-sc-588ddc-0.kNuFSG');

        const toggeler = document.createElement('div');
        toggeler.classList.add('hopp__layout-toggeler');

        toggeler.innerHTML += `
            <div class="hopp__layout-toggeler__button" data-hopp-layout-toggeler="grid" title="Grid"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg></div>
            <div class="hopp__layout-toggeler__button" data-hopp-layout-toggeler="table" title="Table"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line></svg></div>
        `;

        insertAfter(toggeler, tabBar[0]);
    }

    renderTable () {
        const originalLayout = $('.Layout-sc-nxg1ff-0.fLCwOX > div:nth-child(3)');
        originalLayout.addClass('hopp__layout hopp__layout-grid');

        const table = document.createElement('div');
        $(table).addClass('hopp__layout hopp__layout-table');

        table.innerHTML += `<div class="Layout-sc-nxg1ff-0 kamdZy"><h4 data-a-target="live-channels-header" class="CoreText-sc-cpl358-0 gyzpTM">Live channels</h4></div>`

        this.streamerData.forEach(streamer => {
            table.innerHTML += `
                <a href="${streamer.url}" class="hopp__layout-table__row">
                    <img class="hopp__layout-table__col hopp__layout-table__avatar" src="${streamer.avatar}"/>
                    <div class="hopp__layout-table__col hopp__layout-table__name">${streamer.name}</div>
                    <div class="hopp__layout-table__col hopp__layout-table__game" title="${streamer.game}">${streamer.game}</div>
                    <div class="hopp__layout-table__col hopp__layout-table__title">${streamer.title}</div>
                    <div class="hopp__layout-table__col hopp__layout-table__viewers">${streamer.viewers}</div>
                </a>
            `;
        });

        insertAfter(table, originalLayout[0]);
    }

    showLayout (layoutType) {
        // handle layout-toggler active status
        $('.hopp__layout-toggeler__button').removeClass('active');
        $(`div[data-hopp-layout-toggeler="${layoutType}"]`).addClass('active');  
            
        // show layout
        $('.hopp__layout').addClass('hide');
        $(`.hopp__layout-${layoutType}`).removeClass('hide');
    }

    initListeners () {
        const that = this;

        $('div[data-hopp-layout-toggeler]').on('click', function() {
            const layoutType = $(this).data('hoppLayoutToggeler'); 

            if (layoutType === 'table') {
                that.showLayout('table');
            }
            else {
                that.showLayout('grid');
            }
        });
    }
}

class FavStreamers {
    constructor (favStreamersLists) {
        this.favStreamersLists = favStreamersLists;

        this.init();
    }

    init () {
        console.log('fav streamers inited: ', this.favStreamersLists);

        this.setStreamerOrder();
    }

    setStreamerOrder() {   
        const that = this;

        $('.live-channel-card').parent().each(function (i) {
            const streamEl = $(this);
            const onlineStreamerName = streamEl.find($('a[data-a-target="preview-card-channel-link"]'))[0].innerText.toLowerCase();

            that.favStreamersLists.forEach((favStreamersList, i) => {
                const cssClass = favStreamersList.cssClass; // string
                const favStreamers = favStreamersList.streamers; // array
                const order = -100 + i; // number
                
                favStreamers.forEach(favStreamerName => {
                    const favStreamerNameButInLowerCase = favStreamerName.toLowerCase()
                    if (favStreamerNameButInLowerCase === onlineStreamerName) {
                        streamEl.addClass(cssClass);
                        streamEl.css({order: order});
                    }
                });
            });
        });
    }
}
 

if (window.location.href == 'https://www.twitch.tv/directory/following/live') {
    var checkExist = setInterval(function () {
        if ($('.live-channel-card').length) {

            const lh = new LayoutHandler(getStreamerData()); 
            const fs = new FavStreamers(favStreamersLists); 

            clearInterval(checkExist);
        }
    }, 100);
}

