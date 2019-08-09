import React, { Component } from 'react'
import { withRouter }       from 'react-router'

import axios from 'axios'

// Components
import Row                          from '../../components/layout/row'
import Col                          from '../../components/layout/col'
import Container                    from '../../components/layout/container'


class Receipt extends Component {
    
    state = {
        order: null
    }
    
    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        const orderNumber = params.get('order'); // bar
        console.log(orderNumber);
        return axios.get('/api/order?number=' + orderNumber ).then((r) => {
            console.log(r);
        });

    }

    
    
    render() {
        return (
            <Container>
        
                <Row>
                    <Col classes={["col-12", "col-lg-8"]}>
                        <h1>Thank you!!!</h1>
                    </Col>
                </Row>
            </Container>

        )
    }
}



export default withRouter(Receipt);