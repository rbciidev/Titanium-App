/**
 * @author Royale Dev
 */
function ProductView(){
	var win = Ti.UI.createWindow({
		backgroundImage: '/images/mainmenu/bg_login.png',
		title: 'Products'
	});
	
	var images = [];
	images.push('/images/products/large/spirulina.png');
	images.push('/images/products/large/prime.png');
	images.push('/images/products/large/lgluta.png');
	images.push('/images/products/large/lgluta700.png');
	images.push('/images/products/large/pinkishglow.png');
	images.push('/images/products/large/royale-c-bottle.png');
	images.push('/images/products/large/fiberich.png');
	images.push('/images/products/large/diabetwatch.png');
	images.push('/images/products/large/grapeseed.png');
	images.push('/images/products/large/fitshape.png');
	images.push('/images/products/large/riqall.png');
	images.push('/images/products/large/performax.png');
	images.push('/images/products/large/coffee_reg.png');
	images.push('/images/products/large/coffee_lite.png');
	images.push('/images/products/large/choco.png');
	images.push('/images/products/large/corn.png');
	images.push('/images/products/large/richarge.png');
	images.push('/images/products/large/pinkishcream.png');
	images.push('/images/products/large/pinkishtoner.png');
	images.push('/images/products/large/kojicsoap.png');
	images.push('/images/products/large/lipstick.png');
	images.push('/images/products/large/glutaWHITENINGcream.png');
	images.push('/images/products/large/glutaANTIageingCREAM.png');
	images.push('/images/products/large/glutaLIGHTENINGlotion.png');
	images.push('/images/products/large/glutaPOWERantiAGEING.png');
	images.push('/images/products/large/glutasoap.png');
	images.push('/images/products/large/jeune.png');
	images.push('/images/products/large/lumiere.png');
	images.push('/images/products/large/lumiere.png');
	images.push('/images/products/large/rejuv.png');
	images.push('/images/products/large/glutadeo.png');

	
	var view = Titanium.UI.iOS.createCoverFlowView({
		top: '1%',
		images:images,
		backgroundColor:'transparent'
	});
	
	// click listener - when image is clicked
	view.addEventListener('click',function(e)
	{
		Titanium.API.info("image clicked: "+e.index+', selected is '+view.selected);	
	});
	
	// change listener when active image changes
	view.addEventListener('change',function(e)
	{
		Titanium.API.info("image changed: "+e.index+', selected is '+view.selected);	
	});
	win.add(view);
	
	// change button to dynamically change the image
	var change = Titanium.UI.createButton({
		title:'Change Image',
		style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	change.addEventListener('click',function()
	{
		Titanium.API.info("selected is = "+view.selected);
		view.setImage(view.selected,'/images/imageview/28.jpg');
	});
	
	// move scroll view left
	var left = Titanium.UI.createButton({
		image:'/images/icon_arrow_left.png'
	});
	left.addEventListener('click', function(e)
	{
		var i = view.selected - 1;
		if (i < 0) 
		{
			i = 0;
		}
		view.selected = i;
	});
	
	// move scroll view right
	var right = Titanium.UI.createButton({
		image:'/images/icon_arrow_right.png'
	});
	right.addEventListener('click', function(e)
	{
		var i = view.selected + 1;
		if (i >= images.length) 
		{
			i = images.length - 1;
		}
		view.selected = i;
	});
	var flexSpace = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	win.setToolbar([flexSpace,left,change,right,flexSpace]);
	return win;
}
module.exports = ProductView;
