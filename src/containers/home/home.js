import React, {Component}   from 'react';
import {connect}            from 'react-redux';
import Row                  from '../../components/layout/row';
import Col                  from '../../components/layout/col';
import Container            from '../../components/layout/container';
import Search               from '../../components/search/search';
import Header               from '../../components/partials/section_header.js';
import {ArticleFeed}        from '../../sdk/feed';
import PanelOne             from '../../components/panels/panel1';
import PanelTwo             from '../../components/panels/panel2';
import Modal                from '../../components/modals/modal';
import Gallery              from '../../components/gallery/gallery';
import Favourites           from '../../components/favourites/favourites';
import * as actionTypes     from '../../store/actions';



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
        selectedGallery: null,
        favourites:[],
        cart: [],
    }
    

    componentDidMount () {
        this.getFeed();
        this.getPanels();
    }

    getPanels = () => {
        const panels =  [
            {
                title: "Galleries",
                url: "galleryurl",
                blog: "Galleries",
                template: "panel1"
            },
            {
                title: "Archive photos",
                url: "galleryurl",
                blog: "Australia",
                template: "panel2"

            },
            {
                title: "All photos",
                url: "galleryurl",
                blog: "Business",
                template: "panel1"
            },
        ];


        panels.forEach((panel) => {
            panel.feed = [
                {
                    title: "cats and lego",
                    date: "25th February 2019",
                    images: [
                        {
                            id: 'j49fj3fgsdsgdf8rj',
                            title: "Cat",
                            content: "This is the body content which is very long as i want it to dot dot dot with an eillpsesssese so that i can see it's wokring and then celebrate a job well done",
                            publishDate: "23rd may 2000",
                            hasMedia: true,
                            image: "https://i.ytimg.com/vi/EuvTORWs244/maxresdefault.jpg"
                        },
                        {
                            id: 'lkiuygfyny66',
                            title: "Lego",
                            content: "Less writing for the second card",
                            publishDate: "24rd may 2000",
                            hasMedia: true,
                            image: "https://weburbanist.com/wp-content/uploads/2008/10/lego_art_1.jpg"
                        },
                        {
                            id: 'mjghjligm',
                            title: "Guitar!",
                            content: "Less writing for the second card",
                            publishDate: "24rd may 2000",
                            hasMedia: true,
                            image: "https://www.geekalerts.com/u/lego-guitar.jpg"
                        }

                    ]
                },
                {
                    title: "Prince",
                    date: "25th April 2010",
                    images: [
                        {
                            id: '6e5hfdghs5dt',
                            title: "Prince One",
                            content: "First image in another gallery",
                            publishDate: "23rd may 2000",
                            hasMedia: true,
                            image: "https://static.guim.co.uk/sys-images/Music/Pix/pictures/2011/6/3/1307115506503/Prince-performing-on-stag-007.jpg"
                        },
                        {
                            id: 'jkjjfddswyj',
                            title: "Prince Two",
                            content: "What's he been up to all these years",
                            publishDate: "24rd may 2000",
                            hasMedia: true,
                            image: "http://4.bp.blogspot.com/-lqsQusSni-Q/TnvzRGHOH_I/AAAAAAAAARg/sYebBSwumX4/w1200-h630-p-k-nu/prince-hohner-telecaster.jpg"
                        },
                        {
                            id: 'bgdsr44',
                            title: "Prince Three",
                            content: "Lelatlalala",
                            publishDate: "24rd may 2000",
                            hasMedia: true,
                            image: "https://images.uncyclomedia.co/uncyclopedia/en/thumb/d/df/Purple-Rain-Prince.jpg/400px-Purple-Rain-Prince.jpg"
                        }
                    ]
                },
                {
                    title: "David Bowie",
                    date: "25th April 2014",
                    images: [
                        {
                            id: 'j49fda4j38rj',
                            title: "Bowie One",
                            content: "This is the body content which is very long as i want it to dot dot dot with an eillpsesssese so that i can see it's wokring and then celebrate a job well done",
                            publishDate: "23rd may 2000",
                            hasMedia: true,
                            image: "https://www.simpleminds.com/wp-content/uploads/2016/02/bowie.jpg"
                        },
                        {
                            id: 'j49fj38rj',
                            title: "Bowie Two",
                            content: "Less writing for the second card",
                            publishDate: "24rd may 2000",
                            hasMedia: true,
                            image: "http://exclaim.ca/images/up-4bowie.jpg"
                        },
                        {
                            id: 'fsdbfht',
                            title: "Bowie Three",
                            content: "Less writing for the second card",
                            publishDate: "24rd may 2000",
                            hasMedia: true,
                            image: "http://img2-ak.lst.fm/i/u/arO/b35700b21cb147e280097ff6ec5e43e7"
                        }

                    ]
                }
            ]
        });
        // console.log(panels);
        this.setState({panels: panels});

    }

    getFeed = () => {
        const options = {
            offset          : 0,
            limit           : 10,
            blogid          : this.state.blogData.guid,
            non_pinned      : 0
        };
        const Feed = new ArticleFeed(options);
        const photos = Feed.fetch();

        this.setState({photos: photos});
    }

    checkoutLinkHandler = () => {
        this.props.history.push("/"+window.layoutTemplate + '/checkout/');
    }

    showGallery = (card, panelName) => {
        let selected = null;
        const panel = this.state.panels.find((panel) => {
            return panel.title === panelName;
        });
        if (panel) {
            selected = panel.feed[card];
        }

        this.setState({
            selectedGallery: selected,
            showGallery: true,
            showFavourites : false
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


    render() {


        const gallery = 
            <Modal closeHandler={this.closeGallery} children={gallery => (
                <Gallery 
                    panel            = {this.state.selectedGallery} 
                    favouriteHandler = {this.props.toggleFavourite}
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
                                title = {this.state.blogData.title} 
                                url   = {this.state.blogData.url}
                                favourites = {this.props.favourites.length}
                                cartItems = {this.props.cart.length}
                                favouritesHandler = {this.showFavourites}
                                checkoutLinkHandler = {this.checkoutLinkHandler}
                                homeLinkHandler = {null}
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

                {this.state.panels.map( (panel, i) => {

                    return (
                        <Container key={i}>

                            {panel.template === "panel1" ?
                                <PanelOne 
                                    cardHandler={this.showGallery} 
                                    title={panel.title} 
                                    cards={panel.feed}>
                                </PanelOne> :null}

                            {panel.template === "panel2" ?
                                <PanelTwo 
                                    cardHandler={this.showGallery} 
                                    title={panel.title} 
                                    cards={panel.feed}>
                                </PanelTwo> :null}


                        </Container>
                    )
    
                })}





            </React.Fragment>


        )
    }
}
// docker run -p 80:80 -v $(pwd):/var/www/html php:7.2-apache


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
