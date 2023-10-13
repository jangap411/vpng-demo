import React, { useState } from "react";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

const EditTimesheet = () => {
  const [value, setValue] = useState(dayjs("2022-04-17T15:30"));

  return (
    <>
      <Typography variant="h6">Edit Timesheet</Typography>
      <Grid container item spacing={2}>
        {/* time in */}
        <Grid item xs={12} sm={6}>
          <InputLabel id="time-in"> Clock In Time</InputLabel>
          <TextField variant="standard" type="time" />
        </Grid>
        {/* time out */}
        <Grid item xs={12} sm={6}>
          <InputLabel id="time-in"> Clock Out Time</InputLabel>
          <TextField variant="standard" type="time" />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mt: 1, p: 1 }}>
          <InputLabel id="comment-label">Provide Comment</InputLabel>
          <TextField
            variant="standard"
            sx={{ width: "100%" }}
            placeholder="Enter your comment here"
          />
        </Grid>
        {/* reason */}
        <Grid item xs={12} sm={6} sx={{ mt: 1, p: 1 }}>
          <InputLabel id="select-reason">Leave Reason</InputLabel>
          <Select
            label="Leave Reason"
            id="leave-reason-select"
            value={"None"}
            variant="standard"
            sx={{ minWidth: "100%", p: 0, m: 0 }}
          >
            {/* TODO: Rendered dynamically from db */}
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="Annual Reason">Annual Leave</MenuItem>
          </Select>
        </Grid>
        <Grid item>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "flex-start",
            }}
          >
            <Button
              variant="contained"
              style={{ backgroundColor: "#f3754c", "&:hover": "#EB3C47" }}
              sx={{
                mt: 1,
                ml: 1,
                width: "100%",
              }}
            >
              Save
            </Button>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default EditTimesheet;
