import React,{Component} from 'react';
import './Task.css';

class Task extends Component{ 
    
    render(){
        const style = {
            backgroundColor: '',
          };
          let color = this.props.categoryColor;
          style.backgroundColor= color;
        return(
            <div 
                style={style}
                className="card-draggable" 
                onDragStart = {(e)=>this.props.onDragStart(e, this.props.taskID, this.props.stageTitle)}
            >
                <div className="card-header">
                    {this.props.categoryName}
                </div>
                <div>
                    {this.props.description}
                </div>
            </div>
            

        )
    }
}

export default Task;