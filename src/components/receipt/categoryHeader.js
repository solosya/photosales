import React from 'react'
import styled from 'styled-components'



const header = ({children}) => {
    return (
        <Header>{children}</Header>
    )
}

const Header = styled.h2`
    margin-top:30px;
    margin-bottom:25px;
    font-weight:700;
    color: #213f9e;
    font-size: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid #595859;
`

export default header;