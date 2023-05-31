import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Responsive, WidthProvider } from "react-grid-layout";
import { Resizable, ResizableBox } from "react-resizable";
import CustomizedTables from './components/CustomizedTables';
import SpcInputLabel from './components/SpcInputLabel';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import './css/sidebar.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

import * as d3 from 'd3';
import useStyles from './css/useStyles.js';
import { global_colors } from './utilities/constants.js';
import { isBuild } from './utilities/constants.js';
import cellGroupViolinPlotPanel from './plots/cellGroupViolinPlotPanel';
import PlotPanel from './plots/plotPanel';

var routeurl = isBuild ? "http://www.altanalyze.org/oncosplice" : "http://localhost:8081";

var global_meta = [];
var global_sig = [];
var global_data = [];
var global_uifielddict = {};
var global_cancer = "";
var global_signature = "";
var global_trans = "";
var global_cols = [];
var global_cc = [];
var global_OncospliceClusters = [];
var global_Y = "";
var global_adj_height = "";
var global_heat_len = "";
var global_tissue = "";
var link1 = "http://genome.ucsc.edu/cgi-bin/hgTracks?db=mm10&lastVirtModeType=default&lastVirtModeExtraState=&virtModeType=default&virtMode=0&nonVirtPosition=&position=";
var link2 = "http://genome.ucsc.edu/cgi-bin/hgTracks?db=mm10&lastVirtModeType=default&lastVirtModeExtraState=&virtModeType=default&virtMode=0&nonVirtPosition=&position=";

function plotUIDupdate(dat)
{
  this.setState({
    fulldat: dat
  })    
}

const defaultProps = {
  m: 0.1,
};

const boxProps = {
  border: 3,
};

const gridLayoutStyle = {
  overflow: "scroll",
  margin: 1
}

const boxProps_padding = {
  border: 3,
  margin: 0.1,
  paddingRight: '2px',
  display: 'inline-block',
};

function updateOkmapLabel(data){
  this.setState({
    retcols: data
  });
}

function createData(name, value) {
  return { name, value };
}

var rows = [
  createData('-none selected-', '-none selected-'),
];

class Heatmap extends React.Component {
  constructor(props) {
    super(props);
    this.xscale = 0;
    this.state = {
      output: null,
      label: null,
      CC: null,
      OncospliceClusters: null
    };
  }
  componentDidMount() { 
    //console.log("HEATMAP RE-MOUNTED:", this.props.data);
    var base_re_wid = window.innerWidth;
    var base_re_high = window.innerHeight;
    var standard_width = 1438;
    var standard_height = 707;
    var adjust_width = (base_re_wid / standard_width) * 1.5;
    var adjust_height = (base_re_high / standard_height) * 1.5;
    var xscale = ((500/this.props.cols.length) * adjust_width);
    this.xscale = xscale;
    var y_start = 0;
    var universal_y = 15;
    document.getElementById("HEATMAP_0").style.transform = "scaleY(1)";
    global_Y = universal_y;
    global_adj_height = adjust_height;
    global_heat_len = this.props.data.length;
    var y_scaling = universal_y;
    var escale = (this.props.cols.length * (this.xscale - 0.1));

    document.getElementById("HEATMAP_0").style.width = escale.toString().concat("px");
    this.setState({
      output: <OKMAP 
                dataset={this.props.data} 
                column_names={this.props.cols} 
                chem={this.props.chem}
                gene={this.props.gene}
                len={this.props.data.length} 
                doc={document} 
                target_div_id={"HEATMAP_0"} 
                xscale={xscale} 
                yscale={y_scaling} 
                norm={1}
                viewState={this.props.viewState}
                setViewState={this.props.setViewState}
                selectionState={this.props.selectionState}
                setSelectionState={this.props.setSelectionState}
                filterState={this.props.filterState}
                setFilterState={this.props.setFilterState}
                plotUIDstate={this.props.plotUIDstate}
                setPlotUIDstate={this.props.setPlotUIDstate}
                >
                </OKMAP>,
      label: <OKMAP_LABEL 
              target_div_id={"HEATMAP_LABEL"} 
              column_names={this.props.cols} 
              groups={this.props.groups}
              doc={document} 
              xscale={this.xscale}
              QueryExport={this.props.QueryExport}/>
    })
  }

