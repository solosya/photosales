//Libraries
import React, {Component}   from 'react';
import {connect}            from 'react-redux';
import axios                from 'axios';
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
// import PanelOne             from '../../components/panels/panel1';
// import PanelTwo             from '../../components/panels/panel2';
import Modal                from '../../components/modals/modal';
import Gallery              from '../../components/gallery/gallery';
import Favourites           from '../../components/favourites/favourites';

//Helpers
import {ArticleFeed}        from '../../sdk/feed';

//Actions
import * as actionTypes     from '../../store/actions/actions';

//Data
import {panels} from './data';

class Home extends Component {

    state = {
        networkData: null,
        blogData: {
            title: "Photo sales",
            url: "www.picturebooth.com",
            guid: "b6d174e5-70d2-4274-900a-46632b9b3e56",
        },
        panels: [],
        photos: null,
        showGallery: false,
        showFavourites : false,
        selectedGallery: null,
        cart: [],
    }
    

    componentDidMount () {
        this.getPanels();
        return;
        this.getThemeConfig().then( (r) => {
            const pages = r.data.data.page;
            const pagePanels = pages.photos || null;
            if (!pagePanels) return;

            pagePanels.sections.map( (panel, i) => {
                
                this.getFeed(panel).then( r => {
                    let feed = r.data.articles.map(article => {
                        const media = article.featuredMedia;
                        return {
                            id: article.articleId,
                            title: article.title,
                            content: article.excerpt,
                            date: article.publishedDate,
                            hasMedia: article.hasMedia,
                            images: [{
                                id: media.id,
                                height: media.height,
                                width: media.width,
                                filesize: media.fileSize,
                                type: media.fileType,
                                url: media.media.url
                            }]
                        }
                    });

                    panel.feed = feed;
                    const panels = [...this.state.panels, panel];

                    this.setState({
                        panels
                    }, () => {
                        console.log(this.state.panels);
                    });

                });

            });


        });

    }

    getThemeConfig = () => {
        return axios.get('/api/theme/get-config');
    }

    getPanels = () => {
        this.setState({panels: panels}, () => {
            console.log(this.state);
        });
    }

    getFeed = (panel) => {
        const options = {
            offset          : 0,
            limit           : panel.artilceCount,
            // blogid          : this.state.blogData.guid,
            title           : panel.blog,
            non_pinned      : 0
        };
        const Feed = new ArticleFeed(options);
        return Feed.fetch();
    }

    // linkHandler = (page) => {
    //     if (typeof page === 'undefined') page = "";
    //     this.props.history.push("/"+window.layoutTemplate + page);
    // }

    showGallery = (card, panelName) => {
        console.log('showGallery');
        console.log(card, panelName);
        let selected = null;
        const panel = this.state.panels.find((panel) => {
            return panel.title === panelName;
        });
        console.log(panel);
        if (panel) {
            selected = panel.feed[card];
        }
        console.log(selected);
        this.setState({
            selectedGallery: selected,
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
        console.log('checking favourite status', photoid);
        console.log(this.props.favourites);

        const found = this.props.favourites.filter((item) => {
            return photoid === item.id;
        });
        if (found.length > 0) {
            return true;
        }
        return false;
    }

    checkCartStatus = (photoid) => {
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
        // console.log("GALLERY", this.state.selectedGallery);
        const gallery = 
            <Modal 
                width        = "954px" 
                height       = "575px" 
                closeHandler = {this.closeGallery} 
                children     = {gallery => (
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
            <Modal closeHandler={this.closeFavourites} children={favourites => (
                <Favourites 
                    favourites  = {this.props.favourites}
                    favHandler  = {this.props.toggleFavourite}
                    cartHandler = {this.props.toggleCart}
                />
            )} >   
            </Modal>


        return (
            <React.Fragment>
                
                {this.state.showGallery     ? gallery : null}
                {this.state.showFavourites  ? favourites : null}

                <Container>
    
                    <Row>
                        <Col classes={["col-12"]}>
                            <Header 
                                title               = {this.state.blogData.title} 
                                favourites          = {this.props.favourites.length}
                                cartItems           = {this.props.cart.length}
                                linkHandler         = {this.props.linkHandler}
                                favouritesHandler   = {this.showFavourites}
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
                    <Route path={"/" + window.layoutTemplate} render={(props) => 
                        <Index {...this.state} cardHandler={this.showGallery} linkHandler={this.props.linkHandler} />
                    } />
                    
                    <Route path={"/" + window.layoutTemplate + "/:section"} render={() => 
                        <Section linkHandler={this.props.linkHandler} /> 
                    } />
                </Switch>







            </React.Fragment>


        )
    }
}



const mapStateToProps = state => {
    return {
        favourites : state.favourites,
        cart: state.cart
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleFavourite: (photo) => {
            dispatch({type:actionTypes.TOGGLE_FAVOURITE, photo})
        },
        toggleCart: (photo) => dispatch({type:actionTypes.TOGGLE_CART, photo})
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
