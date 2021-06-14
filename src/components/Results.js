import React, { useState, useEffect } from 'react'

import { useHistory, useParams, useLocation} from "react-router-dom";
import {Link} from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { 
  Container, 
  Typography,
  Divider, 
  Box,
  requirePropFactory,
} from '@material-ui/core';

import _ from "lodash";
import axios from 'axios';

import {getPrivateKey} from "../utils"
import ObiWanKenobi from "../assets/obi-wan-kenobi.png"


// *****************************************************************************
// A) Component Stylying (Material UI)
// *****************************************************************************

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  mainContent: {
    width: 580,
    padding: theme.spacing(1),
    border: '1px solid',
    borderColor: theme.palette.grey[500],
  },
  list:{
    listStyleType: 'none',
    padding: theme.spacing(0,2),
    margin: theme.spacing(0,0,1),
  },
  listKey:{
    fontWeight: 'bold',
  },
  image: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "50%"
  }
}));


// *****************************************************************************
// B) Component Code
// *****************************************************************************

const Results = (props) => {
    

  // ---------------------------------------------------------------------------
  // I) Hooks and Variables
  // ---------------------------------------------------------------------------

  // i) Material UI Hooks
  const classes = useStyles();


  // ii) React Hooks - States
  const [requestedData, setRequestedData] = useState({});
  const [dataAvailable, setDataAvailable] = useState(true);
  const [homeworld, setHomeworld] = useState('');

  // iii) Lifting state variables from App component
  
  const {starWarsElement, setStarWarsElement, sendRequest, setSendRequest} = props;

  // iv) React Router Hooks - Parameters
  const params = useParams();
  const location = useLocation();

  // v) React Hooks - Effects

  useEffect(() => {
    
    if(params.field !== '' && params.field !== ''){
      console.log(params)
      setSendRequest(true);
      setStarWarsElement({
        field: params.field,
        id: params.id
      });
    }
  }, []);

  useEffect(() => {
    
    
    if(sendRequest){
      axios.get(`https://swapi.dev/api/${params.field}/${params.id}`)
        .then(res => {
            setRequestedData(res.data)
            setDataAvailable(true) 
        })
        .catch(err => {
            setRequestedData({})
            setDataAvailable(false)
            console.log(err)
        })
      setSendRequest(false);
    }
       
  }, [sendRequest, starWarsElement]);

  useEffect(() => {
    
    if(!_.isEmpty(requestedData) && params.field === "people"){
      axios.get(requestedData.homeworld)
      .then(res => {
          setHomeworld(res.data)
      })
      .catch(err => {
          console.log(err)
      })
    }
    else(
      setHomeworld({})
    )
      
  }, [requestedData]);

  // ---------------------------------------------------------------------------
  // II) Handlers
  // ---------------------------------------------------------------------------

  const handleCheckHomeworld = () => {
    setSendRequest(true);
    setStarWarsElement({
      field: 'planets',
      id: getPrivateKey(homeworld.url),
    });
  }

  // Adds the thousands separator
  function numberWithThousands(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // ---------------------------------------------------------------------------
  // III) JSX
  // ---------------------------------------------------------------------------

  return (
      <div className={classes.root}>  
          <div className={classes.mainContent}>  
          
          { (dataAvailable === true) 
          ?
          <>
            <Typography component="div">
              <Box fontWeight="fontWeightBold" fontSize={24} m={1}>
                {_.get(_.values(requestedData), 0)}
              </Box>
            </Typography>
            
            <ul className={classes.list}>
              { 
                (!_.isEmpty(requestedData)) && _.keys(requestedData).slice(1,5).map((key) => (
                  <Typography component="li" variant="subtitle1" align="left" key={key}>
                    <span className={classes.listKey}>{_.startCase(_.replace((key),/_/g," "))}
                    : </span> {!isNaN(requestedData[key]) ? numberWithThousands(requestedData[key]) : requestedData[key] }   
                  </Typography>
                ))
              }
              {
                (!_.isEmpty(homeworld)) && <Typography component="li" variant="subtitle1" align="left" >
                    <span className={classes.listKey}> Homeworld: </span>  
                    <Link to={`/planets/${getPrivateKey(homeworld.url)}`} onClick ={handleCheckHomeworld}>{homeworld.name}</Link>
                </Typography>
              }
            </ul>
          </>
          :
          <>
            <Typography component="div" variant="subtitle1" align="center">
              <span > Sorry, These aren't the droids you're looking for! </span>
            </Typography>
            <Box maxWidth="100%">
              <img src={ObiWanKenobi} alt="Obi-Wan-Kenovi" className={classes.image}/>
            </Box>
          </>
          }
        </div>    
      </div>
  )
}

export default Results