  componentDidUpdate(prevProps) {
    //console.log("HHprop", this.props.QueryExport["single"], prevProps.QueryExport["single"])
    var oldKeys = [];
    var newKeys = [];
    for(let i = 0; i < this.props.data.length; i++)
    {
      newKeys.push(this.props.data[i]["uid"])
    }
    newKeys = newKeys.join("#");
    for(let k = 0; k < prevProps.data.length; k++)
    {
      oldKeys.push(prevProps.data[k]["uid"])
    }
    oldKeys = oldKeys.join("#");
    if((newKeys != oldKeys) || (this.props.cols.join("#") != prevProps.cols.join("#")))
    {
      //console.log("HEATMAP RE-RENDERED:", this.props.QueryExport["single"]);
      var base_re_wid = window.innerWidth;
      var base_re_high = window.innerHeight;
      var standard_width = 1438;
      var standard_height = 707;
      var adjust_width = (base_re_wid / standard_width) * 1.5;
      var adjust_height = (base_re_high / standard_height) * 1.5;
      var xscale = ((500/this.props.cols.length) * adjust_width);
      this.xscale = xscale;
      var y_start = 0;
      var universal_y = 15;
      document.getElementById("HEATMAP_0").style.transform = "scaleY(1)";
      global_Y = universal_y;
      global_adj_height = adjust_height;
      global_heat_len = this.props.data.length;
      var y_scaling = universal_y;
      var escale = (this.props.cols.length * (this.xscale - 0.1));

      document.getElementById("HEATMAP_0").style.width = escale.toString().concat("px");

      this.setState({
        output: <OKMAP 
                  dataset={this.props.data}
                  column_names={this.props.cols} 
                  chem={this.props.chem}
                  gene={this.props.gene}
                  len={this.props.data.length} 
                  doc={document} 
                  target_div_id={"HEATMAP_0"} 
                  xscale={this.xscale} 
                  yscale={y_scaling} 
                  norm={1}
                  viewState={this.props.viewState}
                  setViewState={this.props.setViewState}
                  selectionState={this.props.selectionState}
                  setSelectionState={this.props.setSelectionState}
                  filterState={this.props.filterState}
                  setFilterState={this.props.setFilterState}
                  plotUIDstate={this.props.plotUIDstate}
                  setPlotUIDstate={this.props.setPlotUIDstate}
                  >
                  </OKMAP>,
        label: <OKMAP_LABEL 
                  target_div_id={"HEATMAP_LABEL"} 
                  column_names={this.props.cols}
                  groups={this.props.groups}
                  doc={document} 
                  xscale={this.xscale}
                  QueryExport={this.props.QueryExport}/>
      })
    }
  }

  render()
  {
    return(
      <div>
      {this.state.output}
      {this.state.label}
      </div>
    );
  }
}

function zoomInHeatmap()
{
  if(global_Y >= (400 * global_adj_height))
  {
    return;
  }
  else
  {
    var temp_y_set = global_Y * 1.5;

    var captain_burgerpants = temp_y_set / 15;

    document.getElementById("HEATMAP_0").style.transformOrigin = "0 0";
    document.getElementById("HEATMAP_0").style.overflowY = "visible";
    document.getElementById("HEATMAP_0").style.height = document.getElementById("HEATMAP_0").style.height * captain_burgerpants;
    document.getElementById("HEATMAP_0").style.transform = "scaleY(".concat(captain_burgerpants.toString()).concat(")");

    global_Y = temp_y_set;
    updateOkmap(global_Y);
  }
}

function zoomOutHeatmap()
{
  if(global_Y < ((400 * global_adj_height) / global_heat_len))
  {
    return;
  }
  else
  {
    var temp_y_set = global_Y / 1.5;

    var captain_burgerpants = temp_y_set / 15;

    var magic_bob = document.getElementById("HEATMAP_0").style.height;
    var fantastic_fred = magic_bob.substring(0, (magic_bob.length - 2));
    var wacky_winston = parseFloat(fantastic_fred) * captain_burgerpants;
    wacky_winston = (wacky_winston.toString()).concat("px");

    document.getElementById("HEATMAP_0").style.transformOrigin = "0 0";
    document.getElementById("HEATMAP_0").style.overflowY = "visible";   
    document.getElementById("HEATMAP_0").style.transform = "scaleY(".concat(captain_burgerpants.toString()).concat(")");
    document.getElementById("HEATMAP_0").style.height = wacky_winston;

    global_Y = temp_y_set;
    updateOkmap(global_Y);
  }

}

function fullViewHeatmap()
{
  global_Y = (400 * global_adj_height) / global_heat_len;
  var temp_y_set = global_Y / 15;

  document.getElementById("HEATMAP_0").style.transformOrigin = "0 0";
  document.getElementById("HEATMAP_0").style.overflowY = "visible";
  document.getElementById("HEATMAP_0").style.transform = "scaleY(".concat(temp_y_set.toString()).concat(")");
  document.getElementById("HEATMAP_0").style.height = "400px";

  global_Y = temp_y_set;
  updateOkmap(global_Y);
}

