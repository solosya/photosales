import React, {Component}   from 'react';
import axios                from 'axios';

class Section extends Component {

    
    fetchStuff = () => {
        return axios.get('/api/search?s=this')
            .then( response => {
                var data = response.data;
                console.log(data);
            }).catch( response => {
                // console.log(response);
            });

    }

    componentDidMount () {
        this.fetchStuff();
    }


    render() {
        return (
            <p>section</p>
        )
    }
}

export default Section;
