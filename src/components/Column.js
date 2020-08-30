import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from '../components/Task';
import TaskCard from '../components/TaskCard';
import ViewCard from '../components/ViewCard';

const Container = styled.div`
margin: 8px;
border: 1px solid lightgrey;
background-color: white;
border-radius: 2px;
width: 220px;

display: flex;
flex-direction: column;
`;
const Title = styled.h3`
padding: 8px;
`;
const TaskList = styled.div`
padding: 8px;
background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'inherit')};
flex-grow: 1;
min-height: 100px;
    `;

// Need min-height to be able to drag and drop onto empty column

const Column = ({ column, tasks, index, columns, updateTask }) => {
  function edit(taskId, task) {
    console.log(taskId, task, "edit",)
    updateTask(taskId, task)
  }

  return (
    <Draggable draggableId={column.id} index={index}>
      {provided => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Title
            {...provided.dragHandleProps}
          >
            {column.title}</Title>
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (

              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {/* {tasks.map((task, index) =>
                  <Task key={task.id} task={task} index={index} />
                )} */}
                {tasks.map((task, index) =>
                  <ViewCard key={task.id} task={task} index={index} columns={columns} edit={edit} />
                )}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )
      }
    </Draggable>
  )
};

export default Column;