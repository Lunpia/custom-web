// @include "../../jquery.js"
// @include "../../popper.js"

const favStreamersLists = [
    {
        title: 'Sicko Males',
        cssClass: 'sick-males',
        streamers: [
            'Lekkerspelen',
            'ethotv'
        ],
    },    
    {
        title: 'lol',
        cssClass: 'lol',
        streamers: [
            'EsportsPrimeLOL',
        ],
    },
    {
        title: 'Beta tier',
        cssClass: 'beta-tier',
        streamers: [
            'iitztimmy',
            'faide',
            'HAchubby',
            'xqcow',
            'aceu',
            'eskay',
            'mL7support',
            'randy',
            'taxi2g',
            'emongg',
            'redshell',
        ],
    },
]

const favGames = ['Apex Legends', 'Call of Duty: Black Ops', 'Overwatch', 'Phasmophobia', 'ASMR', 'Rocket League', 'Software and Game Development']

const insertAfter = (newNode, referenceNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}


const doAllotOfPreWork = () => {

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
                <!-- <div class="hopp__icon-list__item" title="Favourites"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div>-->
                <!-- <div class="hopp__icon-list__item" title="Settings"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></div>-->
            </div>
        </div>

        <div id="filter-game-popover" class="popover" role="tooltip">
            <form clas="hopp__form">
            
            <h3 class="hopp__form__title">Search</h3>
                <div class="hopp__form__form-group">
                    <div class="hopp__form__input-group">
                        <input class="hopp__form__text" type="text" id="search" name="search" placeholder="Game or Streamer" autocomplete="off">
                        <div class="hopp__form__icon" data-hopp-clear-search="search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div>
                    </div>
                </div>

                <h3 class="hopp__form__title hopp__form__title--fav">Favourite Games</h3>

                <h3 class="hopp__form__title hopp__form__title--other">Other Games</h3>
            </form>
        </div>
    `;

    // rename streamer element
    $('.live-channel-card').parent().addClass('hopp__streamer');

    // add grid class to default vieuw
    $('.Layout-sc-nxg1ff-0.fLCwOX > div:nth-child(3)').addClass('hopp__layout hopp__layout-grid').attr('data-hopp-layout', 'grid');
}
class StreamFilter {
    constructor (listsOfFavStreamers, activeFilter = 'all', favGames) {
        this.originalStreamerData = this.getOriginalStreamerData();
        this.listsOfFavStreamers = listsOfFavStreamers;
        this.favGames = favGames;
        this.popover;
        this.allGames = this.getAllGames();
        this.availablebFavGames = this.getAvailablebFavGames();
        this.allGamesWithoutFav = this.getAllGamesWithoutFav();
        this.activeFilter = activeFilter;

        this.init();
    }

    init () {
        this.orderFavStreamers();
        this.renderTable();
        this.showLayout('grid');
        this.initPopover();
        this.fillGameFilter();
        this.showStreamerBasedOnString(this.activeFilter);

        this.initListeners();
    }
    
    getOriginalStreamerData () {
        let streamerData = [];

        $('.hopp__streamer').each(function (i) {
            const streamEl = $(this);
            const name = streamEl.find($('a[data-a-target="preview-card-channel-link"]'))[0].innerText;
            const game = streamEl.find($('a[data-a-target="preview-card-game-link"]'))[0] ? streamEl.find($('a[data-a-target="preview-card-game-link"]'))[0].innerText : 'Other';
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
    
    orderFavStreamers () {   
        const that = this;

        $('.hopp__streamer').each(function () {
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

        insertAfter(table, $(`div[data-hopp-layout="grid"]`)[0]);
    }

    showLayout (layoutType) {
        // handle layout-toggler active status
        $('div[data-hopp-layout-toggeler]').removeClass('active');
        $(`div[data-hopp-layout-toggeler="${layoutType}"]`).addClass('active');  
            
        // show layout
        $('div[data-hopp-layout]').addClass('hide');
        $(`div[data-hopp-layout="${layoutType}"]`).removeClass('hide');
    }
    
    showStreamerBasedOnString (filterString = 'all') {
        const that = this;

        console.log(filterString);

        this.showLayout('grid');
        
        // set checked
        $(`#filter-game-popover .hopp__form__radio`).prop('checked', false);
        $(`#filter-game-popover .hopp__form__radio[value="${filterString}"`).prop('checked', true);

        if (filterString === 'all') {
            this.activeFilter = 'all';
            $('.hopp__streamer').show();
            return
        }

        $('.hopp__streamer').each(function (i) {
            const streamEl = $(this);
            const game = streamEl.find($('a[data-a-target="preview-card-game-link"]'))[0].innerText.toLowerCase();
            const name = streamEl.find($('a[data-a-target="preview-card-channel-link"]'))[0].innerText.toLowerCase();

            streamEl.hide();

            if (game.includes(filterString) || name.includes(filterString)){
                console.log(`Game found: ${game}`);
                console.log(`User found: ${name}`);
                that.activeFilter = game;
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
        return this.allGames.filter(game => this.favGames.includes(game))
    }
    
    getAllGamesWithoutFav () {
        return this.allGames.filter(game => !this.favGames.includes(game));
    }

    fillGameFilter () {
        
        // fav games
        const favGames = document.createElement('div');
        $(favGames).addClass('hopp__form__form-group');

        this.availablebFavGames.forEach(game => { 
            const gameLC = game.toLowerCase();
            
            favGames.innerHTML += `
                <div class="hopp__form__input-group">
                    <input class="hopp__form__radio hopp__form__radio--hidden" type="radio" id="${gameLC}" name="game" value="${gameLC}">
                    <label class="hopp__form__label" for="${gameLC}">${game}</label>
                </div>
            `;
        });
        
        insertAfter(favGames, $('.hopp__form__title--fav')[0]);



        // other games
        const otherGames = document.createElement('div');
        $(otherGames).addClass('hopp__form__form_group');

        otherGames.innerHTML += `            
            <div class="hopp__form__input-group">
                <input class="hopp__form__radio hopp__form__radio--hidden" type="radio" id="all" name="game" value="all">
                <label class="hopp__form__label" for="all">All</label>
            </div>
        `;

        this.allGamesWithoutFav.forEach(game => { 
            const gameLC = game.toLowerCase();
            
            otherGames.innerHTML += `
                <div class="hopp__form__input-group">
                    <input class="hopp__form__radio hopp__form__radio--hidden" type="radio" id="${gameLC}" name="game" value="${gameLC}">
                    <label class="hopp__form__label" for="${gameLC}">${game}</label>
                </div>
            `;
        });
        
        insertAfter(otherGames, $('.hopp__form__title--other')[0]);
    }

    initPopover () {
        const filterTrigger = document.querySelector('#filter-game');
        const filterPopover = document.querySelector('#filter-game-popover');

        this.popover = new Popover(filterTrigger, filterPopover, undefined, false);
    }

    initListeners () {
        const that = this;

        // change layout
        $('div[data-hopp-layout-toggeler]').on('click', function() {
            const layoutType = $(this).data('hoppLayoutToggeler'); 
            that.showLayout(layoutType);
        });

        // filtering
        $('#filter-game-popover .hopp__form__input-group').on('click', function(e) {
            e.preventDefault(); // to stop double firing
            // e.stopImmediatePropagation(); // don't close on click
            
            const filterName = $(this).find('.hopp__form__radio')[0].value;
            that.showStreamerBasedOnString(filterName);
        });
        
        // searching
        $('.hopp__form__text').on('input click', function(e) {
            e.stopImmediatePropagation();

            const typedText = e.currentTarget.value;
            that.showStreamerBasedOnString(typedText);
        });

        // clear search
        $('[data-hopp-clear-search]').on('click', function(e) {
            e.stopImmediatePropagation();

            const clearThisID = $(this).attr('data-hopp-clear-search');
            $(`#${clearThisID}`)[0].value = '';
            that.showStreamerBasedOnString('all');
        });

        // show popup
        this.popover.triggerEl.addEventListener('click', (e) => {
            e.stopImmediatePropagation();

            this.popover.toggle();
        });
        
        // hide popup
        $('body').on('click', () => {
            this.popover.close();
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
        this.isOpen = false;
    }

    toggle () {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
    
    open () {
        this.isOpen = true;
        this.triggerEl.classList.add(this.activeClass);
        this.popoverEl.setAttribute('data-show', '');
        this.popperInstance.update();
        
        if (this.scrollToTop) {
            this.popoverEl.scrollTop = 0;
        }
    }
    
    close () {
        this.isOpen = false;
        this.triggerEl.classList.remove(this.activeClass);
        this.popoverEl.removeAttribute('data-show');
    }
}


if (window.location.href == 'https://www.twitch.tv/directory/following/live') {
    var checkExist = setInterval(function () {
        if ($('.live-channel-card').length) {
            doAllotOfPreWork();

            const sf = new StreamFilter(favStreamersLists, 'all', favGames);

            console.log(sf);

            window.addEventListener('keydown', ({ key } = e) => {
                if (key === 'f' || key === 'F') {
                    sf.popover.open();
                }
                if (key === 'Escape') {
                    sf.popover.close();
                }
                if (key === 'l' || key === 'L') {
                    console.log(sf);
                }
            });

            clearInterval(checkExist);
        }
    }, 100);
}

