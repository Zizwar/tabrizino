var page = tabris.create("Page", {
  title: "كيف حالك",
  topLevel: true
});

///
var jrgb = {r:0,g:0,b:0};
//
var button = tabris.create("Button", {
  text: "حفظ",
  layoutData: {centerX: 0, top: 100}
}).appendTo(page);
var stor = JSON.parse(localStorage.getItem("wino"));
stor = !stor?jrgb:stor;
//if(!stor)stor="دون قيمة";
var label = tabris.create("TextView", {
  font: "36px",
  text:"stor r:"+stor.r+",g:"+stor.g+",b:"+stor.b,
  textColor:"#fff",
  background:"rgb("+stor.r+","+stor.g+","+stor.b+")",
  layoutData: {centerX: 0, top: [button, 50]}
}).appendTo(page);
/*
var wino = tabris.creat("TextView",{
	id:"winoout",
	font:"36px",
	text:"here testino"
	
}).appendTo(page);
*/
button.on("select", function() {
	localStorage.setItem("wino",JSON.stringify(stor));
  label.set("text", "تم التخزين");
});

 /* var webview = tabris.create('WebView', {
    layoutData: {left: 0, top: 0, right: 0, bottom: 0}ddd    url: 'http://www.hayatoky.com'
  }).appendTo(page); 
  */
var slidez = tabris.create("Slider", { 
id:"luggageSlider",
layoutData:{width:200, top:[label, 10], centerX:0}
}).appendTo(page);

var slidez2 = tabris.create("Slider", { 
id:"luggageSlider",
layoutData:{width:200, top:[slidez, 10], centerX:0}
}).appendTo(page);

var slidez3 = tabris.create("Slider", { 
id:"luggageSlider",
layoutData:{width:200, top:[slidez2, 10], centerX:0}
}).appendTo(page);
//
var وينو = stor.g/2;
slidez.set("selection",stor.r/2);
slidez2.set("selection",وينو);
slidez3.set("selection",stor.b/2);
///


slidez.on("change:selection", function(widget, selection) { 
label.set("text","rgb("+jrgb.r+","+jrgb.g+","+jrgb.b+")");
jrgb.r=selection*2;
page.set("background","rgb("+jrgb.r+","+jrgb.g+","+jrgb.b+")");
stor=jrgb;
 });
 //
 slidez2.on("change:selection", function(widget, selection) { 
label.set("text","rgb("+jrgb.r+","+jrgb.g+","+jrgb.b+")");
jrgb.g=selection*2;
page.set("background","rgb("+jrgb.r+","+jrgb.g+","+jrgb.b+")");
stor=jrgb;
 });
 //
  slidez3.on("change:selection", function(widget, selection) { 
label.set("text","rgb("+jrgb.r+","+jrgb.g+","+jrgb.b+")");
jrgb.b=selection*2;
page.set("background","rgb("+jrgb.r+","+jrgb.g+","+jrgb.b+")");
stor=jrgb;

 });
 //
 var rem = tabris.create("Button", {
  text: "مسح",
  layoutData: {centerX: 0, top:0}
}).appendTo(page);
rem.on("select",function(){
localStorage.removeItem("wino")	;
label.set("text","تم مسح الذاكرة");
})
 //
page.open();
