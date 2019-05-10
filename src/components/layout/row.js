import React   from 'react';
import classes from './row.module.scss';


const row = (props) => {
    return (
        <div  className={classes.row}>
            {props.children}
        </div>
    )
}

export default row;