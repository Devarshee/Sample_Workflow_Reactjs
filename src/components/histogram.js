import React from 'react';
import { Bar } from 'react-chartjs-2';

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    title: {
        height: "270px",
        width: "350px",
        backgroundColor: "white",
        borderStyle: "inset",
        borderRadius: "4px",
        margin:"6px",
        display: "inline-block"
    }
});


class Histogram extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.title}>
                <Bar
                    data={this.props.cntStatus}
                    width={300}
                    height={250}
                    options={{
                        responsive: false,
                        maintainAspectRatio: false
                    }}
                />
            </div>
        );
    }
}

export default (withStyles(styles)(Histogram))