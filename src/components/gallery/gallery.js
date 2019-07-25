//Libraries
import React, {Component}   from 'react'
import axios                from 'axios';
// import cloudinary           from 'cloudinary-core';
import cn                   from 'classnames';

//Components
import ImageGallery from 'react-image-gallery';
import Button       from '../../components/button/button';
import FavIcon      from '../favourites/favIcon';

import Blockspinner from '../spinners/BlockSpinner';


//Styles
import styles       from './gallery.module.scss';
import "react-image-gallery/styles/css/image-gallery.css";
import "./image-gallery-overrides.scss";



class Gallery extends Component {
    state = {
        current: 0,
        gallery: null,
        items: [],
    };

    gallerySelect= (data) => {
        this.setState({current: data});
    }

    componentDidMount() {

        
        return axios.get('/api/article/get-article?articleId='+ this.props.id).then(r => {
            // console.log(r);
            // const cloudinaryCore = new cloudinary.Cloudinary({cloud_name: 'cognitives'});
            // console.log(r.data.media);

            const images = r.data.media.map((item) => {
                // const url = cloudinaryCore.url(item.url, {
                //     width: "580",
                //     height: "384",
                //     crop: "fit" 
    
                // });
                // console.log(styles.gallery__img);
                const {favourite, cart} = this.props.checkPhotoStatus(item.id);
                
                return {
                    id      : item.id,
                    url     : item.path,
                    guid    : item.guid,
                    title   : item.title,
                    width   : item.width,
                    height  : item.height,
                    caption : item.caption,

                    cart,
                    favourite,
                    original: item.path, // needed for gallery
                };
            });
        
        
            this.setState({
                items: images
            }, () => {
                console.log(this.state);
            });
        
        
        }).catch(() => {

            const images = this.props.gallery.images.map((item) => {
                const {favourite, cart} = this.props.checkPhotoStatus(item.id);
                
                return {
                    ...item,
                    caption:item.content,
                    favourite,
                    cart,
                    original: item.url,
                };
            });
            // console.log(images);
            this.setState({
                items: images
            }, () => {
                // console.log(this.state);
            });

        });



    }

    toggleFavourite =() => {
        const items = [...this.state.items];
        const currentItem = items[this.state.current];
        currentItem.favourite = !currentItem.favourite;
        this.setState({items}, () => {
            console.log("NEW STATE AFTER TOGGLE", this.state);
        }); 
        // console.log(items[this.state.current]);
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
        // console.log(this.state);
        if (this.state.items.length === 0) return <Blockspinner />;
        const currentItem = this.state.items[this.state.current];
        const cartButtonText = currentItem.cart ? "REMOVE FROM CART": "ADD TO CART" ;

        // console.log("CURRENT ITEM", currentItem);
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
                                <h2 className={styles.gallery__phototitle}>{currentItem.title}</h2>
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
                            <p className={styles.gallery__metainfo}><span>Photographer</span> Name</p>
                            <p className={styles.gallery__metainfo}><span>Date photo taken</span> date</p>
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