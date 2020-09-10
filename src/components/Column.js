import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from '../components/Task';
import TaskCard from '../components/TaskCard';
import './Column.css';
import MainCard from '../components/MainCard';

const Container = styled.div`
postion: relative;
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

const Column = ({ column, tasks, index, state, createNewTask, deleteTask, createNewColumn, deleteColumn, onDragEnd }) => {

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskContent, setNewTaskContent] = useState('');

  const [addTask, setAddTask] = useState(false);

  const [newColumnTitle, setNewColumnTitle] = useState('');

  const [addColumn, setAddColumn] = useState(false);

  const [edit, setEdit] = useState(false);
  const [taskId, setTaskId] = useState(0);

  const enableEdit = id => {
    setEdit(true);
    setTaskId(id);
  };
  // const Column = ({ column, tasks, index, columns, updateTask }) => {
  //   function edit(taskId, task) {
  //     console.log(taskId, task, "edit",)
  //     updateTask(taskId, task)
  //   }

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
              {column.title}
              {column.title !== 'To Do' && column.title !== 'In Progress' && column.title !== 'Done' &&
                <button onClick={() => deleteColumn(column.id)} className="deleteColumn">
                  <i className="fas fa-times fa-lg"></i>
                </button>

              }
            </Title>

            <Droppable droppableId={column.id} type="task">
              {(provided, snapshot) => (

                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {tasks.map((task, index) =>

                    edit && taskId === task.id ? <TaskCard key={task.id} task={task} index={index} onDragEnd={onDragEnd} /> :
                      <Task key={task.id} task={task} column={column} enableEdit={enableEdit} deleteTask={deleteTask} index={index} />

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
              <button className="addTask" onClick={(() => {
                setAddTask(true);
              })}><i className="fas fa-plus-circle fa-2x"></i></button>
            </div>


          </Container>
          {column.id === (state.columnOrder[state.columnOrder.length - 1]) &&

            <Container>
              {addColumn &&
                <form onSubmit={e => {
                  e.preventDefault();
                  createNewColumn(newColumnTitle);
                  setAddColumn(false);
                  setNewColumnTitle('');
                }
                }>
                  <input
                    type="text"
                    name="newColumnTitle"
                    placeholder="Title"
                    onChange={e => setNewColumnTitle(e.target.value)}
                    required
                  />
                  <button><i className="fas fa-check"></i></button>
                  <button onClick={() => setAddColumn(false)}><i className="fas fa-times"></i></button>
                </form>
              }
              <button className="addColumn" onClick={() => setAddColumn(true)}><i className="fas fa-plus-circle fa-3x"></i></button>
            </Container>
          }
        </Fragment>
        //   {column.title}</Title>
        // <Droppable droppableId={column.id} type="task">
        //   {(provided, snapshot) => (

        //     <TaskList
        //       ref={provided.innerRef}
        //       {...provided.droppableProps}
        //       isDraggingOver={snapshot.isDraggingOver}
        //     >
        //       {/* {tasks.map((task, index) =>
        //         <Task key={task.id} task={task} index={index} />
        //       )} */}
        //       {tasks.map((task, index) =>
        //         <MainCard key={task.id} task={task} index={index} columns={columns} edit={edit} />
        //       )}
        //       {provided.placeholder}
        //     </TaskList>
        //   )}
        // </Droppable>
        // </Container>
      )
      }
    </Draggable>
  )
};

export default Column;