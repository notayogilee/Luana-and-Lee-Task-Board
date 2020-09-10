import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import useColumnData from './hooks/useColumnData';
import Column from './components/Column';

const Container = styled.div`
display: flex;
`;


function App() {
  const { state, createNewTask, deleteTask, createNewColumn, deleteColumn, onDragStart, onDragUpdate, onDragEnd, updateTask } = useColumnData();

  const { tasks, columns, columnOrder } = state;
  

  // const [data, setData] = useState(initialData);
  // const { columnOrder, columns, tasks } = data;
  //const [columnsState, setColumnsState] = useState(columns);

  // function updateTask(taskId, task) {
  //   //console.log(taskId, task, "updateTask")
  //   setData(prevState => {
  //     // console.log(prevState, 'lalala')
  //     let tasks = Object.assign({}, prevState.tasks);
  //     tasks[taskId] = task;
  //     // console.log(tasks, 'before returning')
  //     return { ...prevState, tasks };
  //   })
  // }

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {provided => (
          <Container
            {...provided.droppableProps}
            ref={provided.innerRef}
          >

            {columnOrder.map((columnId, index) => {
              const column = columns[columnId];
              const columnTasks = column.taskIds.map(taskId => tasks[taskId]);

              return <Column key={column.id} onDragEnd={onDragEnd} createNewTask={createNewTask} deleteTask={deleteTask} createNewColumn={createNewColumn} deleteColumn={deleteColumn} column={column} tasks={columnTasks} state={state} index={index} columns={columns} updateTask={updateTask} />;
            })}

            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  )
};

export default App;

