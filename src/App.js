import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
// import initialData from './initial-data';
import useColumnData from './hooks/useColumnData';
import Column from './components/Column';

const Container = styled.div`
display: flex;
`;


function App() {
  const { state, createNewTask, onDragStart, onDragUpdate, onDragEnd } = useColumnData();

  const { tasks, columns, columnOrder } = state;

  // const [data, setData] = useState(initialData);
  // const { columnOrder, columns, tasks } = data;
  // const { id, tasksIds, title } = columns;

  // const [data, setData] = useState(initialData);

  const [newTask, setNewTask] = useState('');
  const [addTask, setAddTask] = useState(false);
  // const [tasksState, setTasksState] = useState(tasks);
  // const [columnState, setColumnState] = useState(columns[id]);

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

              return <Column key={column.id} onDragEnd={onDragEnd} createNewTask={createNewTask} column={column} tasks={columnTasks} state={state} index={index} />;
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  )
};

export default App;

