import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  FormControl,
  OutlinedInput,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel
} from "@material-ui/core";

import classNames from "classnames";
import _ from "lodash";
import axios from 'axios';


// *****************************************************************************
// A) Component Stylying (Material UI)
// *****************************************************************************

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    width: 800,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    minWidth: 20,
  },
  type: {
    fontWeight: 600
  },
  formControl: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      minWidth: "100%",
      marginRight: theme.spacing(0),
      marginBottom: theme.spacing(1)
    }
  },
  input: {
    padding: "10px 14px"
  },
  select: {
    width: 200
  },
  search: {
    width: 50
  },
  submitBtn: {
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  }
}));


// *****************************************************************************
// B) Component Code
// *****************************************************************************

const Form = (props) => {
  
  // ---------------------------------------------------------------------------
  // I) Hooks and Variables
  // ---------------------------------------------------------------------------

  // i) Material UI Hooks
  const classes = useStyles();

  // ii) Lifting state variables from App component
  const {starWarsElement, setStarWarsElement, sendRequest, setSendRequest} = props;

  // iii) React Hooks - States
  const [fields, setFields] = useState({});

  // iv) React Routing Hooks - History and Params
  const history = useHistory();

  // v) React Hooks - Effects
  
  useEffect(() => {
    
    axios.get('https://swapi.dev/api/')
        .then(res => {
          setFields(res.data) // 
        })
        .catch(err => {
          console.log(err)
        })
    
  }, []);

  // ---------------------------------------------------------------------------
  // II) Handlers
  // ---------------------------------------------------------------------------

  const handleSelectionStarWarsElement = (e) => {
    setStarWarsElement({...starWarsElement,
        [e.target.name]: e.target.value}
    );  
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    setSendRequest(true);
    if(starWarsElement.field !== '' && starWarsElement.id !== '')
      history.push(`/${starWarsElement.field}/${starWarsElement.id}`)
  };

  // ---------------------------------------------------------------------------
  // III) JSX
  // ---------------------------------------------------------------------------

  return (
    <div className={classes.root}>
      <form className={classes.form}>
        <FormControl className={classNames(classes.formControl, classes.text)}>
          <Typography variant="body1" className={classes.type}>
            Select search fields:
          </Typography>
        </FormControl>
        <FormControl
          className={classNames(classes.formControl, classes.select)}
        >
          
          <Select
            name="field"
            labelId="field"
            label="field"
            input={<OutlinedInput classes={{ input: classes.input }} />}
            value={starWarsElement.field}
            onChange={handleSelectionStarWarsElement}
          >
            {!_.isEmpty(fields) && _.keys(fields).map(field => (
              <MenuItem key={field} value={field}>
                {field}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classNames(classes.formControl, classes.text)}>
          <Typography variant="body1" className={classes.type}>
            ID:
          </Typography>
        </FormControl>
        <FormControl
          className={classNames(classes.formControl, classes.search)}
        >
          <TextField
            name="id"
            variant="outlined"
            size="small"
            value={starWarsElement.id}
            onChange={handleSelectionStarWarsElement}
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submitBtn}
          onClick={handleSubmitRequest}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Form;

