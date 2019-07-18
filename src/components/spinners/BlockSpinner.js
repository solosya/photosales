import React from 'react';
import styled, {css, keyframes} from 'styled-components';
// import "./BlockSpinner.module.scss";

const BlockSpinner = () => {
    return (
        <Outer>
            <Inner />
        </Outer>
    )
}

const keyframe = keyframes`
    0% {
        transform-origin: bottom left;
        transform: translate(-5px, -105px) rotate(0deg) scale(1.1);
    }
    25% {
        transform-origin: bottom left;
        transform: translate(-5px, -105px) rotate(-180deg) scale(1.1);
    }
    26% {
        transform-origin: top left;
        transform: translate(-5px, 105px) rotate(-180deg) scale(1.1);
    }
    50% {
        transform-origin: top left;
        transform: translate(-5px, 105px) rotate(-360deg) scale(1.1);
    }
    51% {
        transform-origin: top right;
        transform: translate(5px, 105px) rotate(-360deg) scale(1.1);
    }
    75% {
        transform-origin: top right;
        transform: translate(5px, 105px) rotate(-540deg) scale(1.1);
    }
    76% {
        transform-origin: bottom right;
        transform: translate(5px, -105px) rotate(-540deg) scale(1.1);
    }
    100% {
        transform-origin: bottom right;
        transform: translate(5px, -105px) rotate(-720deg) scale(1.1);
    }
`
const Outer = styled.div`
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);

`
const Inner = styled.div`
    --color: #5d62bd;
    width: 100px;
    height: 100px;
    background-color: var(--color);
    outline: 6px solid var(--color);
    outline-offset: -1px;
    transform: rotate(45deg) scale(0.5);

    &:before {
        content: '';
        display: block;
        width: 100px;
        height: 100px;
        background-color: var(--color);
        animation: ${keyframe} 2s infinite;
    }
`

export default BlockSpinner;
