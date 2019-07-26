//Libraries
import React, {Component}   from 'react'
// import {withRouter}         from 'react-router'
// import axios                from 'axios'
// import qs                   from  'qs'
import cn                   from 'classnames'
// import Datepicker           from '../datepicker/datepicker'
import moment               from 'moment'

//Components
import Button               from '../button/button'

//Utils
// import {ArticleFeed}        from '../../sdk/feed'

//Styles
import styles               from './search.module.scss'
import formstyles           from '../../styles/form.module.scss'


class Search extends Component {
    
    today = moment();

    state = {
        search: null,
        calanders : [0,0,0,0],
        calanderDates: {
            today: this.today,
            lastWeek: moment().subtract(7, 'days')
        },
        dates: {
            published: null,
            taken: {
                start: null,
                end: null,
            }
        },
    }


    search = (search) => {
        this.setState({search}, () => {
            console.log(this.state);
        });
    }


    toggleCalander = (e, calander) => {
        if (e) { e.stopPropagation();}

        // Cache the current calander values, then turn all calanders off 
        // then toggle the orinal calander value
        const currentCalander =  this.state.calanders;
        const cal = [0,0,0,0];
        cal[calander -1] = !currentCalander[calander -1];
        this.setState({
            calanders: cal
        });
    }

    calanderSelect = (res, calander) => {
        const date = moment(res);
        const dates = {...this.state.dates};
        if ( calander === 1) {
            dates.published = date;
        }
        if ( calander === 2) {
            dates.taken.start = date;
        }
        if ( calander === 3) {
            dates.taken.end = date;
        }
        if ( calander === 4) {
            dates.taken.what = date;
        }

        this.setState({dates});
        this.toggleCalander(null, calander)

    }

    keyPressed = (e) => {
        // console.log(this.props);
        // console.log(this.state);
        if (e.key === "Enter") {
            this.props.searchHandler(this.state.search)
        }
    }

    render() {

        return (
            <div className={styles.search}>
                <div className="">
                    <input onKeyPress={this.keyPressed} value={this.props.search} onChange={(e) => this.search(e.target.value)} type="search" className={cn( formstyles['c-form__input'], formstyles['c-form__input--bordered'])} name="search" id="search" placeholder="Search" />
                    <span className={styles["search__icon"]}></span>
                </div>


                {/* <div className={styles.search__dates}>

                    <Datepicker 
                        index    = {1} 
                        toggle   = {this.toggleCalander}
                        today    = {this.state.calanderDates.today}
                        date     = {this.state.dates.published}
                        lastweek = {this.state.calanderDates.lastWeek}
                        handler  = {this.calanderSelect} 
                        status   = {this.state.calanders[0] ? "active" : null} label="Date published" 
                    />

                    <p className={styles.search__label}>Date photo taken</p>

                    <Datepicker 
                        index    = {2} 
                        toggle   = {this.toggleCalander}
                        today    = {this.state.calanderDates.today}
                        date     = {this.state.dates.taken.start}
                        lastweek = {this.state.calanderDates.lastWeek}
                        handler  = {this.calanderSelect} 
                        status   = {this.state.calanders[1] ? "active" : null} label="Date range from" 
                    />


                    <Datepicker 
                        index    = {3} 
                        toggle   = {this.toggleCalander}
                        today    = {this.state.calanderDates.today}
                        date     = {this.state.dates.taken.end}
                        lastweek = {this.state.calanderDates.lastWeek}
                        handler  = {this.calanderSelect} 
                        status   = {this.state.calanders[2] ? "active" : null} label="To" 
                    />


                </div> */}

                <Button handler={() => this.props.searchHandler(this.state.search) } classes={["button", "button--red", "button--top-30"]}>SEARCH</Button>

            </div>

        )
    }
}


export default Search


