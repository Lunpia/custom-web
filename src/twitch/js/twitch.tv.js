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

const favGames = ['Apex Legends', 'Call of Duty: Black Ops', 'Overwatch', 'Phasmophobia', 'ASMR']

const insertAfter = (newNode, referenceNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
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
                <div class="hopp__icon-list__item" id="filter-game" aria-describedby="filter-game-popover" title="Filters"><svg viewBox="0 0 24 24" fill="none"><path d="M19 12H5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 6H3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 18H7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
                <div class="hopp__icon-list__item" title="Favourites"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div>
                <div class="hopp__icon-list__item" title="Settings"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></div>
            </div>
        </div>

        <div id="filter-game-popover" class="popover" role="tooltip">
            <form clas="hopp__form">
                <div class="hopp__form__group">
                    <input class="hopp__form__radio hopp__form__radio--hidden" type="radio" id="all" name="game" value="all">
                    <label class="hopp__form__label" for="all">All</label>
                </div>
                
                <div class="hopp__form__group hopp__form__group--fav">
                    <h3 class="hopp__form__title">Favourite Games</h3>
                </div>

                <div class="hopp__form__group hopp__form__group--other">
                    <h3 class="hopp__form__title">Other Games</h3>
                </div>
            </form>
        </div>
    `;

    // rename streamer element
    $('.live-channel-card').parent().addClass('hopp__streamer');

    // add filter popover
}
class StreamFilter {
    constructor (listsOfFavStreamers, activeGameFilter = 'all', favGames) {
        this.originalStreamerData = [];
        this.listsOfFavStreamers = listsOfFavStreamers;
        this.activeGameFilter = activeGameFilter;
        this.favGames = favGames;

        this.init();
    }

    init () {
        console.log('New Streamer filter');

        this.originalStreamerData = this.getOriginalStreamerData();

        this.orderFavStreamers();
        this.renderTable();
        this.showLayout('grid');
        this.initPopover();
        this.fillGameFilter();
        this.showStreamerBasedOnGame(this.activeGameFilter);

        this.initListeners();
    }
    
    getOriginalStreamerData () {
        let streamerData = [];

        $('.live-channel-card').parent().each(function (i) {
            const streamEl = $(this);
            const name = streamEl.find($('a[data-a-target="preview-card-channel-link"]'))[0].innerText || '';
            const game = streamEl.find($('a[data-a-target="preview-card-game-link"]'))[0] ? streamEl.find($('a[data-a-target="preview-card-game-link"]'))[0].innerText : 'Other';
            const title = streamEl.find($('a[data-a-target="preview-card-title-link"] h3'))[0].innerText || '';
            const thumbnail = streamEl.find($('.tw-image'))[1].src || '';
            const avatar = streamEl.find($('.tw-image'))[0].src || '';
            const viewers = streamEl.find($('.ScMediaCardStatWrapper-sc-1ncw7wk-0.bfxdoE.tw-media-card-stat p'))[0].innerHTML.replace(/viewers/g,'') || '';
            const url = streamEl.find($('a[data-a-target="preview-card-image-link'))[0].href || '';

            console.log(game);

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

        console.log(streamerData);

        return streamerData;
    }
    
    orderFavStreamers () {   
        const that = this;

        $('.live-channel-card').parent().each(function () {
            const streamEl = $(this);
            const onlineStreamerName = streamEl.find($('a[data-a-target="preview-card-channel-link"]'))[0].innerText.toLowerCase();

            that.listsOfFavStreamers.forEach((list, i) => {
                const cssClass = list.cssClass; // string
                const favStreamerNames = list.streamers; // array
                const order = -100 + i; // number
                
                favStreamerNames.forEach(favStreamerName => {
                    const favStreamerNameButInLowerCase = favStreamerName.toLowerCase();

                    if (favStreamerNameButInLowerCase === onlineStreamerName) {
                        streamEl.addClass(cssClass);
                        streamEl.css({order: order});
                    }
                });
            });
        });
    }

    renderTable () {
        const originalLayout = $('.Layout-sc-nxg1ff-0.fLCwOX > div:nth-child(3)');
        originalLayout.addClass('hopp__layout hopp__layout-grid').attr('data-hopp-layout', 'grid');

        // create table
        const table = document.createElement('div');
        $(table).addClass('hopp__layout hopp__layout-table').attr('data-hopp-layout', 'table');
        
        // render header title
        table.innerHTML += `<div class="Layout-sc-nxg1ff-0 kamdZy"><h4 data-a-target="live-channels-header" class="CoreText-sc-cpl358-0 gyzpTM">Live channels</h4></div>`

        // render table
        this.originalStreamerData.forEach(streamer => {
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
    
    showStreamerBasedOnGame (filterGame) {
        this.activeGameFilter = filterGame;

        console.log(this.activeGameFilter);
        
        // set checked
        $(`#filter-game-popover .hopp__form__radio[value="${this.activeGameFilter}"`).attr('checked', 'No playing a game');

        if (filterGame === 'all') {
            $('.hopp__streamer').show();
             
            return
        }

        $('.hopp__streamer').each(function (i) {
            const streamEl = $(this);
            const streamerGame = streamEl.find($('a[data-a-target="preview-card-game-link"]'))[0] ? streamEl.find($('a[data-a-target="preview-card-game-link"]'))[0].innerText.toLowerCase() : 'other';

            streamEl.hide();

            if (filterGame === streamerGame) {
                streamEl.show();
            }
        });
    }

    getAllGames () {
        const games = [];
    
        this.originalStreamerData.forEach((streamer) => {
            const game = streamer.game;
    
            if (!games.includes(game)) {
                games.push(game)
            }
        });
        
        return games.sort();
    }

    getAvailablebFavGames () {
        return this.getAllGames().filter(game => this.favGames.includes(game))
    }
    
    getAllGamesWithoutFav () {
        return this.getAllGames().filter(game => !this.favGames.includes(game));
    }

    fillGameFilter () {
        let favGamesHtml = '';
        let otherGamesHtml = '';
        
        this.getAvailablebFavGames().forEach(game => { 
            favGamesHtml += `
                <input class="hopp__form__radio hopp__form__radio--hidden" type="radio" id="${game.toLocaleLowerCase()}" name="game" value="${game.toLocaleLowerCase()}">
                <label class="hopp__form__label" for="${game.toLocaleLowerCase()}">${game}</label>
             `;
        });
        
        this.getAllGamesWithoutFav().forEach(game => { 
            otherGamesHtml += `
                <input class="hopp__form__radio hopp__form__radio--hidden" type="radio" id="${game.toLocaleLowerCase()}" name="game" value="${game.toLocaleLowerCase()}">
                <label class="hopp__form__label" for="${game.toLocaleLowerCase()}">${game}</label>
             `;
        });

        $('.hopp__form__group--fav')[0].innerHTML += favGamesHtml;
        $('.hopp__form__group--other')[0].innerHTML += otherGamesHtml;
    }

    initPopover () {
        const filterTrigger = document.querySelector('#filter-game');
        const filterPopover = document.querySelector('#filter-game-popover');

        new Popover(filterTrigger, filterPopover, undefined, false);
    }

    initListeners () {
        const that = this;

        // change layout
        $('div[data-hopp-layout-toggeler]').on('click', function() {
            const layoutType = $(this).data('hoppLayoutToggeler'); 

            that.showLayout(layoutType);
        });

        // filtering
        $('#filter-game-popover input').on('click', function() {
            const filterName = $(this)[0].value;

            that.showStreamerBasedOnGame(filterName);
        });
    }
}
class Popover {
    constructor (triggerEl, popoverEl, activeClass = 'active', scrollToTop = false) {
        this.triggerEl = triggerEl;
        this.popoverEl = popoverEl;
        this.popperInstance = Popper.createPopper(this.triggerEl, this.popoverEl, {
            placement: 'bottom-end',
        });
        this.activeClass = activeClass;
        this.scrollToTop = scrollToTop;

        this.init();
    }

