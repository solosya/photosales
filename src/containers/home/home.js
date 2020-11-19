//Libraries
import React, {Component}   from 'react'
import {connect}            from 'react-redux'
import {withRouter}         from 'react-router'
import {Route, Switch}      from 'react-router-dom'

//Routes
import Index                from '../section/index'
import Section              from '../section/section'
import SingleGallery        from '../section/singlegallery'

//Components
import Row                  from '../../components/layout/row'
import Col                  from '../../components/layout/col'
import Search               from '../../components/search/search'
import Container            from '../../components/layout/container'
import SearchContainer      from '../search/search'
// import ContactText          from '../../components/partials/contact'

//Helpers
import {ArticleFeed}        from '../../sdk/feed'

//Actions
import * as actionCreators  from '../../store/actions/actions'


class Home extends Component {

    
    getFeed = (panel) => {
        const options = {
            offset          : 0,
            limit           : panel.artilceCount,
            urlid           : panel.blog,
            non_pinned      : 0,
            blogInfo        : true
        };
        const Feed = new ArticleFeed(options);

        return Feed.fetch();
    }

    
    searchResultsHandler = (term) => {
        this.props.history.push(window.basePath + '/search?for=' + term);
    }



    photoStatusHandler = (photoid) => {
        return this.props.photoStatusHandler(photoid);
    } 


    render() {

        return (
            <React.Fragment>
                
                <Container data-container="container">
    
                    <Row>
                        <Col classes={["col-12", "col-md-9"]} data-search="searchCol">
                            {/* <ContactText /> */}
                            <Search color={this.props.color} searchHandler={this.searchResultsHandler} />
                        </Col>
                    </Row>
    
                </Container>


                <Switch>


                    <Route path={window.basePath + "/search"} render={ () => 
                        <SearchContainer 
                            linkHandler        = {this.linkHandler}
                            showGallery        = {this.props.showGallery} 
                            photoStatusHandler = {this.photoStatusHandler} 
                        />
                    } />

                    <Route path={window.basePath + "/single-gallery/:id"} render={() => {
                        return <SingleGallery {...this.state}
                            galleryId   = {this.props.match.params.id}
                            gallery     = {this.props.gallery}
                            showGallery = {this.props.showGallery} 
                            linkHandler = {this.props.linkHandler}
                            admin       = {this.props.admin}
                            checkPhotoStatus    = {this.props.checkPhotoStatus}
                        /> 
                    } }/>


                    <Route path={window.basePath + "/:section"} render={() => 
                        <Section {...this.state}
                            section     = {this.props.match.params.section}
                            showGallery = {this.props.showGallery} 
                            linkHandler = {this.props.linkHandler}
                            admin       = {this.props.admin}
                        /> 
                    } />

                    <Route path={window.basePath} render={() => 
                        <Index {...this.state} 
                            showGallery = {this.props.showGallery} 
                            linkHandler = {this.props.linkHandler} 
                            feedHandler = {this.getFeed}
                            admin       = {this.props.admin}
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
        color       : state.themeColor,
        admin       : state.admin
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
