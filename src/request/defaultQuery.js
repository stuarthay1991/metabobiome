import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { isBuild } from '../utilities/constants.js';

var routeurl = isBuild ? "http://www.altanalyze.org/oncosplice" : "http://localhost:8081";

function defaultQuery(arg, targeturl)
{
  const exportView = arg["export"];
  const callback = arg["setState"];
  const document = arg["doc"];
  var postData = {"data": {"tissueType": "serum", "cellType": "All", "sigName": "ASF_vs_GF", "sigType": "serum"}};

  axios({
    method: "post",
    url: routeurl.concat("/api/datasets/mbHeatmap"),
    data: postData,
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      var dat = response["data"]["rows"];
      var cols = response["data"]["cols"];
      var groups = response["data"]["groups"];
      var chem = response["data"]["chemID"];
      var gene = response["data"]["gene"];
      var tissueEvents = {"tissue": "serum"};
      console.log("DAT", dat, cols)
      console.log("respnse", response)
      callback(dat, cols, groups, chem, tissueEvents, gene);
      //defaultQueryUiFields(splicingreturned, splicingcols, splicingcc, splicingrpsi, splicingtrans, exportView, callback, document, targeturl, pancancercallback);
  })
}

/*function defaultQueryUiFields(splicingreturned, splicingcols, splicingcc, splicingrpsi, splicingtrans, exp, callback, doc, targeturl, pancancercallback)
{
  var postdata = {"data": {"cancerName": "GBM", "signature": "psi_er_negative_r1_v24_vs_others"}};
  axios({
    method: "post",
    data: postdata,
    url: routeurl.concat("/api/datasets/samples"),
    headers: { "Content-Type": "application/json" },
  })
  .then(function (response) {
    exp["cancer"] = "GBM";
    exp["ui_field_dict"] = response["data"]["samples"];
    exp["ui_field_range"] = response["data"]["range"];
    callback(splicingreturned, splicingcols, splicingcc, splicingrpsi, splicingtrans, exp);
    pancancercallback({"DEtableData": response["data"]["pancancerDE"], "tableData": response["data"]["pancancersignature"], "clusterLength": response["data"]["uniqueclusters"]});
  })
}*/

export default defaultQuery;