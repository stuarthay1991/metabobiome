import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form'
import useStyles from './css/useStyles.js';
import Grid from '@material-ui/core/Grid';
import { isBuild } from './utilities/constants.js';
import oncologo from './images/metabobiome_logo.png';

function loadAbout()
{
  document.getElementById("aboutpanel").style.display = "block";
  document.getElementById("tabcontent").style.display = "none";
}

function loadHome()
{
  document.getElementById("aboutpanel").style.display = "none";
  document.getElementById("tabcontent").style.display = "block";
}

function TopNav() {
  const classes = useStyles();
  const [pageTypeState, setPageTypeState] = React.useState({"value": "Individual Signatures", "initialized": false})
  var oncoimg = isBuild ? <img src="/ICGS/MetaboBiomeViewer/metabobiome_logo.png" alt="Logo" width="32" height="48"></img> : <img src={oncologo} alt="Logo" width="32" height="48"></img>;

  const onSelectHandle = (e) => {
    setPageTypeState({"value": e.target.value, "initialized": true});
  }

  React.useEffect(() => {
    if(pageTypeState.initialized)
    {
      if(pageTypeState.value == "Individual Signatures")
      {
        document.getElementById("tabcontent").style.display = "block";
        document.getElementById("pancancerpanel").style.display = "none";
      }
      else
      {
        document.getElementById("tabcontent").style.display = "none";
        document.getElementById("pancancerpanel").style.display = "block";        
      }
    }
  }, [pageTypeState.value])

  return (
    <div className={classes.mainpane} style={{ fontFamily: 'Roboto' }}>
      <div className={classes.mainpane_margin}>
      <Grid container spacing={1}>
        <Grid container item xs={8}>
        <Grid item>
          <div className={classes.cntr_special}>{oncoimg}</div>
        </Grid>
        <Grid item xs={5}>
          <div className={classes.cntr_special} style={{marginTop: 4, marginLeft: 6}}><h4>MetaboBiome Viewer</h4></div>
        </Grid>
        <Grid item xs={2}>
          <div id="LoadingStatusDisplay" style={{display: "none"}}>Loading...</div>
        </Grid>
        <Grid item xs={26}>
        </Grid>
        </Grid>
        <Grid container item xs={3} justifyContent="flex-end">
        <div className={classes.cntr_generic}><a onClick={loadHome} style={{cursor: "pointer"}}>Home</a> | <a onClick={loadAbout} style={{cursor: "pointer"}}>About</a> | <a href="https://www.synapse.org/#!Synapse:syn51607216/wiki/622401" target="_blank" style={{cursor: "pointer"}}>Download</a></div>
        </Grid>
      </Grid>
      </div>
    </div>
  );
}

export default TopNav;