import React, {Component} from 'react'


import {CardElement, injectStripe} from 'react-stripe-elements'
import Row                  from '../../components/layout/row'
import Col                  from '../../components/layout/col'
import Header               from '../../components/partials/section_header.js'
import Button               from '../../components/button/button'
import RippleSpinner        from '../../components/spinners/RippleSpinner'




class Payment extends Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.state = {
            pending: false
        }
    }
    
    async submit(ev) {
        let {token} = await this.props.stripe.createToken({name: "Name"});
        this.props.handleSubmit(token);
    }


    render() {

        return (

            <Row margin="50px">
                <Col classes={["col-12", "col-lg-8"]}>

                    <Row>
                        <Col classes={["col-12"]}>
                            <Header 
                                title="Payment"
                                thin
                                medium
                            />
                            <CardElement />

                            {this.props.status === 'pending' && <RippleSpinner />}
                            {this.props.status !== 'pending' && <Button handler={this.submit} classes={["button", "button--red", "button--top-30"]}>Complete purchase</Button>}

                        </Col>
                    </Row>

                    
                    <div style={{marginBottom: '200px'}}></div>
                </Col>

            </Row>



        )
    } 
}



export default injectStripe(Payment);
