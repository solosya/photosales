import React   from 'react';
import classes from './container.module.scss';
console.log(classes);

const container = (props) => {
    return (
        <div  className={classes.container}>
            {props.children}
        </div>
    )
}

export default container;