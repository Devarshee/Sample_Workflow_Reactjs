import React from 'react';
import { connect } from "react-redux";
import * as actionTypes from "../actions/actions";
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";



const styles = theme => ({
    addbtn: {
        backgroundColor: "#ced4da",
        color: "#000000"
    },
    brdr: {
        borderStyle: "solid",
        borderColor: "#000000"
    },
    submitbtn: {
        backgroundColor: "#000000",
        color: "#fafafa"
    }
});
class AddVehicle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false,
            id: undefined,
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
            price: {
                value: "",
                error: false,
                helperText: ""
            },
            apiCall: false
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onRegister = this.onRegister.bind(this);
    }

    handleClick = (event) => {
        this.setState({
            anchorEl: event.currentTarget,
            open: Boolean(event.currentTarget),
            id: Boolean(event.currentTarget) ? 'simple-popover' : undefined
        });
    };

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

    onRegister() {
        this.setState({ apiCall: true });
        if (this.state.make.value != ''
            && this.state.model.value != ''
            && this.state.year.value != ''
            && this.state.price.value != ''
        ) {
            var obj = {
                make: this.state.make.value,
                model: this.state.model.value,
                year: this.state.year.value,
                price: this.state.price.value
            }
            this.props.addVehicles(obj);
            this.setState({
                open: false
            })
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button
                    className={classes.addbtn}
                    aria-describedby={this.state.id} onClick={this.handleClick}
                    variant="contained">
                    Add New Vehicle
            </Button>
                <Popover
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
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        className={classes.submitbtn}
                                        onClick={this.onRegister}
                                    >
                                        Submit
            </Button>
                                </Grid>
                            </div>
                        </form>
                    </div>
                </Popover>
            </div>
        )
    }
}

const mapStateToProps = props => {
    return {
        vehicleData: props.vehicle.newvehicle,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        addVehicles: (obj) => dispatch({ type: actionTypes.ADD_VEHICLE_REQUEST, obj }),
    };
};

export default (connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(AddVehicle)));