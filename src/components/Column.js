import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
// import Task from '../components/Task';
// import TaskCard from '../components/TaskCard';
import {
  Typography,
  IconButton,
  Input,
  FormControl,
} from '@material-ui/core';
import './Column.css';
import MainCard from '../components/MainCard';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

const Container = styled.div`
postion: relative;
align-items: center;
margin: 8px;
border: 1px solid lightgrey;
background-color: white;
border-radius: 2px;
width: 100%;
min-width: 32%;

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

const Column = ({ column, index, tasks, columns, columnOrder, createNewTask, deleteTask, changeColumn, createNewColumn, deleteColumn, onDragEnd, updateTask }) => {

  // const { tasks, columns, columnOrder } = state;

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskContent, setNewTaskContent] = useState('');

  const [addTask, setAddTask] = useState(false);

  const [newColumnTitle, setNewColumnTitle] = useState('');

  const [addColumn, setAddColumn] = useState(false);

  // const [edit, setEdit] = useState(false);
  // const [taskId, setTaskId] = useState(0);

  // const enableEdit = id => {
  //   setEdit(true);
  //   setTaskId(id);
  // };

  function editTask(taskId, task) {
    // console.log(taskId, task, "edit",)
    updateTask(taskId, task)
  }


  return (

    <Draggable draggableId={column.id} index={index}>
      {provided => (
        <Fragment>
          <Container
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <Typography
              color="primary"
              gutterBottom="true"
              variant="h2"
              style={{ fontSize: "2em", marginTop: '30px', fontWeight: '700'}}
              {...provided.dragHandleProps}
            >
              {column.title}
              {column.title !== 'To Do' && column.title !== 'In Progress' && column.title !== 'Done' &&
                <button onClick={() => deleteColumn(column.id)} className="deleteColumn">
                  <i className="fas fa-times fa-lg"></i>
                </button>

              }
            </Typography>

            <Droppable droppableId={column.id} type="task">
              {(provided, snapshot) => (

                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {tasks.map((task, index) =>
                    <MainCard key={task.id} task={task} column={column} columnOrder={columnOrder} editTask={editTask} deleteTask={deleteTask} changeColumn={changeColumn} index={index} onDragEnd={onDragEnd} columns={columns} />
                  )}

                  {provided.placeholder}

                  {addTask &&
                    <form onSubmit={e => {
                      e.preventDefault();
                      createNewTask(newTaskTitle, newTaskContent, column.id);
                      setAddTask(false);
                      setNewTaskTitle('');
                      setNewTaskContent('');
                    }} >
                      <input
                        type="text"
                        name="newTaskTitle"
                        placeholder="Title"
                        onChange={e => setNewTaskTitle(e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        name="newTaskTitle"
                        placeholder="Description"
                        onChange={e => setNewTaskContent(e.target.value)}
                        required
                      />
                      <button><i className="fas fa-check"></i></button>
                      <button onClick={() => setAddTask(false)}><i className="fas fa-times"></i></button>
                    </form>
                  }

                </TaskList>
              )}
            </Droppable>

            <div className="newTask">
              <IconButton
                aria-label="addTask"
                className="addTask"
                onClick={(() => { setAddTask(true); })}
              >
                <AddCircleIcon
                  color="primary"
                  style={{ fontSize: "2em"}}
                />
              </IconButton>
              {/* <button className="addTask" onClick={(() => {
                setAddTask(true);
              })}><i className="fas fa-plus-circle fa-2x"></i></button> */}
            </div>


          </Container>
          {column.id === (columnOrder[columnOrder.length - 1]) &&

            <Container>
              {addColumn &&
                <div style={{width: '100%', display: 'flex', flexDirection: 'row',
                justifyContent: 'space-between', marginTop: '20px'}}>
                  <FormControl>
                  <form onSubmit={e => {
                    e.preventDefault();
                    console.log('clicked');
                    createNewColumn(newColumnTitle);
                    setAddColumn(false);
                    setNewColumnTitle('');
                  }
                  }>
                    {/* <input
                      type="text"
                      name="newColumnTitle"
                      placeholder="Title"
                      onChange={e => setNewColumnTitle(e.target.value)}
                      required
                    />
                    <button><i className="fas fa-check"></i></button> */}
                    <Input
                      type="text"
                      name="newColumnTitle"
                      //value={e => createNewColumn(e.target.value)}
                      placeholder="Title"
                      onChange={e => setNewColumnTitle(e.target.value)}
                      required
                      style={{ width: "50%", margin: "10px"}}
                      // inputProps={{ 'aria-label': 'newColumnTitle' }}
                      // aria-label="newColumnTitle"
                    />
                    <IconButton onClick={() => createNewColumn(newColumnTitle)}>
                      <CheckCircleIcon
                        //color="primary"
                        fontSize="small"
                        style={{ color: "#8bc34a"}}
                        
                      />
                    </IconButton>

                    <IconButton>
                      <CancelIcon
                        //color="primary"
                        fontSize="small"
                        style={{ color: "#f44336"}}
                        onClick={() => setAddColumn(false)}
                      />
                    </IconButton>
                    {/* <button onClick={() => setAddColumn(false)}><i className="fas fa-times"></i></button> */}
                  </form>
                  </FormControl>
                </div>
              }

              {!addColumn &&
                <div style={{marginTop: '15px'}}>
                  <IconButton
                    aria-label="addColumn"
                    className="addColumn"
                    onClick={() => setAddColumn(true)}
                  >
                    <AddCircleIcon
                      color="primary"
                      style={{ fontSize: "2em"}}
                    />
                  </IconButton>
                </div>
              }
              {/* <button className="addColumn" onClick={() => setAddColumn(true)}><i className="fas fa-plus-circle fa-3x"></i></button> */}
            </Container>
          }
        </Fragment>
      )
      }
    </Draggable>
  )
};

export default Column;