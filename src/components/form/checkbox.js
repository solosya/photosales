import React  from 'react'
import styled from 'styled-components';


const Checkbox = ({ className, checked, ...props }) => (
    <label style={{display:'block'}}>
        <CheckboxContainer className={className}>
            <HiddenCheckbox checked={checked} {...props} />
            <StyledCheckbox checked={checked}>
                <Icon viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="#4573cd" />
                </Icon>
            </StyledCheckbox>
        </CheckboxContainer>
        {props.label ? <Label> {props.label} </Label> : "" }
    </label>
)


const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    // Hide checkbox visually but remain accessible to screen readers.
    // Source: https://polished.js.org/docs/#hidevisually
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`


const Icon = styled.svg`
    fill: none;
    stroke: white;
    /* stroke-width: 2px; */
`


const StyledCheckbox = styled.div`
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid #979797;
    transition: all 150ms;
    ${HiddenCheckbox}:focus + & {
        box-shadow: 0 0 0 3px rgba(69, 115, 205, 0.1);
    }
    ${Icon} {
        visibility: ${props => props.checked ? 'visible' : 'hidden'}
    }

`

const CheckboxContainer = styled.div`
    /* display: inline-block; */
    vertical-align: middle;
    float:left;
    margin-right:12px;
`

const Label = styled.span`
    font-size: 15px;
    font-weight: bold;
    color: #595859;
`
export default Checkbox
