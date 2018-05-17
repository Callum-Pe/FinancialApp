/**
 * Copyright 2018 Goldman Sachs.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import LineChart from './charts/LineChart';

class Charts extends React.Component {
    loadOpts(stock,me) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            console.log("here6");
           console.log(this.responseText);
           const g = JSON.parse(this.response);
           console.log(g['a']);
            me.setState({data : g['a']});
            console.log("pls")
            console.log(me.state.data);
        }
        };
        xhttp.open("GET", "http://gsee.pythonanywhere.com/hard/"+stock+"?start=2%2f7%2f2018&end=5%2f4%2f2018", true);
        xhttp.send();
      }
    constructor(props) {
        super(props);
        this.state = {
            /**
             * TODO
             * Initialize a state object to store a JavaScript object returned from the helper method.
             * It can be initialized to be empty.
             */
            data:{a:"b"}
        };
        this.componentWillMount(this.props);

    }

    componentWillReceiveProps(props) { //props.data is the content in the json file for one company
        console.log(this.props);
        console.log("entry");
    this.componentWillMount(this.props);
}
    componentWillMount(nextProps) {
        console.log("Calling helper method to fetch data from service.");
        this.dataSourceHelper(nextProps);
    }

    dataSourceHelper(props) {
        console.log("helper" );
        console.log(props) ;

        props = props || this.props;
        console.log(props.stock) ;
        this.loadOpts(props.stock, this);
        }
    
    render() {
        console.log("submit");
        console.log(this.state.data);
        return (
        < LineChart data={this.state.data}/>);
    }
}

export default Charts