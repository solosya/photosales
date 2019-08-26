import React from 'react'

const admin = (props) => {

    const editUrl = props.data.data.editUrl;
    const pinStyle = props.data.data.isPinned === 1 ? " selected" : "";

    return (
        <div className="btn_overlay articleMenu">
            
            {/* HIDE BUTTON */}
            {/* <button title           = "Hide" 
                    className       = "btnhide social-tooltip HideBlogArticle" 
                    type            = "button" 
                >
                <i className        = "fa fa-eye-slash"></i><span className="u-display-none">Hide</span>
            </button> */}




            {/* EDIT BUTTON */}
            <button 
                    onClick     = {(e) => { e.stopPropagation(); window.open(editUrl, '_blank'); return false;}} 
                    title       = "Edit" 
                    className   = "btnhide social-tooltip" 
                    type        = "button" >
                <i className    = "fa fa-edit"></i><span className="u-display-none">Edit</span>
            </button>
            
        
            {/* PIN BUTTON */}
            {props.data.pinCard &&
                <button onClick     = {(e) => props.pin(e, props.data)}
                        title       = "Pin" 
                        className   = {`btnhide social-tooltip PinArticleBtn ${pinStyle}`}
                        type        = "button" 
                    >
                    <i className    = "fa fa-thumb-tack"></i><span className="u-display-none">Pin</span>
                </button>
            }
        </div>   
    )
}

export default admin




