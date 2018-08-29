import React,{Component} from 'react';
import './Stage.css';
import { Button, Modal, Form, FormControl, FormGroup, Col, ControlLabel} from 'react-bootstrap';
import Task from '../Card/Task';
import Sortable from 'react-sortablejs';
import Select from 'react-select';

class Stage extends Component{ 
   constructor(props){
       super(props);
       this.state={
            show : false,
            description:'',
            note:'',
            category:'',
            stageTitle:props.stageTitle,
            tasks:[],
            selectedCategoryOption : undefined,
            categoryOptions : []
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.descriptionOnChange = this.descriptionOnChange.bind(this);
        this.categoryOnChange = this.categoryOnChange.bind(this);
        this.noteOnChange = this.noteOnChange.bind(this);
        this.addTask = this.addTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.updateStageTitleOfTask = this.updateStageTitleOfTask.bind(this);
        this.getAllCategory = this.getAllCategory.bind(this);
   }

    handleShow(){
        this.setState({show : true});
        this.getAllCategory();
    }

    handleClose(){
        this.setState({
            show : false,
            description: '',
            category: '',
            note : '',
            categoryOptions : []
        });
    }

    descriptionOnChange(e){
        this.setState({
            description:e.target.value
        });
    }

    categoryOnChange(e){
        this.setState({
            category:e.target.value
        });
    }

    noteOnChange(e){
        this.setState({
            note:e.target.value
        });
    }

    handleSubmit(){ 
        if(this.state.description === ''){
            alert('The description is required.');
            return;
        }
        else{
            let isDuplicated = false;
            let self = this;
            this.state.tasks.some(function(task){
                if(task.props.description===self.state.description){ 
                    isDuplicated = true;
                    return true;
                }  
                return false;
            });
            if(isDuplicated){
                alert("Your task description is used!");
                return;
            }
        }
        var shortid = require('shortid');
        var taskID = shortid.generate();
        var categoryName = '';
        var categoryColor = '';
        var selectedCategoryOption = this.state.selectedCategoryOption;
        if(selectedCategoryOption !== undefined){
            categoryName = selectedCategoryOption.label;
            categoryColor = selectedCategoryOption.value
        }
        this.addTask(<Task key = {taskID} taskID = {taskID} description = {this.state.description} 
            stageTitle = {this.state.stageTitle} onDragStart={this.props.onDragStart}
            categoryName = {categoryName} categoryColor = {categoryColor}
            />);
        this.handleClose();
    }

    addTask(task){
        var tasks = this.state.tasks;
        tasks.push(task);
        this.setState({tasks:tasks});
    }

    removeTask(task){
        var tasks = this.state.tasks;
        tasks = tasks.filter((_task)=>{
            return task!==_task;
        })
        this.setState({tasks:tasks});
    }

    updateStageTitleOfTask(task,stageTitle){
        var key = task.key;
        var description = task.props.description;
        var categoryName = task.props.categoryName;
        var categoryColor = task.props.categoryColor;
        task=(<Task key = {key} taskID = {key} description = {description} 
            stageTitle = {stageTitle} onDragStart={this.props.onDragStart}
            categoryName = {categoryName} categoryColor = {categoryColor}
            />);
        return task;
    }

    getAllCategory(){
        this.props.categories.forEach((category)=>{
            this.state.categoryOptions.push({
                value : category.categoryColor ,label : category.categoryName
                }
            );
        })
    }

    selectCategoryOnChange(selectedCategory){
        this.setState({
            selectedCategoryOption : selectedCategory
        });
    }


    render(){
        var tasks = [];
        this.state.tasks.forEach(task => {
            tasks.push(task);
        });
        return( 
            <div className="droppable" onDragOver={(e)=>this.props.onDragOver(e)} onDrop={(e)=>this.props.onDrop(e,this.state.stageTitle)}>
                <div className="stage-header">{this.state.stageTitle}</div>
                <Sortable>
                    {tasks}
                </Sortable>
                <Button bsStyle="primary" bsSize="small" onClick={this.handleShow}>
                    Add New Card
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add New Card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                *Description:
                            </Col>
                            <Col sm={10}>
                                <FormControl componentClass="textarea" placeholder="input task description..." onInput={this.descriptionOnChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                Category:
                            </Col>
                            <Col sm={10}>
                                <Select name="form-field-name" value={this.state.selectedCategoryOption} onChange={this.selectCategoryOnChange.bind(this)} options={this.state.categoryOptions} />
                            </Col>
                           
                        </FormGroup>
                         <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                Note:
                            </Col>
                            <Col sm={10}>
                                <FormControl componentClass="textarea" onInput={this.noteOnChange}/>
                            </Col>
                        </FormGroup>
                        <Col componentClass={ControlLabel}>
                            (Note: * denotes a required field)
                        </Col>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleSubmit}>Submit</Button>
                        <Button onClick={this.handleClose}>Cancel</Button>
                    </Modal.Footer>
            </Modal>     
            </div>
        );
    }
} 
export default Stage;