function updateOkmapTable(data){
  if(global_tissue == "serum")
  {
    var new_row = [
    createData("Chemical ID", data["chem_id"]),
    createData("Chemical Name", data["chemical_name"]),
    createData("Super Pathway", data["super_pathway"]),
    createData("Sub Pathway", data["sub_pathway"]),
    createData("CAS", data["cas"]),
    createData("HMDB", data["hmdb"]),
    ];
  }
  else
  {
    var new_row = [
      createData("Symbol", data["uid"]),
      createData("Annotation", data["annot"]),
    ];
  }
  this.setState({
    curAnnots: new_row
  });
}

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curAnnots: rows
    };
    updateOkmapTable = updateOkmapTable.bind(this)
  }

  render()
  {

    return(
    <div>
    <SpcInputLabel label={"Annotations"}/>
    <div>
    <Box borderColor="#dbdbdb" {...boxProps}>
      <div id="STATS_0">
        <CustomizedTables contents={this.state.curAnnots}/>
      </div>
    </Box>
    </div>
    </div>
    );
  }

}

function updateOkmap(y){ this.setState({zoom_level: y}) }

class OKMAP_LABEL extends React.Component {
  constructor(props)
  {
    super(props);
    this.target_div = this.props.target_div_id;
    this.col_names = this.props.column_names;
    this.SVG = "None";
    this.SVG_main_group = "";
    this.doc = this.props.doc;
    this.xscale = this.props.xscale;
  }

  baseSVG(w="120%", h="100%") 
  {
    this.SVG = d3.select("#".concat(this.target_div))
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("id", (this.target_div.concat("_svg")));

    this.SVG_main_group = this.SVG.append("g").attr("id", (this.target_div.concat("_group")));
      
    this.SVG_main_group.append("rect")
      .attr("width", w)
      .attr("height", h)
      .style("stroke", "White")
      .attr("type", "canvas")
      .attr("fill", "White");    
  }

  writeBase(cols, yscale, xscale)
  {
    this.SVG_main_group.append("rect")
      .style("stroke-width", 0)
      .attr("width", ((cols.length * (xscale - 0.1)) + 75))
      .attr("height", yscale)
      .style("opacity", 1.0)
      .attr("fill", "White");
  }

