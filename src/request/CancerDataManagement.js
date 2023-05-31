import targeturl from '../targeturl.js';
import defaultQuery from './defaultQuery.js';
import updateHeatmapData from './updateHeatmapData.js';


//GLOBALS
const exportToViewPane = {};

export function makeRequest(to, arg)
{
  if(to == "updateHeatmapData"){ updateHeatmapData(arg, targeturl);}
	if(to == "defaultQuery"){ defaultQuery(arg, targeturl);}
}
