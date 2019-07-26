//Libraries
import React                from 'react'
import styled, {css}        from 'styled-components';

//Components
import Button               from '../button/button';


const login = (props) => {

    return (
        <LoginContainer>
            <Title>Returning as a subscriber</Title>

            <FormLabel>Email</FormLabel>
            <FormInput error="" type="text" value={props.username} placeholder="eg. johnsmith@gmail.com" onChange={(e) => props.formHandler(e.target.value, "username")} />
            <ErrorLabel active="">This field is required</ErrorLabel>


            <FormLabel>Password</FormLabel>
            <FormInput error="" type="password" value={props.password} placeholder="" onChange={(e) => props.formHandler(e.target.value, "password")} />
            <ErrorLabel active="">This field is required</ErrorLabel>
            <Forgot onClick={props.renderForgotHandler}>Forgot password?</Forgot>
            <Button handler={props.loginHandler} classes={["button", "button--red", "button--top-30", "button--center"]}>CONTINUE TO CHECKOUT</Button>
        </LoginContainer>
    )
    
}

const Forgot = styled.p`
    margin-top:10px;
    font-size:10px;
    color: rgba(89, 88, 89, 0.7);
    &:hover {
        cursor:pointer;
    }
`

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

export default login;
