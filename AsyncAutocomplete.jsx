// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import ops from "../operations";

//USE: pass an asyncCall (ops.getResources...), style, multiple, an identifier ('name'), fullWidth (optional), a label and a callback on selection
export default function AsyncAutoComplete(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (options.length == 0) {
        const data = await props.asyncCall();

        if (active) {
          setOptions(data);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    // if (!open) {
    //   setOptions([]);
    // }
  }, [open]);

  return (
    <Autocomplete
      multiple={props.multiple}
      style={props.style}
      fullWidth={props.fullWidth}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) =>
        option[props.identifier] === value[props.identifier]
      }
      getOptionLabel={(option) => option[props.identifier]}
      options={options}
      loading={loading}
      onChange={(event, newValue) => {
        if (props.callback) props.callback(newValue);
      }}
      renderInput={(params) => (
        <TextField
          fullWidth={props.fullWidth}
          {...params}
          label={props.label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
