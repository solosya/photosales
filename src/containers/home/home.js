//Libraries
import React, {Component}   from 'react';
import {connect}            from 'react-redux';
// import axios                from 'axios';
import {Route, Switch}      from 'react-router-dom';

//Routes
import Index                from '../section/index';
import Section              from '../section/section';


//Components
import Row                  from '../../components/layout/row';
import Col                  from '../../components/layout/col';
import Container            from '../../components/layout/container';
import Search               from '../../components/search/search';
import Header               from '../../components/partials/section_header.js';
import Modal                from '../../components/modals/modal';
import Gallery              from '../../components/gallery/gallery';
import Favourites           from '../../components/favourites/favourites';

//Helpers
import {ArticleFeed}        from '../../sdk/feed';

//Actions
// import * as actionTypes     from '../../store/actions/actions';
import * as actionCreators  from '../../store/actions/actions';


class Home extends Component {

    state = {
        networkData: null,
        blogData: {
            title: "Photo sales",
            url: "www.picturebooth.com",
            guid: "b6d174e5-70d2-4274-900a-46632b9b3e56",
        },
        photos: null,
        showGallery: false,
        showFavourites : false,
        selectedGallery: null,
    }
    
    componentDidMount = () => {
        this.props.fetchFavourites();

    }

    getFeed = (panel) => {
        const options = {
            offset          : 0,
            limit           : panel.artilceCount,
            urlid           : panel.blog,
            non_pinned      : 0
        };
        const Feed = new ArticleFeed(options);
        return Feed.fetch();
    }


    showGallery = (gallery) => {
        this.setState({
            selectedGallery: gallery,
            showGallery: true,
            showFavourites : false
        }, () => {
            console.log(this.state);
        });
        document.body.setAttribute('style', 'overflow: hidden;')
    }
    closeGallery = () => {
        this.setState({
            showGallery: false
        });
        document.body.removeAttribute('style', 'overflow: hidden;')
    }


    showFavourites = () => {
        if (this.props.favourites.length > 0) {
            this.setState({
                showFavourites : true,
                showGallery: false,
            });
            document.body.setAttribute('style', 'overflow: hidden;')
        }
    }
    closeFavourites = () => {
        this.setState({
            showFavourites: false
        });
        document.body.removeAttribute('style', 'overflow: hidden;')
    }

    checkFavouriteStatus = (photoid) => {

        const found = this.props.favourites.filter((item) => {
            return photoid === item.id;
        });
        if (found.length > 0) {
            return true;
        }
        return false;
    }

    checkCartStatus = (photoid) => {
        console.log(this.props.cart);
        const found = this.props.cart.filter((item) => {
            return photoid === item.id;
        });
        if (found.length > 0) {
            return true;
        }
        return false;
    }

    photoStatusHandler = (photoid) => {
        const favourite = this.checkFavouriteStatus(photoid);
        const cart = this.checkCartStatus(photoid);
        return {favourite, cart};
    } 


    render() {

        console.log("RENDERING HOME", this.props.favourites);

        const gallery = 
            <Modal 
                width        = "954px" 
                height       = "575px" 
                closeHandler = {this.closeGallery} 
                children     = { () => (
                    <Gallery 
                        id               = {this.state.selectedGallery.id}
                        gallery          = {this.state.selectedGallery} 
                        favouriteHandler = {this.props.toggleFavourite}
                        checkPhotoStatus = {this.photoStatusHandler}
                        cartHandler      = {this.props.toggleCart}
                    />
            )} >   
            </Modal>

        const favourites = 
            <Modal closeHandler={this.closeFavourites} children={ () => (
                <Favourites 
                    favourites  = {this.props.favourites}
                    favHandler  = {this.props.toggleFavourite}
                    cartHandler = {this.props.toggleCart}
                />
            )} >   
            </Modal>

            const cartCount = (typeof this.props.cart !== 'undefined') ? this.props.cart.length : 0;
            const favCount = (typeof this.props.favourites !== 'undefined') ? this.props.favourites.length : 0;
console.log("HOME RENDER", this.props.cart, cartCount);

        return (
            <React.Fragment>
                
                {this.state.showGallery     ? gallery : null}
                {this.state.showFavourites  ? favourites : null}

                <Container>
    
                    <Row>
                        <Col classes={["col-12"]}>
                            <Header 
                                title               = {this.state.blogData.title} 
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
                            <Search />
                        </Col>
                    </Row>
    
                </Container>

                <Switch>
                    <Route path={"/" + window.layoutTemplate + "/:section"} render={(props) => 
                        <Section {...this.state}
                            title={"Galleries"}
                            cardHandler={this.showGallery} 
                            linkHandler = {this.props.linkHandler}
                            feedHandler={this.getFeed}
                        /> 
                    } />

                    <Route path={"/" + window.layoutTemplate} render={(props) => 
                        <Index {...this.state} 
                            cardHandler={this.showGallery} 
                            linkHandler={this.props.linkHandler} 
                            feedHandler={this.getFeed}
                        />
                    } />
                    
                </Switch>


            </React.Fragment>


        )
    }
}



const mapStateToProps = state => {
    return {
        favourites : state.favourites,
        cart: state.cart,
        isLoggedIn: state.isLoggedIn
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleCart      : (photo) => dispatch( actionCreators.toggleCart(photo) ),
        toggleFavourite : (photo) => dispatch( actionCreators.toggleFavourite(photo) ),
        fetchFavourites : ()      => dispatch( actionCreators.fetchSaved() ),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
