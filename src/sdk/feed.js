
import axios    from  'axios'
import qs       from  'qs'

export class Feed {
    fetch = () => {
        // console.log(this.options);
        if (this.options.search != null) {
            this.options.blogid = this.options.blogid; // search takes an id instead of a guid
        }

        let requestType = 'get';
        let url = '/api/blog/get-blog-feed';
    
        const requestData = { 
            offset      : this.options.offset, 
            limit       : this.options.limit, 
            dateFormat  : 'SHORT',
            existingNonPinnedCount: this.options.nonPinnedOffset,
        };
    
        if (this.options.blogid) {
            requestData['blogguid'] = this.options.blogid;
        }

        if (this.options.title) {
            requestData['title'] = this.options.title;
            requestData['titleMatch'] = 'exact';
        }

        if (this.options.urlid) {
            requestData['urlid'] = this.options.urlid;
        }

        if (this.options.blogInfo) {
            requestData['returnBlog'] = this.options.blogInfo;
        }


        if (this.options.loadtype === 'user') {
            url = '/api/'+ this.options.loadtype+'/load-more-managed';
            requestType = 'get';
        }
        
        if (this.options.loadtype === 'user_articles') {
            url = window.location.href;
            const urlArr = url.split('/');
            const username = decodeURIComponent(urlArr[urlArr.length - 2]);
            url = window._appJsConfig.appHostName + '/profile/'+ username + '/posts';
        }
    
        if (this.options.search) {
            // console.log('THIS IS A SEARCH')
            let refinedSearch = this.options.search;
            requestData['s'] = refinedSearch;
            url = '/api/search';
            requestType = 'get';
        }

        if (this.options.mediaSearch) {
            // console.log('THIS IS A MEDIA SEARCH')
            requestData['keyword'] = this.options.mediaSearch;
            url = '/api/search/media';
            requestType = 'get';
        }


        console.log(requestType, url + "?" +  qs.stringify( requestData ) );
        return axios[requestType](url + "?" + qs.stringify( requestData ) );
    }
}



export class ArticleFeed extends Feed {
    constructor(options) {
        super();
        this.limit      = options.limit      || 10;
        this.offset     = options.offset     || 0;
        this.options    = {
            'nonPinnedOffset'   :   options.non_pinned  || -1,
            'loadtype'          :   options.loadtype    || "home",
            'offset'            :   options.offset      || 0,
            'blogid'            :   options.blogid      || null,
            'title'             :   options.title       || null,
            'urlid'             :   options.urlid       || null,
            'search'            :   options.searchterm  || null,
            'mediaSearch'       :   options.mediaSearch || null,
            "blogInfo"          :   options.blogInfo    || false,
            'limit'             :   options.limit,
        };
    }
}