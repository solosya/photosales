//Libraries
import React from 'react'
import styled       from 'styled-components';

//Components
import Button       from '../button/button';

const guest = (props) => {
    return (
        <GuestContainer>
            <Title>Checkout as a guest</Title>
            <Par>Welcome, you don’t need to have an account to purchase images.</Par>
            <Par>If you have an account please log in to have ongoing access to download your images and review your purchase history.</Par>
            <Button handler={props.guestHandler} classes={["button", "button--red", "button--top-30", "button--center"]}>CHECK OUT AS GUEST</Button>
        </GuestContainer>
)
}


const GuestContainer = styled.div`
    box-sizing: border-box;
    height: 385px;
    border: 1px solid #e7e7e7;
    padding:35px;
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

const Par = styled.p`
    color: #595859;
    font-size: 15px;
    text-align:center;
    line-height: 1.67;
    margin:0 20px;
    margin-bottom:25px;

    &:last-of-type {
        margin-bottom:80px;
    }
`


export default guest
