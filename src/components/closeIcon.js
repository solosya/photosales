import React from 'react'
import styled, {css} from 'styled-components';

const closeIcon = (props) => {

    return (
        <Close {...props}/>
    )
}



const Close = styled.div`
    display:block;
    cursor:pointer;
    position:relative;
    width:35px;
    height: 35px;
    
    ${props => props.width && css`
        width: ${props.width};
    `}
    ${props => props.height && css`
        height: ${props.height};
    `}


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

export default closeIcon
