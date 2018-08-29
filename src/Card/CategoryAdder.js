import React, { Component } from 'react';
import { Button, Modal, Form, FormControl, FormGroup, Col, ControlLabel } from 'react-bootstrap';
import { CirclePicker } from 'react-color';

class CategoryAdder extends Component {
    constructor() {
        super();
        this.state = {
            show:false,
            categoryName: '',
            categoryColor: ''
        }

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
        this.categoryNameOnChange = this.categoryNameOnChange.bind(this);
    }

    handleShow(){
        this.setState({show : true});
    }

    handleClose(){
        this.setState({
            show : false,
            categoryName: '',
            categoryColor: ''
        });
    }

    handleSubmit(){
        if(this.state.categoryName === ''){
            alert('The category name is required.');
            return;
        }
        else if(!this.state.categoryColor){
            alert('Color is required.');
            return;
        }
        else{
            let isDuplicated = false;
            let self = this;
            this.props.categories.some(function(category){
                if(category.categoryName===self.state.categoryName){ 
                    isDuplicated = true;
                    return true;
                }  
                return false;
            });
            if(isDuplicated){
                alert("Your category name is used!");
                return;
            }
        }
        let category = {
            categoryName:this.state.categoryName,
            categoryColor:this.state.categoryColor
        }
        this.props.addCategory(category);
        this.handleClose();
    }

    categoryNameOnChange(e){
        this.setState({
            categoryName:e.target.value
        });
    }

    handleChangeComplete = (color) => {
        this.setState({ categoryColor: color.hex });
      };
    

    render() {
        return (
            <div>
                <Button bsStyle="primary" bsSize="small" onClick={this.handleShow}>
                    Add New Category Of Card
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Category Of Card</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    *Name:
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="textarea" placeholder="input category name..." onInput={this.categoryNameOnChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    *Color:
                                </Col>
                                <Col sm={10}>
                                    <CirclePicker onChangeComplete={this.handleChangeComplete}/>
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
        )
    }
}

export default CategoryAdder;