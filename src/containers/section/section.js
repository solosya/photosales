// Libraries
import React, {Component}   from 'react'
import {connect}            from 'react-redux'
// import { Waypoint }         from 'react-waypoint'

//Components
import Col                  from '../../components/layout/col'
import Row                  from '../../components/layout/row'
import Card                 from '../../components/card/card.js'
import Header               from '../../components/partials/section_header.js'
import Button               from '../../components/button/button'
import Container            from '../../components/layout/container'

//Actions
import * as actionCreators  from '../../store/actions/actions'

// API calls
import {ArticleFeed}        from '../../sdk/feed'

//Data
// import {panels} from './data';


class Section extends Component {

    
    state = {
        title: "",
        galleries: [],
        waypoint: true,
    }

    cardCount = 0;
    section = null;


    componentDidMount () {
        if (this.props.section) {
            this.section = this.props.section;
            this.getFeed();
        }
        // this.getPanels();
        return;
    }

    // getPanels = () => {
    //     const panel = panels.filter((panel) => {
    //         return panel.title === this.props.title;
    //     });

    //     if (panel.length > 0) {
    //         this.setState({galleries: panel[0].feed}, () => {
    //             console.log(this.state);
    //         });

    //     }
    // }



    getFeed = (offset = 0) => {

        const options = {
            limit : 3,
            urlid : this.section,
            offset,
            non_pinned : offset,
            blogInfo: true
        };
        // console.log(options);
        const search = new ArticleFeed(options);
        
        return search.fetch().then((r) => {
            let waypoint = true;

            const title = r.data.blog.title;
            
            let galleries = r.data.articles.map((article) => {
                const media = article.featuredMedia;
                return {
                    id       : article.articleId,
                    date     : article.publishedDate,
                    title    : article.title,
                    content  : article.excerpt,
                    hasMedia : article.hasMedia,
                    images: [{
                        id       : media.id,
                        url      : media.media.url,
                        guid     : media.guid,
                        type     : media.fileType,
                        width    : media.width,
                        height   : media.height,
                        filesize : media.fileSize,
                    }]
                }
            });

            // console.log(galleries);
            
            // no more galleries but leave the ones that are there
            if (galleries.length === 0 && options.offset > 0) {
                this.setState({waypoint: false});
                return;
            }

            // first search and no galleries so remove all
            if (galleries.length === 0) {
                this.setState({
                    waypoint: false
                });
                return;
            }

            // remove the waypoint but still render the galleries it DID find
            if (galleries.length < options.limit) {
                waypoint = false;
            }

            // this must be load more so add the galleries to the list
            if (options.offset !== 0) {
                galleries = this.state.galleries.concat(galleries);
            }

            this.setState({galleries, waypoint, title});
        
        }).catch(() => {
            console.log("ERROR");
            // this.setState({galleries: panels[1].feed[0].images});
        });
    }


    loadMore = () => {
        this.getFeed(this.cardCount);
    }




    showGallery = (index) => {
        const gallery = this.state.galleries[index];
        this.props.cardHandler(gallery);
    }

    // loadMore = () => {
    //     const panel = panels.filter((panel) => {
    //         return panel.title === this.props.title;
    //     });
    //     const galleries = panel[0].feed;
    //     const more = this.state.galleries.concat(galleries);
    //     this.setState({galleries: more}, () => {
    //         console.log(this.state);
    //     });
    // }


    render() {
        this.cardCount = 0;

        const panels = [this.state.galleries.slice(0,8), this.state.galleries.slice(8,16)];

        const bottomGalleries = this.state.galleries.slice(16);
    
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
    

                    <Col classes={["col-12"]}>
                        {panels.map((panel, i) => {
                            return (
                                <Row key={i}>
                                    {panel.map((card, i) => {
                                        return (
                                    
                                            <Col key={i} classes={["col-12", "col-md-3"]} marginBottom="30px">
                                                <Card 
                                                    data        = {card} 
                                                    count       = {this.cardCount++}
                                                    panel       = {this.props.title}
                                                    cardHandler = {this.showGallery} 
                                                    styles      = {["card-1-mobile", "card-1-tablet", "card-1-desktop"]}
                                                />
                                            </Col>
                                        )
                                    })}
                                </Row>
                            )
                        })}
    
                            
                        <Row margin="30px" style={{backgroundColor:"orange"}}>
                            
                            { bottomGalleries.map( (card, i) => {

                            return (
                                    <Col key={i} classes={["col-12", "col-md-3"]} marginBottom="30px">

                                        <Card 
                                            data        = {card} 
                                            count       = {this.cardCount++}
                                            panel       = {this.props.title}
                                            cardHandler = {this.showGallery}
                                            styles      = {["card-1-mobile", "card-1-tablet", "card-1-desktop"]}
                                        />

                                    </Col>

                                )
                            }) }

                        </Row>
    
                        {/* {(this.state.waypoint && this.state.galleries.length > 0) &&
                                <Waypoint onEnter={this.loadMore} />
                            } */}

                        <Row margin="30px">
                            <Col classes={["col-12"]}>
                                <Button handler={this.loadMore} classes={["button", "button--red", "button--top-30"]}>Load more {this.cardCount}</Button>
                            </Col>
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
        // cart: state.cart,
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

export default connect(mapStateToProps, mapDispatchToProps)(Section);



