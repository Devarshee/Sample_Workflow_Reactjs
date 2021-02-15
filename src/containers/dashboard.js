import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import ViewVehicle from "../components/viewVehicle";
import * as actionTypes from "../actions/actions";
import SearchVehicle from "../components/searchVehicle";
import Histogram from "../components/histogram";

const styles = theme => ({
    title: {
        fontSize: "50px",
        color: "white",
        
    },
    invtry: {
        color: "#000000"
    },
    brdr: {
        border: "1px solid #000000",
        backgroundColor:"#ced4da"
    },
    chart: {
        height: "200px",
        width: "200px"
    },
    titlebar:{
        backgroundColor:"black"
    },
    sidebar:{
        backgroundColor:"#787878"
    }
});

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearchUser: false,
            searchVal: ''
        };
        this.onClickMarkSold = this.onClickMarkSold.bind(this);
    }

    handleOnChangeSearchbar = e => {
        this.setState({
            searchVal: e.target.value,
        });
        this.props.fetchSearchVehicle(e.target.value);
    };
    onClickMarkSold() {
        this.props.countVehicleStatus();
    }
    componentDidMount() {
        this.props.countVehicleStatus();
    }

    render() {

        const { classes, cntStatus } = this.props;
        return (
            <Grid container >
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={1} className={classes.brdr}>
                            <FormLabel className={classes.invtry}><b>Inventory</b></FormLabel>
                        </Grid>
                        <Grid item xs={11}>
                            <Grid container>
                                <Grid item xs={12} className={classes.titlebar}>
                                    <FormLabel className={classes.title}>Dashboard</FormLabel>
                                </Grid>

                                <Grid item xs={12} className={classes.brdr}>
                                    {cntStatus != null && <Histogram cntStatus={cntStatus}></Histogram>}
                                </Grid>
                                <Grid item xs={12}>
                                    <div>
                                        <div>
                                            <SearchVehicle
                                                onChange={this.handleOnChangeSearchbar}
                                            />
                                        </div>
                                        <div>
                                            <ViewVehicle onStatusChangeClick={this.onClickMarkSold}></ViewVehicle>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = props => {
    return {
        vehicleData: props.vehicle.vehicles,
        cntStatus: props.vehicle.statusCnt
    };
};

const mapDispatchToProps = dispatch => {

    return {
        fetchSearchVehicle: (id) => dispatch({ type: actionTypes.FETCH_SEARCH_VEHICLE_REQUEST, id }),
        countVehicleStatus: () => dispatch({ type: actionTypes.COUNT_VEHICLE_STATUS_REQUEST }),
    };
};

export default (connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Dashboard)));