  writeBlocks(groups, xscale, writecols, queryExport)
  {

    this.SVG_main_group.append("text")
      .attr("x", 0)
      .attr("y", 18)
      .attr("text-anchor", "start")
      .style("font-size", "15px")
      .style('fill', 'black')
      .text("Microbiome Groups");

    var eventLabel1 = "Differential Genes";
    var eventLabel2 = "(See 'Statistics' in About)";
    if(queryExport["tissue"] == "serum")
    {
      eventLabel1 = "Metabolites";
      eventLabel2 = "(Welch test p<0.05)";
    }

    var legend_y = 35;
    var legend_y_increment = 18;
    var legend_x = 0;
    var maxcharlen = 0;
    const maxchardef = 13;
    const groups_set = new Set(groups);
    var count_p = 0;
    var setColorMap = {};
    for(const element of groups_set) {
      if(count_p != 0 && count_p % 4 == 0)
      {
        var makedisfunc = 70 * (maxcharlen / maxchardef);
        if(makedisfunc < 50)
        {
          makedisfunc = 50;
        }
        legend_x = legend_x + makedisfunc + 20;
        legend_y = 35;
        maxcharlen = 0;
      }
      setColorMap[element] = global_colors[count_p];
      var color = global_colors[count_p];
      var curchars = element;
      this.SVG_main_group.append("rect")
          .style("stroke-width", 0)
          .attr("x", legend_x)
          .attr("y", legend_y)
          .attr("width", 15)
          .attr("height", 15)
          .attr("fill", color);

      this.SVG_main_group.append("text")
          .attr("x", (legend_x+20))
          .attr("y", (legend_y+10))
          .attr("text-anchor", "start")
          .style("font-size", "11px")
          .style('fill', 'black')
          .text(curchars);

      if(curchars != null)
      {
      if(curchars.length > maxcharlen)
      {
          maxcharlen = curchars.length;
      }}
      legend_y = legend_y + legend_y_increment;
      count_p = count_p + 1;      
    }

    console.log("debug1", groups_set);

    if(groups_set.size != 0 && groups_set.size % 4 == 0)
    {
        legend_x = legend_x + 50;
        legend_y = 35;
        this.SVG_main_group.append("rect")
            .style("stroke-width", 0)
            .attr("x", legend_x)
            .attr("y", legend_y)
            .attr("width", 15)
            .attr("height", 15)
            .attr("fill", 'black');

        this.SVG_main_group.append("text")
            .attr("x", (legend_x+20))
            .attr("y", (legend_y+10))
            .attr("text-anchor", "start")
            .style("font-size", "11px")
            .style('fill', 'black')
            .text("No annotation");

        legend_y = legend_y + legend_y_increment;
        this.SVG_main_group.append("text")
            .attr("x", (legend_x+1))
            .attr("y", (legend_y+10))
            .attr("text-anchor", "start")
            .style("font-size", "12px")
            .style('fill', 'black')
            .text("each column = values from 1 mouse");        
    }
    else
    {
      this.SVG_main_group.append("rect")
          .style("stroke-width", 0)
          .attr("x", legend_x)
          .attr("y", legend_y)
          .attr("width", 15)
          .attr("height", 15)
          .attr("fill", 'black');

      this.SVG_main_group.append("text")
          .attr("x", (legend_x+20))
          .attr("y", (legend_y+10))
          .attr("text-anchor", "start")
          .style("font-size", "11px")
          .style('fill', 'black')
          .text("No annotation");

      legend_y = legend_y + legend_y_increment;
      if((groups_set.size+1) % 4 == 0)
      {
        legend_x = legend_x + 50;
        legend_y = 35;
        this.SVG_main_group.append("text")
            .attr("x", (legend_x+1))
            .attr("y", (legend_y+10))
            .attr("text-anchor", "start")
            .style("font-size", "12px")
            .style('fill', 'black')
            .text("each column = values from 1 mouse");
      }
      else
      {
        this.SVG_main_group.append("text")
            .attr("x", (legend_x+1))
            .attr("y", (legend_y+10))
            .attr("text-anchor", "start")
            .style("font-size", "12px")
            .style('fill', 'black')
            .text("each column = values from 1 mouse");
      }
    }

    var x_pointer = 0;
    var ikg = [];
    for(var p = 0; p < writecols.length; p++)
    {
      var rect_length = (1 * xscale);
      var coledit = writecols[p];

      coledit = coledit.replace(".", "_");
      coledit = coledit.replace("-", "_");
      var color = setColorMap[groups[p]];
      this.SVG_main_group.append("rect")
          .style("stroke-width", 0)
          .attr("x", x_pointer)
          .attr("y", 115)
          .attr("width", rect_length)
          .attr("height", 20)
          .attr("fill", color);
      
      x_pointer = x_pointer + ((1 * xscale) - 0.1);
    }

    x_pointer = x_pointer + 6;
    this.SVG_main_group.append("text")
        .attr("x", x_pointer+2)
        .attr("y", 127)
        .attr("text-anchor", "start")
        .style("font-size", "14px")
        .style('fill', 'black')
        .text(eventLabel1);

    this.SVG_main_group.append("text")
        .attr("x", x_pointer+2)
        .attr("y", 142)
        .attr("text-anchor", "start")
        .style("font-size", "12px")
        .style('fill', 'black')
        .text(eventLabel2);
  }

  componentDidUpdate (prevProps){
    if(this.props.column_names.join("#") != prevProps.column_names.join("#"))
    {
      var retval = null;
      var tempnode = document.getElementById(this.target_div);
      tempnode.innerHTML = "";
      this.baseSVG("100%", 150);
      this.writeBase(this.props.column_names, 150, this.props.xscale);
      if(this.props.groups != undefined)
      {
        this.writeBlocks(this.props.groups, this.props.xscale, this.props.column_names, this.props.QueryExport); 
        //document.getElementById("HeatmapFilterSelect_id").value = Object.entries(global_uifielddict)[0][0];
      }
      return(
        null
      );    
    }
  }

  componentDidMount() {
    console.log("cmount");
    //this.baseSVG("100%", 1);
    //this.writeBase(1);
  }  

  render (){
    var retval = null;
    var tempnode = document.getElementById(this.target_div);
    tempnode.innerHTML = "";
    this.baseSVG("100%", 150);
    this.writeBase(this.props.column_names, 150, this.props.xscale);
    if(this.props.groups != undefined)
    {
      this.writeBlocks(this.props.groups, this.props.xscale, this.props.column_names, this.props.QueryExport);
    }
    return(
      null
    );
  }

}

