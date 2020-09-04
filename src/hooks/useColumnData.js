import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
        title: "To Do",
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

  // console.log('cols', columns, 'tasks', tasks)

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

  const createNewTask = (newTaskTitle, newTaskContent, columnId) => {

    if (!newTaskTitle) {
      alert('Please enter a Title');
      return;
    }

    if (!newTaskContent) {
      alert('Please enter some content');
      return;
    }

    const newId = uuidv4();

    const start = columns[columnId].taskIds.length;

    columns[columnId].taskIds.splice(start, 0, newId);

    const newTasks = {
      ...tasks,
      [newId]: {
        id: newId,
        title: newTaskTitle,
        content: newTaskContent
      }
    }

    const newState = {
      tasks: newTasks,
      columns: { ...columns },
      columnOrder: [...columnOrder]
    }

    setState(newState);
  };

  const deleteTask = (taskId, columnId) => {
    // remove from tasks
    delete tasks[taskId];

    // remove from columns.taskIds
    const taskIdsIndex = columns[columnId].taskIds.indexOf(taskId);

    columns[columnId].taskIds.splice(taskIdsIndex, 1);

    // setState to state with newTasks and newColumns
    const newState = {
      tasks: { ...tasks },
      columns: { ...columns },
      columnOrder: [...columnOrder]
    }

    setState(newState);
  }

  const createNewColumn = (newColumnTitle) => {

    if (!newColumnTitle) {
      alert('Please enter a Title');
      return;
    }

    const newId = uuidv4();

    const newColumns = {
      ...columns,
      [newId]: {
        id: newId,
        title: newColumnTitle,
        taskIds: []
      }
    }

    const startIndex = columnOrder.length;

    columnOrder.splice(startIndex, 0, newId);

    const newState = {
      tasks: { ...tasks },
      columns: newColumns,
      columnOrder: [...columnOrder]
    }

    setState(newState);
  }

  const deleteColumn = (columnId) => {

    // remove from columnOrder,
    const newColumnOrder = columnOrder.filter(id => id !== columnId);

    // remove from columns
    // 1) check taskIds.length
    if (columns[columnId].taskIds.length > 0) {
      // 3) if full ask to move before delete (alert?)
      if (!window.confirm("Do you want to delete all tasks in this column?")) {
        return;
      }

      // alert(deleteTasksWithColumn);
    } else {
      // 2) if empty => delete
      delete columns[columnId];
    }

    setState({
      tasks: { ...tasks },
      columns: { ...columns },
      columnOrder: newColumnOrder
    })

  }

  return { state, createNewTask, deleteTask, createNewColumn, deleteColumn, onDragEnd, onDragStart, onDragUpdate };
}