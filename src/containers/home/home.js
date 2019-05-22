import React, {Component}   from 'react';
import Row                  from '../../components/layout/row';
import Col                  from '../../components/layout/col';
import Container            from '../../components/layout/container';
import Search               from '../../components/search/search';
import Header               from '../../components/partials/section_header.js';
import {ArticleFeed}        from '../../sdk/feed';


class Section extends Component {

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
        ]
            
        
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

    getNetworkData = () => {
        return [];
    }
    getBlogData = () => {
        return [];
    }

    componentDidMount () {
        this.getFeed();
        this.getNetworkData();
        this.getBlogData();
    }


    render() {

        return (
            <Container>

                <Row>
                    <Col classes={["col-12"]}>
                        <Header blogData={this.state.blogData} larger cart/>
                    </Col>
                </Row>

                <Row>
                    <Col classes={["col-12", "col-md-9"]}>
                        <Search />
                    </Col>
                </Row>


                {this.state.panels.map( (panel) => {
                    return (
                        <Row key={panel.title}>
                            <Col classes={["col-12"]}>
                                <Header blogData={panel} />
                            </Col>
                        </Row>
                    )

                })}


            </Container>
        )
    }
}
// docker run -p 80:80 -v $(pwd):/var/www/html php:7.2-apache
export default Section;
