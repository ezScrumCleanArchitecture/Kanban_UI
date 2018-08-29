import React, { Component } from 'react';
import { Button, Modal, Form, FormGroup, Col, Label } from 'react-bootstrap';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';

class CategoryShower extends Component {
    constructor() {
        super();
        this.state = {
            show:false
        }

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleShow(){
        this.setState({show : true});
    }

    handleClose(){
        this.setState({
            show : false
        });
    }

    render(){
        var categories = [];
        console.log(this.props.categories)
        this.props.categories.forEach((category)=>{
            var categoryName = category.categoryName;
            var categoryColor = category.categoryColor;
            bootstrapUtils.addStyle(Label, categoryName);
            categories.push(
                <FormGroup key={categoryName}>
                    <Col sm={2} >
                    <style type="text/css">
                        {`
                            .label-` + categoryName + ` {
                                background-color: `+ categoryColor + `;
                                color: black;
                            }
                        `}
                    </style>
                    <Label bsStyle={categoryName}>{categoryName}</Label>
                    </Col>
                </FormGroup>
            );
        })

        return (
            <div>
                <Button bsStyle="primary" bsSize="small" onClick={this.handleShow}>
                    Show Category
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Category Of Card</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            {categories}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default CategoryShower;