import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import {
  Typography,
  TextField,
  Card,
  Input,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

import EditCard from './EditCard';
import ViewCard from './ViewCard';

//import './TaskCard.scss';
import 'fontsource-roboto';

const Container = styled.div`
padding: 8px;
margin-bottom: 8px;
border-radius: 2px;
background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;

// const cardButtons = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   background-color: blue;
// `;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    padding: "5px",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  margin: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  cardButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: '50px',
  },
  divisorDiv: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    marginBottom: '10px',
  },
  divisor: {
    width: '96%',
    height: '1px',
    backgroundColor: '#3f51b580',
  }
}));

const MainCard = ({ task, index, columns, columnOrder, column, editTask, deleteTask, changeColumn }) => {
  const classes = useStyles();
  const [clickedEdit, setClickedEdit] = React.useState(false);
  const [clickedDelete, setClickedDelete] = React.useState(false);
  const [clickedSave, setClickedSave] = React.useState(false);
  const [title, setTitle] = React.useState(task.title || "");
  const [content, setContent] = React.useState(task.content || "");
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
    // changeColumn(task.id, column.id, age);
    console.log(age);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChangeEdit = () => {
    setClickedEdit((prev) => !prev);
  };

  const handleChangeDelete = () => {
    setClickedDelete((prev) => !prev);
  };

  function save(id) {
    console.log(id, 'savefunction');
    const task = {
      id,
      title,
      content,
    };

    editTask(id, task)
    setClickedEdit((prev) => !prev);
  }

  // function DeleteTask() {
  //   DeleteTask(task.id)
  //   .then(res => {
  //     handleChangeDelete()
  //     setDeleting(prev => !prev);
  //   })
  //   .catch(err => console.log(err))
  // }


  return (
    <React.Fragment>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {/* <Handle {...provided.dragHandleProps} /> */}
            {/* {task.content} */}

            <form noValidate autoComplete="off" onSubmit={event => event.preventDefault()}>
              <Card className={classes.root}>
                {!clickedEdit &&
                  <ViewCard
                    key={task.id}
                    task={task}
                    index={index}
                  />
                }
                {clickedEdit &&
                  <EditCard
                    key={task.id}
                    task={task}
                    index={index}
                    onSetTitle={setTitle}
                    onSetContent={setContent}
                  />
                }
                <div className={classes.divisorDiv}><div className={classes.divisor}></div></div>
                <div className={classes.cardButtons}>
                  <div className={classes.cardIcons}>
                    {!clickedEdit &&
                      <IconButton
                        aria-label="edit"
                        className={classes.margin}
                        alt="Edit"
                        onClick={handleChangeEdit}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    }
                    {clickedEdit &&
                      <IconButton
                        aria-label="save"
                        className={classes.margin}
                        onClick={event => save(task.id)}
                      >
                        <SaveIcon fontSize="small" />
                      </IconButton>
                    }
                    <IconButton aria-label="delete" className={classes.margin} onClick={() => deleteTask(task.id, column.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </div>

                  <FormControl variant="outlined" size="small" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">Move to...</InputLabel>
                    <Select
                      label="Move to..."
                      open={open}
                      onClose={handleClose}
                      onOpen={handleOpen}
                      value={age}
                      onChange={(e) => {

                        changeColumn(task.id, column.id, e.target.value)

                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {columnOrder.map((column) => {
                        return <MenuItem value={columns[column].id} key={columns[column].id}>{columns[column].title}</MenuItem>
                      })
                      }
                    </Select>
                  </FormControl>
                </div>
              </Card>
            </form>
          </Container>
        )}
      </Draggable>
    </React.Fragment>
  )
}

export default MainCard;