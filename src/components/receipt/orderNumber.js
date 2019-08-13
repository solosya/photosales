import React from 'react'
import styled from 'styled-components'

const orderNumber = ({children}) => {
    return (
        <Number>
            {children}
        </Number>
    )
}

const Number = styled.p`
    font-size: 18px;
    font-weight:500;
    margin-bottom: 20px;
`

export default orderNumber
