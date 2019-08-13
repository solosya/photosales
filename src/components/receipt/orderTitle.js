import React from 'react'
import styled from 'styled-components'

const orderTitle = ({children}) => {
    return (
        <Title>
            {children}
        </Title>
    )
}

const Title = styled.h1`
    font-size: 30px;
    font-weight:300;
    margin-bottom: 25px;
`

export default orderTitle
