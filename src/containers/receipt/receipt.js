import React, { Component } from 'react'
import { withRouter }       from 'react-router'
import styled               from 'styled-components'

import axios                from 'axios'

// Components
import Row                  from '../../components/layout/row'
import Col                  from '../../components/layout/col'
import Container            from '../../components/layout/container'
import Digital              from '../../components/receipt/digital'
import Print                from '../../components/receipt/print'
import CategoryHeader       from '../../components/receipt/categoryHeader'
import OrderTitle           from '../../components/receipt/orderTitle'
import OrderNumber          from '../../components/receipt/orderNumber'
class Receipt extends Component {
    
    state = {
        order: null
    }
    
    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        const orderNumber = params.get('order'); // bar
        console.log(orderNumber);
        return axios.get('/api/order?number=' + orderNumber ).then((order) => {
            console.log(order);
            this.setState({order: order.data});
        }).catch(() => {
            console.log("error getting order");
        });

    }

    
    
    render() {
        if (this.state.order === null ) return <h1>no order info yet</h1>


        console.log(this.state);
        const printPhotos = this.state.order.items.filter((photo) => {
            console.log(photo);
            return photo.text_field1 === 'print';
        });

        const digitalPhotos = this.state.order.items.filter((photo) => {
            console.log(photo);
            return photo.text_field1 === 'digital';
        });
        console.log(digitalPhotos);
        console.log(printPhotos);


        const print = printPhotos.map((p) => {
            return <Print data={p} />
        });


        const digi = digitalPhotos.map((p) => {
            return <Digital data={p} />
        });



        return (
            <Container>
                <Row>
                    <Col classes={["col-12", "col-lg-3"]}>
                        <p>Your Photo Sales order is now complete</p>
                    </Col>


                    <Col classes={["col-12", "col-lg-6"]}>
                        <OrderTitle>Order number</OrderTitle>
                        <OrderNumber>{this.state.order.order_number}</OrderNumber>
                        <Contact>
                            Order information will be sent to {this.state.order.email} <br />
                            <strong>Click here for photo reprint delivery times. </strong>
                        </Contact>


                        {print.length > 0 && <CategoryHeader>Prints</CategoryHeader>}
                        {print}
                        {digi.length > 0 && <CategoryHeader>Digital downloads</CategoryHeader>}
                        {digi}
                        

                        <Total>Total ${(this.state.order.total/100).toFixed(2)}</Total>


                        <Contact>If you have any questions about your order please visit the <a href="#">Photo Sales FAQ</a> page or <a href="#">contact us here.</a></Contact>
                    </Col>


                </Row>
            </Container>

        )
    }
}

const Delivery = styled.p`
    font-weight:600;
`
const Total = styled.p`
    font-size:18px;
    font-weight:700;
    margin-bottom:40px;
    padding-top:25px;
    border-top: 1px solid #595859;
`

const Contact = styled.p`
    font-size:15px;
    font-weight:400;
    line-height:1.67;
`


export default withRouter(Receipt);