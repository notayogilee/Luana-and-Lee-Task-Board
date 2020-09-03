import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import './Task.css';

const Container = styled.div`
display: flex;
justify-content: space-between; 
border: 1px solid lightgrey;
padding: 8px;
margin-bottom: 8px;
border-radius: 2px;
background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;

const Task = ({ column, task, index, enableEdit, deleteTask }) => {

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div className="title">
            {task.title}
          </div>
          <div className="content">
            {task.content}
          </div>
          <div className="buttons">
            <button className="transparent" onClick={() => enableEdit(task.id)}>
              <i className="fas fa-pen"></i>
            </button>
            <button className="transparent" onClick={() => deleteTask(task.id, column.id)}>
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </Container>
      )}
    </Draggable>
  )
}

export default Task;


