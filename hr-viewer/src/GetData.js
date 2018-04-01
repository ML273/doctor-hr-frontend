import React from 'react';
import axios from 'axios';
//import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

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
      "email": "No email yet.",
      "heart_rate": ["No heart rate yet."],
      "heart_rate_times": ["No heart rate times yet."],
      "data": ["Nothing here"],
    };
  }

  //edit: trying to create table
  SimpleTable = (props) => {
    const { classes } = props;

    return(
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
    );
  }

    //end edit

  fetch = () => {
    axios.get("http://vcm-3502.vm.duke.edu:5000/api/heart_rate/ml273@duke.edu").then( (response) => {
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

//table
            <div>
                {withStyles(styles)(this.SimpleTable)}
            </div>
        </div>

    )
  }
}

//GetData.SimpleTable.propTypes = {
//classes: PropTypes.object.isRequired,
//};

export default GetData;
