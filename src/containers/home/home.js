import React, {Component}   from 'react';
import Row                  from '../../components/layout/row';
import Col                  from '../../components/layout/col';
import Container            from '../../components/layout/container';
import Search               from '../../components/search/search';
import Header               from '../../components/partials/section_header.js';
import {ArticleFeed}        from '../../sdk/feed';
import PanelOne             from '../../components/panels/panel1';
import Modal                from '../../components/modals/modal';

class Home extends Component {

    state = {
        networkData: null,
        blogData: {
            title: "Picture Booth!",
            url: "www.picturebooth.com",
            guid: "b6d174e5-70d2-4274-900a-46632b9b3e56",
        },
        panels: [],
        photos: null,
        showModal: false
            
        
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
            },
            {
                title: "Archive photos",
                url: "galleryurl",
                blog: "Australia",
            },
            {
                title: "All photos",
                url: "galleryurl",
                blog: "Business",
            },
        ];


        panels.forEach((panel) => {
            panel.feed = [
                {
                    title: "hwllo world",
                    content: "This is the body content which is very long as i want it to dot dot dot with an eillpsesssese so that i can see it's wokring and then celebrate a job well done",
                    publishDate: "23rd may 2000",
                    hasMedia: true,
                    image: "https://i.ytimg.com/vi/EuvTORWs244/maxresdefault.jpg"
                },
                {
                    title: "Goodby world",
                    content: "Less writing for the second card",
                    publishDate: "24rd may 2000",
                    hasMedia: true,
                    image: "https://weburbanist.com/wp-content/uploads/2008/10/lego_art_1.jpg"
                },
                {
                    title: "Good News!",
                    content: "Less writing for the second card",
                    publishDate: "24rd may 2000",
                    hasMedia: true,
                    image: "https://www.geekalerts.com/u/lego-guitar.jpg"
                }

            ]
        });
        console.log(panels);
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




    showModal = (card, panelName) => {
        console.log(panel);
        console.log('in the card handler', card);
        let selected = null;
        const panel = this.state.panels.find((panel) => {
            return panel.title === panelName;
        });
        if (panel) {
            selected = panel.feed[card];
        }
        console.log(panel);

        this.setState({
            selectedCard: selected,
            showModal: true
        });
    }
    closeModal = () => {
        console.log('in the card handler');
        this.setState({showModal: false});
    }


    render() {


        console.log(this.state.selected);
        const modal = <Modal closeHandler={this.closeModal}><div>{this.state.selectedCard ? this.state.selectedCard.title : null}</div></Modal>

        return (
            <React.Fragment>
                
                {this.state.showModal ? modal : null}

                <Container>
    
                    <Row>
                        <Col classes={["col-12"]}>
                            <Header title={this.state.blogData.title} url={this.state.blogData.url} larger cart/>
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
                            <PanelOne 
                                cardHandler={this.showModal} 
                                title={panel.title} 
                                cards={panel.feed}>

                            </PanelOne>
                        </Container>
                    )
    
                })}





            </React.Fragment>


        )
    }
}
// docker run -p 80:80 -v $(pwd):/var/www/html php:7.2-apache
export default Home;
