import React from 'react';
import axios from 'axios';
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

var stylish = {
  "dataStyle": {
    "marginTop": "20px",
    "marginBottom": "20px",
    "color": "black",
  },
  "text": {
    "marginTop": "20px",
    "marginBottom": "20px",
    "backgroundColor": "#E8E8E8",
  }
}

var errorStyle = {
  "errorProp": {
    "marginTop": "20px",
    "marginBottom": "20px",
    "color": "red",
  }
}

const styles = theme => ({
  // from materials.ui example, adjusted
  root: {
    width: '100%',
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
      "errorText": "",
      "email": "No email yet.",
      "heart_rate": ["No heart rate yet."],
      "heart_rate_times": ["No heart rate times yet."],
      "data": ["Nothing here"],
    };
  }
  
  retrieveText = (event) => {
    this.setState({"user_input": event.target.value})
    if (event.target.value.includes(" ")) {
      this.setState({"errorText": "Invalid email: No spaces are allowed!"})
        //don't forget to delete the minor insult. Clients would not be happy. 
    } else if (event.target.value.includes("@")) {
      this.setState({"errorText": ""})
    } else {
      this.setState({"errorText": "Invalid email: example@address"})
    }
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
        var hrViewData = [];
        for (var i = 0; i < this.state.heart_rate.length; i++) {
            hrViewData.push(
                <TableRow>
                    <TableCell> {this.state.heart_rate[i]} </TableCell>
                    <TableCell> {this.state.heart_rate_times[i]} </TableCell> 
                </TableRow>
            );
        }

    return (
        <div>
            <div style={stylish.dataStyle}>
                {this.state.data}
            </div>
            <div style={stylish.dataStyle}>
                Last email used: {this.state.email}
            </div>
            <div style={errorStyle.errorProp}>
                {this.state.errorText}
            </div>
            <div style={stylish.text}>
              Enter Email: 
              <TextField
                  value={this.state.user_input}
                  onChange={this.retrieveText}
              />
            </div>
            <Button color="primary" variant="raised" onClick={this.fetch}>
                Give Me Data
            </Button>
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
                            {hrViewData}
                        </TableBody>
                      </Table>
                    </Paper>
              </div>
          </div>
      )
    }
  }


  export default GetData;
