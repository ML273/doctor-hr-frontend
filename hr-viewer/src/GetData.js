import React from 'react';
import axios from 'axios';
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

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
  
  fetch = () => {
    var url_base = "http://vcm-3502.vm.duke.edu:5000/api/heart_rate/" 
    var total_url = url_base.concat(this.state.user_input)
    axios.get(total_url).then( (response) => {
      console.log(response);
      console.log(response.status);
      this.setState({
        "email": response.data.email,
        "heart_rate": response.data.heart_rate,
        "heart_rate_times": response.data.heart_rate_times,
        "data": response.data.children});
      console.log(this.state.user_input); //log current text content
      })
  }

  render() {
    return (
        <div>
            <Button variant="raised" onClick={this.fetch}>
                Display Data
                <div>
                        <Paper className={styles.root}>
                          <Table className={styles.table}>
                            <TableHead>
                              <TableRow>
                                <TableCell numeric>Heart Rate (bpm)</TableCell>
                                <TableCell numeric>Time</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                <TableCell numeric>{this.state.heart_rate}</TableCell>
                                <TableCell numeric>{this.state.heart_rate_times}</TableCell>
                                </TableRow>
                            </TableBody>
                          </Table>
                        </Paper>
                  </div>
            </Button>

            <div style={stylish.dataStyle}>
                {this.state.data}
            </div>
            <div style={stylish.dataStyle}>
                {this.state.email}
            </div>
            <div style={stylish.dataStyle}>
                {this.state.heart_rate[0]} 
            </div>
            <TextField
                value={this.state.user_input}
                onChange={this.retrieveText}/>
          </div>
      )
    }
  }


  export default GetData;
