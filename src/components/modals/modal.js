import React from 'react';
import styled, {css} from 'styled-components';

const modal = (props) => {


    
    return (

        <Modal id={props.name}> 
            <Window id="dialog" {...props}> 
                <Container> 
                    <Header> 
                        <Title>{props.title}</Title> 
                        <Close onClick={props.closeHandler}></Close> 
                    </Header> 
                    <ContentWindow id="dialogContent">
                        {props.children()}
                    </ContentWindow> 
                </Container> 
            </Window> 
        </Modal>

    )
}


const Modal = styled.div`
    display:flex;
    position:fixed;
    top:0;
    width:100%;
    height:100%;
    z-index:1001;
    background: rgba(0,0,0,0.7);
`

const Window = styled.div`
    margin: auto auto;
    width:880px;
    max-height: 80%;
    background:white;
    padding:30px 35px 30px 35px;
    border-radius:3px;
    overflow:auto;
    
    @media screen and (min-width : 768px) and (max-width : 991px) {
        max-width:90%;
    }


    @media screen and (max-width :767px) {
        width:auto;
        max-width:90%;
        padding:20px 18px 20px 18px;

    }

    ${props => props.width && css`
        width: ${props.width}
    `}
    ${props => props.height && css`
        height: ${props.height}
    `}
`

const Container= styled.div`
    position:relative;
    margin:auto;
    height:100%;
`

const Header = styled.h1`
    margin:0;
    overflow:auto;
`

const Title = styled.div`
    font-size: 18px;
    text-align:center;
    font-weight: 700;
    margin-bottom:20px;
    position:absolute;
`
const ContentWindow = styled.div`
    height:100%;
`

const Close = styled.div`
    display:block;
    cursor:pointer;
    position:absolute;
    top:0;
    right:0;

    width: 35px;
    height: 35px;

    &:before, &:after {
        content:'';
        position:absolute;
        width:100%;
        height:1px;
        background-color:#595859;
        top:50%;
    }
    &:before {
        -webkit-transform:rotate(45deg);
        -moz-transform:rotate(45deg);
        transform:rotate(45deg);
    
    }
    &:after {
        -webkit-transform:rotate(-45deg);
        -moz-transform:rotate(-45deg);
        transform:rotate(-45deg);
    }

    
`

// ${props => props.borderTop && css`
// border-top: 1px solid #595859;
// padding-top: 10px;
// margin-top:33px;
// `}

export default modal;
