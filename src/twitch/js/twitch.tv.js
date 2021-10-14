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
            'faide',
            'xqcow',
            'eskay',
            'mL7support',
            'emongg',
            'redshell',
        ],
    },
]

const favGames = ['Apex Legends', 'Call of Duty: Black Ops', 'Overwatch', 'Phasmophobia']

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

const getStreamerGames = () => {
    const games = [];

    getStreamerData().forEach((streamer) => {
        const game = streamer.game;

        if (!games.includes(game)) {
            games.push(game)
        }
    });

    return games;
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
            <div class="hopp__layout-toggeler__button" data-hopp-layout-toggeler="table" title="Table"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg></div>
            <div class="hopp__layout-toggeler__button" data-hopp-layout-toggeler="filter" title="Filters"><svg viewBox="0 0 24 24" fill="none"><path d="M19 12H5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 6H3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 18H7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
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

            that.showLayout(layoutType);
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
 
class Filter {
    constructor (arrayWithFilters) {
        this.arrayWithFilters = arrayWithFilters;

        this.init();
    }

    init () {
        this.renderFilters();
        this.initListeners();
    }

    renderFilters () {
        const tabBar = $('.InjectLayout-sc-588ddc-0.kNuFSG');

        const toggeler = document.createElement('div');
        toggeler.classList.add('hopp__filters');
        
        // all
        toggeler.innerHTML += `
            <div class="hopp__filters__filter" data-hopp-filter="all">All</div>
        `;

        // games
        this.arrayWithFilters.forEach(filterName => {
            const dataValue = filterName.toLocaleLowerCase();

            toggeler.innerHTML += `
                <div class="hopp__filters__filter" data-hopp-filter="${dataValue}">${filterName}</div>
            `;            
        });
        
        insertAfter(toggeler, tabBar[0]);
    }

    showStreamerBasedOnGame (filter) {
        if (filter === 'all') {
            $('.live-channel-card').parent().show();
             
            return
        }

        $('.live-channel-card').parent().each(function (i) {
            const streamEl = $(this);
            const game = streamEl.find($('a[data-a-target="preview-card-game-link"]'))[0].innerText.toLowerCase();

            streamEl.hide();

            if (filter === game) {
                streamEl.show();
            }
        });
    }

    initListeners () {
        const that = this;

        $('div[data-hopp-filter]').on('click', function() {
            const filterName = $(this).data('hoppFilter'); 

            that.showStreamerBasedOnGame(filterName);
        });

    }
}

if (window.location.href == 'https://www.twitch.tv/directory/following/live') {
    var checkExist = setInterval(function () {
        if ($('.live-channel-card').length) {

            const lh = new LayoutHandler(getStreamerData()); 
            const fs = new FavStreamers(favStreamersLists); 
            const f = new Filter(favGames); 
            
            clearInterval(checkExist);
        }
    }, 100);
}

