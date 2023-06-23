import Plot from 'react-plotly.js';
import { global_colors } from '../utilities/constants.js';

//This function groups samples by their atrributes and outputs two components:
//1. A violin plot (using Plotly.js) that compares expression between sample atrribute groups.
//2. A dynamically created linkout (via a button) to the website cbioportal that creates a survival plot with the given samples and their respective attribute groups.
function cellGroupPlotPanel(selectedRow, selectedExpressionArray, heatmapColumnArray, groupArray, filterSet, tissue){
  var datarray = [];
  //console.log("lTF", out);
  console.log("selectedRow", selectedRow);
  console.log("allstuff", selectedRow, selectedExpressionArray, heatmapColumnArray, groupArray, filterSet);
  var cellmax = 0;
  console.log("tissue_stuff", tissue);

  for(var i = 0; i < filterSet.length; i++)
  {
      var curstack = [];
      var curcol = [];
      for(var k = 0; k < heatmapColumnArray.length; k++)
      {
        if(groupArray[k] == filterSet[i])
        {
          var currentColumn = heatmapColumnArray[k].toLowerCase();
          var valUse = selectedRow[currentColumn];
          if(tissue == "serum")
          {
            valUse = parseFloat(selectedRow[currentColumn]);
            valUse = valUse + 1;
            valUse = Math.log2(valUse);
          }
          curstack.push(valUse);
          if(cellmax < valUse)
          {
            cellmax = valUse;
          }
          curcol.push(currentColumn);
        }
      }
      var name = filterSet[i];
      if(name == "EF" || name == "_EF")
      {
        name = "OF";
      }
      name = name.replaceAll("_", "");
      var curcolor = global_colors[i];
      console.log(curcol);
      datarray.push({
        y: curstack,
        type: 'violin',
        mode: 'lines+markers',
        points: "all",
        pointpos: 0,
        name: name,
        marker: {color: curcolor},
      });
  }
  cellmax = cellmax + 0.5;
  console.log("datarraystuff", datarray);
  var available_width = window.innerWidth;
  var available_height = window.innerHeight;
  var plotobj = <><Plot
              data={datarray}
              layout={ {width: 0.260 * available_width, 
                        height: 300,
                        margin: {
                          l: 48,
                          r: 48,
                          b: 100,
                          t: 40
                        },
                        title: {
                          text: selectedRow["uid"],
                          font: {
                            family: 'Arial, monospace',
                            size: 11,
                            color: '#7f7f7f'
                            }
                        },
                        yaxis:{
                        range: [0, cellmax],
                        title: {
                          text: 'Abundance',
                          font: {
                            family: 'Arial, monospace',
                            size: 16,
                            color: '#7f7f7f'
                          }
                        }},
                        xaxis:{
                        title: {
                          text: 'Microbiome Groups',
                          font: {
                            family: 'Arial, monospace',
                            size: 16,
                            color: '#7f7f7f'
                          }
                        }
                      }} }
  />
  </>;
  return plotobj;
}

export default cellGroupPlotPanel;