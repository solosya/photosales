//Libraries
import React, {Component}   from 'react'
import {connect}            from 'react-redux'
import {withRouter}         from 'react-router'
import {Route, Switch}      from 'react-router-dom'

//Routes
import Index                from '../section/index'
import Section              from '../section/section'

//Components
import Row                  from '../../components/layout/row'
import Col                  from '../../components/layout/col'
import Modal                from '../../components/modals/modal'
import Header               from '../../components/partials/section_header.js'
import Search               from '../../components/search/search'
import Gallery              from '../../components/gallery/gallery'
import Container            from '../../components/layout/container'
import Favourites           from '../../components/favourites/favourites'
import SearchContainer      from '../search/search'

//Helpers
import {ArticleFeed}        from '../../sdk/feed'

//Actions
import * as actionCreators  from '../../store/actions/actions'


class Home extends Component {

    state = {
        showGallery: false,
        showFavourites : false,
        selectedGallery: null,
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

    searchResultsHandler = (term) => {
        this.props.history.push(window.basePath + '/search?for=' + term);
    }

    showGallery = (gallery) => {
        this.setState({
            selectedGallery: gallery,
            showGallery: true,
            showFavourites : false
        }, () => {
            console.log(this.state);
        });
        document.body.setAttribute('style', 'overflow: hidden;height:100%;')
    }
    closeGallery = () => {
        this.setState({
            showGallery: false
        });
        document.body.removeAttribute('style', 'overflow: hidden;height:100%;')
    }


    showFavourites = () => {
        if (this.props.favourites.length > 0) {
            this.setState({
                showFavourites : true,
                showGallery: false,
            });
            document.body.setAttribute('style', 'overflow: hidden;height:100%;')
        }
    }
    closeFavourites = () => {
        this.setState({
            showFavourites: false
        });
        document.body.removeAttribute('style', 'overflow: hidden;height:100%;')
    }

    photoStatusHandler = (photoid) => {
        return this.props.photoStatusHandler(photoid, this.props.favourites, this.props.cart);
    } 


    render() {

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
                    cart        = {this.props.cart}
                    favHandler  = {this.props.toggleFavourite}
                    cartHandler = {this.props.toggleCart}
                    photoStatusHandler = {this.photoStatusHandler}
                />
            )} >   
            </Modal>

        const cartCount = (typeof this.props.cart !== 'undefined') ? this.props.cart.length : 0;
        const favCount = (typeof this.props.favourites !== 'undefined') ? this.props.favourites.length : 0;

        return (
            <React.Fragment>
                
                {this.state.showGallery     ? gallery : null}
                {this.state.showFavourites  ? favourites : null}

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
                            <Search searchHandler={this.searchResultsHandler} />
                        </Col>
                    </Row>
    
                </Container>


                <Switch>


                    <Route path={window.basePath + "/search"} render={ () => 
                        <SearchContainer 
                                linkHandler={this.linkHandler}
                                photoStatusHandler={this.photoStatusHandler} 
                        />
                    } />



                    <Route path={window.basePath + "/:section"} render={(props) => 
                        <Section {...this.state}
                            section     = {this.props.match.params.section}
                            cardHandler = {this.showGallery} 
                            linkHandler = {this.props.linkHandler}
                        /> 
                    } />

                    <Route path={window.basePath} render={(props) => 
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
        cart        : state.cart,
        pageTitle   : state.pageTitle,
        favourites  : state.favourites,
        isLoggedIn  : state.isLoggedIn,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleCart      : (photo) => dispatch( actionCreators.toggleCart(photo) ),
        toggleFavourite : (photo) => dispatch( actionCreators.toggleFavourite(photo) ),
        fetchFavourites : ()      => dispatch( actionCreators.fetchSaved() ),
    }

}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Home) );
