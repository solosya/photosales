import React from 'react';
import styles from './modal.module.scss';

const modal = (props) => {

    return (

        <div id={props.name} className={styles.modal}> 
            <div id="dialog" className={styles.modal__window}> 
                <div className={styles.modal__container}> 
                    <div className={styles.modal__header}> 
                        <h2 className={styles.modal__title}>{props.title}</h2> 
                        <a className={styles.modal__close} href="javascript:;" onClick={props.closeHandler}></a> 
                    </div> 
                    <div id="dialogContent" className={styles['modal__content-window']}>
                        {props.children}
                    </div> 
                </div> 
            </div> 
        </div>

    )
}

export default modal;
