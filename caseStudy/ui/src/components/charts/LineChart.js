import React from 'react';
import Highcharts from 'highcharts';

class LineChart extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // TODO
        // Create a highcharts line chart of your choosing (e.g. https://www.highcharts.com/demo/line-time-series for a demo).
        this.chart = Highcharts.chart('chart', {
            chart: {
                zoomType: 'x'
            },

            title: {
                text: 'Stock Price for Company over Time'
            },

            xAxis: {
                // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                //             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                type: 'datetime',
                // labels: {
                //     format: '{value:%Y-%b-%e}'
                // }
            },
            yAxis: {
                title: {
                    text: 'Prices'
                }
            },
            legend: {
                enabled: false
            },

            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                name: 'Prices',
                data: this.props.data
            }]
        });
        console.log("line constructor");
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(props) { //props.data is the content in the json file for one company
        console.log("New data received to redraw chart.");
        console.log(props.data);
        
        /**
         * TODO
         * Parse the data received from props, a Javascript object, to map to a Javascript array
         * required by the type of line chart chosen and set it in the series. Use Date.UTC(..)
         * to create the x-axis.
         */

        var data = new Array();
        if (props.data != undefined) {
            for (var i = 0; i < props.data.length; i++) {
                var dataPoint = props.data[i][0] ;
                let dataPointValue = parseInt(props.data[i][1]);
                
                console.log(dataPoint  );
                var splits = dataPoint.split("/");
                console.log(splits[2]);
                data.push([Date.UTC(splits[2], splits[1] - 1, splits[0])-79228800000, dataPointValue]); //TODO: fix later
            }
            console.log("gere");
            data.sort();
            console.log(data);
            this.chart.series[0].setData(data);

        }
        else
        {
            console.log("else");
        }

        
        
        
    }

    componentWillUnmount() {
        this.chart.destroy();
    }


    render() {
        return (
            <div id='chart'></div>
        )
    }
}

// Don't forget to export your component!
export default LineChart;