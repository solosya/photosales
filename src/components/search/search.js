import React, {Component} from 'react';
import cn         from 'classnames';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; 
import styles from './search.module.scss';
import formstyles from '../../styles/form.module.scss';
import moment from 'moment';


class Search extends Component {
    
    today = new Date();

    state = {
        calanders : [0,0,0],
        calanderDates: {
            today: this.today,
            lastWeek: new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 7)
        },
        dates: {
            published: null,
            taken: {
                start: null,
                end: null,
            }
        },
    }

    toggleCalander = (calander) => {
        const cal = [...this.state.calanders]
        cal[calander -1] = !cal[calander -1];
        this.setState({
            calanders: cal
        });
    }

    calanderSelect = (res, calander) => {
        console.log('chosen!!');
        console.log(res.toString());
        const dates = {...this.state.dates};
        if ( calander === 1) {
            dates.published = res;
        }
        if ( calander === 2) {
            dates.taken.start = res;
        }
        if ( calander === 3) {
            dates.taken.end = res;
        }
        this.setState({dates});
        this.toggleCalander(calander)

    }

    render() {

        return (
            <div className={styles.search}>
                <div className="">
                    <input type="search" className={cn( formstyles['c-form__input'], formstyles['c-form__input--bordered'])} name="search" id="search" placeholder="Search by keywords" />
                    <span className={styles["search__icon"]}></span>
                </div>
                <div onClick={() => this.toggleCalander(1)}>{this.state.dates.published ?  this.state.dates.published : "Date published"}</div>
                <div className={styles['search__calander-container']}>
                    {this.state.calanders[0] ? 
                        <InfiniteCalendar
                            width={350}
                            height={400}
                            selected={this.state.calanderDates.today}
                            disabledDays={[0,6]}
                            minDate={this.state.calanderDates.lastWeek}
                            onSelect={(res) => this.calanderSelect(res, 1)}
                        />
                        : null
                    }
                </div>
            </div>


        )    
    }
}


export default Search


