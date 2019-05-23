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
        photos: null,
        panels : [
            {
                title: "Galleries",
                url: "galleryurl"
            },
            {
                title: "Archive photos",
                url: "galleryurl"
            },
            {
                title: "All photos",
                url: "galleryurl"
            },
        ],
        showModal: false
            
        
    }
    

    componentDidMount () {
        this.getFeed();
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




    showModal = () => {
        console.log('in the card handler');
        this.setState({showModal: true});
    }
    closeModal = () => {
        console.log('in the card handler');
        this.setState({showModal: false});
    }


    render() {



        const modal = <Modal closeHandler={this.closeModal}><div>Hey look, i'm in the modal!!</div></Modal>

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
                            <PanelOne cardHandler={this.showModal} title={panel.title} cards={this.state.cards}></PanelOne>
                        </Container>
                    )
    
                })}





            </React.Fragment>


        )
    }
}
// docker run -p 80:80 -v $(pwd):/var/www/html php:7.2-apache
export default Home;
