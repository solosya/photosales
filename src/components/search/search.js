import React, {Component}   from 'react';
import cn                   from 'classnames';
import styles               from './search.module.scss';
import formstyles           from '../../styles/form.module.scss';
import moment               from 'moment';
import Button               from '../button/button';
import Datepicker           from '../datepicker/datepicker';
import {ArticleFeed}        from '../../sdk/feed';

class Search extends Component {
    
    today = new Date();

    state = {
        search: null,
        calanders : [0,0,0,0],
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


    search = () => {
        const options = {
            offset          : 0,
            limit           : 10,
            non_pinned      : 0,
            searchterm      : this.state.search,
        };

        const Feed = new ArticleFeed(options);
        const photos = Feed.fetch();
        this.setState({photos: photos});
    }


    searchTerm = (e) => {
        this.setState({search: e.target.value});
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

    render() {

        return (
            <div className={styles.search}>
                <div className="">
                    <input value={this.props.search} onChange={(e) => this.searchTerm(e)} type="search" className={cn( formstyles['c-form__input'], formstyles['c-form__input--bordered'])} name="search" id="search" placeholder="Search" />
                    <span className={styles["search__icon"]}></span>
                </div>


                <div className={styles.search__dates}>

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


                </div>

                <Button handler={this.search} classes={["button", "button--red", "button--top-30"]}>SEARCH</Button>

            </div>

        )
    }
}


export default Search


