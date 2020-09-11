import React from 'react';
import {
  Typography,
} from '@material-ui/core';

import 'fontsource-roboto';


const ViewCard = ({ task }) => {
  return (
    <React.Fragment>
      <Typography
        color="primary"
        gutterBottom="true"
        variant="h2"
        style={{ fontSize: "1em" }}
      >
        {task.title}
      </Typography>
      <Typography
        gutterBottom="true"
        variant="body1"
        style={{ fontSize: "0.8em", color: "grey" }}
      >
        {task.content}
      </Typography>
    </React.Fragment>
  )
}

export default ViewCard;