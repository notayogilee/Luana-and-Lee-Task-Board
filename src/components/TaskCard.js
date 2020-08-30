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
import SaveIcon from '@material-ui/icons/Save';


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

const TaskCard = ({ task, index, edit }) => {
  const classes = useStyles();
  const [title, setTitle] = React.useState(task.title || "");
  const [content, setContent] = React.useState(task.content || "");
  const [clickedSave, setClickedSave] = React.useState(false);
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

  function save(id) {
    console.log(id, 'savefunction');
    const task = {
      id,
      title,
      content,
    };

    edit(id, task)
    setClickedSave((prev) => !prev);
  }


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
                <Input
                  placeholder="Title"
                  inputProps={{ 'aria-label': 'description' }}
                  style={{ width: "100%", marginBottom: "5%"}}
                  value={title} 
                  onChange={ event => setTitle(event.target.value) }
                />
                <TextField
                  id="filled-multiline-static"
                  placeholder="Describe..."
                  multiline
                  rows={4}
                  variant="filled"
                  style={{width: "100%"}}
                  value={content}
                  onChange={ event => setContent(event.target.value) }
                >
                </TextField>
                <div>
                  <IconButton
                    aria-label="save"
                    className={classes.margin}
                    onClick={ event => save(task.id) }
                  >
                    <SaveIcon fontSize="small" />
                  </IconButton>
                  <IconButton aria-label="delete" className={classes.margin}>
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
                      <MenuItem value={10}>To Do</MenuItem>
                      <MenuItem value={20}>In Progress</MenuItem>
                      <MenuItem value={30}>Completed</MenuItem>
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

export default TaskCard;


// replace view when edit is clicked
// make save button work
// not show after deliting from view card