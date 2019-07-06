import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
class Sort extends Component {
   
    onClick = (sortBy, sortValue) =>{
        this.props.onSort({
            by: sortBy,
            value: sortValue,
        });
    }
    
    render() {
        return (
            
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                
                <div className="dropdown">
                    <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        id="dropdownMenu1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                    >
                        Sắp Xếp <i className="fa fa-caret-down" aria-hidden="true"></i>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick = {() =>this.onClick("name",1)}>
                            <a role="button" href ="#asc">
                                <i className="fa fa-sort-alpha-asc" aria-hidden="true"></i>
                                Tên A-Z 
                                <i className = {(this.props.sort.by === "name" && this.props.sort.value === 1)? "fa fa-check" : ""} aria-hidden="true"></i>
                            </a>
                            
                        </li>
                        <li onClick = {() =>this.onClick("name",-1)}>
                            <a role="button" href ="#desc">
                                <i className="fa fa-sort-alpha-desc" aria-hidden="true"></i>
                                Tên Z-A
                                <i className = {(this.props.sort.by === "name" && this.props.sort.value === -1)? "fa fa-check" : ""} aria-hidden="true"></i>
                            </a>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li onClick = {() =>this.onClick("status",1)}>
                            <a role="button" href ="#active">
                                Trạng Thái Kích Hoạt
                                <i className = {(this.props.sort.by === "status" && this.props.sort.value === 1)? "fa fa-check" : ""} aria-hidden="true"></i>
                            </a>
                        </li>
                        <li onClick = {() =>this.onClick("status",-1)}>
                            <a role="button" href ="#hiden">
                                Trạng Thái Ẩn
                                <i className = {(this.props.sort.by === "status" && this.props.sort.value === -1)? "fa fa-check" : ""} aria-hidden="true"></i>
                             </a>
                        </li>
                    </ul>
                </div>
            </div>
       
    
    );
    }
}

const mapStateToProps = state => {
    return {
      sort : state.sortTask,
    }
  }
  const mapDispatchToProps = (dispatch, props) =>{
    return {
      onSort : (sort) => {
        dispatch(actions.sortTask(sort));
      },
     
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Sort);
