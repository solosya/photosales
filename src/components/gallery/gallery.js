//Libraries
import React, {Component}   from 'react'
import axios                from 'axios'
import qs                   from 'qs'
import cn                   from 'classnames'
import cloudinary           from 'cloudinary-core'

//Components
import ImageGallery         from 'react-image-gallery'
import Button               from '../../components/button/button'
import FavIcon              from '../favourites/favIcon'
import Blockspinner         from '../spinners/BlockSpinner'

//Styles
import styles               from './gallery.module.scss'
import "react-image-gallery/styles/css/image-gallery.css"
import "./image-gallery-overrides.scss"



class Gallery extends Component {
    state = {
        current: 0,
        gallery: null,
        items: [],
        complete: false
    };

    gallerySelect= (data) => {
        this.setState({current: data});
    }

    componentDidMount() {

        if ( typeof this.props.gallery.images !== 'undefined') {
            const articleParams = {
                articleId: this.props.gallery.id,
                mediaWidth: '580',
                mediaHeight: '385',
                mediaWatermark: 'true'
            };

            return axios.get('/api/article/get-article?' + qs.stringify(articleParams)).then(r => {
                
                const cloudinaryCore = new cloudinary.Cloudinary({cloud_name: 'cognitives'});
    
                const images = r.data.media.map((item) => {

                    const url = cloudinaryCore.url(item.path, {
                        width: "580",
                        height: "384",
                        crop: "fit" 
        
                    });

                    const {favourite, cart} = this.props.checkPhotoStatus(item.media_id);
                    
                    return {
                        id      : item.media_id,
                        url     : item.path,
                        guid    : item.guid,
                        title   : item.title,
                        width   : item.width,
                        height  : item.height,
                        caption : item.caption,
    
                        cart,       //boolean to show if photo is in the cart
                        favourite, // boolean to show if photo is in the favourites
                        original: url, // needed for gallery
                    };
                });
            
            
                this.setState({
                    items: images,
                    complete: true,
                }, () => {
                    console.log(this.state);
                });
            
            
            }).catch(() => {
    
                const items = this.props.gallery.images.map((item) => {
                    const {favourite, cart} = this.props.checkPhotoStatus(item.id);
                    
                    return {
                        ...item,
                        caption:item.content,
                        favourite,
                        cart,
                        original: item.url,
                    };
                });
    
                this.setState({ items });
    
            });
        }


        const photo = this.props.gallery;
        const {favourite, cart} = this.props.checkPhotoStatus(photo.media_id);
        const photoy = {
            id      : photo.media_id,
            url     : photo.path,
            guid    : photo.guid,
            title   : photo.title,
            width   : photo.width,
            height  : photo.height,
            caption : photo.caption,

            cart,       //boolean to show if photo is in the cart
            favourite, // boolean to show if photo is in the favourites
            original: photo.url, // needed for gallery
        };

        this.setState({ items: [photoy] });

        // if ( this.props.galleryType === 'photo') { 
        //     return axios.get('/api/article/get-article?articleId='+ this.props.gallery.id).then(r => {

        // }



    }

    toggleFavourite =() => {
        const items = [...this.state.items];
        const currentItem = items[this.state.current];
        currentItem.favourite = !currentItem.favourite;
        this.setState({items}); 

        this.props.favouriteHandler(items[this.state.current]);
    }

    toggleCart =() => {
        const items = [...this.state.items];
        const currentItem = items[this.state.current];
        currentItem.cart = !currentItem.cart;
        this.setState({items}); 
        this.props.cartHandler(items[this.state.current]);
    }



    renderLeftNav(onClick, disabled) {
        const navStyles = cn( styles.gallery__nav, styles.gallery__nav_left );
        return (
            <button
                className={navStyles}
                disabled={disabled}
                onClick={onClick}/>
        )
    }
    
    renderRightNav(onClick, disabled) {
        const navStyles = cn( styles.gallery__nav, styles.gallery__nav_right );

        return (
            <button
                className={navStyles}
                disabled={disabled}
                onClick={onClick}/>
        )
    }


    render() {

        if (this.state.items.length === 0 && !this.state.complete) return <Blockspinner />;
        if (this.state.items.length === 0 && this.state.complete) return <div>No images to display</div>;

        const currentItem = this.state.items[this.state.current];
        const cartButtonText = currentItem.cart ? "REMOVE FROM CART": "ADD TO CART" ;


        return (

            

            <div className={styles.gallery}>
                <h1 className={styles.gallery__title} >{this.props.gallery.title}</h1>
                
                <div className={styles.gallery__container}>

                    <div className={styles.gallery__left}>
                        <div className={styles.gallery__imagecontainer}>
                            <ImageGallery 
                                items                   = {this.state.items} 
                                onSlide                 = {this.gallerySelect}
                                renderLeftNav           = {this.renderLeftNav}
                                renderRightNav          = {this.renderRightNav}
                                showThumbnails          = {false}
                                showPlayButton          = {false}
                                showFullscreenButton    = {false}
                            />
                        </div>
                    </div>



                    <div className={styles.gallery__right}>
                        <FavIcon grey onClick={ this.toggleFavourite} on={currentItem.favourite} />

                        <div className={styles.gallery__info}>
                            { currentItem ? 
                                <>
                                {/* <h2 className={styles.gallery__phototitle}>{currentItem.title}</h2> */}
                                <p className={styles.gallery__photocaption}>{currentItem.caption}</p>
                                </>
                                : null
                            }

                            <Button handler={this.toggleCart} classes={["button", "button--red", "button--top-30"]}>{cartButtonText}</Button>
 
                        </div>


                        <div className={styles.gallery__meta}>
                        { currentItem ? 
                            <>
                            <p className={styles.gallery__metainfo}><span>Size</span> {currentItem.width} x {currentItem.height}</p>
                            {/* <p className={styles.gallery__metainfo}><span>Photographer</span> Name</p>
                            <p className={styles.gallery__metainfo}><span>Date photo taken</span> date</p> */}
                            </>
                            : null
                        }
                        </div>


                    </div>




                </div>
    
    
            </div>

        )
    }


}



export default Gallery;