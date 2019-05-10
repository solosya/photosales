import React, {Component}   from 'react';
import axios                from 'axios';
import Row from '../../components/layout/row';
import Col from '../../components/layout/col';
import Container from '../../components/layout/container';
class Section extends Component {

    
    fetchStuff = () => {
        return axios.get('/api/search?s=this')
            .then( response => {
                var data = response.data;
                console.log(data);
            }).catch( response => {
                // console.log(response);
            });

    }

    componentDidMount () {
        this.fetchStuff();
    }


    render() {
        return (
            <Container>
                <Row>
                    <Col classes={["col-12", "col-md-4"]}>
                        <p style={{"background-color":"green"}}>section</p>
                    </Col>
                </Row>
            </Container>
        )
    }
}
// docker run -p 80:80 -v $(pwd):/var/www/html php:7.2-apache
export default Section;
