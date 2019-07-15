import React                from 'react'
import Row                  from '../../components/layout/row';
import Col                  from '../../components/layout/col';
import Header               from '../../components/partials/section_header.js';
import Checkbox             from '../../components/form/checkbox';



import styled, {css} from 'styled-components';

const billing = (props) => {



    console.log(props);
    return (
        <Row margin="50px">
            <Col classes={["col-12", "col-lg-8"]}>

                <Row>
                    <Col classes={["col-12"]}>
                        <Header 
                            title="Billing address"
                            thin
                            medium
                        />

                        <p>Fields marked with an * are required.</p>

                        <Row>
                            <Col classes={["col-md-6"]}>
                                <FormLabel>First name*</FormLabel>
                                <FormInput type="text" value={props.firstName} placeholder="First name" onChange={(e) => props.handleBillingForm(e.target.value, "firstname")} />

                                <FormLabel>Email address*</FormLabel>
                                <FormInput type="email" value={props.email} placeholder="eg. johnsmith@gmail.com" onChange={(e) => props.handleBillingForm(e.target.value, "email")} />
                                
                                <FormLabel>Street address*</FormLabel>
                                <FormInput type="text" value={props.street} placeholder="Street address" onChange={(e) => props.handleBillingForm(e.target.value, "address")} />
                                
                                <FormLabel>State*</FormLabel>
                                <FormInput type="text" value={props.state} placeholder="State" onChange={(e) => props.handleBillingForm(e.target.value, "state")} />

                            </Col>
                            <Col classes={["col-md-6"]}>
                                <FormLabel>First name*</FormLabel>
                                <FormInput type="text" value={props.lastName} placeholder="Last name" onChange={(e) => props.handleBillingForm(e.target.value, "lastname")} />

                                <FormLabel>Email address*</FormLabel>
                                <FormInput type="text" value={props.phone} placeholder="Home or mobile" onChange={(e) => props.handleBillingForm(e.target.value, "phone")} />
                                
                                <FormLabel>Street address*</FormLabel>
                                <FormInput type="text" value={props.suburb} placeholder="Suburb" onChange={(e) => props.handleBillingForm(e.target.value, "suburb")} />
                                
                                <FormLabel>State*</FormLabel>
                                <FormInput type="text" value={props.postcode} placeholder="Postcode" onChange={(e) => props.handleBillingForm(e.target.value, "postcode")} />
                            
                            
                            </Col>

                        </Row>
                        <div style={{marginTop:'13px'}}> 

                        <Checkbox label="I am interested in receiving promotional offers from Sunraysia Daily" checked={props.promotion} name="promotion"  />
                        </div>
                        <div style={{marginTop:'13px'}}> 

                        <Checkbox label="I accept the Photo Sales licensing Agreement terms of use" checked={props.promotion} name="promotion"  />
                        </div>
                    </Col>
                </Row>

            </Col>
        </Row>
)
}




const FormLabel = styled.label`
    display:block;
    font-size:16px;
    margin-bottom:6px;
`

const FormInput = styled.input`
    width:100%;
    padding:5px 10px;
    height:35px;
    border: solid 1px #e7e7e7;
    margin-bottom:20px;
    font-size:16px;
    color: #595859;

`
export default billing
