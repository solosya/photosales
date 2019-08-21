//Libraries
import React, {Component}   from 'react'
import axios                from 'axios'
import qs                   from 'qs'
import cn                   from 'classnames'
// import cloudinary           from 'cloudinary-core'
import styled               from 'styled-components'

//Components
import ImageGallery         from 'react-image-gallery'
import Button               from '../../components/button/button'
import FavIcon              from '../favourites/favIcon'
// import Blockspinner         from '../spinners/BlockSpinner'
import RippleSpinner        from '../spinners/RippleSpinner'

//Styles
import styles               from './gallery.module.scss'
import "react-image-gallery/styles/css/image-gallery.css"
import "./image-gallery-overrides.scss"

//Utils
import {imageSet}           from '../../utils/image'

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
        let images = [];

        if ( typeof this.props.gallery.images !== 'undefined') {
            const articleParams = {
                articleId: this.props.gallery.id,
                media: [
                    {
                        width: '580',
                        height: '385',
                        watermark: true
                    },
                    {
                        width: '603',
                        height: '384',
                        watermark: false
                    },
                    {
                        width: '500',
                        watermark: true
                    }
                ]
            };


            return axios.get('/api/article/get-article?' + qs.stringify(articleParams)).then(r => {
                
                // const cloudinaryCore = new cloudinary.Cloudinary({cloud_name: 'cognitives'});
    
                images = r.data.media.map((item) => {

                    // const url = cloudinaryCore.url(item.path, {
                    //     width: "580",
                    //     height: "384",
                    //     crop: "fit" 
        
                    // });

                    const {favourite, cart} = this.props.checkPhotoStatus(item.media_id);
                    
                    return {
                        id      : item.media_id,
                        url     : item.path,
                        guid    : item.guid,
                        type    : item.fileType,
                        title   : item.title,
                        width   : item.width,
                        height  : item.height,
                        caption : item.caption,
    
                        cart,       //boolean to show if photo is in the cart
                        favourite, // boolean to show if photo is in the favourites
                        original: item.path[0], // needed for gallery
                        imageSet: imageSet(item.path.slice(1))

                    };
                });
            
                this.setState({
                    items: images,
                    complete: true,
                }, () => {
                    // console.log(this.state);
                });
            
            
            }).catch((e) => {
    
                // const items = this.props.gallery.images.map((item) => {
                //     const {favourite, cart} = this.props.checkPhotoStatus(item.id);
                //     return {
                //         ...item,
                //         caption:item.caption,
                //         favourite,
                //         cart,
                //         original: item.url,
                //     };
                // });
    
                // this.setState({ items });
    
            });
        }



        // If gallery showing single photo from favourites/cart instead of article gallery
        const photo = this.props.gallery;

        const {favourite, cart} = this.props.checkPhotoStatus(photo.id);
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
            original: photo.url[0], // needed for gallery
            imageSet: photo.imageSet
        };

        this.setState({ 
            items: [photoy] 
        }, () => {
            console.log(this.state);
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
        
        if (this.state.items.length === 0 && !this.state.complete) return (
            <SpinnerContainer>
                <RippleSpinner width="70px" height="70px" />
            </SpinnerContainer>
        );

        if (this.state.items.length === 0 && this.state.complete) return <div>No images to display</div>;

        const currentItem = this.state.items[this.state.current];
        const cartButtonText = currentItem.cart ? "REMOVE FROM CART": "ADD TO CART" ;


        return (

            

            <GalleryWindow>
                <Title>{this.props.gallery.title}</Title>
                
                <GalleryContainer>

                    <div>
                        <ImageContainer>
                            <ImageGallery 
                                items                   = {this.state.items} 
                                onSlide                 = {this.gallerySelect}
                                renderLeftNav           = {this.renderLeftNav}
                                renderRightNav          = {this.renderRightNav}
                                showThumbnails          = {false}
                                showPlayButton          = {false}
                                showFullscreenButton    = {false}
                            />
                        </ImageContainer>
                    </div>



                    <GalleryRight>

                        <FavContainer>
                            <FavIcon grey onClick={ this.toggleFavourite} on={currentItem.favourite} />
                        </FavContainer>

                        <Info>
                            { currentItem ? 
                                <Caption>{currentItem.caption}</Caption>
                                : null
                            }

                            <Button handler={this.toggleCart} classes={["button", "button--red", "button--top-30", "button--mobile-block"]}>{cartButtonText}</Button>
 
                        </Info>


                        <MetaInfoContainer>
                            { currentItem ? 
                                <MetaInfo><span>Size</span> {currentItem.width} x {currentItem.height}</MetaInfo>
                                : null
                            }
                        </MetaInfoContainer>


                    </GalleryRight>




                </GalleryContainer>
    
    
            </GalleryWindow>

        )
    }


}

    /* desktop-lg */
    // @media screen and (min-width : 1200px) {
    //     width:280px;
    // }

    /* desktop */
    // @media screen and (min-width : 992px) and (max-width : 1199px) {
    //     width:200px;
    //     max-width:90%;
    // }

    /* tablet */
    // @media screen and (min-width : 768px) and (max-width : 991px) {
    //     width:218px;
    //     max-width:90%;
    // }

