import React, { useState, useEffect } from 'react';
import './App.css';

import {Switch,Route, Redirect, useLocation, useHistory} from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { 
  Container, 
  Typography,
  Divider, 
  Box
} from '@material-ui/core';

import Form from './components/Form';
import Results from './components/Results';

import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  mainContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 5, 2),
  },
  header:{
    fontWeight: 600,
    backgroundColor: theme.palette.grey[300],
    padding: theme.spacing(1),
  }
}));

function App() {

  // ---------------------------------------------------------------------------
  // I) Hooks and Variables
  // ---------------------------------------------------------------------------

  // i) Material UI Hooks
  const classes = useStyles();

	// ii) React Hooks - States
	const [starWarsElement, setStarWarsElement] = useState({
		field: '',
		id: '',
	});
  const [sendRequest, setSendRequest] = useState(false);

  const history = useHistory();
 

  useEffect(() => {
    
  //  console.log(location.pathname);
  //   if(location.pathname !== '/')
  //     history.push(location.pathname)
    
  }, []);

	return (
		<div className={classes.mainContent}>
      <Container component="main" maxWidth="lg">
        
        <Typography
            className={classes.header}
            variant="h5"
            align="center" 
            color="textPrimary" 
          >
          Luke APIWalker
        </Typography>

        <Divider/>
        <Box m={2}>
          <Form 
            starWarsElement={starWarsElement} 
            setStarWarsElement={setStarWarsElement}
            sendRequest = {sendRequest}
            setSendRequest = {setSendRequest}
          >
          </Form>
        </Box>

        <Switch>
          <Route 
            exact 
            path="/"
          >
          ''
          </Route>
          <Route 
            exact 
            path="/:field(\w+)/:id(\d+)"
          >
            { 
              <Results
                starWarsElement={starWarsElement} 
                setStarWarsElement={setStarWarsElement}
                sendRequest = {sendRequest}
                setSendRequest = {setSendRequest}
              />
            }
          </Route>

          {/* No recognize route starting with "/" */}
          <Route path="/"> 
            <Redirect to="/"/>
          </Route>    

        </Switch>
      
      </Container>
    </div>
	);
}

export default App;