import React from 'react';
import {
  TextField,
  Input,
} from '@material-ui/core';

const EditCard = ({ task, onSetTitle, onSetContent }) => {
  const [title, setTitle] = React.useState(task.title || "");
  const [content, setContent] = React.useState(task.content || "");


  return (
    <React.Fragment>
      <Input
        placeholder="Title"
        inputProps={{ 'aria-label': 'description' }}
        style={{ width: "100%", marginBottom: "5%"}}
        value={title} 
        onChange={ event => { onSetTitle(event.target.value); setTitle(event.target.value); } }
      />
      <TextField
        id="filled-multiline-static"
        placeholder="Describe..."
        multiline
        rows={4}
        variant="filled"
        style={{width: "100%"}}
        value={content}
        onChange={ event => { setContent(event.target.value); onSetContent(event.target.value) } }
      >
      </TextField>
    </React.Fragment>
  )
}

export default EditCard;


// replace view when edit is clicked
// make save button work
// not show after deliting from view card