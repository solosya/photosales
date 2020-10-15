import React from 'react'
import styled, {css} from 'styled-components'


const header = ({children, color}) => {

    if (!color) {
        color = "#213f9e";
    }


    return (
        <Header color={color}>{children}</Header>
    )
}

const Header = styled.h2`
    margin-top:30px;
    margin-bottom:25px;
    font-weight:700;
    font-size: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid #595859;

    ${props => props.color && css`
        color: ${props.color};
    `}


`

export default header;