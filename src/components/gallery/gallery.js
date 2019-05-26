import React, {Component} from 'react'
import styles from './gallery.module.scss';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import Button from '../../components/button/button';
import cloudinary from 'cloudinary-core';

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
                crop: "fit",
                overlay:"text:arial_60:SUNRASYIA" 

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
    renderLeftNav(onClick, disabled) {

        return (
            <button
                className={styles.gallery__leftNav}
                disabled={disabled}
                onClick={onClick}/>
        )
    }
    
    renderRightNav(onClick, disabled) {
        return (
            <button
                className={styles.gallery__rightNav}
                disabled={disabled}
                onClick={onClick}/>
        )
    }


    addToCart = () => {
        console.log('added photo to cart!');
    }

    render() {
        console.log("rendering Gallery");
        if (this.state.items.length === 0) return null;

        return (
            <div className={styles.gallery}>
                <h1 className={styles.gallery__title} >{this.state.gallery.title}</h1>
                
                <div className={styles.gallery__container}>
                    <div className={styles.gallery__left}>
                        <div className={styles.gallery__imagecontainer}>
                            <ImageGallery 
                                items={this.state.images} 
                                onClick={this.gallerySelect} 
                                onSlide={this.gallerySelect}
                                useTranslate3D={false}
                                renderLeftNav = {this.renderLeftNav}
                                showThumbnails ={false}
                            />
                        </div>
                        {/* <img src={this.state.items[this.state.current].url} alt="" /> */}
                    </div>




                    <div className={styles.gallery__right}>
                        <div onClick={() => this.props.favourite(this.state.items[this.state.current])} className={styles.gallery__}>Favourite</div>

                        <div className={styles.gallery__info}>
                            { this.state.items[this.state.current] ? 
                                <>
                                <h2 className={styles.gallery__phototitle}>{this.state.items[this.state.current].title}</h2>
                                <p className={styles.gallery__photocaption}>{this.state.items[this.state.current].content}</p>
                                </>
                                : null
                            }

                            <Button handler={this.addToCart} classes={["button", "button--red", "button--top-30"]}>ADD TO CART</Button>
 
                        </div>


                        <div className={styles.gallery__meta}>
                        { this.state.items[this.state.current] ? 
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



export default Gallery;;