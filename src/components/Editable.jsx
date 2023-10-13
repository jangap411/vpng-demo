import React, { useState } from "react";
// import EditIcon from "@mui/icons-material/Edit";
import { TextField, Tooltip, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";

const Editable = ({ initialText }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);

  function handleClick() {
    setIsEditing(true);
  }

  function handleBlur() {
    setIsEditing(false);
  }

  function handleChange(event) {
    setText(event.target.value);
  }
  return (
    <div>
      {isEditing ? (
        <TextField
          id="standard-basic"
          variant="standard"
          onChange={handleChange}
          onBlur={handleBlur}
          value={text}
        />
      ) : (
        // <input
        //   type="text"
        //   value={text}
        //   onChange={handleChange}
        //   onBlur={handleBlur}
        // />
        <Stack direction="row" spacing={1}>
          <Typography gutterBottom variant="p" component="div">
            {text}
          </Typography>
          <Tooltip title="Click to edit" placement="right">
            <EditIcon onClick={handleClick} />
          </Tooltip>
        </Stack>
      )}
    </div>
  );
};

export default Editable;
