import React   from 'react';
import classes from './row.module.scss';
// import cn                   from 'classnames';


const row = (props) => {

    let inline = {};

    if (props.margin) {
        inline = {marginTop: props.margin};
    }

    return (
        <div className={classes.row} style={inline}>
            {props.children}
        </div>
    )
}

export default row;