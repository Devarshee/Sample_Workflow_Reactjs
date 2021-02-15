import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actionTypes from "../actions/actions";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";

const styles = {
  table: {
    minWidth: 650,
  },
  rowclr: {
    border: "1px solid #000000",
    backgroundColor: "#ced4da"
  },
  submitbtn: {
    backgroundColor: "#000000",
    color: "#fafafa",
    margin: "2px"
  },
  edit:{
    cursor: "pointer"
  }
};

class ViewVehicle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      id: undefined,
      vehicleid: undefined,
      make: {
        value: "",
        error: false,
        helperText: ""
      },
      model: {
        value: "",
        error: false,
        helperText: ""
      },
      year: {
        value: "",
        error: false,
        helperText: ""
      },
      status: {
        value: ""
      }
    }
    this.onUpdate = this.onUpdate.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onClickMarkSold = this.onClickMarkSold.bind(this);
  }

  handleClose = () => {
    this.setState({
      anchorEl: null,
      open: Boolean(null),
      id: Boolean(null) ? 'simple-popover' : undefined
    });
  };

  onInputChange(event) {
    this.setState({
      [event.target.name]: { value: event.target.value }
    });
  }

  async onClickMarkSold() {
    var obj = {
      id: this.state.vehicleid,
    }
    await this.props.markSoldVehicle(obj);

    this.setState({
      open: false
    });
    this.props.onStatusChangeClick();
  }

  onUpdate() {
    this.setState({ apiCall: true });
    if (this.state.make.value != ''
      && this.state.model.value != ''
      && this.state.year.value != ''
      && this.state.price.value != ''
    ) {
      var obj = {
        id: this.state.vehicleid,
        make: this.state.make.value,
        model: this.state.model.value,
        year: this.state.year.value,
        price: this.state.price.value
      }
      this.props.updateVehicles(obj);

      this.setState({
        open: false
      })
    }
  }
  componentDidMount() {
    this.props.fetchVehicles();
  }

  handleClick = (event, id) => {
    this.setState({
      anchorEl: event.currentTarget,
      open: Boolean(event.currentTarget),
      id: Boolean(event.currentTarget) ? 'simple-popover' : undefined
    });

    var currentVehicle = this.props.data ? this.props.data.filter(i => i['_id'] == id) : {};
    if (typeof currentVehicle[0] == 'object') {
      this.setState({
        vehicleid: id,
        make: {
          value: currentVehicle[0]['make']
        },
        model: {
          value: currentVehicle[0]['model']
        },
        year: {
          value: currentVehicle[0]['year']
        },
        price: {
          value: currentVehicle[0]['price']
        },
        status: {
          value: currentVehicle[0]['status']
        },
      })
    }
  }

  render() {
    const { data, classes } = this.props;
    return (
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow className={classes.rowclr}>
                <TableCell><b>No</b></TableCell>
                <TableCell><b>Make</b></TableCell>
                <TableCell><b>Model</b></TableCell>
                <TableCell><b>Year</b></TableCell>
                <TableCell><b>Price ($)</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.length > 0 ? data.map((row) => (
                <TableRow key={row.no} className={classes.rowclr}>
                  <TableCell>{row.no}</TableCell>
                  <TableCell>{row.make}</TableCell>
                  <TableCell>{row.model}</TableCell>
                  <TableCell>{row.year}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell><EditIcon name="Edit" className={classes.edit} onClick={(e) => this.handleClick(e, row._id)}>

                  </EditIcon></TableCell>
                </TableRow>
              )) :
                <TableRow className={classes.rowclr}>
                  <TableCell colSpan={7} align="center">No Record Found</TableCell></TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
        {
          this.state.open && (<Popover
            id={this.state.id}
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <div style={{ padding: "0.5em" }}>
              <form>
                <div style={{ padding: "0.5em" }}>
                  <Grid item>
                    <TextField
                      label="Make"
                      name="make"
                      type="text"
                      variant="outlined"
                      onChange={this.onInputChange}
                      value={this.state.make.value}
                      helperText={this.state.make.helperText}
                      error={this.state.make.error}
                      required
                    />
                  </Grid>
                </div>
                <div style={{ padding: "0.5em" }}>
                  <Grid item>
                    <TextField
                      label="Model"
                      name="model"
                      type="text"
                      variant="outlined"
                      onChange={this.onInputChange}
                      value={this.state.model.value}
                      helperText={this.state.model.helperText}
                      error={this.state.model.error}
                      required
                    />
                  </Grid>
                </div>
                <div style={{ padding: "0.5em" }}>
                  <Grid item>
                    <TextField
                      label="Year"
                      name="year"
                      type="number"
                      variant="outlined"
                      onChange={this.onInputChange}
                      value={this.state.year.value}
                      helperText={this.state.year.helperText}
                      error={this.state.year.error}
                      required
                    />
                  </Grid>
                </div>
                <div style={{ padding: "0.5em" }}>
                  <Grid item>
                    <TextField
                      label="Price"
                      name="price"
                      type="number"
                      variant="outlined"
                      onChange={this.onInputChange}
                      value={this.state.price.value}
                      helperText={this.state.price.helperText}
                      error={this.state.price.error}
                      required
                    />
                  </Grid>
                </div>
                <div style={{ padding: "0.5em" }}>
                  <Grid item>
                    {this.state.status.value == 'Sold'
                      ?
                      <Button
                        variant="contained"
                        type="submit"
                        className={classes.submitbtn}
                        disabled="true"
                      >
                        Mark As Sold
            </Button>
                      :
                      <Button
                        variant="contained"
                        type="submit"
                        className={classes.submitbtn}
                        onClick={this.onClickMarkSold}
                      >
                        Mark As Sold
  </Button>
                    }
                    <Button
                      variant="contained"
                      type="submit"
                      className={classes.submitbtn}
                      onClick={this.onUpdate}
                    >
                      Update
            </Button>
                  </Grid>
                  <Grid item>

                  </Grid>
                </div>
              </form>
            </div>
          </Popover>)
        }
      </div>
    )
  }
}


const mapStateToProps = props => {
  return {
    vehicleData: props.vehicle.newvehicle,
    vehicle: props.vehicle.vehicle,
    data: props.vehicle.vehicles,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchVehicles: () => dispatch({ type: actionTypes.FETCH_VEHICLE_REQUEST }),
    fetchVehicleById: (id) => dispatch({ type: actionTypes.FETCH_VEHICLE_BY_ID_REQUEST, id }),
    updateVehicles: (obj) => dispatch({ type: actionTypes.UPDATE_VEHICLE_REQUEST, obj }),
    markSoldVehicle: (obj) => dispatch({ type: actionTypes.MARK_SOLD_VEHICLE_REQUEST, obj }),
  };
};

export default (connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ViewVehicle)));