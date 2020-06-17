// Libraries
import React, {Component}   from 'react'
import {connect}            from 'react-redux'

//Components
import Col                  from '../../components/layout/col'
import Row                  from '../../components/layout/row'
import Card                 from '../../components/card/card.js'
import Header               from '../../components/partials/section_header.js'
// import Button               from '../../components/button/button'
import Container            from '../../components/layout/container'

import Spinner              from '../../components/spinners/RippleSpinner'

//Actions
import * as actionCreators  from '../../store/actions/actions'

// API calls
import {processImages}      from '../../utils/image'
import getGallery           from '../../sdk/getGallery'

//Styles
import 'react-notifications/lib/notifications.css';

//Data
import {panels} from './data';


class SingleGallery extends Component {

    state = {
        title: "",
        photos:[],
    }

    cardCount = 0;


    componentDidMount () {

        let photos = [];
        return getGallery(this.props.galleryId).then(r => {

            photos = processImages(r.data.media, this.props.checkPhotoStatus, "photo");

            this.setState({
                photos,
                complete: true,
            }, () => {
                // console.log(this.state);
            });
        
        
        }).catch((e) => {

            const photos = panels[0].feed[0].images.map((item) => {
                const {favourite, cart} = this.props.checkPhotoStatus(item.id);
                return {
                    ...item,
                    caption:item.caption,
                    favourite,
                    cart,
                    original: item.url,
                };
            });
            const title = panels[0].feed[0].title;
            this.setState({ photos, title });

        });
    }


    swapCards = (params) => {
    }

    pinCard = (params) => {
    }

    loadMore = () => {
        // this.getFeed(this.cardCount);
    }




    showGallery = (index) => {
        const photo = this.state.photos[index];
        this.props.showGallery(photo);
    }


    

    render() {
        this.cardCount = 0;
    
        return (
            <Container style={{minHeight:"600px"}}>

                <Row key={this.props.title}  margin={this.props.margin || ""}>
                    <Col classes={["col-12"]}>
                        { this.state.title &&
                            <Header 
                                linkHandler = {this.props.linkHandler} 
                                linkUrl     = { false }
                                title       = {this.state.title} />
                        }
                    </Col>
    

                    {this.state.photos.length < 1 &&
                        <Col classes={["col-12"]}>
                            <div style={{margin: 'auto', marginTop:'20px', width: '50px' }}>
                                <Spinner />
                            </div>
                        </Col>
                    }

                        <Col classes={["col-12"]}>
                            <Row>
                                
                                {this.state.photos.map((photo, i) => {
                                    const {favourite, cart} = this.props.checkPhotoStatus(photo.id);

                                    return (
                                        <Col key={i} classes={["col-12", "col-md-6", "col-lg-4"]} marginBottom="30px">
                                            <Card 
                                                cart        = {cart}
                                                data        = {photo} 
                                                panel       = {this.props.title}
                                                count       = {this.cardCount++}
                                                admin       = {this.props.admin}
                                                styles      = {["ps-card-4-mobile", "ps-card-4-tablet", "ps-card-4-desktop"]}
                                                cardType    = "photo" // cards rendered from search are a single photo, elsewhere an article
                                                favourite   = {favourite}
                                                favHandler  = {this.props.toggleFavourite}
                                                cardHandler = {this.showGallery}
                                                cartHandler = {this.props.toggleCart}
                                                viewAllButton = {false}
                                
                                                buttons // show cart and fav buttons

                                            />
                                        </Col>
                                    )
                                })}

                            </Row>

                        </Col>
    
                </Row>
            </Container>
        )

    }
}


const mapStateToProps = state => {
    return {
        favourites : state.favourites,
        cart: state.cart,
        // isLoggedIn: state.isLoggedIn,
        // pageTitle: state.pageTitle
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleCart      : (photo) => dispatch( actionCreators.toggleCart(photo) ),
        toggleFavourite : (photo) => dispatch( actionCreators.toggleFavourite(photo) ),
        fetchFavourites : ()      => dispatch( actionCreators.fetchSaved() ),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SingleGallery);



