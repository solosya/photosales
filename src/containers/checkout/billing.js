import React                from 'react'
import Row                  from '../../components/layout/row';
import Col                  from '../../components/layout/col';
import Header               from '../../components/partials/section_header.js';
import Checkbox             from '../../components/form/checkbox';
// import Blockspinner         from '../../components/spinners/BlockSpinner';

import styled, {css} from 'styled-components';

const billing = (props) => {

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

                        <Row>
                            <Col classes={["col-md-6"]}>
                                <FormLabel>First name</FormLabel>
                                <FormInput error={props.handleFindBillingErrors("firstname")} type="text" value={props.firstName} placeholder="First name" onChange={(e) => props.handleBillingForm(e.target.value, "firstname")} />
                                <ErrorLabel active={props.handleFindBillingErrors("firstname")}>This field is required</ErrorLabel>
                                
                                <FormLabel>Email address</FormLabel>
                                <FormInput error={props.handleFindBillingErrors("email")} type="email" value={props.email} placeholder="eg. johnsmith@gmail.com" onChange={(e) => props.handleBillingForm(e.target.value, "email")} />
                                <ErrorLabel active={props.handleFindBillingErrors("email")}>This field is required</ErrorLabel>

                                <FormLabel>Street address</FormLabel>
                                <FormInput error={props.handleFindBillingErrors("address")} type="text" value={props.address} placeholder="Street address" onChange={(e) => props.handleBillingForm(e.target.value, "address")} />
                                <ErrorLabel active={props.handleFindBillingErrors("address")}>This field is required</ErrorLabel>

                                <FormLabel>State</FormLabel>
                                <FormInput error={props.handleFindBillingErrors("state")} type="text" value={props.state} placeholder="State" onChange={(e) => props.handleBillingForm(e.target.value, "state")} />
                                <ErrorLabel active={props.handleFindBillingErrors("state")}>This field is required</ErrorLabel>

                            </Col>
                            <Col classes={["col-md-6"]}>
                                <FormLabel>Last name</FormLabel>
                                <FormInput error={props.handleFindBillingErrors("lastname")} type="text" value={props.lastName} placeholder="Last name" onChange={(e) => props.handleBillingForm(e.target.value, "lastname")} />
                                <ErrorLabel active={props.handleFindBillingErrors("lastname")}>This field is required</ErrorLabel>

                                <FormLabel>Phone number</FormLabel>
                                <FormInput error={props.handleFindBillingErrors("phone")} type="text" value={props.phone} placeholder="Home or mobile" onChange={(e) => props.handleBillingForm(e.target.value, "phone")} />
                                <ErrorLabel active={props.handleFindBillingErrors("phone")}>This field is required</ErrorLabel>

                                <FormLabel>Suburb</FormLabel>
                                <FormInput error={props.handleFindBillingErrors("suburb")} type="text" value={props.suburb} placeholder="Suburb" onChange={(e) => props.handleBillingForm(e.target.value, "suburb")} />
                                <ErrorLabel active={props.handleFindBillingErrors("suburb")}>This field is required</ErrorLabel>

                                <FormLabel>Postcode</FormLabel>
                                <FormInput error={props.handleFindBillingErrors("postcode")} type="text" value={props.postcode} placeholder="Postcode" onChange={(e) => props.handleBillingForm(e.target.value, "postcode")} />
                                <ErrorLabel active={props.handleFindBillingErrors("postcode")}>This field is required</ErrorLabel>

                            
                            </Col>

                        </Row>

                        
                        {/* <div style={{marginTop:'13px'}}> 

                            <Checkbox 
                                label="I am interested in receiving promotional offers from Sunraysia Daily" 
                                checked={props.promotion} 
                                onChange={props.handleFun}
                                name="promotion" />
                        </div> */}

                        <div style={{marginTop:'35px'}}> 
                            <Checkbox 
                                label="I accept the Photo Sales licensing Agreement terms of use" 
                                checked={props.licence} 
                                onChange={() => props.handleBillingForm(props.licence, "licence")}
                                name="promotion" />
                        </div>
                    </Col>
                </Row>

            </Col>
        </Row>
)
}




const FormLabel = styled.label`
    font-family: 'Roboto';
    display:block;
    font-size:16px;
    font-weight:500;
    color:black;
    margin-bottom:6px;
    margin-top:20px;
`

const FormInput = styled.input`
    font-family: 'Roboto';
    width:95%;
    padding:5px 10px;
    height:45px;
    border: solid 1px #e7e7e7;
    font-size:16px;
    color: #595859;
    ${props => props.error && css`
        border-color:#c51515;
    `}
    &:focus {
        outline:none;
        border-bottom: 1px solid #4573cd;
    }
`

const ErrorLabel = styled.p`
    display:none;
    position:absolute;
    font-family: 'Roboto';
    margin:0;
    color:red;
    font-style:italic;
    margin-top:3px;
    color:#c51515;
    font-size:16px;
    ${props => props.active && css`
        display:block;
    `}

`


export default billing
