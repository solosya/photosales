
import axios from  'axios';

export class Feed {
    fetch = () => {
        if (this.options.search != null) {
            this.options.blogid = this.options.blogid; // search takes an id instead of a guid
        }

        let requestType = 'post';
        let url = window._appJsConfig.appHostName + '/home/load-articles';
    
        const requestData = { 
            offset      : this.options.offset, 
            limit       : this.options.limit, 
            // _csrf       : $('meta[name="csrf-token"]').attr("content"), 
            dateFormat  : 'SHORT',
            existingNonPinnedCount: this.options.nonPinnedOffset
        };
    
        if (this.options.blogid) {
            requestData['blogguid'] = this.options.blogid;
        }
    
        if (this.options.loadtype === 'user') {
            url = window._appJsConfig.appHostName + '/api/'+ this.options.loadtype+'/load-more-managed';
            requestType = 'get';
        }
        
        if (this.options.loadtype === 'user_articles') {
            url = window.location.href;
            const urlArr = url.split('/');
            const username = decodeURIComponent(urlArr[urlArr.length - 2]);
            url = window._appJsConfig.appHostName + '/profile/'+ username + '/posts';
        }
    
        if (this.options.search) {
            let refinedSearch = this.options.search;
            if (refinedSearch.indexOf(",listingquery") >= 0) {
                refinedSearch = refinedSearch.replace(",listingquery","");
                requestData['meta_info'] = refinedSearch;
            } else{
                requestData['s'] = refinedSearch;
            }
            url = window._appJsConfig.appHostName + '/'+ this.options.loadtype;
            requestType = 'get';
        }
        console.log(url, this.options);
        return axios[requestType](url, this.options)
        // return axios.get('/api/search?s=this')
            .then( response => {
                console.log(response);
                var data = response.data;
            }).catch( error => {
                console.log(error.response);
            });    }
}



export class ArticleFeed extends Feed {
    constructor(options) {
        super();
        this.limit      = options.limit      || 10;
        this.offset     = options.offset     || 0;
        this.options    = {
            'nonPinnedOffset'   :   options.non_pinned || -1,
            'loadtype'          :   options.loadtype || "home",
            'offset'            :   options.offset || 0,
            'blogid'            :   options.blogid,
            'search'            :   options.searchterm    || null,
            'limit'             :   options.limit,
            // 'page'              :   self.elem.data('page') || 1, // page is used for user articles
        };
    }
}

// Acme.View.articleFeed = function(options)
// {
//     this.feedModel  = options.model;
//     this.limit      = options.limit      || 10;
//     this.offset     = options.offset     || 0;
//     this.infinite   = options.infinite   || false;
//     this.failText   = options.failText   || null;
//     this.container  = $('#' + options.container);
//     this.template   = options.cardTemplate;
//     this.cardClass  = options.card_class;
//     this.renderType = options.renderType || 'append';
//     this.before     = options.before || false;
//     this.after      = options.after || false;
    
//     this.options    = {
//         'nonPinnedOffset'   :   options.non_pinned || -1,
//         'loadtype'          :   options.loadtype || "home",
//         'offset'            :   options.offset || 0,
//         'blogid'            :   options.blogid,
//         'search'            :   options.searchterm    || null,
//         'limit'             :   options.limit,
//         // 'page'              :   self.elem.data('page') || 1, // page is used for user articles
//     };

//     this.waypoint  = false;
//     this.elem      = $('#' + options.name);
//     this.failText  = options.failText || null;
//     this.events();
// };

// Acme.View.articleFeed.prototype = new Acme.Feed();
// Acme.View.articleFeed.constructor = Acme.View.articleFeed;
// Acme.View.articleFeed.prototype.render = function(data) 
// {
//     var self = this;
//     var articles = [];
//     if (data.articles) {
//         articles = data.articles;
//     }
//     if (data.userArticles) {
//         articles = data.userArticles;
//     }
//     if (data.users) {
//         articles = data.users.users;
//     }

//     var label      =   self.button_label  || "Load more",
//         ads_on     =   self.ads           || null;

//     self.elem.html(label);

//     // add counts to the dom for next request
//     self.options.offset += self.options.limit;
//     self.options.nonPinnedOffset = data.existingNonPinnedCount;

//     var html = [];
//     if (ads_on == "yes") {
//         html.push( window.templates.ads_infinite );
//     }

//     if (articles.length === 0 && self.failText) {
//         html = ["<p>" + self.failText + "</p>"];
//     } else {
//         for (var i in articles) {
//             articles[i].imageOptions = {'width': self.imgWidth, 'height': self.imgHeight};
//             html.push( self.feedModel.renderCard(articles[i], {
//                 cardClass: self.cardClass,
//                 template: self.template,
//                 type: "acme-"
//             }));
//         }
//         if (self.before ) {
//             html = [self.before].concat(html);
//         }
//         if (self.after) {
//             html = html.concat([self.after]);
//         }
    
//     }

//     (self.renderType === "write")
//         ? self.container.empty().append( html.join('') )
//         : self.container.append( html.join('') );
    

//     // show or hide the load more button depending on article count
//     (articles.length < self.options.limit) 
//         ? self.elem.css('display', 'none')
//         : self.elem.show();

//     // reset infinite load depending on article count
//     if (self.waypoint) {
//         (articles.length < self.options.limit)
//             ? self.waypoint.disable()
//             : self.waypoint.enable();
//     }

//     // $(".card .content > p, .card h2, .card .content .author > p").dotdotdot();     
//     // $('.video-player').videoPlayer();
//     // self.elem.data('rendertype', '');

//     this.feedModel.events();
// };