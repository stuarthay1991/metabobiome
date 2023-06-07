import axios from 'axios';
import { isBuild } from '../utilities/constants.js';

var routeurl = isBuild ? "http://www.altanalyze.org/oncosplice" : "http://localhost:8081";

function sendGene(arg, targeturl)
{
    const postData = {};
    postData["data"] = {};
    const callback = arg["callback"];
    postData["data"]["genes"] = arg["genes"];
    postData["data"]["cellType"] = arg["cellType"];
    postData["data"]["tissueType"] = arg["tissueType"];
    axios({
        method: "post",
        url: routeurl.concat("/api/datasets/mbGene"),
        data: postData,
        headers: { "Content-Type": "application/json" },
      })
    .then(function (response) { 
        var dat = response["data"]["rows"];
        var cols = response["data"]["cols"];
        var groups = response["data"]["groups"];
        var chem = {};
        var gene = response["data"]["gene"];
        var tissueEvents = {"tissue": postData["data"]["sigType"]}
        console.log("DAT", dat, cols, response)
        if(dat == undefined)
        {
          console.log("No entries found!")
        }
        else
        {
          callback(dat, cols, groups, chem, tissueEvents, gene);
        }
    }) 
}

export default sendGene;