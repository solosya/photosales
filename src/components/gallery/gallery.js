//Libraries
import React, {Component}   from 'react'
import axios                from 'axios'
import qs                   from 'qs'
import cn                   from 'classnames'
import cloudinary           from 'cloudinary-core'
import styled               from 'styled-components'

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
                        type    : item.fileType,
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
                    console.log(item);
                    return {
                        ...item,
                        caption:item.caption,
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

const GalleryWindow = styled.div`
    height: 100%;
    display:flex;
    flex-direction: column;
`

const GalleryContainer = styled.div`
    display:flex;
    flex-grow: 1;

    /* mobile */
    @media screen and (max-width :767px) {
        flex-direction: column;
    }

`
const FavContainer = styled.div`
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
        width:380px;
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

    /* mobile */
    @media screen and (max-width :767px) {
        font-size: 18px;

        padding-right:50px;
        height: 104px;
        max-height:104px;
        min-height: 104px;

    }



`



export default Gallery;