import axios from 'axios';
import { isBuild } from '../utilities/constants.js';

var routeurl = isBuild ? "http://www.altanalyze.org/oncosplice" : "http://localhost:8081";

function updateHeatmapData(arg, targeturl)
{
    //console.log("routeurl", routeurl)
    const postData = {};
    postData["data"] = {};
    const callback = arg["callback"];
    postData["data"]["cellType"] = arg["cellType"];
    postData["data"]["tissueType"] = arg["tissueType"];
    postData["data"]["sigType"] = arg["sigType"];
    postData["data"]["sigName"] = arg["sigName"];

    axios({
        method: "post",
        url: routeurl.concat("/api/datasets/mbHeatmap"),
        data: postData,
        headers: { "Content-Type": "application/json" },
      })
    .then(function (response) {
        //console.log("full return from heatmap: ", response)
        //document.getElementById("LoadingStatusDisplay").style.display = "none";
        var dat = response["data"]["rows"];
        var cols = response["data"]["cols"];
        var groups = response["data"]["groups"];
        var chem = response["data"]["chemID"];
        var gene = response["data"]["gene"];
        var tissueEvents = {"tissue": postData["data"]["sigType"]}
        console.log("DAT", dat, cols, response)
        if(dat == undefined)
        {
          alert("No entries found!")
        }
        else
        {
          callback(dat, cols, groups, chem, tissueEvents, gene);
        }
    })

}

export default updateHeatmapData;