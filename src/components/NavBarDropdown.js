import { Nav, Dropdown, Button, ButtonToolbar, IconButton} from "rsuite";
import "rsuite/dist/rsuite.min.css";
import React, { useRef } from "react";
import { makeRequest } from '../request/CancerDataManagement.js';
import Grid from '@material-ui/core/Grid';
import Form from 'react-bootstrap/Form'
import "./rsuitedropdown.css";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import { ViewArray } from "@material-ui/icons";

const StyledDropdown = withStyles({
  root: {
    fontSize: "0.5em"
  }
})(Dropdown);

const StyledDropdownItem = withStyles({
  root: {
    fontSize: "0.5em"
  }
})(Dropdown.Item);

const instance = (
  <ButtonToolbar>

   <Dropdown title="More..." >
       <Dropdown.Item >Edit</Dropdown.Item>
       <Dropdown.Item >View</Dropdown.Item>
       <Dropdown.Item >Delete</Dropdown.Item>
   </Dropdown>

   <Dropdown
     title="New"
     renderTitle={(children)=>{
       return <Button appearance="primary">{children} </Button>
     }}
     >
       <Dropdown.Item >New User</Dropdown.Item>
       <Dropdown.Item >New Group</Dropdown.Item>
   </Dropdown>

 </ButtonToolbar>
);

const cKitCell = ["naive_B","ERP2","DC","IG2","Mac_2","pro_B","Monocyte_3","Multi_Lin_2",
"proNeu_2","MEP","Mono","Monocyte_1","immNeu","Monocyte_2","ERP3","HSCP","preNeu_3","cMoP",
"NK","pre_B","Baso","Multi_Lin_1","ERP4","preNeu_2","Mast","MP","MPP4","MKP","MDP","ERP1",
"proNeu_1","preNeu_1"];

const spleenCell = ["naive_CD4_T_","pDC","Neu_c19","Naive_CD8_T_","DC_c1","Treg","DC_c4","plasma",
"inflammatory_Mac","NK","Basophil","Monocyte_derived_Mac","B","Mac","DC_c10","memory_T_","cell_cycle",
"Neu_c5","cDC1"];

const boneMarrowCell = ["Mac_c9","HSCP_MPP_c13","Mast_c10","Neu_c22","proNeu_1_c12",
"Neu_c18","Neu_c38","pre_B_c3","Eryth_c33","Neu_c29","NK_c11","Mast_c32","DC_c17","MPP_c24",
"monocyte_c26","Neu_c51","naive_B_c14","Mac_c8","proNeu_1_c6","pro_B_c30","monocyte_c27",
"B_cell_c16","Eryth_c4","T_cell_c25","Neu_c39","IG2_c19","monocyte_c28","Pro_B_c21",
"HSCP_MPP_c31"]

const serumCell = ["All"];