class OKMAP extends React.Component {
  constructor(props) 
  {
    super(props);
    this.target_div = this.props.target_div_id;
    this.target_row_label_div = "HEATMAP_ROW_LABEL";
    this.col_names = this.props.column_names;
    this.SVG = "None";
    this.SVG_main_group = "";
    this.doc = this.props.doc;
    this.norm_flag = this.props.norm;
    this.tempRect = "";
    this.U_xscale = this.props.xscale;
    this.total_height = this.props.len;
    this.dataset = this.props.dataset;
    this.CURRENT_SELECTED_UID = null;
    this.state = {
      zoom_level: this.props.yscale
    };
    this.firstUID = "";
    const setViewState = this.props.setViewState;
    updateOkmap = updateOkmap.bind(this)
  }
  
  baseSVG(w="100%", h="100%", s="100%") 
  {
    this.SVG = d3.select("#".concat(this.target_div))
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("id", (this.target_div.concat("_svg")));

    this.SVG_main_group = this.SVG.append("g").attr("id", (this.target_div.concat("_group")));
      
    this.SVG_main_group.append("rect")
      .attr("width", w)
      .attr("height", h)
      .style("stroke", "White")
      .attr("type", "canvas")
      .attr("fill", "White"); 
  }

  writeBase(yscale, xscale, cols, height)
  {
    this.SVG_main_group.append("rect")
      .attr("width", (cols.length * (xscale - 0.1)))
      .attr("height", (height * yscale))
      .style("opacity", 1.0)
      .attr("fill", "Black");
  }

  baseRLSVG(w="280px", h="100%")
  {
    this.ROWLABELSVG = d3.select("#".concat(this.target_row_label_div))
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("id", (this.target_row_label_div.concat("_svg")));

    this.SVG_rlg = this.ROWLABELSVG.append("g").attr("id", (this.target_row_label_div.concat("_group")));
    
    this.SVG_rlg.append("rect")
      .attr("width", w)
      .attr("height", h)
      .style("stroke", "White")
      .attr("type", "canvas")
      .attr("fill", "White");
  }

  writeBaseRLSVG(yscale, height)
  {
    this.SVG_rlg.append("rect")
      .attr("width", "280px")
      .attr("height", (height * yscale))
      .style("opacity", 1.0)
      .attr("fill", "White");
  }

  writeHead(xscale, col_list)
  {
    var x_pointer = 0;

    for(var p = 0; p < col_list.length; p++)
    {
      var mid_section = (x_pointer + (xscale/2.0));
        this.SVG_main_group.append("text")
            .attr("x", mid_section)
            .attr("y", 12)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style('fill', 'black')
            .text(col_list[p]);
      x_pointer = x_pointer + xscale;
    }
  }

  writeSingle5(y_pointer, data, y_scale, x_scale, col_list, flag=0, hflag=0)
  {
    const median = arr => {
      const mid = Math.floor(arr.length / 2),
        nums = [...arr].sort((a, b) => a - b);
      return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    };
    const average = array => array.reduce((a, b) => a + b) / array.length;
    var bubble_1 = d3.select("#".concat(this.target_div).concat("_group"));
    var bubs = data;
    var parent = this;

    var medval = [];
    for(var k = 0; k < col_list.length; k++)
    {
      let valSend = parseFloat(data[col_list[k].toLowerCase()]);
      if(global_tissue == "serum")
      {
        valSend = Math.log2((valSend + 1));
      }
      medval.push(valSend);
    }
    const hardmedian = median(medval);
    //console.log("B", hardmedian, medval);

    var x_pointer = 0;
    for(var p = 0; p < col_list.length; p++)
    {
      var rect_length = (1 * x_scale);
      var cur_square_val = parseFloat(data[col_list[p].toLowerCase()]);
      if(global_tissue == "serum")
      {
        cur_square_val = Math.log2((cur_square_val + 1));
      }
      cur_square_val = cur_square_val - hardmedian;
      //console.log("cur_square_val: ", col_list[p], cur_square_val);
      var selected_color;
      if(cur_square_val < 0.02 && cur_square_val > -0.02)
      {
        selected_color = "rgb(0, 0, 0)";
        x_pointer = x_pointer + ((1 * x_scale) - 0.1);
        continue;
      }
      else if(cur_square_val <= -0.02)
      {
            var integerval = 10 + (-210 * (cur_square_val * 3));
            if(integerval > 255)
            {
              integerval = 255;
            }
            var magic_blue = (integerval).toString();
            var magic_others = (cur_square_val * 100).toString();
            selected_color = "rgb(".concat(magic_others).concat(", ").concat(magic_blue).concat(", ").concat(magic_blue).concat(")");
      }
      else
      {
            var integerval2 = 10 + (210 * (cur_square_val * 3));
            if(integerval2 > 255)
            {
              integerval2 = 255;
            }
            var magic_yellow = (integerval2).toString();
            var magic_yellow2 = (integerval2).toString();
            var magic_others = (cur_square_val * 10).toString();
            selected_color = "rgb(".concat(magic_yellow).concat(", ").concat(magic_yellow2).concat(", ").concat(magic_others).concat(")");
      }

      this.SVG_main_group.append("rect")
          .style("stroke-width", 0)
          .attr("x", x_pointer)
          .attr("y", y_pointer)
          .attr("width", rect_length)
          .attr("height", y_scale)
          .attr("fill", selected_color);
        
      x_pointer = x_pointer + ((1 * x_scale) - 0.1);
    }

  }

