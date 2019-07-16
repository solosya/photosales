import React      from 'react';
import styles     from './button.module.scss';
import cn         from 'classnames';

const button = (props) => { 
    const id = props.id || null;
    const type = props.type || null;
    let classes = props.classes || [];
    classes = classes.map((clas) => {
        return styles[clas] ? styles[clas] : false;
    });

    return <button onClick={props.handler} id={id} className={cn( classes )} type={type}>{props.children}</button>
}

export default button;