const GalleryWindow = styled.div`
    height: 100%;
    display:flex;
    flex-direction: column;
`

const GalleryContainer = styled.div`
    display:flex;
    flex-grow: 1;


    /* tablet */
    @media screen and (min-width : 768px) and (max-width : 991px) {
        flex-direction: column;
    }

    /* mobile */
    @media screen and (max-width :767px) {
        flex-direction: column;
    }

`
const FavContainer = styled.div`

    /* tablet */
    @media screen and (min-width : 768px) and (max-width : 991px) {
        position:absolute;
        right:0;
        top:20px;
    }

    /* mobile */
    @media screen and (max-width :767px) {
        position:absolute;
        right:0;
        top:20px;
    }

`

const Title = styled.h1`
    margin:0;
    margin-bottom:20px;
    font-size: 28px;
`

const MetaInfoContainer = styled.div`


`


const ImageContainer = styled.div`
    background:pink;
    height: 384px;
    width:580px;


    /* tablet */
    @media screen and (min-width : 768px) and (max-width : 991px) {
        width:100%;
    }

    /* mobile */
    @media screen and (max-width :767px) {
        width:100%;
        /* height:auto; */
    }


`


const GalleryRight = styled.div`
    margin-left: 20px;
    padding-left: 20px;
    border-left: 1px solid #e7e7e7;


    /* tablet */
    @media screen and (min-width : 768px) and (max-width : 991px) {
        position:relative;
        border:none;
        margin:0;
        padding:0;
    }



    /* mobile */
    @media screen and (max-width :767px) {
        position:relative;
        border:none;
        margin:0;
        padding:0;
    }


`
const Info = styled.div`
    margin-top: 40px;
    border-bottom: 1px solid #e7e7e7;
    padding-bottom: 30px;

    /* tablet */
    @media screen and (min-width : 768px) and (max-width : 991px) {
        margin-top:20px;
    }


    /* mobile */
    @media screen and (max-width :767px) {
        margin-top:20px;
    }

`

const MetaInfo = styled.p`
    margin-top: 12px;
    font-size:12px;
    color:rgba(89, 88, 89, 0.7);
    font-weight:500;
    letter-spacing: 0.5px;
    > span {
        color:black;
        font-weight:700;
        letter-spacing: normal;
    }

`

const Caption = styled.p`
    margin:0;
    font-size: 20px;
    font-weight: 300;
    color: #595859;
    line-height: 1.4;
    height: 235px;
    max-height:235px;
	min-height: 235px;
    overflow:hidden;


    /* tablet */
    @media screen and (min-width : 768px) and (max-width : 991px) {
        font-size: 18px;
        padding-right:50px;
        max-height:104px;
        height:auto;
        min-height: auto;

    }


    /* mobile */
    @media screen and (max-width :767px) {
        font-size: 18px;
        padding-right:50px;
        height: 104px;
        max-height:104px;
        min-height: 104px;
    }

`

const SpinnerContainer = styled.div`
    position:relative;
    display:flex;
    justify-content:center;
    /* height: 100px;
    width: 100px; */
`


export default Gallery;