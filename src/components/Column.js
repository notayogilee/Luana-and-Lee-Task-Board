import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from '../components/Task';
import TaskCard from '../components/TaskCard';

const Container = styled.div`
align-items: center;
margin: 8px;
border: 1px solid lightgrey;
background-color: white;
border-radius: 2px;
width: 100%;

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

const Column = ({ column, tasks, index, state, createNewTask, onDragEnd }) => {

  const [newTask, setNewTask] = useState('');
  const [addTask, setAddTask] = useState(false);

  const [edit, setEdit] = useState(false);
  const [taskId, setTaskId] = useState(0);

  const enableEdit = id => {
    setEdit(true);
    setTaskId(id);
  }

  return (

    <Draggable draggableId={column.id} index={index}>
      {provided => (
        <Fragment>
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
                  {tasks.map((task, index) =>

                    edit && taskId === task.id ? <TaskCard key={task.id} task={task} index={index} onDragEnd={onDragEnd} /> :
                      <Task key={task.id} task={task} enableEdit={enableEdit} index={index} />

                  )}

                  {provided.placeholder}

                  {addTask &&
                    <form onSubmit={e => {
                      e.preventDefault();
                      createNewTask(newTask, column.id);
                      setAddTask(false);
                      setNewTask('');
                    }} >
                      <input type="text" name="newTask" onChange={e => setNewTask(e.target.value)} />
                      <button>OK</button>
                    </form>
                  }

                </TaskList>
              )}
            </Droppable>

            <button onClick={(() => {
              setAddTask(true);
            })}>Add Task</button>

          </Container>
          {column.id === (state.columnOrder[state.columnOrder.length - 1]) &&

            <button>Add New Column</button>
          }
        </Fragment>
      )
      }
    </Draggable>
  )
};

export default Column;