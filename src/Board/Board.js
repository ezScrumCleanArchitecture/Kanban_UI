import React, { Component } from 'react';
import './Board.css';
import { Button, Form, FormControl, FormGroup, Col} from 'react-bootstrap';
import Stage from '../Stage/Stage.js';
import Sortable from 'react-sortablejs';
import CategoryAdder from '../Card/CategoryAdder.js';
import CategoryShower from '../Card/CategoryShower.js';

class Board extends Component {
    constructor() {
        super();
        this.state = {
            stageTitle: '',
            stages: [],
            stageRefs: [],
            categories:[]
        }
        this.stageTitleOnChange = this.stageTitleOnChange.bind(this);
        this.addStageRef = this.addStageRef.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addCategory = this.addCategory.bind(this);
    }

    stageTitleOnChange(e) {
        this.setState({ stageTitle: e.target.value });
    }

    addStageRef(stageRef) {
        let stageRefs = this.state.stageRefs;
        stageRefs.push(stageRef);
        this.setState({ stageRefs: stageRefs });
    }

    addCategory(category){
        let categories = this.state.categories;
        categories.push(category);
        this.setState({ categories: categories });
    }
    
    handleSubmit() {
        if (this.state.stageTitle === '') {
            return;
        }
        else {
            let isDuplicated = false;
            let self = this;
            this.state.stages.some(function (stage) {
                if (stage.props.stageTitle === self.state.stageTitle) {
                    isDuplicated = true;
                    return true;
                }
                return false;
            });
            if (isDuplicated) {
                alert("Your Stage title is used!");
                return;
            }
        }

        var stages = this.state.stages
        var shortid = require('shortid');
        stages.push(<Stage key={shortid.generate()} ref={this.addStageRef} stageTitle={this.state.stageTitle} onDragStart={this.onDragStart} onDragOver={this.onDragOver} onDrop={this.onDrop} categories={this.state.categories} />)
        this.setState({ stageTitle: '', stages: stages });
    }

    onDragStart = (ev, taskID, originalStageTitle) => {
        ev.dataTransfer.setData("taskID", taskID);
        ev.dataTransfer.setData("originalStageTitle", originalStageTitle);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, targetStageTitle) => {
        let taskID = ev.dataTransfer.getData("taskID");
        let originalStageTitle = ev.dataTransfer.getData("originalStageTitle");
        if (originalStageTitle === targetStageTitle) {
            return;
        }
        let tasks = [];
        let stageRefs = this.state.stageRefs;
        stageRefs.forEach((stageRef) => {
            stageRef.state.tasks.forEach(task => {
                tasks.push(task);
            })
        })

        let originalStageRefs = stageRefs.filter((stageRef) => {
            return stageRef.state.stageTitle === originalStageTitle;
        })

        let targetStageRefs = stageRefs.filter((stageRef) => {
            return stageRef.state.stageTitle === targetStageTitle;
        })

        let updatedTasks = tasks.filter((task) => {
            return task.key === taskID;
        })

        if (originalStageRefs.length === 0 || targetStageRefs.length === 0 || updatedTasks.length === 0)
            return;

        let originalStageRef = originalStageRefs[0];
        let targetStageRef = targetStageRefs[0];
        let updatedTask = updatedTasks[0];
        originalStageRef.removeTask(updatedTask);
        updatedTask = targetStageRef.updateStageTitleOfTask(updatedTask, targetStageTitle);
        targetStageRef.addTask(updatedTask);
    }

    render() {
        var stages = [];
        this.state.stages.forEach(stage => {
            stages.push(stage);
        });
        return (
            <div className="container-drag">
                <h2 className="header">KANBAN</h2>
                <div>
                    <Form horizontal>
                        <FormGroup>
                            <Col sm={2}>
                                <FormControl componentClass="input" placeholder="input stage title..." onInput={this.stageTitleOnChange} value={this.state.stageTitle} />
                            </Col>
                            <Col sm={1}>
                                <Button bsStyle="primary" bsSize="small" onClick={this.handleSubmit}>
                                    Add New Stage
                                </Button>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={1}>
                                <CategoryAdder categories={this.state.categories} addCategory={this.addCategory}/>
                            </Col>
                            <Col sm={1}>
                                <CategoryShower categories={this.state.categories} />
                            </Col>
                        </FormGroup>
                    </Form>

                    <div className="container-stages">
                        <Sortable>
                            {stages}
                        </Sortable>
                    </div>

                </div>
            </div>
        );
    }
}

export default Board