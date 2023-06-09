import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { borders } from '@material-ui/system';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#0F6A8B',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    color: '#0F6A8B',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const tableStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

function gCheck(rname, rval) {
  if(rname == "Symbol"){
    if(rval != "NA"){
      var linkout = "https://www.genecards.org/cgi-bin/carddisp.pl?gene=".concat(rval);
      var retval = <a href={linkout} style={{textDecoration: "underlined"}} target="_blank"><u>{rval}</u></a>
      return retval;
    }
    else{
      return rval;
    }
  }
  else{
    return rval;
  }
}

function CustomizedTables(props) {
  const classes = tableStyles();
  //https://www.genecards.org/cgi-bin/carddisp.pl?gene=
  return (
    <div>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="left">Value</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.contents.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
              <StyledTableCell align="left">{gCheck(row.name, row.value)}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default CustomizedTables;