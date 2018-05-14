import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {addCall} from "../actions";

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    wrapper: {
        display: 'flex',
        border: '1px solid #000',
        padding: '10px',
        flexDirection: 'column'
    },
    container: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridColumnGap: '16px'
    },
    input: {
        width: '100%',
        padding: '6px 8px',
        boxSizing: 'border-box'
    },
    button: {
        maxWidth: '50px',
        marginTop: '15px',
        alignSelf: 'flex-end'
    }
};

function uniqueId() {
    return 'id_' + Math.random().toString(36).substr(2, 16);
}

class AddCall extends Component {

    constructor(props){
        super(props);
        this.state = {
            errors: [],
            name: '',
            phone: '',
            time: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.addCallHandler = this.addCallHandler.bind(this);
    }

    errorMessage(target) {
        const found = this.state.errors.find((e) => {
            return e.target === target;
        });
        return found ? found.message : '';
    }

    removeError(error) {
        const remainingErrors = this.state.errors.filter((e) => e.target !== error.target);
        this.setState({errors: remainingErrors});
    }

    addError(error) {
        const i = this.state.errors.findIndex(e => e.target === error.target);
        if (i < 0) {
            this.setState({errors: this.state.errors.concat(error)});
        }
    }

    validateFixedLength(target, value, required) {
        if (value && value.length > required) {
            return {target: target, isValid: false, message: `String mustn't be more than ${required} characters`};
        } else {
            return {target: target, isValid: true};
        }
    }

    validatePhoneNumber(target, value) {
        let pattern = /^(00|\+)\(?\d{3}\)?[- ]?\d{3}[ ]?\d{3}[ ]?\d{3}$/;
        if(value && pattern.test(value)){
            return {target: target, isValid: true};
        }else {
            return {target: target, isValid: false, message: `Please enter a valid phone number`};
        }
    }

    formatPnoneNumber(value){
        let modifiedVal = value.replace(/^\+/g, '00').replace(/\D/g,''),
            length = modifiedVal.length,
            groups = [],
            x = 0;

        let num = modifiedVal.split('').reverse();

        while( x < length / 3) {
            if(x === 0){
                groups[x] = num.splice(-4, 4).reverse().join('');
            }else {
                groups[x] = num.splice(-3, 3).reverse().join('');
            }
            x++;
        }

        if( groups.length > 3 ){
            groups[3] = groups[3].concat( groups.splice( 4 - groups.length, 1 ) );
        }

        return groups.join(' ');
    }

    addCallHandler(){
        this.props.addCall(
            {
                name: this.state.name,
                phone: this.formatPnoneNumber(this.state.phone),
                time: this.state.time
            },
            uniqueId()
        );
        this.setState({
            name: '',
            phone: '',
            time: ''
        });
    }
    handleChange(event){
        const target = event.target;

        let result = {};
        switch (target.name) {
            case 'name':
                result = this.validateFixedLength(target.name, target.value, 30);
                if (result.isValid) {
                    this.setState({name: target.value});
                    this.removeError(result);
                } else {
                    this.addError(result);
                }
                break;
            case 'phone':
                result = this.validatePhoneNumber(target.name, target.value);
                this.setState({phone: target.value});
                if (result.isValid) {
                    this.removeError(result);
                } else {
                    this.addError(result);
                }
                break;
            case 'time':
                this.setState({time: target.value});
                break;

        }
    }

    render(){
        return(
            <div style={styles.wrapper}>
                <h3>Add Call</h3>
                <form action="" style={styles.root}>
                    <div style={styles.container}>
                        <div>
                            <input
                                name={'name'}
                                type="text"
                                maxLength={31}
                                onChange={this.handleChange}
                                style={styles.input}
                                value={this.state.name}
                                placeholder={'Name'}/>
                            <span style={{ color: "red", fontSize: '12px' }}>{this.errorMessage('name')}</span>
                        </div>
                        <div>
                            <input
                                name={'phone'}
                                type="text"
                                value={this.state.phone}
                                onChange={this.handleChange}
                                style={styles.input}
                                placeholder={'Phone number'}
                            />
                            <span style={{ color: "red", fontSize: '12px' }}>{this.errorMessage('phone')}</span>
                        </div>
                        <div>
                            <input
                                name={'time'}
                                type="time"
                                onChange={this.handleChange}
                                value={this.state.time}
                                style={styles.input}
                                placeholder={'Time'}/>
                        </div>
                    </div>
                    <button
                        disabled={!this.state.name && !this.state.phone && !this.state.time}
                        type={'button'}
                        style={styles.button}
                        onClick={this.addCallHandler}>
                        Add
                    </button>
                </form>
            </div>

        );
    }
}
function mapStateToProps(state) {
    return {
        calls: state.calls
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            addCall: addCall
        },
        dispatch
    );
}

export default connect(mapStateToProps, matchDispatchToProps)(AddCall);