//Libraries
import React                from 'react'
import styled, {css}        from 'styled-components';

//Components
import Button               from '../button/button';


const forgot = (props) => {

    return (
        <LoginContainer>
            <Title>Set password</Title>

            <FormLabel>Email</FormLabel>
            <FormInput error="" type="text" value={props.email} placeholder="eg. johnsmith@gmail.com" onChange={(e) => props.formHandler(e.target.value, "email")} />
            <Button handler={props.forgotHandler} classes={["button", "button--red", "button--top-30", "button--center"]}>SEND EMAIL</Button>
        </LoginContainer>
    )
    
}


const LoginContainer = styled.div`
    box-sizing: border-box;
    height: 385px;
    background: rgba(231,231,231, 0.6);
    padding:35px;
    padding-left:50px;
`

const Title = styled.h2`
    font-family: 'Roboto';
    font-size: 20px;
    color: black;
    font-weight:700;
    text-align:center;
    margin:0;
    margin-bottom:7px;
`

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
    box-sizing:border-box;
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

export default forgot;
