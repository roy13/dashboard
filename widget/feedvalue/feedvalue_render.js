/*
   All emon_widgets code is released under the GNU General Public License v3.
   See COPYRIGHT.txt and LICENSE.txt.

    ---------------------------------------------------------------------
    Part of the OpenEnergyMonitor project:
    http://openenergymonitor.org

    Author: Trystan Lea: trystan.lea@googlemail.com
    If you have any questions please get in touch, try the forums here:
    http://openenergymonitor.org/emon/forum
 */

function addOption(widget, optionKey, optionType, optionName, optionHint, optionData)
{
  widget["options"    ].push(optionKey);
  widget["optionstype"].push(optionType);
  widget["optionsname"].push(optionName);
  widget["optionshint"].push(optionHint);
  widget["optionsdata"].push(optionData);
}

function feedvalue_widgetlist()
{
  var widgets =
  {
    "feedvalue":
    {
      "offsetx":-40,"offsety":-30,"width":80,"height":60,
      "menu":"Widgets",
      "options":    [],
      "optionstype":[],
      "optionsname":[],
      "optionshint":[],
      "optionsdata":[]
    }
  };

  var decimalsDropBoxOptions = [        // Options for the type combobox. Each item is [typeID, "description"]
        [-1,   "Automatic"],
        [0,    "0"],
        [1,    "1"],
        [2,    "2"],
        [3,    "3"],
        [4,    "4"],
        [5,    "5"],
        [6,    "6"]
    ];

  var unitEndOptions = [
        [0, "After"],
        [1, "Before"]
    ];

  addOption(widgets["feedvalue"], "feedid",   "feedid",  _Tr("Feed"),          _Tr("Feed value"),      []);
  addOption(widgets["feedvalue"], "units",    "value",   _Tr("Units"),         _Tr("Units to show"),   []);
  addOption(widgets["feedvalue"], "unitend",  "dropbox", _Tr("Unit position"), _Tr("Where should the unit be shown"), unitEndOptions);
  addOption(widgets["feedvalue"], "decimals", "dropbox", _Tr("Decimals"),      _Tr("Decimals to show"),    decimalsDropBoxOptions);
  addOption(widgets["feedvalue"], "scale",    "value",   _Tr("Scale"),         _Tr("Value is multiplied by scale before display"), []);	// allow them to scale the feed value
  addOption(widgets["feedvalue"], "colour",   "colour_picker", _Tr("Colour"),  _Tr("Colour to draw with"), []);	// allow them to chose a colour for the feed value
	
  return widgets;
}

function feedvalue_init()
{
  feedvalue_draw();
}

function feedvalue_draw()
{
  $('.feedvalue').each(function(index)
  {
    var feedid = $(this).attr("feedid");
    if (associd[feedid] === undefined) { console.log("Review config for feed id of " + $(this).attr("class")); return; }
    var val = associd[feedid]['value'] * 1;
    if (val==undefined) val = 0;
    if (isNaN(val))  val = 0;
    
    var units = $(this).attr("units");
    if (units==undefined) units = '';
    
    var decimals = $(this).attr("decimals");
    if (decimals==undefined) decimals = -1;

    var unitend = $(this).attr("unitend");
    if (unitend==undefined) unitend = 0;
   
        // scale the value before display
    var scale = $(this).attr("scale");
    if( scale == undefined || isNaN( scale ) || scale.length < 1 ) scale = 1.0;	// default to 1.0 if invalid
    val = val * scale;	// scale the value
	
	// grab the draw colour
    var colour = $(this).attr("colour");
    if( colour == undefined ) colour = '4444CC';	// default to the emoncms blue

   
    if (decimals<0)
    {

      if (val>=1000)
          val = val.toFixed(0);
      else if (val>=100)
          val = val.toFixed(1);
      else if (val<=-1000)
          val = val.toFixed(0);
      else if (val<=-100)
          val = val.toFixed(1);
      else
          val = val.toFixed(2);
    }
    else 
    {
      val = val.toFixed(decimals);
    }
    
    val = parseFloat(val);
	
    // Added font colour tags
    if (unitend == 0)
    {
      $(this).html("<font color="+colour+">"+val+units+"</font>");
    }
    else
    {
      $(this).html("<font color="+colour+">"+units+val+"</font>");
    }
  });
}

function feedvalue_slowupdate()
{
  feedvalue_draw();
}

function feedvalue_fastupdate()
{

}


