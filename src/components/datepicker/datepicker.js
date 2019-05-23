import React from 'react';
import styles from './datepicker.module.scss';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; 

const datepicker = (props) => {
    console.log("datepicker updating");
    return (
        <div className={styles.datepicker}>
            <div onClick={(e) => props.toggle(e, props.index)}>{props.date ?  props.date.format('Do MMM YY') : props.label}</div>
            <div className={styles.datepicker__calander_container}>
                
                {props.status === "active" ? 
                    <InfiniteCalendar
                        width={350}
                        height={400}
                        selected={props.today}
                        disabledDays={[0,6]}
                        minDate={props.lastWeek}
                        onSelect={(res) => props.handler(res, props.index)}
                    />
                    : null
                }
            </div>
        </div>
    );

}


export default datepicker;
