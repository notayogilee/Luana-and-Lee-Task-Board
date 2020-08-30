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

import TaskCard from './TaskCard';

//import './TaskCard.scss';
import 'fontsource-roboto';

const Container = styled.div`
border: 1px solid lightgrey;
padding: 8px;
margin-bottom: 8px;
border-radius: 2px;
background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;

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
}));

const ViewCard = ({ task, index, columns, edit }) => {
  const classes = useStyles();
  const [clickedEdit, setClickedEdit] = React.useState(false);
  const [clickedDelete, setClickedDelete] = React.useState(false);
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
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
      {!clickedEdit && !clickedDelete &&
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
                  <Typography
                    color="primary"
                    gutterBottom="true"
                    variant="h2"
                    style={{fontSize:"1em"}}
                  >
                    {task.title}
                  </Typography>
                  <Typography
                    gutterBottom="true"
                    variant="body1"
                    style={{fontSize:"0.8em", color:"grey"}}
                  >
                    {task.content}
                  </Typography>
                  <div>
                    <IconButton
                      aria-label="edit"
                      className={classes.margin}
                      alt="Edit"
                      onClick={handleChangeEdit}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="delete" className={classes.margin} onClick={handleChangeEdit}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    
                    <FormControl variant="outlined" size="small" className={classes.formControl}>
                      <InputLabel htmlFor="outlined-age-native-simple">Move to...</InputLabel>
                      <Select
                        label="Move to..."
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={age}
                        onChange={handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {/* {Object.values(columns).map((column) => {
                            return <MenuItem value={column.id} key={column.id}>{column.title}</MenuItem>
                          })
                        } */}
                        {/* <MenuItem value={column.id}>{column.title}</MenuItem>
                        <MenuItem value={20}>In Progress</MenuItem>
                        <MenuItem value={30}>Completed</MenuItem> */}
                      </Select>
                    </FormControl>
                  </div>
                </Card>
              </form>
            </Container>
          )}
        </Draggable>
      }
      { clickedEdit &&
        <TaskCard
          key={task.id}
          task={task}
          index={index}
          edit={edit}
          handleChangeEdit={handleChangeEdit}
        /> 
      }
      { clickedDelete &&
        <TaskCard
          key={task.id}
          task={task}
          index={index}
          handleChangeDelete={handleChangeDelete}
        />
      }
    </React.Fragment>
  )
}

export default ViewCard;