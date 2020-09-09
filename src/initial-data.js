const initialData = {
  tasks: {
    'task-1': { id: 'task-1', title:'garbage', content: 'Take out the garbage' },
    'task-2': { id: 'task-2', title:'code', content: 'Write some code' },
    'task-3': { id: 'task-3', title:'cook', content: 'Make supper' },
    'task-4': { id: 'task-4', title:'im dumb remind me', content: 'Go to sleep' },
    'task-5': { id: 'task-5' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: "To do",
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5']
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

  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2', 'column-3']
};

export default initialData;