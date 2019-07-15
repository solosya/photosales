import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements';
import Row                  from '../../components/layout/row';
import Col                  from '../../components/layout/col';
import Header               from '../../components/partials/section_header.js';




class Payment extends Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
      }
    
    async submit(ev) {
        console.log('going to comlpete purchase now');
        let {token} = await this.props.stripe.createToken({name: "Name"});
        console.log(token);
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
                            <button onClick={this.submit}>Complete purchase</button>

                        </Col>
                    </Row>

                    
                    <div style={{marginBottom: '200px'}}></div>
                </Col>

            </Row>



        )
    } 
}



export default injectStripe(Payment);