var cKitSig = "ERP4__WR_vs_GF#ERP2__WR_vs_GF#pro-B__ASF_vs_GF#Mono__WR_vs_GF#cMoP__MPF_vs_GF#DC__ASF_vs_GF#Multi-Lin-1__MPF_vs_GF#MKP__WR_vs_GF#ERP1__WR_vs_GF#ERP4__MPF_vs_GF#naive B__MPF_vs_GF#MDP__ASF_vs_GF#naive B__WR_vs_GF#immNeu__EF_vs_GF#ERP1__MPF_vs_GF#MKP__MPF_vs_GF#immNeu__WR_vs_GF#IG2__MPF_vs_GF#preNeu-3__WR_vs_GF#MEP__EF_vs_GF#NK__EF_vs_GF#proNeu-2__ASF_vs_GF#preNeu-1__MPF_vs_GF#MDP__EF_vs_GF#HSCP__WR_vs_GF#MP__EF_vs_GF#ERP3__WR_vs_GF#ERP3__ASF_vs_GF#MPP4__EF_vs_GF#MKP__ASF_vs_GF#preNeu-2__WR_vs_GF#MPP4__MPF_vs_GF#MDP__WR_vs_GF#MKP__EF_vs_GF#MDP__MPF_vs_GF#ERP3__EF_vs_GF#proNeu-1__MPF_vs_GF#proNeu-2__WR_vs_GF#NK__MPF_vs_GF#DC__MPF_vs_GF#ERP2__EF_vs_GF#MPP4__WR_vs_GF#proNeu-2__EF_vs_GF#ERP3__MPF_vs_GF#preNeu-1__WR_vs_GF#Multi-Lin-2__MPF_vs_GF#proNeu-1__ASF_vs_GF#pre-B__MPF_vs_GF#proNeu-1__WR_vs_GF#cMoP__ASF_vs_GF#MP__WR_vs_GF#IG2__WR_vs_GF#Multi-Lin-1__ASF_vs_GF#MEP__MPF_vs_GF#ERP1__EF_vs_GF#preNeu-3__ASF_vs_GF#ERP2__MPF_vs_GF#Mono__EF_vs_GF#MEP__WR_vs_GF#pro-B__EF_vs_GF#Multi-Lin-2__EF_vs_GF#proNeu-1__EF_vs_GF#Multi-Lin-2__WR_vs_GF#IG2__EF_vs_GF#preNeu-2__ASF_vs_GF#naive B__ASF_vs_GF#ERP1__ASF_vs_GF#HSCP__EF_vs_GF#preNeu-1__ASF_vs_GF#preNeu-3__MPF_vs_GF#ERP4__ASF_vs_GF#pro-B__MPF_vs_GF#DC__EF_vs_GF#MP__ASF_vs_GF#pre-B__EF_vs_GF#Multi-Lin-2__ASF_vs_GF#preNeu-2__MPF_vs_GF#ERP4__EF_vs_GF#HSCP__ASF_vs_GF#preNeu-2__EF_vs_GF#Multi-Lin-1__WR_vs_GF#cMoP__WR_vs_GF#IG2__ASF_vs_GF#pre-B__ASF_vs_GF#Mono__ASF_vs_GF#DC__WR_vs_GF#MP__MPF_vs_GF#pre-B__WR_vs_GF#Multi-Lin-1__EF_vs_GF#preNeu-3__EF_vs_GF#proNeu-2__MPF_vs_GF#immNeu__ASF_vs_GF#ERP2__ASF_vs_GF#pro-B__WR_vs_GF#naive B__EF_vs_GF#MEP__ASF_vs_GF#HSCP__MPF_vs_GF#MPP4__ASF_vs_GF#preNeu-1__EF_vs_GF#immNeu__MPF_vs_GF#Mono__MPF_vs_GF";
var boneMarrowSig = "proNeu-1_c12__ASF_vs_GF#Neu_c39__MPF_vs_GF#IG2_c19__MPF_vs_GF#Mast_c32__MPF_vs_GF#monocyte_c27__WR_vs_GF#IG2_c19__EF_vs_GF#DC_c17__EF_vs_GF#T cell_c25__EF_vs_GF#monocyte_c26__EF_vs_GF#Neu_c22__WR_vs_GF#monocyte_c27__MPF_vs_GF#IG2_c19__WR_vs_GF#NK_c11__ASF_vs_GF#pre-B_c3__MPF_vs_GF#Mac_c9__WR_vs_GF#B-cell_c16__ASF_vs_GF#monocyte_c27__EF_vs_GF#Pro-B_c21__EF_vs_GF#pro-B_c30__ASF_vs_GF#Eryth_c33__WR_vs_GF#Mast_c10__WR_vs_GF#MPP_c24__MPF_vs_GF#Pro-B_c21__MPF_vs_GF#NK_c11__MPF_vs_GF#Mast_c32__EF_vs_GF#T cell_c25__WR_vs_GF#Eryth_c33__EF_vs_GF#Neu_c51__WR_vs_GF#Neu_c22__MPF_vs_GF#Neu_c38__WR_vs_GF#monocyte_c28__ASF_vs_GF#B-cell_c16__MPF_vs_GF#Neu_c18__ASF_vs_GF#Eryth_c33__MPF_vs_GF#naive B_c14__ASF_vs_GF#Neu_c22__ASF_vs_GF#HSCP-MPP_c13__EF_vs_GF#MPP_c24__WR_vs_GF#monocyte_c28__EF_vs_GF#proNeu-1_c12__WR_vs_GF#monocyte_c28__MPF_vs_GF#HSCP-MPP_c31__MPF_vs_GF#Mast_c32__ASF_vs_GF#pre-B_c3__ASF_vs_GF#naive B_c14__WR_vs_GF#monocyte_c28__WR_vs_GF#proNeu-1_c6__EF_vs_GF#Neu_c18__MPF_vs_GF#Neu_c39__WR_vs_GF#IG2_c19__ASF_vs_GF#naive B_c14__MPF_vs_GF#Mac_c9__EF_vs_GF#NK_c11__EF_vs_GF#Eryth_c4__MPF_vs_GF#Mac_c9__MPF_vs_GF#NK_c11__WR_vs_GF#Mac_c9__ASF_vs_GF#HSCP-MPP_c31__WR_vs_GF#Neu_c51__ASF_vs_GF#HSCP-MPP_c13__WR_vs_GF#T cell_c25__ASF_vs_GF#naive B_c14__EF_vs_GF#Eryth_c4__EF_vs_GF#MPP_c24__ASF_vs_GF#T cell_c25__MPF_vs_GF#proNeu-1_c6__WR_vs_GF#Eryth_c4__WR_vs_GF#HSCP-MPP_c13__MPF_vs_GF#pro-B_c30__MPF_vs_GF#MPP_c24__EF_vs_GF#monocyte_c27__ASF_vs_GF#Eryth_c33__ASF_vs_GF#Neu_c22__EF_vs_GF#Neu_c38__ASF_vs_GF#pre-B_c3__WR_vs_GF#pro-B_c30__WR_vs_GF#Neu_c38__MPF_vs_GF#monocyte_c26__WR_vs_GF#Mac_c8__EF_vs_GF#Mac_c8__MPF_vs_GF#Mac_c8__ASF_vs_GF#Pro-B_c21__ASF_vs_GF#Neu_c39__EF_vs_GF#pro-B_c30__EF_vs_GF#HSCP-MPP_c31__ASF_vs_GF#B-cell_c16__EF_vs_GF#Pro-B_c21__WR_vs_GF#Eryth_c4__ASF_vs_GF#DC_c17__ASF_vs_GF#HSCP-MPP_c31__EF_vs_GF#DC_c17__WR_vs_GF#HSCP-MPP_c13__ASF_vs_GF#monocyte_c26__MPF_vs_GF#pre-B_c3__EF_vs_GF#Neu_c18__WR_vs_GF#B-cell_c16__WR_vs_GF#monocyte_c26__ASF_vs_GF#Mast_c32__WR_vs_GF#DC_c17__MPF_vs_GF#Neu_c39__ASF_vs_GF#proNeu-1_c12__MPF_vs_GF#Neu_c51__EF_vs_GF#Neu_c51__MPF_vs_GF#proNeu-1_c12__EF_vs_GF#Neu_c18__EF_vs_GF#proNeu-1_c6__MPF_vs_GF#proNeu-1_c6__ASF_vs_GF#Neu_c38__EF_vs_GF";
var spleenSig = "Mac__WR_vs_GF#B__OF_vs_GF#Naive CD8 T__OF_vs_GF#DC-c1__WR_vs_GF#B__WR_vs_GF#memory T__MPF_vs_GF#memory T__OF_vs_GF#Naive CD8 T__MPF_vs_GF#Neu-c5__ASF_vs_GF#Basophil__OF_vs_GF#memory T__ASF_vs_GF#pDC__OF_vs_GF#DC-c10__OF_vs_GF#DC-c10__ASF_vs_GF#pDC__WR_vs_GF#Treg__OF_vs_GF#B__ASF_vs_GF#DC-c4__MPF_vs_GF#cell-cycle__OF_vs_GF#inflammatory Mac__ASF_vs_GF#Neu-c5__WR_vs_GF#DC-c10__WR_vs_GF#inflammatory Mac__OF_vs_GF#memory T__WR_vs_GF#NK__MPF_vs_GF#DC-c4__WR_vs_GF#Naive CD4 T__ASF_vs_GF#DC-c1__ASF_vs_GF#DC-c4__OF_vs_GF#Mac__ASF_vs_GF#cell-cycle__MPF_vs_GF#Basophil__ASF_vs_GF#Treg__ASF_vs_GF#inflammatory Mac__WR_vs_GF#B__MPF_vs_GF#NK__OF_vs_GF#Naive CD8 T__WR_vs_GF#NK__WR_vs_GF#cDC1__OF_vs_GF#Naive CD8 T__ASF_vs_GF#cDC1__ASF_vs_GF#DC-c4__ASF_vs_GF#cell-cycle__WR_vs_GF#Monocyte derived Mac__OF_vs_GF#Neu-c5__MPF_vs_GF#pDC__ASF_vs_GF#pDC__MPF_vs_GF#Monocyte derived Mac__WR_vs_GF#NK__ASF_vs_GF#DC-c10__MPF_vs_GF#cDC1__MPF_vs_GF#Treg__WR_vs_GF#Treg__MPF_vs_GF#Mac__OF_vs_GF#inflammatory Mac__MPF_vs_GF#cell-cycle__ASF_vs_GF#DC-c1__OF_vs_GF#Naive CD4 T__OF_vs_GF#Monocyte derived Mac__MPF_vs_GF#Neu-c5__OF_vs_GF#plasma__OF_vs_GF#cDC1__WR_vs_GF#Naive CD4 T__WR_vs_GF#Mac__MPF_vs_GF#Monocyte derived Mac__ASF_vs_GF#DC-c1__MPF_vs_GF#Naive CD4 T__MPF_vs_GF";
var serumSig = "ASF_vs_GF#EF_vs_GF#WR_vs_GF#MPF_vs_GF";

