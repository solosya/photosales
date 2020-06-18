import axios        from  'axios'
import qs           from  'qs'

const getGallery = (id) => {

    const articleParams = {
        articleId: id,
        media: [
            { //desktop
                // width: '580',
                height: '385',
                watermark: true
            },
            { //tablet
                width: '580',
                height: '384',
                watermark: false
            },
            { // mobile
                width: '500',
                height: '540',
                watermark: true
            }
        ]
    };
    
    
    return axios.get('/api/article/get-article?' + qs.stringify(articleParams));
}

export default getGallery;