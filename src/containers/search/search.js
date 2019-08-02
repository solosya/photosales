import React, { Component } from 'react'
import { connect }          from 'react-redux'
import { withRouter }       from 'react-router'
import { Waypoint }         from 'react-waypoint'

//Components
import Row                  from '../../components/layout/row'
import Col                  from '../../components/layout/col'
import Card                 from '../../components/card/card.js'
import Header               from '../../components/partials/section_header.js'
import Container            from '../../components/layout/container'
// import Button               from '../../components/button/button'
import SearchField          from '../../components/search/search'
// import Modal                from '../../components/modals/modal'
// import Gallery              from '../../components/gallery/gallery'
// import Favourites           from '../../components/favourites/favourites'

//Actions
import * as actionCreators  from '../../store/actions/actions'


// API calls
import {ArticleFeed}        from '../../sdk/feed'

//Data
import {panels}             from '../section/data'

 class Search extends Component {
    

    state = {
        photos: [],
        waypoint: true
    }

    cardCount = 0;
    keyword = '';

    componentDidMount = () => {
        const params = new URLSearchParams(this.props.location.search);
        this.keyword = params.get('for'); // bar
        if (!this.keyword) return;
        this.performSearch();
    }

    componentDidUpdate() {
        const params = new URLSearchParams(this.props.location.search);
        const keyword = params.get('for'); // bar
        if (!keyword || keyword === this.keyword) return;
        this.keyword = keyword;
        this.performSearch();
    }

    searchResultsHandler = (term) => {
        this.keyword = term;
        this.props.history.push(window.basePath + '/search?for=' + this.keyword);
        this.performSearch();
    }


    performSearch = (offset = 0) => {

        if (offset === 0) {
            this.setState({photos: []});
        }

        const options = {
            offset,
            limit : 3,
            mediaSearch: this.keyword,
        };

        const search = new ArticleFeed(options);
        
        return search.fetch().then((r) => {
            let waypoint = true;
            // console.log(r.data);
            let photos = r.data.media.map((media) => {
                return {
                    id        : media.id,
                    url       : media.cdn_path,
                    guid      : media.guid,
                    type      : media.fileType,
                    width     : media.width,
                    height    : media.height,
                    filesize  : media.fileSize,
                }
            });
                        
            // no more photos but leave the ones that are there
            if (photos.length === 0 && options.offset > 0) {
                this.setState({waypoint: false});
                return;
            }

            // first search and no photos so remove all
            if (photos.length === 0) {
                this.setState({
                    waypoint: false
                });
                return;
            }


            // remove the waypoint but still render the photos it DID find
            if (photos.length < options.limit) {
                waypoint = false;
            }

            // this must be load more so add the photos to the list
            if (options.offset !== 0) {
                photos = this.state.photos.concat(photos);
            }

            

            this.setState({photos, waypoint});
        
        }).catch(() => {
            this.setState({photos: panels[1].feed[0].images});
        });
    }


    loadMore = () => {
        this.performSearch(this.cardCount);
    }


    render() {
        this.cardCount = 0;
        
        // const cartCount = (typeof this.props.cart       !== 'undefined') ? this.props.cart.length : 0;
        // const favCount  = (typeof this.props.favourites !== 'undefined') ? this.props.favourites.length : 0;

        return (


            <>

                {/* <Container>
                    
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
                            <SearchField searchHandler={this.searchResultsHandler} />
                        </Col>
                    </Row>

                </Container> */}



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
                                    
                                    const {favourite, cart} = this.props.photoStatusHandler(photo.id);
                                    this.cardCount++;
                                    
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

                            {(this.state.waypoint && this.state.photos.length > 0) &&
                                <Waypoint onEnter={this.loadMore} />
                            }

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

