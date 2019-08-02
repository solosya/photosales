// Libraries
import React, {Component}   from 'react'
import {connect}            from 'react-redux'
import axios                from 'axios'
import qs                   from 'querystring'
// import { Waypoint }         from 'react-waypoint'
import {NotificationContainer, NotificationManager} from 'react-notifications'

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

//Styles
import 'react-notifications/lib/notifications.css';

//Data
import {panels} from './data';


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
        this.getPanels();
        return;
    }

    getPanels = () => {
        const panel = panels.filter((panel) => {
            return panel.title === this.props.title;
        });

        if (panel.length > 0) {
            this.setState({galleries: panel[0].feed}, () => {
                // console.log(this.state);
            });

        }
    }



    getFeed = (offset = 0) => {

        const options = {
            limit : 12,
            urlid : this.section,
            offset,
            non_pinned : offset,
            blogInfo: true
        };
        const galleries = new ArticleFeed(options);
        
        return galleries.fetch().then((r) => {
            // console.log(r);
            let waypoint = true;

            const title = r.data.blog ? r.data.blog.title :  "Section";
            
            let galleries = r.data.articles.map((article) => {
                const media = article.featuredMedia;
                return {
                    id          : article.articleId,
                    date        : article.publishedDate,
                    title       : article.title,
                    content     : article.excerpt,
                    editUrl     : article.editUrl,
                    isPinned    : parseInt( article.isPinned ),
                    pinnedAt    : parseInt( article.pinnedAt ),
                    publishDate : article.publishDate,
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
        
        }).catch((e) => {
            console.log("ERROR", e);
            this.setState({galleries: panels[1].feed[0].images});
        });
    }

    swapCards = (params) => {
        const original = [...this.state.galleries];
        const updated  = [...this.state.galleries];

        const gallery1 = updated[params.sourcePosition];
        const gallery2 = updated[params.destinationPosition];
        updated[params.sourcePosition] = gallery2;
        updated[params.destinationPosition] = gallery1;
        this.setState({galleries:updated}, () => {
        });

        axios.post('/home/swap-article', qs.stringify(params)).then((r) => {
            NotificationManager.success('Galleries swapped', 'Success', 2000);
        }).catch((e) => {
            NotificationManager.error('Could not swap galleries', 'Error', 5000);
            this.setState({galleries:original});
        });

    }

    pinCard = (params) => {
        const galleries = [...this.state.galleries];
        const gallery = { ...galleries[params.position -1] };

        axios.post('/home/pin-article', qs.stringify(params)).then((r) => {
            gallery.isPinned = +!gallery.isPinned;
            galleries[params.position -1] = gallery;

            this.setState({galleries});
            NotificationManager.success('Gallery pinned', 'Success', 2000);
        }).catch((e) => {
            NotificationManager.error('Could not pin gallery', 'Error', 5000);
        });

    }

    loadMore = () => {
        this.getFeed(this.cardCount);
    }




    showGallery = (index) => {
        console.log(index);
        const gallery = this.state.galleries[index -1];
        this.props.cardHandler(gallery);
    }


    

    render() {
        this.cardCount = 0;

        const panels = [this.state.galleries.slice(0,8), this.state.galleries.slice(8,16)];

        const bottomGalleries = this.state.galleries.slice(16);
    
        return (
            <Container style={{minHeight:"600px"}}>
                <NotificationContainer/>
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
                                                    count       = {++this.cardCount}
                                                    panel       = {this.props.title}
                                                    cardHandler = {this.showGallery}
                                                    swapCards   = {this.swapCards}
                                                    pinCard     = {this.pinCard}
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
                                            swapCards   = {this.swapCards}
                                            pinCard     = {this.pinCard}
                                            styles      = {["card-1-mobile", "card-1-tablet", "card-1-desktop"]}
                                        />

                                    </Col>

                                )
                            }) }

                        </Row>
    

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



