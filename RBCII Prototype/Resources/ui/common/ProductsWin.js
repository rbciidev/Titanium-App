function ProductsWin(parent) {
	var ProductView = require('ui/common/ProductView');
	
	var win = Ti.UI.createWindow({
		title: 'Products',
		backgroundImage: '/images/mainmenu/bg_login.png',
		layout: 'vertical'
		,barColor : 'silver',
	});
	
	var container = Ti.UI.createView();
	var selectedProductIndex = "L'OPULENT";
	
	function reloadImages(productIndex){
		if(productIndex != null)
			selectedProductIndex = productIndex;
		var images = [];
		if(productIndex == "Royale Wellness"){
			images.push(createImage('/images/products/large/spirulina.png'));			//0
			images.push(createImage('/images/products/large/prime.png'));				//1
			images.push(createImage('/images/products/large/lgluta.png'));				//2
			images.push(createImage('/images/products/large/lgluta700.png'));			//3
			images.push(createImage('/images/products/large/pinkishglow.png'));			//4
			images.push(createImage('/images/products/large/royale-c-bottle.png'));		//5
			images.push(createImage('/images/products/large/fiberich.png'));				//6
			images.push(createImage('/images/products/large/diabetwatch.png'));			//7
			images.push(createImage('/images/products/large/grapeseed.png'));			//8
			images.push(createImage('/images/products/large/fitshape.png'));				//9
			images.push(createImage('/images/products/large/riqall.png'));				//10
			images.push(createImage('/images/products/large/performax.png'));			//11
			images.push(createImage('/images/products/large/coffee_reg.png'));			//12
			images.push(createImage('/images/products/large/coffee_lite.png'));			//13
			images.push(createImage('/images/products/large/choco2.png'));				//14
			images.push(createImage('/images/products/large/corn.png'));					//15
			images.push(createImage('/images/products/large/richarge.png'));				//16
			win.title = "Royale Wellness";
		}
		else if(productIndex == "Royale Beauty"){
			images.push(createImage('/images/products/large/pinkishcream.png'));			//17
			images.push(createImage('/images/products/large/pinkishtoner.png'));			//18
			images.push(createImage('/images/products/large/kojicsoap.png'));			//19
			images.push(createImage('/images/products/large/lipstick.png'));				//20
			images.push(createImage('/images/products/large/glutaWHITENINGcream.png'));	//21
			images.push(createImage('/images/products/large/glutaANTIageingCREAM.png'));	//22
			images.push(createImage('/images/products/large/glutaLIGHTENINGlotion.png'));//23
			images.push(createImage('/images/products/large/glutaPOWERantiAGEING.png'));	//24
			images.push(createImage('/images/products/large/glutasoap.png'));			//25
			win.title = "Royale Beauty";
		}
		else{
			images.push(createImage('/images/products/large/jeune.png'));				//26
			images.push(createImage('/images/products/large/lumiere.png'));				//27
			images.push(createImage('/images/products/large/meilleur.png'));				//28
			images.push(createImage('/images/products/large/rejuv.png'));				//29
			images.push(createImage('/images/products/large/glutadeo2.png'));			//30
			win.title = "L'OPULENT";
		}
		view.setImages(images);
	}
	
	function createImage(path){
		var ximage = {};
		ximage.image = path;
		ximage.height = !isTablet ? '50%' : '100%';
		ximage.width = !isTablet ? '50%' : '100%';
		return ximage;
	}
	
	
	
	var isodd = true;
	var oldIndex = 0;
	
	// create coverflow view with images
	var view = Titanium.UI.iOS.createCoverFlowView({
		top: 0,
		height: '50%',
		width: Ti.UI.FILL
		//backgroundColor:'#000'
	});
	
	reloadImages();

	
	// click listener - when image is clicked
	view.addEventListener('click',function(e)
	{
		Titanium.API.info("image clicked: "+e.index+', selected is '+view.selected);	
	});
	
	// change listener when active image changes
	view.addEventListener('change',function(e)
	{
		updateDescription();
	});
	container.add(view);
	
	function getDescription(index){
		var category = selectedProductIndex == null || selectedProductIndex == "L'OPULENT" ? "" : selectedProductIndex;
		Titanium.API.info("selected is = "+index);
		var f = Ti.Filesystem.getFile('etc/descriptions/'+category+index+'.txt');
		var contents = f.read();
		return contents.text;
	}
	
	function updateDescription(){
		isodd = !isodd;
		var description = getDescription(view.selected);
		var style = parseInt(view.selected) > parseInt(oldIndex) ? Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT;
		descView.animate({view:isodd ? descView1 : descView2, transition:style});
		setTimeout(function(){
		if(isodd){
			descLabel.text = description;
			descLabel2.text = '';
		}
		else{
			descLabel2.text = description;
			descLabel.text = '';
		}
		oldIndex = view.selected;
		},500);
	}
	
	// change button to dynamically change the image
	var change = Titanium.UI.createButton({
		title:'Change Product',
		style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	/*change.addEventListener('click',function()
	{
		updateDescription();
	});
	*/
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
		updateDescription();
	});
	
	// move scroll view right
	var right = Titanium.UI.createButton({
		image:'/images/icon_arrow_right.png'
	});
	right.addEventListener('click', function(e)
	{
		var i = view.selected + 1;
		if (i >= view.images.length) 
		{
			i = view.images.length - 1;
		}
		view.selected = i;
		updateDescription();
	});
	var flexSpace = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	win.setToolbar([flexSpace,left,change,right,flexSpace]);
	
	var descView = Ti.UI.createView({
		top: '50%',
		height: '50%'
	});
	
	var descView1 = Ti.UI.createScrollView({		
	});
	var descView2 = Ti.UI.createScrollView({		
	});
	
	var f = Ti.Filesystem.getFile('etc/descriptions/0.txt');
	var contents = f.read();
	var descLabel = Ti.UI.createLabel({
		top: '2%',
		left: '2%',
		right:'2%',
		verticalAlign: 'top',
		font : {fontFamily : 'GillSans', fontSize: isTablet ? 18 : 14},
		text: contents.text
	});
	var descLabel2 = Ti.UI.createLabel({
		top: '2%',
		left: '2%',
		right:'2%',
		verticalAlign: 'top',
		font : {fontFamily : 'GillSans', fontSize: isTablet ? 18 : 14},
		text: contents.text
	});
	descView1.add(descLabel);
	descView2.add(descLabel2);
	descView.add(descView1);
	
	var leftbtn = Ti.UI.createButton({
			backgroundImage:'/images/icon_arrow_left.png',
			height:33,
			width:33,
			toggle:false
		});
		
	leftbtn.addEventListener('click',function(e){
		parent.tabs[1].active = true;
	});
	
	var cdata = [];
	
	function createCategoryPickerRow(title, idx){
		var prow = Ti.UI.createPickerRow();
		var label = Ti.UI.createLabel({
				text:title,
				font:{fontSize:24,fontWeight:'bold'},
				width:'auto',
				height:'auto'
			});
		prow.label = title;
		prow.value = idx;
		prow.add(label);
		return prow;
	}
	
	var catcombo;
	function prepareCategoryCombo(){
		var cdata = [];
		cdata.push(createCategoryPickerRow('Royale Wellness', 1));
		cdata.push(createCategoryPickerRow('Royale Beauty', 2));
		cdata.push(createCategoryPickerRow("L'OPULENT", 3));
		
		catcombo = createComboBox(150,{fontSize:14, fontWeight:'bold'},'Select a User Id', cdata, selectionChangedHandler);
		catcombo.value = "L'OPULENT";
		win.rightNavButton = catcombo;
		container.add(catcombo.picker);
	}
	
	function selectionChangedHandler(value){
		container.remove(catcombo);
		container.remove(view);
		view = Titanium.UI.iOS.createCoverFlowView({
			top: 0,
			height: '50%',
			width: Ti.UI.FILL
			//backgroundColor:'#000'
		});
		view.addEventListener('change',function(e)
		{
			updateDescription();
		});
		reloadImages(value);
		container.add(view);
		container.add(catcombo.picker);
		view.selected = 0;		
		updateDescription();

	}
	
	
	win.leftNavButton = leftbtn;
	
	container.add(descView);
	win.add(container);
	prepareCategoryCombo();
	return win;
};

module.exports = ProductsWin;
