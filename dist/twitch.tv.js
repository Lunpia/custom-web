// @include "../../jquery.js"
// @include "../../popper.js"

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

class Layout {

    constructor (streamerData, defaultLayout = 'grid') {
        this.streamerData = streamerData;
        this.defaultLayout = defaultLayout;

        this.init();
    }

    init () {
        this.renderTable();

        this.showLayout(this.defaultLayout);

        this.initListeners();
    }

    renderTable () {
        const originalLayout = $('.Layout-sc-nxg1ff-0.fLCwOX > div:nth-child(3)');
        originalLayout.addClass('hopp__layout hopp__layout-grid').attr('data-hopp-layout', 'grid');

        const table = document.createElement('div');
        $(table).addClass('hopp__layout hopp__layout-table').attr('data-hopp-layout', 'table');

        // header title
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
        $('div[data-hopp-layout-toggeler]').removeClass('active');
        $(`div[data-hopp-layout-toggeler="${layoutType}"]`).addClass('active');  
            
        // show layout
        $('div[data-hopp-layout]').addClass('hide');
        $(`div[data-hopp-layout="${layoutType}"]`).removeClass('hide');
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
        this.initListeners();
    }

    showStreamerBasedOnGame (filter) {
        if (filter === 'all') {
            $('.hopp__streamer').show();
             
            return
        }

        $('.hopp__streamer').each(function (i) {
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

        $('#tooltipxxx input').on('click', function() {
            const filterName = $(this)[0].value;
            console.log(filterName); 

            that.showStreamerBasedOnGame(filterName);
        });
    }
}

const doAllotOfPeWork = () => {

    // top bar
    const placeTopBarHere = $('.Layout-sc-nxg1ff-0.ScTabsLayout-sc-i1y2af-0.cmPJuA.tw-tabs')[0];
    placeTopBarHere.innerHTML += `
        <div class="hopp__top-bar"> 
            <div class="hopp__top-bar__icon-list hopp__icon-list"> 
                <div class="hopp__icon-list__item" data-hopp-layout-toggeler="grid" title="Grid"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg></div>
                <div class="hopp__icon-list__item" data-hopp-layout-toggeler="table" title="Table"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg></div>
            </div>
                
            <div class="hopp__top-bar__icon-list hopp__icon-list"> 
                <div class="hopp__icon-list__item" id="hopp" aria-describedby="tooltipxxx" title="Filters"><svg viewBox="0 0 24 24" fill="none"><path d="M19 12H5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 6H3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 18H7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
                <div class="hopp__icon-list__item" title="Settings"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></div>
            </div>
        </div>

        <div id="tooltipxxx" role="tooltip">
            <form>
                <input type="radio" id="all" name="game" value="all">
                <label for="all">All</label><br>
                <h3>Fav Games</h3>
                ${favGames.join(0).split(0).map((game, i) => `
                    <input type="radio" id="${game.toLocaleLowerCase()}" name="game" value="${game.toLocaleLowerCase()}">
                    <label for="${game.toLocaleLowerCase()}">${game}</label><br>
                `).join('')}

                <h3>All Games</h3>
                ${getStreamerGames().join(0).split(0).map((game, i) => `
                    <input type="radio" id="${game.toLocaleLowerCase()}" name="game" value="${game.toLocaleLowerCase()}">
                    <label for="${game.toLocaleLowerCase()}">${game}</label><br>
                `).join('')}
            </form>
        </div>
    `;

    // rename streamer element
    $('.live-channel-card').parent().addClass('hopp__streamer');

    // add filter popover
}





if (window.location.href == 'https://www.twitch.tv/directory/following/live') {
    var checkExist = setInterval(function () {
        if ($('.live-channel-card').length) {
            doAllotOfPeWork();

            const lh = new Layout(getStreamerData()); 
            const fs = new FavStreamers(favStreamersLists); 
            const f = new Filter(favGames); 


            

            const button = document.querySelector('#hopp');
            const tooltip = document.querySelector('#tooltipxxx');
            let isOpen = false;

            
         
            const popperInstance = Popper.createPopper(button, tooltip, {
                placement: 'bottom-end',
                modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [-5, -35],
                      },
                    },
                  ],
            });

            const showTooltip = () => {
                console.log('open');
                isOpen = true;
                tooltip.setAttribute('data-show', '');
                popperInstance.update();
            }
            
            const hideTooltip = () => {
                console.log('close');
                isOpen = false;
                tooltip.removeAttribute('data-show');
            }

            $('.CoreText-sc-cpl358-0.ScTitleText-sc-1gsen4-0.fjVUJF.bMnEsX.tw-title').on('click', function() {
                hideTooltip();
            });

            $('#hopp').on('click', function() {
                showTooltip();
            });




            
            clearInterval(checkExist);
        }
    }, 100);
}

