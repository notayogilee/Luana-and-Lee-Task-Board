import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './components/Column';

const Container = styled.div`
display: flex;
`;


function App() {

  const [data, setData] = useState(initialData);
  const { columnOrder, columns, tasks } = data;

  console.log('data', data, 'columns', columns, 'tasks', tasks)

  // Add style to drags

  const onDragStart = () => {
    document.body.style.color = 'orange';
  }

  const onDragUpdate = update => {
    // change background color moving down or up column
    const { destination } = update;
  }

  // reset style after drag ends
  const onDragEnd = result => {
    document.body.style.color = 'inherit';
    // document.body.style.backgroundColor = 'inherit';


    const { destination, source, draggableId, type } = result;

    // Moving tasks within same column

    if (!destination) { return; }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // to tell if re-ordering task or column
    if (type === 'column') {
      const newColumnOrder = Array.from(columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newData = {
        ...data,
        columnOrder: newColumnOrder
      };

      setData(newData);
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      const newData = {
        ...data,
        columns: {
          ...columns,

          [newColumn.id]: newColumn
        }
      }
      setData(newData);
      return;
    }

    // Moving from one list to another

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);

    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishedTaskIds = Array.from(finish.taskIds);
    finishedTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishedTaskIds
    };

    const newData = {
      ...data,
      columns: {
        ...columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };
    setData(newData);
    return;
  };

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

              return <Column key={column.id} column={column} tasks={columnTasks} index={index} />;
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  )
};

export default App;

