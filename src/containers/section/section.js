import React, {Component}   from 'react';
// import axios                from 'axios';
import Row from '../../components/layout/row';
import Col from '../../components/layout/col';
import Container from '../../components/layout/container';

import {ArticleFeed} from '../../sdk/feed';

class Section extends Component {

    
    fetchStuff = () => {
        const options = {
            offset          : 0,
            limit           : 10,
            blogid          : "b6d174e5-70d2-4274-900a-46632b9b3e56",
            non_pinned      : 0

        };
        const Feed = new ArticleFeed(options);
        const articles = Feed.fetch();
        console.log(articles);
        // return axios.get('/api/search?s=this')
        //     .then( response => {
        //         var data = response.data;
        //         console.log(data);
        //     }).catch( response => {
        //         // console.log(response);
        //     });

    }

    componentDidMount () {
        // this.fetchStuff();
    }


    render() {

        console.log(window._appJsConfig);
        return (
            <Container>
                <Row>
                    <Col classes={["col-12", "col-md-4"]}>
                        <p style={{"background-color":"green"}}>section</p>
                    </Col>
                </Row>
                <Row>
                    <Col classes={["col-12", "col-md-4"]}>
                        <p style={{"background-color":"cyan"}}><h1>Ahoy there!</h1></p>
                    </Col>
                    <Col classes={["col-12", "col-md-4"]}>
                        <p onClick={this.fetchStuff} style={{"background-color":"cyan"}}><h1>Fetch stuff!</h1></p>
                    </Col>

                </Row>

            </Container>
        )
    }
}
// docker run -p 80:80 -v $(pwd):/var/www/html php:7.2-apache
export default Section;
