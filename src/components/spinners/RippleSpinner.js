import React from 'react'
import styled, { keyframes } from 'styled-components'

const RippleSpinner = () => {
    return (
        <Ripple>
            <div></div>
            <div></div>
        </Ripple>    
    )
}

const ripple = keyframes`
    from {
        transform: scale(0);
        opacity: 1;
    }

    to {
        transform: scale(1);
        opacity: 0;
    }

`


const Ripple = styled.div`
    width: 2.6rem;
    height: 2.6rem;
    margin: 2rem;

    div {
        position: absolute;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        border: 0.3rem solid #979fd0;
        animation: 1.5s ${ripple} infinite;

        &:nth-child(2) {
        animation-delay: 0.5s;
        }
    }
`

export default RippleSpinner
