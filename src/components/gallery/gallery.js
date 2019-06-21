import React, {Component} from 'react'
import styles from './gallery.module.scss';
import favStyle from '../../styles/favourite.module.scss';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import Button from '../../components/button/button';
import cloudinary from 'cloudinary-core';
import cn         from 'classnames';

    



class Gallery extends Component {
    state = {
        current: 0,
        gallery: null,
        items: [],
        images: []
    };

    gallerySelect= (data) => {
        this.setState({current: data});
    }

    componentDidMount() {
        const cloudinaryCore = new cloudinary.Cloudinary({cloud_name: 'cognitives'});
        const images = this.props.panel.images.map((item) => {
            const url = cloudinaryCore.url(item.image, {
                width: "580",
                height: "384",
                crop: "fit" 

            });

            return {
                original: url,
                description: url,
                originalClass: styles.gallery__img,
            };
        });

        this.setState({
            gallery: this.props.panel,
            items: this.props.panel.images,
            images: images
        });
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
        if (this.state.items.length === 0) return null;
        const currentItem = this.state.items[this.state.current];
        const favourited = currentItem.favourite ? favStyle.favouriteOn : '';
        const favouriteStyles = cn(favStyle.favourite, favourited);
        const cartButtonText = currentItem.cart ? "REMOVE FROM CART": "ADD TO CART" ;


        return (
            <div className={styles.gallery}>
                <h1 className={styles.gallery__title} >{this.state.gallery.title}</h1>
                
                <div className={styles.gallery__container}>
                    <div className={styles.gallery__left}>
                        <div className={styles.gallery__imagecontainer}>
                            <ImageGallery 
                                items={this.state.images} 
                                onSlide={this.gallerySelect}
                                renderLeftNav = {this.renderLeftNav}
                                renderRightNav = {this.renderRightNav}
                                showThumbnails ={false}
                            />
                        </div>
                        {/* <img src={this.state.items[this.state.current].url} alt="" /> */}
                    </div>



                    <div className={styles.gallery__right}>
                        <div onClick={ this.toggleFavourite}  className={favouriteStyles}></div>

                        <div className={styles.gallery__info}>
                            { currentItem ? 
                                <>
                                <h2 className={styles.gallery__phototitle}>{currentItem.title}</h2>
                                <p className={styles.gallery__photocaption}>{currentItem.content}</p>
                                </>
                                : null
                            }

                            <Button handler={this.toggleCart} classes={["button", "button--red", "button--top-30"]}>{cartButtonText}</Button>
 
                        </div>


                        <div className={styles.gallery__meta}>
                        { currentItem ? 
                            <>
                            <p><span>Size</span> 1598 x 832 pixels at 300 dpi</p>
                            <p><span>Photographer</span> Eliot Smithington</p>
                            <p><span>Date photo taken</span> 22/03/2019</p>
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