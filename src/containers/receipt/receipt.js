import React, { Component } from 'react'
import {connect}            from 'react-redux'

import { withRouter }       from 'react-router'
import styled, {css}        from 'styled-components'

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
import RippleSpinner        from '../../components/spinners/RippleSpinner'


class Receipt extends Component {
    
    state = {
        order: null,
    }
    
    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        const orderNumber = params.get('order'); // bar

        return axios.get('/api/order?number=' + orderNumber ).then((order) => {
            for (let item of order.data.items) {
                item.photo.url = item.photo.path.replace('/upload/', '/upload/c_fill,dpr_auto,f_auto,fl_lossy,g_faces:auto,q_auto,w_500,h_340/');
            }
            this.setState({order: order.data});
        }).catch(() => {
            // console.log("error getting order");
        });

    }

    
    
    render() {

        if (this.state.order === null ) return (
            <SpinnerContainer>
                <RippleSpinner width="80px" height="80px" />
            </SpinnerContainer>
        )
        
        // #007bff
        let color = false;
        if (this.props.themeColor) {
            color = this.props.themeColor;
        }
    


        const printPhotos = this.state.order.items.filter((photo) => {
            return photo.text_field1 === 'print';
        });

        const digitalPhotos = this.state.order.items.filter((photo) => {
            return photo.text_field1 === 'digital';
        });


        const print = printPhotos.map((p) => {
            return <Print data={p} />
        });


        const digi = digitalPhotos.map((p) => {
            return <Digital color={color} data={p} />
        });


        const deliveryLink = window.location.origin + '/photo-sales-orders';
        const faqLink      = window.location.origin + '/faq';
        const contactLink  = window.location.origin + '/contact-us';

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
                            <strong><a style={{color:"black"}} href={deliveryLink} target="_blank" rel="noopener noreferrer" >Click here for photo reprint delivery times.</a></strong>
                        </Contact>


                        {print.length > 0 && <CategoryHeader color={this.props.themeColor}>Prints</CategoryHeader>}
                        {print}
                        {digi.length > 0 && <CategoryHeader color={this.props.themeColor}>Digital downloads</CategoryHeader>}
                        {digi}
                        

                        <Total>Total ${(this.state.order.total/100).toFixed(2)} (incl. GST)</Total>



                        <Contact>If you have any questions about your order please visit the 
                            <Link color={color} href={faqLink} target="_blank" rel="noopener noreferrer"> FAQ</Link> page or 
                            <Link color={color} href={contactLink} rel="noopener noreferrer"> contact us here.</Link>
                        </Contact>
                    </Col>


                </Row>
            </Container>

        )
    }
}


const SpinnerContainer = styled.div`
    display:flex;
    justify-content:center;
    margin-top:60px;
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

const Link = styled.a`
    ${props => props.color && css`
        color: ${props.color};
    `}
`

const mapStateToProps = state => {
    return {
        themeColor: state.themeColor
    }
};


export default withRouter( connect(mapStateToProps)(Receipt) );
