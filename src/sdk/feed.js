
import axios from  'axios';
import qs from  'qs';

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
        return axios[requestType](url, qs.stringify( this.options ) )
        // return axios.get('/api/search?s=this')
            .then( response => {
                console.log(response);
                var data = response.data;
            }).catch( error => {
                console.log(error.response);
            });    
    }
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