  writeRowLabel(y_point, data, yscale, iterationNumber, chemDict, geneDict)
  {
    //console.log("chemDict: ", chemDict);
    var parent = this;
    var converteduid = data["uid"];
    var y_set = (y_point + yscale/1.7);
    var fontsize = 12 * (yscale / 15.0);

    if(fontsize > 16)
    {
      fontsize = 16;
    }

    var geneFlag = 0;

    var assoc_map = {};
    if(chemDict[data["uid"]] != undefined)
    {
      converteduid = chemDict[data["uid"]]["chemical_name"];
      assoc_map = chemDict[data["uid"]];
    }

    //var assoc_gene = "None";
    if(geneDict[data["uid"]] != undefined)
    {
      assoc_map["annot"] = geneDict[data["uid"]];
      assoc_map["uid"] = data["uid"];
      geneFlag = 1;
    }
    //console.log("annotG", assoc_map);
    /*try {
    converteduid = chemDict[data["uid"]];
    } catch (error) {
      converteduid = converteduid
    }*/
    

    this.SVG_rlg.append("text")
      .attr("x", (10))
      .attr("y", y_set)
      .attr("text-anchor", "start")
      .attr("id", converteduid.concat(this.target_row_label_div).concat("_id"))
      .attr("original", y_point)
      .attr("scale", yscale)
      .style("cursor", "pointer")
      .style("font-size", (fontsize.toString().concat("px")))
      .style('fill', 'black')
      .text(converteduid)
      .on("click", function(){
          parent.props.setSelectionState({selection: data["uid"]});
          updateOkmapTable(assoc_map);
          parent.props.setPlotUIDstate({fulldat: data});
          parent.setSelected(converteduid);
      })
      .on("mouseover", function(){
            d3.select(this).style("fill", "red");
      })
      .on("mouseout", function(){
            d3.select(this).style("fill", "black");
      });
    
    if(iterationNumber == 0)
    {
      //console.log("Matched: ", iterationNumber, data["uid"]);
      parent.props.setSelectionState({selection: data["uid"]});
      updateOkmapTable(assoc_map);
      parent.props.setPlotUIDstate({fulldat: data});
      parent.setSelected(converteduid);      
    }
  }

  tempRectAdd(y_origin, col_list, xscale)
  {
    this.SVG_main_group.append("rect")
          .style("fill", "white")
          .style("stroke-width", 0)
          .style("opacity", 0.2)
          .attr("x", 0)
          .attr("y", y_origin.original.value)
          .attr("width", (col_list.length * xscale))
          .attr("height", y_origin.scale.value)
          .attr("id", "TEMPORARY_HIGHLIGHT");
  }

  tempRectRemove()
  {
    var rect_to_remove = document.getElementById("TEMPORARY_HIGHLIGHT");
    d3.select(rect_to_remove).remove();
  }  

  setSelected(id)
  {
    var parent = this;

    if(this.CURRENT_SELECTED_UID != null)
    {
    var old_text = document.getElementById((this.CURRENT_SELECTED_UID.concat(this.target_row_label_div).concat("_id")));
    d3.select(old_text)
      .style('fill', 'black')
      .on("mouseover", function(){
            d3.select(this).style("fill", "red");
      })
      .on("mouseout", function(){
            d3.select(this).style("fill", "black");
      });
    }

    var cur_text = document.getElementById((id.concat(this.target_row_label_div).concat("_id")));
    d3.select(cur_text)
      .style('fill', 'green')
      .on("mouseover", function(){
            d3.select(this).style("fill", "green");
      })
      .on("mouseout", function(){
            d3.select(this).style("fill", "green");
      }); 

    this.CURRENT_SELECTED_UID = id;      

  }

