import React   from 'react';
import classes from './container.module.scss';

const container = (props) => {
    return (
        <div  className={classes.container}>
            {props.children}
        </div>
    )
}

export default container;