import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {addCall, removeCall} from "../actions";
import ReactTable from "react-table";
import 'react-table/react-table.css'
import moment from 'moment';

const styles = {
    filterButtons: {
        display: 'flex',
        maxWidth: '255px',
        width: '100%',
        justifyContent: 'space-around',
        margin: '15px auto 0'
    }
};


class CallsList extends Component {

    constructor(props){
        super(props);

        this.state = {
            tableData: this.props.calls
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.filterData = this.filterData.bind(this);
    }

    componentWillReceiveProps(newProps){
        if(newProps && newProps.calls){
            this.setState({
                tableData: newProps.calls
            });
        }
    }

    /**
     * Runs remove item via redux action
     * @param itemId
     */
    deleteItem(itemId){
        this.props.removeCall(itemId);
    }

    /**
     * Modifies shown date based on filters (all , next, finished)
     * @param period
     */
    dataModifier(period){

        const {calls} = this.props;
        let modifiedCallIds = null,
            modifiedCalls = null;

        if(period === 'past'){
            modifiedCallIds = calls.byId.filter(item => {
                if(calls.byHash[item].time < moment().format('HH:mm')){
                    return item;
                }
            });
            modifiedCalls = modifiedCallIds.reduce((agg, curItem) => {
                agg.byId.push(curItem);
                agg.byHash[curItem] = calls.byHash[curItem];
                return agg;
            }, {
                byId: [],
                byHash: {}
            });
        }else if(period === 'future'){
            modifiedCallIds = calls.byId.filter(item => {
                console.log(calls.byHash[item].time, moment().format('HH:mm'));
                if(calls.byHash[item].time > moment().format('HH:mm')){
                    return item;
                }
            });
            modifiedCalls = modifiedCallIds.reduce((agg, curItem) => {
                agg.byId.push(curItem);
                agg.byHash[curItem] = calls.byHash[curItem];
                return agg;
            }, {
                byId: [],
                byHash: {}
            });
        }

        this.setState({
            tableData: modifiedCalls
        });
    }

    /**
     * Filters data using dataModifier function
     * @param event
     */
    filterData(event){
        const
            {target} = event,
            {calls} = this.props;

        switch (target.name) {
            case 'all' :
                this.setState({tableData: calls});
                break;
            case 'next':
                this.dataModifier('future');
                break;
            case 'finished':
                this.dataModifier('past');
                break;
            default:
                break;
        }
    }
    render(){
        const { tableData } = this.state;
        const columns = [
            {
                Header: 'Name',
                accessor: 'name', // String-based value accessors!,
                Cell: props => {
                    return(
                        <span className='number'>{tableData.byHash[props.original].name}</span>
                    );
                },
                maxWidth: 100
            },
            {
                Header: 'Phone',
                accessor: 'phone',
                Cell: props => {
                    return(
                        <span className='number'>{tableData.byHash[props.original].phone}</span>
                    );
                },
                width: 300,
                sortable: false
            },
            {
                Header: 'Time',
                accessor: 'time',
                Cell: props => {
                    return(
                        <span className='number'>{tableData.byHash[props.original].time}</span>
                    );
                },
                width: 100
            },
            {
                Header: '',
                accessor: 'delete',
                Cell: props => {
                    return(
                        <a href="javascript:void(0)" onClick={() => this.deleteItem(props.original)}>Delete</a>
                    );
                },
                sortable: false
            },
            {
                Header: '',
                accessor: 'check',
                sortable: false,
                Cell: props => {
                    let isDisabled = tableData.byHash[props.original].time < moment().format('HH:mm');
                    return(
                        <div>
                            <input type="checkbox" disabled={isDisabled}/>
                        </div>
                    );
                },
            }
        ];

        return(
            <div style={{marginTop: '15px'}}>
                <ReactTable
                    style={{border: '1px solid #000'}}
                    defaultPageSize={5}
                    resizable={false}
                    showPagination={false}
                    data={tableData.byId}
                    columns={columns}
                />
                <div style={styles.filterButtons}>
                    <button type="button" name={'all'} onClick={this.filterData}>All</button>
                    <button type="button" name={'next'} onClick={this.filterData}>Next</button>
                    <button type="button" name={'finished'} onClick={this.filterData}>Finished</button>
                </div>
            </div>
        );
    }
}

/**
 * Maps state to props
 * @param state
 * @returns {{calls: Function}}
 */
function mapStateToProps(state) {
    return {
        calls: state.calls
    };
}

/**
 * Maps all dispatchers to props
 * @param dispatch
 * @returns {{addCall: addCall}|ActionCreator<any>|ActionCreatorsMapObject<any>}
 */
function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            removeCall: removeCall
        },
        dispatch
    );
}


export default connect(mapStateToProps, matchDispatchToProps)(CallsList);