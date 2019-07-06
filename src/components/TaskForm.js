import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';

class TaskForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: "",
      name: "",
      status : false,
    } 
  }
  
  componentWillMount(){
    if(this.props.itemEditing && this.props.itemEditing.id !== null){
      this.setState({
        id: this.props.itemEditing.id,
        name: this.props.itemEditing.name,
        status: this.props.itemEditing.status,
      });
    }
    else {
      this.onClear();
    }
    
  }

  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.itemEditing){
      this.setState({
        id: nextProps.itemEditing.id,
        name: nextProps.itemEditing.name,
        status: nextProps.itemEditing.status,
      });
    }else{
      this.onClear();
    }
    
  }

  onCloseForm = () => {
    this.props.onCloseForm();
  }

  onChange = (event) =>{
    var target = event.target;
    var name = target.name;
    var value  = target.value;
    if(name === "status"){
      value = target.value === 'true' ? true : false;
    }
    this.setState ({
      [name] : value,
    })
  }

  onSubmit  = (event) =>{
    event.preventDefault();
    this.props.onAddTask(this.state);
    this.onClear();
    
    this.onCloseForm();
  }

  onClear = () =>{
    this.setState({
      name : '',
      status: false,
    });
  }
  render() {
    if(!this.props.isDisplayForm) return null; 

    
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">{this.state.id ? "Update Work" : "Add Work" } &nbsp;<i className="fa fa-times-circle l" aria-hidden="true" onClick={this.onCloseForm}></i>
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit = {this.onSubmit}>
            <div className="form-group">
              <label>Tên</label>
              <input type="text" className="form-control" name="name" value = {this.state.name} onChange = {this.onChange}></input>
            </div>
            <label>Status</label>
            <select className="form-control" name = "status"  value = {this.state.status} onChange = {this.onChange}>
              <option value={true}>Active</option>
              <option value={false}>Hiden</option>
            </select><br />
            <div className="text-center">
              <button type="submit" className="btn btn-warning m-10 fa fa-plus">  Save
                        </button>

              <button onClick = {this.onClear} 
              type="button" 
              className="btn btn-danger m-10 ml-5"> 
              <i className="fa fa-close" aria-hidden="true"></i>  C
              ancel
              </button>
            </div>
          </form>
        </div>
      </div>
    ) 
  }
}
const mapStateToProps = (state) =>{
  return{
    isDisplayForm: state.isDisplayForm,
    itemEditing: state.itemEditing,
    
  }
}
const mapDispatchToProps = (dispatch, props) =>{
    return {
      onAddTask : (task) =>{
        dispatch(actions.saveTask(task));
      },
      onCloseForm :() =>{
        dispatch(actions.closeForm());
      },
     
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
