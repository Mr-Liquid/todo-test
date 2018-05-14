import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {removeCall} from "../actions";
import moment from 'moment';

const styles ={
    container: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    tile: {
        padding: '5px',
        border: '1px solid #615b5b'
    }
};

class NextCall extends Component {

    constructor(props){
        super(props);
    }

    getNextCall(){
        let callId = this.props.calls.byId.find(item => {
            if(this.props.calls.byHash[item].time > moment().format('hh:mm')){
                return item;
            }
        });
        let call = !!this.props.calls.byHash ? this.props.calls.byHash[callId] : null;

        return(
            <div>
                {!!call && <div style={{border: '1px solid #000', padding: '10px'}}>
                    <h3>Next Call</h3>
                    <div style={styles.container}>
                        <div style={styles.tile}>
                            {call.name}
                        </div>
                        <div style={styles.tile}>
                            {call.phone}
                        </div>
                        <div style={styles.tile}>
                            {call.time}
                        </div>
                    </div>
                </div>}
            </div>
        );
    }

    render(){
        return(
            this.getNextCall()
        );
    }
}


function mapStateToProps(state) {
    return {
        calls: state.calls
    };
}


export default connect(mapStateToProps)(NextCall);