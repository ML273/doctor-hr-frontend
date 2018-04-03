import React from 'react';
import axios from 'axios';
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

//Note to self: you need to adapt textfield code into this file so that you can directly take the input from the text field and then use it for the URL!


var stylish = {
  "dataStyle": {
    "marginTop": "20px",
    "marginBottom": "20px",
    "color": "black",
  }
}

const styles = theme => ({
  // from materials.ui example, adjusted
  root: {
    width: '90%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


class GetData extends React.Component {
  constructor() {
    super();
    this.state = {
      "user_input": "",
      "email": "No email yet.",
      "heart_rate": ["No heart rate yet."],
      "heart_rate_times": ["No heart rate times yet."],
      "data": ["Nothing here"],
    };
  }
  
  retrieveText = (event) => {
    this.setState({"user_input": event.target.value});
  }
  
  onButtonClick = (event) => {
    console.log(this.state.user_input); //log current text content
  }

  fetch = () => {
    var url_base = "http://vcm-3502.vm.duke.edu:5000/api/heart_rate/ml273@duke.edu" 
    var total_url = url_base.concat(this.state.user_input)
    axios.get(total_url).then( (response) => {
      // will need to edit this to receive some kind of input from text field
      console.log(response);
      console.log(response.status);
      this.setState({
        "email": response.data.email,
        "heart_rate": response.data.heart_rate,
        "heart_rate_times": response.data.heart_rate_times,
        "data": response.data.children});
      })
  }

  render() {
    return (
        <div>
            <Button variant="raised" onClick={this.fetch}>
                Display Data
            </Button>

            <div style={stylish.dataStyle}>
                {this.state.data}
            </div>
            <div style={stylish.dataStyle}>
                {this.state.email}
            </div>
            <div style={stylish.dataStyle}>
                {this.state.heart_rate[0]} //how to display in table?
            </div>
            <div>
              //edit: trying to create table  This should be in render
                    <Paper className={classes.root}>
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow>
                            <TableCell numeric>Heart Rate (bpm)</TableCell>
                            <TableCell numeric>Time</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          return (
                            <TableRow>
                            <TableCell numeric>{this.data.heart_rate}</TableCell>
                            <TableCell numeric>{this.data.heart_rate_times}</TableCell>
                            </TableRow>
                          );
                        </TableBody>
                      </Table>
                    </Paper>
                  //end edit
                  )}
              </div>
          </div>

      )
    }
  }


  export default GetData;
