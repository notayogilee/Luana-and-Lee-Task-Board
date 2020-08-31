import React, { useState } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from '../components/Task';
import TaskCard from '../components/TaskCard';

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

const Column = ({ column, tasks, index }) => {

  const [data, setData] = useState(initialData);
  const [newTask, setNewTask] = useState('');
  const [addTask, setAddTask] = useState(false);
  const [tasksState, setTasksState] = useState(tasks);
  const [columnState, setColumnState] = useState(column);

  const createNewTask = (newTask) => {

    const newId = `task-${Array.from(tasksState).length + 1}`;

    // Tasks
    const newTasks = [
      ...tasksState,
      {
        id: newId,
        content: newTask
      }
    ]
    setTasksState(newTasks);

    const start = column.taskIds.length;

    column.taskIds.splice(start, 0, newId);

    const newColumnState = {
      ...columnState
    }

    setColumnState(newColumnState);

    const newData = {
      ...data,
      tasks: newTasks,
      columns: newColumnState
    }

    setData(newData);
  };

  const onChange = (e) => {
    let value = e.target.value;
    return setNewTask(value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    createNewTask(newTask);
    setAddTask(false);
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
                {Object.values(tasksState).map((task, index) =>
                  <Task key={task.id} task={task} index={index} />
                )}
                {tasks.map((task, index) =>
                  <TaskCard key={task.id} task={task} index={index} />
                )}
                {provided.placeholder}

                {addTask &&
                  <form onSubmit={onSubmit} >
                    <input type="text" name="newTask" onChange={onChange} />
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
      )
      }
    </Draggable>
  )
};

export default Column;