cKitSig = cKitSig.replaceAll("-", "_")
cKitSig = cKitSig.split("#")
cKitSig = cKitSig.sort()

boneMarrowSig = boneMarrowSig.replaceAll("-", "_")
boneMarrowSig = boneMarrowSig.split("#")
boneMarrowSig = boneMarrowSig.sort()

spleenSig = spleenSig.replaceAll("-", "_")
spleenSig = spleenSig.split("#")
spleenSig = spleenSig.sort()

serumSig = serumSig.replaceAll("-", "_")
serumSig = serumSig.split("#")
serumSig = serumSig.sort()

const mapper = {"ckit_progenitor": {"cell": cKitCell,"sig": cKitSig}, 
"bonemarrow": {"cell": boneMarrowCell,"sig": boneMarrowSig},
"spleen": {"cell": spleenCell,"sig": spleenSig},
"serum": {"cell": serumCell,"sig": serumSig}};

function HayDropdown(props){
  return(
  <Dropdown.Item eventKey={props.eventKey} style={{fontSize: 11, margin: 1, padding: 1}}>
  {props.displayName}
  </Dropdown.Item>
  );
}

function Header({setViewPane, setPanCancerState}){
    //Heatmap Data State
    //Make request on change
    const [tissueTypeState, setTissueTypeState] = React.useState({"tissueType": "serum", "initialized": false});
    const [cellTypeState, setCellTypeState] = React.useState({"cellType": "All", "initialized": false});
    const [tissueSigState, setTissueSigState] = React.useState({"tissueType": "serum", "initialized": false});
    const [tissueCellState, setTissueCellState] = React.useState({"cellType": "All", "initialized": false});
    const [sigState, setSigState] = React.useState({"sigName": "ASF_vs_GF", "initialized": false});

    const [cellListState, setCellListState] = React.useState(serumCell);
    const [sigListState, setSigListState] = React.useState(serumSig);
    const [blockState, setBlockState] = React.useState({"value": true, "method": "initial"});

    const tissueSelectHandle = (e) => {
        setTissueTypeState({"tissueType": e, "initialized": true});
        setCellListState(mapper[e]["cell"].sort());
    }

    const cellTypeSelectHandle = (e) => {
        setCellTypeState({"cellType": e, "initialized": true});
    }

    const tissueSigSelectHandle = (e) => {
        setTissueSigState({"tissueType": e, "initialized": true});
        setSigListState(mapper[e]["sig"]);
    }

    const tissueCellSelectHandle = (e) => {
        setTissueCellState({"cellType": e, "initialized": true});
        for(let i = 0; i < mapper[tissueSigState.tissueType]["sig"].length; i++)
        {
          let check1 = mapper[tissueSigState.tissueType]["sig"][i].split("__");
          if(check1[0] == e)
          {
            setSigState({"sigName": mapper[tissueSigState.tissueType]["sig"][i], "initialized": true});
            break;
          }
        }
    }

    const sigSelectHandle = (e) => {
        setSigState({"sigName": e, "initialized": true})
    }

    const prevTissueTypeStateRef = useRef();
    const prevTissueSigStateRef = useRef();

    React.useEffect(() => {
      var condition1 = tissueTypeState.tissueType == "serum" && tissueSigState.tissueType != "serum";
      var condition2 = tissueTypeState.tissueType != "serum" && tissueSigState.tissueType == "serum";
      var condition4 = tissueTypeState.tissueType == "serum" && tissueSigState.tissueType == "serum";
      var condition5 = tissueTypeState.tissueType != "serum" && tissueSigState.tissueType != "serum";
      if(cellTypeState.initialized == true || sigState.initialized == true || blockState.method != "initial")
      {
          if(blockState.value == false)
          {
            console.log("TTT", tissueTypeState.tissueType, tissueSigState.tissueType, cellTypeState.cellType, sigState.sigName);
            let heatmapArgs = {};
            heatmapArgs["tissueType"] = tissueTypeState.tissueType;
            heatmapArgs["cellType"] = cellTypeState.cellType;
            heatmapArgs["sigType"] = tissueSigState.tissueType;
            heatmapArgs["sigName"] = sigState.sigName;
            heatmapArgs["document"] = document;
            heatmapArgs["callback"] = setViewPane;
            makeRequest("updateHeatmapData", heatmapArgs);
          }
          else
          {
            if(condition5 || condition4)
            {
              setBlockState({"value": false, "method": "initial"});
            }
            else
            {
              var methodGet = blockState.method.split("_");
              if(methodGet[0] == "toSerum")
              {
                if(methodGet[1] == "tissue")
                {
                    var defaultCell = mapper[tissueTypeState.tissueType]["cell"][0];
                    setCellTypeState({"cellType": defaultCell, "initialized": true});
                    setCellListState(mapper[tissueTypeState.tissueType]["cell"].sort());
                    setSigListState(mapper[tissueTypeState.tissueType]["sig"]);
                    if(cellTypeState.cellType == defaultCell)
                    {
                      setTissueSigState({"tissueType": "serum", "initialized": true})
                      setTissueCellState({"cellType": "All", "initialized": true});
                    }
                }
                else if(methodGet[1] == "sig")
                {
                    var defaultSig = mapper[tissueSigState.tissueType]["sig"][0];
                    setSigState({"sigName": defaultSig, "initialized": true});
                    setCellListState(mapper[tissueSigState.tissueType]["cell"].sort());
                    setSigListState(mapper[tissueSigState.tissueType]["sig"]);
                    if(sigState.sigName == defaultSig)
                    {
                      setTissueTypeState({"tissueType": "serum", "initialized": true})
                      setTissueCellState({"cellType": "All", "initialized": true});
                    }
                }
              }
              else if(methodGet[0] == "awaySerum")
              {
                if(methodGet[1] == "tissue")
                {
                    var defaultCell = mapper[tissueTypeState.tissueType]["cell"][0];
                    if(tissueTypeState.tissueType == "ckit_progenitor")
                    {
                      defaultCell = "ERP4";
                    }
                    setCellTypeState({"cellType": defaultCell, "initialized": true});
                    setCellListState(mapper[tissueTypeState.tissueType]["cell"].sort());
                    setSigListState(mapper[tissueTypeState.tissueType]["sig"]);
                    if(cellTypeState.cellType == defaultCell)
                    {
                      setTissueSigState({"tissueType": tissueTypeState.tissueType, "initialized": true})
                      setTissueCellState({"cellType": defaultCell, "initialized": true});
                    }
                }
                else if(methodGet[1] == "sig")
                {
                    var defaultSig = mapper[tissueSigState.tissueType]["sig"][0];
                    if(tissueSigState.tissueType == "ckit_progenitor")
                    {
                      defaultSig = "ERP4__WR_vs_GF";
                    }
                    if(tissueSigState.tissueType == "bonemarrow")
                    {
                      defaultSig = "Eryth_c4__ASF_vs_GF";
                    }
                    setSigState({"sigName": defaultSig, "initialized": true});
                    setCellListState(mapper[tissueSigState.tissueType]["cell"].sort());
                    setSigListState(mapper[tissueSigState.tissueType]["sig"]);
                    if(sigState.sigName == defaultSig)
                    {
                      setTissueTypeState({"tissueType": tissueSigState.tissueType, "initialized": true})
                      let getTC = defaultSig.split("__");
                      setTissueCellState({"cellType": getTC[0], "initialized": true});
                    }
                }
              }
            }
          }
      }
    }, [cellTypeState, sigState, blockState])

    React.useEffect(() => {
      if(tissueTypeState.initialized == true || tissueSigState.initialized == true)
      {
        var condition1 = tissueTypeState.tissueType == "serum" && tissueSigState.tissueType != "serum";
        var condition2 = tissueTypeState.tissueType != "serum" && tissueSigState.tissueType == "serum";
        var condition3 = prevTissueTypeStateRef.current.tissueType != "serum" && prevTissueSigStateRef.current.tissueType != "serum";
        var condition4 = tissueTypeState.tissueType == "serum" && tissueSigState.tissueType == "serum";
        var condition5 = tissueTypeState.tissueType != "serum" && tissueSigState.tissueType != "serum";
        var condition6 = prevTissueTypeStateRef.current.tissueType == "serum" && prevTissueSigStateRef.current.tissueType == "serum";  
        if(condition5 || condition4)
        {
          if(prevTissueTypeStateRef.current.tissueType != tissueTypeState.tissueType)
          {
            var defaultCell = mapper[tissueTypeState.tissueType]["cell"][0];
            if(tissueTypeState.tissueType == "ckit_progenitor")
            {
              defaultCell = "ERP4";
            }
            setCellTypeState({"cellType": defaultCell, "initialized": true});
            //setTissueCellState({"cellType": defaultCell, "initialized": true});
          }
          if(prevTissueSigStateRef.current.tissueType != tissueSigState.tissueType)
          {
            var defaultSig = mapper[tissueSigState.tissueType]["sig"][0];
            if(tissueSigState.tissueType == "ckit_progenitor")
            {
              defaultSig = "ERP4__WR_vs_GF";
            }
            if(tissueSigState.tissueType == "bonemarrow")
            {
              defaultSig = "Eryth_c4__ASF_vs_GF";
            }
            setSigState({"sigName": defaultSig, "initialized": true});
            let getTC = defaultSig.split("__");
            if(tissueSigState.tissueType == "serum")
            {
              setTissueCellState({"cellType": "All", "initialized": true});
            }
            else
            {
              setTissueCellState({"cellType": getTC[0], "initialized": true});
            }
          }

        }
        else if(condition1 || condition2)
        {
          console.log("conditionals:", condition1, condition2, condition3, condition4, condition5, condition6);
          if(condition3)
          {
            console.log("c3 conditionals:", prevTissueTypeStateRef.current.tissueType != tissueTypeState.tissueType, prevTissueSigStateRef.current.tissueType != tissueSigState.tissueType)
            if(prevTissueTypeStateRef.current.tissueType != tissueTypeState.tissueType)
            {
              setBlockState({"value": true, "method": "toSerum_tissue"});
            }
            if(prevTissueSigStateRef.current.tissueType != tissueSigState.tissueType)
            {
              setBlockState({"value": true, "method": "toSerum_sig"});
            }
            
          }
          if(condition6)
          {
            if(prevTissueTypeStateRef.current.tissueType != tissueTypeState.tissueType)
            {
              setBlockState({"value": true, "method": "awaySerum_tissue"});
            }
            if(prevTissueSigStateRef.current.tissueType != tissueSigState.tissueType)
            {
              setBlockState({"value": true, "method": "awaySerum_sig"});
            }
          }
        }
      }

      prevTissueTypeStateRef.current = tissueTypeState;
      prevTissueSigStateRef.current = tissueSigState;
    }, [tissueTypeState, tissueSigState])

    return(
      <div>
        <Grid container spacing={1}>
        <Grid item>
        <Dropdown
                title="Data Type"
                renderTitle={(children)=>{
                  return <Button appearance="primary">{children} </Button>
                }}
                activeKey={"metabolite"}
                placement="bottomEnd"
                trigger = "hover">
                <HayDropdown eventKey="rna" displayName="RNA"></HayDropdown>
                <HayDropdown eventKey="metabolite" displayName="Metabolite"></HayDropdown>
        </Dropdown>
        <br/>
        <div style={{textAlign: "center", color: "blue"}}><strong>{"NA"}</strong></div>
        </Grid>
        <Grid item>
        <Dropdown
                title="Tissue Type"
                onSelect={tissueSelectHandle}
                renderTitle={(children)=>{
                  return <Button appearance="primary">{children} </Button>
                }}
                activeKey={tissueTypeState.tissueType}
                placement="bottomEnd"
                trigger = "hover">
                <HayDropdown eventKey="ckit_progenitor" displayName="cKit_progenitor"></HayDropdown>
                <HayDropdown eventKey="bonemarrow" displayName="Bone Marrow"></HayDropdown>
                <HayDropdown eventKey="spleen" displayName="Spleen"></HayDropdown>
                <HayDropdown eventKey="serum" displayName="Serum"></HayDropdown>
        </Dropdown>
        <br/>
        <div style={{textAlign: "center", color: "blue"}}><strong>{tissueTypeState.tissueType}</strong></div>
        </Grid>
        <Grid item>
        <Dropdown
                title="Cell Type"
                onSelect={cellTypeSelectHandle}
                renderTitle={(children)=>{
                  return <Button appearance="primary">{children} </Button>
                }}
                activeKey={cellTypeState.cellType}
                placement="bottomEnd"
                trigger = "hover">
                {(() => {
                  const dropdownItems = []; 
                  for(let i = 0; i < cellListState.length; i++)
                  {
                    if(cellListState[i].indexOf(" ") == -1)
                    {
                      dropdownItems.push(<HayDropdown eventKey={cellListState[i]} displayName={cellListState[i]}></HayDropdown>)
                    }
                  }
                  return dropdownItems;
                })()}                
        </Dropdown>
        <br/>
        <div style={{textAlign: "center", color: "blue"}}><strong>{cellTypeState.cellType}</strong></div>
        </Grid>
        <Grid item>
        <Dropdown
                title="Tissue Signature"
                onSelect={tissueSigSelectHandle}
                renderTitle={(children)=>{
                  return <Button appearance="primary">{children} </Button>
                }}
                activeKey={tissueSigState.tissueType}
                placement="bottomEnd"
                trigger = "hover">
                <HayDropdown eventKey="ckit_progenitor" displayName="cKit_progenitor"></HayDropdown>
                <HayDropdown eventKey="bonemarrow" displayName="Bone Marrow"></HayDropdown>
                <HayDropdown eventKey="spleen" displayName="Spleen"></HayDropdown>
                <HayDropdown eventKey="serum" displayName="Serum"></HayDropdown>
        </Dropdown> 
        <br/>
        <div style={{textAlign: "center", color: "blue"}}><strong>{tissueSigState.tissueType}</strong></div>
        </Grid>
        <Grid item>
        <Dropdown
                title="Cell Type Signature"
                onSelect={tissueCellSelectHandle}
                renderTitle={(children)=>{
                  return <Button appearance="primary">{children} </Button>
                }}
                activeKey={tissueCellState.cellType}
                placement="bottomEnd"
                trigger = "hover">
                {(() => {
                  const dropdownItems = []; 
                  for(let i = 0; i < mapper[tissueSigState.tissueType]["cell"].length; i++)
                  {
                    if(mapper[tissueSigState.tissueType]["cell"][i].indexOf(" ") == -1)
                    {
                      dropdownItems.push(<HayDropdown eventKey={mapper[tissueSigState.tissueType]["cell"][i]} displayName={mapper[tissueSigState.tissueType]["cell"][i]}></HayDropdown>)
                    }
                  }
                  return dropdownItems;
                })()} 
        </Dropdown> 
        <br/>
        <div style={{textAlign: "center", color: "blue"}}><strong>{tissueCellState.cellType}</strong></div>
        </Grid>
        <Grid item>
        <Dropdown
                title="Signature Select"
                onSelect={sigSelectHandle}
                renderTitle={(children)=>{
                  return <Button appearance="primary">{children} </Button>
                }}
                activeKey={sigState.sigName}
                placement="bottomEnd"
                trigger = "hover">
                <div style={{fontSize: 6, margin: 0, padding: 0}}>
                {(() => {

                  var listSplit = false;
                  if(sigListState.length > 140)
                  {
                    listSplit = true;
                  }
                  const dropdownItems = []; 
                  if(listSplit)
                  {
                    var prefix = {};
                    for(let i = 0; i < sigListState.length; i++)
                    {
                      let p1 = sigListState[i].split("__");
                      if(prefix[p1[0]] == undefined)
                      {
                        prefix[p1[0]] = [sigListState[i]];
                      }
                      else
                      {
                        prefix[p1[0]].push(sigListState[i]);
                      }
                    }
                    var pCount = 0;
                    for (const [key, value] of Object.entries(prefix))
                    {
                        let newDropdownItems = [];
                        for(let i = 0; i < value.length; i++)
                        {
                            newDropdownItems.push(<Dropdown.Item eventKey={[value[i]]} style={{fontSize: 12, margin: 0, padding: 0}}>{value[i]}</Dropdown.Item>)
                        }
                        var placeVar = "rightStart"
                        if(pCount > 9)
                        {
                          placeVar = "rightEnd"
                        }
                        pCount = pCount + 1;
                        dropdownItems.push(<div style={{opacity: 1, margin: 0, padding: 0}}><Dropdown.Menu
                                            title={key}
                                            onSelect={sigSelectHandle}
                                            activeKey={sigState.sigName}
                                            placement={placeVar}
                                            trigger = "hover"
                                            size = "xs"
                                            style={{opacity: 1, margin: 0, padding: 0}}>{<div style={{opacity: 1, margin: 0, padding: 0}}>{newDropdownItems}</div>}
                                            </Dropdown.Menu></div>)
                        
                    }
                  }
                  else
                  {
                    for(let i = 0; i < sigListState.length; i++)
                    {
                      if(tissueCellState.cellType == "All")
                      {
                        if(sigListState[i].indexOf(" ") == -1)
                        {
                          dropdownItems.push(<HayDropdown eventKey={sigListState[i]} displayName={sigListState[i]}></HayDropdown>)
                        }
                      }
                      else
                      {
                        if(sigListState[i].indexOf(tissueCellState.cellType) != -1)
                        {
                          let check1 = sigListState[i].split("__");
                          if(check1[0] == tissueCellState.cellType)
                          {
                            dropdownItems.push(<HayDropdown eventKey={sigListState[i]} displayName={sigListState[i]}></HayDropdown>)
                          }
                        }
                      }
                    }
                  }
                  return dropdownItems;
                })()}
                </div>
        </Dropdown>
        <br/>
        <div style={{textAlign: "center", color: "blue"}}><strong>{sigState.sigName}</strong></div>
        </Grid>
        </Grid>
      </div>);
    
}

export default Header;