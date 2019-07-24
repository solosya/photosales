import React, { Component } from 'react'
import {connect}            from 'react-redux'
import {withRouter}         from 'react-router'
import { Waypoint }         from 'react-waypoint'

//Components
import Row                  from '../../components/layout/row'
import Col                  from '../../components/layout/col'
import Card                 from '../../components/card/card.js'
import Header               from '../../components/partials/section_header.js'
import Container            from '../../components/layout/container'
import Button               from '../../components/button/button'
import SearchField          from '../../components/search/search'
import Modal                from '../../components/modals/modal'
import Gallery              from '../../components/gallery/gallery'
import Favourites           from '../../components/favourites/favourites'

//Actions
import * as actionCreators  from '../../store/actions/actions'


// API calls
import {ArticleFeed}        from '../../sdk/feed'

//Data
import {panels}             from '../section/data'

 class Search extends Component {
    

    state = {
        photos: []
    }

    componentDidMount = () => {
        // console.log("MOIUNTING SEARCH");
        console.log(panels[1].feed[0].images);
        const params = new URLSearchParams(this.props.location.search);
        const keyword = params.get('for'); // bar
        if (!keyword) return;
        
        const options = {
            offset          : 0,
            limit           : 30,
            mediaSearch     : keyword,
        };

        const search = new ArticleFeed(options);
        
        return search.fetch().then((r) => {
            console.log(r.data);
            const photos = r.data.media.map((media) => {
                
                return {
                    id: media.id,
                    height: media.height,
                    width: media.width,
                    filesize: media.fileSize,
                    type: media.fileType,
                    url: media.cdn_path
                }
            });
            this.setState({photos: photos});
        }).catch(() => {
            this.setState({photos: panels[1].feed[0].images});
        });
    }

    // checkFavouriteStatus = (photoid) => {
    //     const found = this.props.favourites.filter((item) => {
    //         return photoid === item.id;
    //     });
    //     if (found.length > 0) {
    //         return true;
    //     }
    //     return false;
    // }

    // checkCartStatus = (photoid) => {
    //     console.log(this.props.cart);
    //     const found = this.props.cart.filter((item) => {
    //         return photoid === item.id;
    //     });
    //     if (found.length > 0) {
    //         return true;
    //     }
    //     return false;
    // }

    // checkPhotoStatus = (photoid) => {
    //     const favourite = this.checkFavouriteStatus(photoid);
    //     const cart = this.checkCartStatus(photoid);
    //     return {favourite, cart};
    // } 


    render() {



        const cartCount = (typeof this.props.cart       !== 'undefined') ? this.props.cart.length : 0;
        const favCount  = (typeof this.props.favourites !== 'undefined') ? this.props.favourites.length : 0;

        return (


            <>

                <Container>
                    
                    <Row>
                        <Col classes={["col-12"]}>
                            <Header 
                                title               = {this.props.pageTitle} 
                                favourites          = {favCount}
                                cartItems           = {cartCount}
                                linkHandler         = {this.props.linkHandler}
                                favouritesHandler   = {this.showFavourites}
                                loggedIn            = {this.props.isLoggedIn}
                                larger 
                                cart
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col classes={["col-12", "col-md-9"]}>
                            <SearchField searchHandler={this.searchResults} />
                        </Col>
                    </Row>

                </Container>



                <Container>
        
                    <Row key="searchResults"  margin={this.props.margin || ""}>
                        <Col classes={["col-12"]}>
                            <Header 
                                linkHandler = {this.props.linkHandler} 
                                linkUrl     = { false }
                                title       = "Search results" />
                        </Col>


                        <Col classes={["col-12"]}>
                            <Row>
                                
                                {this.state.photos.map((photo, i) => {
                                    
                                    const {favourite, cart} = this.props.photoStatusHandler(photo.id, this.props.favourites, this.props.cart);
                                    
                                    return (
                                        <Col key={i} classes={["col-12", "col-md-4"]} marginBottom="30px">
                                            <Card 
                                                data        = {photo} 
                                                panel       = {this.props.title}
                                                cardHandler = {this.props.cardHandler}
                                                favHandler  = {this.props.toggleFavourite}
                                                cartHandler = {this.props.toggleCart}
                                                styles      = {["card-4-mobile", "card-1-tablet", "card-4-desktop"]}
                                                favourite   = {favourite}
                                                cart        = {cart}
                                                buttons
                                            />
                                        </Col>
                                    )
                                })}

                            </Row>

                                


                            {/* <Waypoint onEnter={this.loadMore} /> */}

                            <Row margin="30px">
                                <Col classes={["col-12"]}>
                                    {/* <Button handler={this.loadMore} classes={["button", "button--red", "button--top-30"]}>Load more {this.cardCount}</Button> */}
                                </Col>
                            </Row>



                        </Col>

                    </Row>
                </Container>
            </>
        )
    }
}


const mapStateToProps = state => {
    return {
        favourites : state.favourites,
        cart: state.cart,
        isLoggedIn: state.isLoggedIn,
        pageTitle: state.pageTitle
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleCart      : (photo) => dispatch( actionCreators.toggleCart(photo) ),
        toggleFavourite : (photo) => dispatch( actionCreators.toggleFavourite(photo) ),
        fetchFavourites : ()      => dispatch( actionCreators.fetchSaved() ),
    }

}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Search) );