    init () {
        this.initListeners();
    }
    
    show () {
        this.triggerEl.classList.add(this.activeClass);
        this.popoverEl.setAttribute('data-show', '');
        this.popperInstance.update();

        if (this.scrollToTop) {
            this.popoverEl.scrollTop = 0;
        }
    }
    
    hide () {
        this.triggerEl.classList.remove(this.activeClass);
        this.popoverEl.removeAttribute('data-show');
    }

    initListeners () {
        this.triggerEl.addEventListener('click', (e) => {
            e.stopPropagation();
            this.show();
        });

        $('body').on('click', () => {
            this.hide();
        });
    }
}


if (window.location.href == 'https://www.twitch.tv/directory/following/live') {
    var checkExist = setInterval(function () {
        if ($('.live-channel-card').length) {
            doAllotOfPeWork();

            const sf = new StreamFilter(favStreamersLists,'all', favGames);

            window.addEventListener('keydown', (e) => {
                if (e.key === 'a') {
                    sf.showStreamerBasedOnGame('all');
                }
                if (e.key === 'm') {
                    sf.showStreamerBasedOnGame('minecraft');
                }
                if (e.key === 'o') {
                    sf.showStreamerBasedOnGame('overwatch');
                } 
                if (e.key === 'c') {
                    sf.showStreamerBasedOnGame('call of duty: black ops');
                }
                if (e.key === 'p') {
                    sf.showStreamerBasedOnGame('apex legends');
                }
            });

            clearInterval(checkExist);
        }
    }, 100);
}

