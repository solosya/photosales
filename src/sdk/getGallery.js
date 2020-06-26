import axios        from  'axios'
import qs           from  'qs'

const getGallery = (id, crop = true) => {

    const articleParams = {
        articleId: id,
        media: [
            { //desktop
                // width: '580',
                height: '385',
                watermark: true
            },
            { //tablet
                width: crop ? '580' : 0,
                height: '384',
                watermark: false
            },
            { // mobile
                width: crop ? '500' : 0,
                height: '400',
                watermark: true
            }
        ]
    };
    
    
    return axios.get('/api/article/get-article?' + qs.stringify(articleParams));
}

export default getGallery;