//Libraries
import React, {Component}   from 'react'
import styled               from 'styled-components'
// import cn                   from 'classnames'
// import Datepicker           from '../datepicker/datepicker'
import moment               from 'moment'

//Components
import Button               from '../button/button'


//Styles
// import styles               from './search.module.scss'
// import formstyles           from '../../styles/form.module.scss'


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
            // console.log(this.state);
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
            <SearchContainer data="searchcontainer">
                <SearchInput onKeyPress={this.keyPressed} value={this.props.search} onChange={(e) => this.search(e.target.value)} type="search"  name="search" id="search" placeholder="Search" />
                <SearchIcon />
                <Button handler={() => this.props.searchHandler(this.state.search) } classes={["button", "button--red"]}>SEARCH</Button>
            </SearchContainer>
        )
    }
}

const  SearchContainer = styled.div`
    position:relative;
    /* display: flex; */
    height:40px;
    margin-bottom:80px;
    display:none;
`

const SearchInput = styled.input`
    
    width:100%;
    padding: 0 0 0 12px;
    outline:0;
    font-size: 16px;
    transition: all .3s ease-out;
    -o-transition: all .3s ease-out;
    -ms-transition: all .3s ease-out;
    -moz-transition: all .3s ease-out;
    -webkit-transition: all .3s ease-out;
    line-height:40px;
    height:40px;
    border: 1px solid #e7e7e7;
    margin-right:20px;

`

const SearchIcon = styled.div`
    position: absolute;
    top: 8px;
    right: 150px;
    display:block;
    height: 24px;
    width: 24px;
    /* background: url('/images/search-icon.svg'); */
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNiIgaGVpZ2h0PSIyNiIgdmlld0JveD0iMCAwIDI2IDI2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjNTk1ODU5IiBzdHJva2Utd2lkdGg9IjIiPgogICAgICAgIDxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTTE4LjE3NiAxOC4xODRsNi43OTcgNi43OTgiLz4KICAgICAgICA8cGF0aCBkPSJNMjEuMTg3IDExLjA0N2MwIDUuNTMyLTQuNTIgMTAuMDE3LTEwLjA5NCAxMC4wMTdTMSAxNi41NzkgMSAxMS4wNDdDMSA1LjUxNSA1LjUxOSAxLjAzIDExLjA5MyAxLjAzYzUuNTc1IDAgMTAuMDk0IDQuNDg1IDEwLjA5NCAxMC4wMTd6Ii8+CiAgICA8L2c+Cjwvc3ZnPgo=");
    background-size:contain;
    background-repeat: no-repeat;
`

export default Search