  componentDidUpdate (prevProps){
    var oldKeys = [];
    var newKeys = [];
    for(let i = 0; i < this.props.dataset.length; i++)
    {
      newKeys.push(this.props.dataset[i]["uid"])
    }
    newKeys = newKeys.join("#");
    for(let k = 0; k < prevProps.dataset.length; k++)
    {
      oldKeys.push(prevProps.dataset[k]["uid"])
    }
    if((newKeys != oldKeys) || (this.props.column_names.join('#') != prevProps.column_names.join('#')))
    {
      var tempnode = document.getElementById(this.target_div);
      var y_start = 0;
      while (tempnode.firstChild) {
        tempnode.removeChild(tempnode.firstChild);
      }
      var tempnodeRL = document.getElementById(this.target_row_label_div);
      while (tempnodeRL.firstChild) {
        tempnodeRL.removeChild(tempnodeRL.firstChild);
      }
      tempnode.innerHTML = "";
      tempnodeRL.innerHTML = "";
      setTimeout(() => {
      this.baseSVG("100%", ((15 * this.props.dataset.length) + 50), this.props.len);
      this.baseRLSVG("100%", ((15 * this.props.dataset.length) + 50));
      this.writeBase(15, this.props.xscale, this.props.column_names, this.props.len);
      this.writeBaseRLSVG(15, this.props.len);
      }, 50);
      for(let i = 0; i < this.props.dataset.length; i++)
      {
        setTimeout(() => {
        this.writeSingle5(y_start, this.props.dataset[i], 15, this.props.xscale, this.props.column_names, 1);
        this.writeRowLabel(y_start, this.props.dataset[i], 15, i, this.props.chem, this.props.gene);
        y_start = y_start + 15;
        }, 50);      
      }
    }
  }

  render (){
    var tempnode = document.getElementById(this.target_div);
    var y_start = 0;
    if(tempnode.hasChildNodes() == "")
    {
      setTimeout(() => {
      this.baseSVG("100%", ((this.state.zoom_level * this.props.dataset.length) + 50), this.props.len);
      this.baseRLSVG("100%", ((this.state.zoom_level * this.props.dataset.length) + 50));
      this.writeBase(this.state.zoom_level, this.props.xscale, this.props.column_names, this.props.len);
      this.writeBaseRLSVG(this.state.zoom_level);
      }, 50);

      for(let i = 0; i < this.props.dataset.length; i++)
      {
        setTimeout(() => {
        this.writeSingle5(y_start, this.props.dataset[i], this.state.zoom_level, this.props.xscale, this.props.column_names, 1);
        this.writeRowLabel(y_start, this.props.dataset[i], this.state.zoom_level, i, this.props.chem, this.props.gene);
        y_start = y_start + this.state.zoom_level;
        }, 50);
      }
    }
    else
    {
      var tempnodeRL = document.getElementById(this.target_row_label_div);
      tempnodeRL.innerHTML = "";
      this.baseRLSVG("100%", ((this.state.zoom_level * this.props.dataset.length) + 50));
      this.writeBaseRLSVG(this.state.zoom_level);
      var yRL_start = 0;
      for(let k = 0; k < this.props.dataset.length; k++)
      {
        setTimeout(() => {
        this.writeRowLabel(yRL_start, this.props.dataset[k], this.state.zoom_level, k, this.props.chem, this.props.gene);
        yRL_start = yRL_start + this.state.zoom_level;
        }, 50);
      }
    }
    return(
      null
    );
  }

}

const spboxProps = {border: 3};

