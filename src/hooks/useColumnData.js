import { useState } from 'react';

export default function useColumnData() {

  const [state, setState] = useState({
    tasks: {
      'task-1': { id: 'task-1', title: 'task 1', content: 'Take out the garbage' },
      'task-2': { id: 'task-2', title: 'task 2', content: 'Write some code' },
      'task-3': { id: 'task-3', title: 'task 3', content: 'Make supper' },
      'task-4': { id: 'task-4', title: 'task 4', content: 'Go to sleep' }
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: "To do",
        taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
      },
      'column-2': {
        id: 'column-2',
        title: "In Progress",
        taskIds: []
      },
      'column-3': {
        id: 'column-3',
        title: "Done",
        taskIds: []
      }
    },
    columnOrder: ['column-1', 'column-2', 'column-3']
  });

  const { tasks, columns, columnOrder } = state;

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
        ...state,
        columnOrder: newColumnOrder
      };

      setState(newData);
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

      const newState = {
        ...state,
        columns: {
          ...columns,

          [newColumn.id]: newColumn
        }
      }
      setState(newState);
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

    const newState = {
      ...state,
      columns: {
        ...columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };
    setState(newState);
    return;
  };

  const createNewTask = (newTask, columnId) => {

    const newId = `task-${Object.values(tasks).length + 1}`;

    const start = columns[columnId].taskIds.length;

    console.log(' start', start, 'newId', newId)

    columns[columnId].taskIds.splice(start, 0, newId);

    console.log(columns)
    const newTasks = {
      ...tasks,
      [newId]: {
        id: newId,
        content: newTask
      }
    }
    console.log(newTasks)
    const newColumnState = {
      ...columns
    }



    console.log("NCS", newColumnState)

    // setColumnState(newColumnState);

    const newState = {
      tasks: newTasks,
      columns: newColumnState,
      columnOrder: [...columnOrder]
    }

    console.log(newState)

    setState(newState);
  };

  return { state, createNewTask, onDragEnd, onDragStart, onDragUpdate };
}