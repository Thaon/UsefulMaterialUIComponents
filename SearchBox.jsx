import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function SearchBox(props) {
  return (
    <div style={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        onChange={(event, newValue) => {
          if (props.callback) props.callback(newValue);
        }}
        freeSolo
        getOptionLabel={(option) => option[props.value]}
        options={props.list}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Cerca"
            margin="normal"
            variant="standard"
          />
        )}
      />
    </div>
  );
}
