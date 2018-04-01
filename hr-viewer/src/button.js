import React from 'react';
import axios from 'axios';
import Button from 'material-ui/Button';

var styles = { //hold onto attributes for how you want data to look below
    "dataStyle": {
        "marginTop": "20px", //names of these keys mean something specific in react
        "marginBottom": "20px", //every css property can apply in react..
        "color": "blue", //for css property, margin-bottom (but just turn in CamelCase)
    }
}

class FetchData extends React.Component {
    constructor() {
        super(); //super class for constructor
        this.state = {
          "data": ["Nothing yet"], //turn into an array to avoid some problem with string -> array when rendering
        }
    }

    getData = () => { //fcn parameters in (), body in {}
        axios.get("http://adpl.suyash.io/api/sites").then( (response) => { //define server
            // use gunicorn to deploy the heart rate server in cloud...vcm.vcm-3502.vm.duke.edu
            // vcm-3502.vm.duke.edu/
            // what will the response be? Because we wrote the server, we should know what the output is
            // wrote fcn within .then() which says what to do after get
            console.log(response);
            console.log(response.status); // log new data
            this.setState({"data": response.data}); // update state instead of "Nothing yet"
            // call function once you get
            // this is part of axios api
        })
    }
    render() {
        return (
            <div>
                <Button variant="raised" onClick={this.getData}>
                    Get Data
                </Button>
                <div style={styles.dataStyle}> // move data display in a different place by creating its own mini div
                // also, call on styles.dataStyle from above var to change the style
                    {this.state.data[0]} //just display first part of the array from Suyash's site
                </div>
            </div>
        )
    }
}

export default FetchData;
    