const SpcCheckbox = withStyles({
  root: {
    color: "#0F6A8B",
    '&$checked': {
      color: "#0F6A8B",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);


function ViewPanel(props) {
  const classes = useStyles();
  global_meta = props.Cols;
  //global_cancer = props.QueryExport["cancer"];
  //global_signature = props.QueryExport["single"];
  //console.log("new signature!", props.QueryExport["single"]);
  global_cols = props.Cols;
  //console.log("print all props:", props);
  global_tissue = props.QueryExport["tissue"];
  /*
  var available_width = screen.width;
  var available_height = screen.height;
  */
  var available_width = window.innerWidth;
  var available_height = window.innerHeight;
  //console.log("width and height", available_width, available_height);
  //console.log("VIEW DATA ENTERED:", props.Data);
  const [viewState, setViewState] = React.useState({
    toDownloadExon: undefined,
    toDownloadGeneModel: undefined,
    toDownloadJunc: undefined
  });

  const [selectionState, setSelectionState] = React.useState({selection: null});
  const [okmapLabelState, setOkmapLabelState] = React.useState({okmapLabel: null});
  const [plotUIDstate, setPlotUIDstate] = React.useState({fulldat: null});
  const [filterState, setFilterState] = React.useState({filters: null, filterset: null});

  var Selection = selectionState.selection;
  var set = null;
  var plotobj1 = null;
  var groupSet = [];
  for(var i = 0; i < props.Groups.length; i++)
  {
    var foundGroup = false;
    for(var k = 0; k < groupSet.length; k++)
    {
      if(groupSet[k] == props.Groups[i])
      {
        foundGroup = true;
        break;
      }
    }
    if(foundGroup == false)
    {
      groupSet.push(props.Groups[i])
    }
  }

  if(Selection != null && plotUIDstate.fulldat != null)
  {
    var plotobj1 = cellGroupViolinPlotPanel(plotUIDstate.fulldat, Selection, props.Cols, props.Groups, groupSet, props.QueryExport["tissue"]);
  }
  else
  {
    var plotobj1 = <h4>No selection set</h4>;
  }

  //global_uifielddict = props.QueryExport["ui_field_dict"];

  const resizeHandles = ['s','w','e','n','sw','nw','se','ne'];

  var panel_A = {
    width: 0.688 * available_width,
    height: 0.8 * available_height,
    minWidth: 0.688 * available_width,
    minHeight: 0.3 * available_height,
    maxWidth:  0.809 * available_width,
    maxHeight: 0.8 * available_height
  }
  var panel_B = {
    width: 0.292 * available_width,
    height: 0.8 * available_height,
    minWidth: 0.148 * available_width,
    minHeight: 0.3 * available_height,
    maxWidth: 0.809 * available_width,
    maxHeight: 0.8 * available_height
  }

  return (
    <><div style={{ fontFamily: 'Arial', display: 'flex', flexWrap: 'wrap' }}>
      <ResizableBox
        className="box"
        width={panel_A.width}
        height={panel_A.height}
        margin={5}
        minConstraints={[panel_A.minWidth, panel_A.minHeight]}
        maxConstraints={[panel_A.maxWidth, panel_A.maxHeight]}
      >
        <ViewPanel_Main
          Data={props.Data}
          Cols={props.Cols}
          Groups={props.Groups}
          Chem={props.Chem}
          Gene={props.Gene}
          QueryExport={props.QueryExport}
          viewState={viewState}
          setViewState={setViewState}
          selectionState={selectionState}
          setSelectionState={setSelectionState}
          filterState={filterState}
          setFilterState={setFilterState}
          plotUIDstate={plotUIDstate}
          setPlotUIDstate={setPlotUIDstate}
        />
      </ResizableBox>

      <ResizableBox
        className="box"
        width={panel_B.width}
        height={panel_B.height}
        margin={5}
        minConstraints={[panel_B.minWidth, panel_B.minHeight]}
        maxConstraints={[panel_B.maxWidth, panel_B.maxHeight]}
      >
        <div style={{overflow: "scroll", height: "100%", width: "100%", display: "inline-block"}}>
          <PlotPanel plotLabel={"Each dot = values from 1 mouse"}>{plotobj1}</PlotPanel>
          <Stats></Stats>
        </div>
      </ResizableBox>
    </div></>
  );
}

//Test comment
function ViewPanel_Main(props) {
    const classes = useStyles();
    const [isShown, setIsShown] = React.useState(false);
    return(
    <div id="ViewPane_MainPane" style={{overflow: "scroll", height: "100%", width: "100%", display: "flex"}}>
        <div className="containerSidebar" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
          {isShown && (
          <div className="sidebar" style={{marginLeft: 5}}>
          </div>
          )}
        </div>
        <div style= {{flex: 1}}>
        <Typography className={classes.padding} />
        <div style={{marginLeft: 5}} id="HEATMAP_LABEL"></div>
        <div className={classes.flexparent} style={{marginLeft: 5}}>
        <span id="HEATMAP_0" ></span>
        <span id="HEATMAP_ROW_LABEL" style={{width: "280px"}}></span>
        </div>
      <Heatmap
        data={props.Data}
        cols={props.Cols}
        groups={props.Groups}
        chem={props.Chem}
        gene={props.Gene}
        QueryExport={props.QueryExport}
        viewState={props.viewState}
        setViewState={props.setViewState}
        selectionState={props.selectionState}
        setSelectionState={props.setSelectionState}
        filterState={props.filterState}
        setFilterState={props.setFilterState}
        plotUIDstate={props.plotUIDstate}
        setPlotUIDstate={props.setPlotUIDstate}>
      </Heatmap>
      </div>
    </div>
    );
}

export default ViewPanel;