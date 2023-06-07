import targeturl from '../targeturl.js';
import defaultQuery from './defaultQuery.js';
import updateHeatmapData from './updateHeatmapData.js';
import sendGene from './geneRequest.js';

//GLOBALS
const exportToViewPane = {};

export function makeRequest(to, arg)
{
  if(to == "updateHeatmapData"){ updateHeatmapData(arg, targeturl);}
	if(to == "defaultQuery"){ defaultQuery(arg, targeturl);}
  if(to == "geneRequest"){ sendGene(arg, targeturl);}
}
