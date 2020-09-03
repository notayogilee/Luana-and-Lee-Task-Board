import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import useColumnData from './hooks/useColumnData';
import Column from './components/Column';

const Container = styled.div`
display: flex;
`;


function App() {
  const { state, createNewTask, deleteTask, onDragStart, onDragUpdate, onDragEnd } = useColumnData();

  const { tasks, columns, columnOrder } = state;

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

              return <Column key={column.id} onDragEnd={onDragEnd} createNewTask={createNewTask} deleteTask={deleteTask} column={column} tasks={columnTasks} state={state} index={index} />;
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  )
};

export default App;

