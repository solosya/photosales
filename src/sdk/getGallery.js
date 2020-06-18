import axios        from  'axios'
import qs           from  'qs'

const getGallery = (id) => {

    const articleParams = {
        articleId: id,
        media: [
            {
                width: '580',
                height: '385',
                watermark: true
            },
            {
                // width: '603',
                height: '384',
                watermark: false
            },
            {
                width: '500',
                watermark: true
            }
        ]
    };
    
    
    return axios.get('/api/article/get-article?' + qs.stringify(articleParams));
}

export default getGallery;