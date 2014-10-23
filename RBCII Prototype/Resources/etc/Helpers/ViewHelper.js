/**
 * @author Royale Dev
 */
  var osname = Ti.Platform.osname,
    version = Ti.Platform.version,
    height = Ti.Platform.displayCaps.platformHeight,
    width = Ti.Platform.displayCaps.platformWidth,
    pcenter = Ti.Platform.displayCaps.platformWidth/2;

var isIos = (osname === 'iphone' || osname === 'ipad');
var isAndroid = (osname === 'android');

var sdkVersion = parseFloat(Ti.version);

function checkTablet() {
    var platform = Ti.Platform.osname;

    switch (platform) {
      case 'ipad':
        return true;
      case 'android':
        var psc = Ti.Platform.Android.physicalSizeCategory;
        var tiAndroid = Ti.Platform.Android;
        return psc === tiAndroid.PHYSICAL_SIZE_CATEGORY_LARGE || psc === tiAndroid.PHYSICAL_SIZE_CATEGORY_XLARGE;
      default:
        return Math.min(
          Ti.Platform.displayCaps.platformHeight,
          Ti.Platform.displayCaps.platformWidth
        ) >= 400;
    }
  }

var isTablet = checkTablet();


var ActivityIndicatorStyle;
if (isIos) {
	ActivityIndicatorStyle = Titanium.UI.iPhone.ActivityIndicatorStyle;
} else if (sdkVersion >= 3.0){
	ActivityIndicatorStyle = Titanium.UI.ActivityIndicatorStyle;
}

function createActivityIndicator(msg, isplain){
	if(msg==null) msg = 'processing...';
	var sstyle = isplain != true ? Titanium.UI.iPhone.ActivityIndicatorStyle.DARK : Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN;
	var actInd = Titanium.UI.createActivityIndicator({
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		style : sstyle
	});
	actInd.font = {
		fontFamily : 'Helvetica Neue',
		fontSize : 15,
		fontWeight : 'bold'
	};
	actInd.color = isplain == true ? 'white' : 'black';
	actInd.message = msg;
	return actInd;
}

//Return Header for pull down refresh
function createTableViewHeaderForRefresh(){
	var border = Ti.UI.createView({
		backgroundColor: '#576c89',
		height: 2,
		bottom: 0
	});
	
	var tableHeader = Ti.UI.createView({
		backgroundColor: '#e2e7ed',
		width: 320,
		height: 60
	});
	
	tableHeader.add(border);
	
	var arrow = Ti.UI.createView({
		backgroundImage: '/images/whiteArrow.png',
		width: 23,
		height: 60,
		bottom: 10,
		left: 20
	});
	tableHeader.add(arrow);
	
	var statusLabel = Ti.UI.createLabel({
		text: "Pull to reload",
		left: 55,
		width: 200,
		bottom: 30,
		height: 'auto',
		color: '#576c89',
		textAlign: 'center',
		font: {fontSize:13, fontWeight:'bold'},
		shadowColor: '#999',
		shadowOffset:{x:0,y:1}
	});
	tableHeader.add(statusLabel);
	
	var lastUpdatedLabel = Ti.UI.createLabel({
		text: 'Last Updated: '+ formatDate(false),
		left: 55,
		width: 200,
		bottom: 15,
		height: 'auto',
		color: '#576c89',
		textAlign: 'center',
		font: {fontSize:12},
		shadowColor: '#999',
		shadowOffset:{x:0,y:1}
	});
	tableHeader.add(lastUpdatedLabel);
	
	var actInd = Ti.UI.createActivityIndicator({
		left:20,
		bottom:13,
		width:30,
		height:30
	});
	tableHeader.add(actInd);
	tableHeader.indicator = actInd;
	tableHeader.arrow = arrow;
	tableHeader.status = statusLabel;
	tableHeader.lastUpdated =lastUpdatedLabel;
	
	return tableHeader;
}


//date formatting 
function formatDate(dateOnly){
		var date = new Date();
		var datestr = date.getMonth()+'/'+date.getDate()+'/'+date.getFullYear();
		if(dateOnly == false){
			if(date.getHours()>12){
				datestr+= ' '+date.getHours()-12+':'+date.getMinutes()+' PM';
			}
			else{
				datestr+= ' '+date.getHours()+':'+date.getMinutes()+' AM';
			}
		}
		return datestr;
	}

function formatDateForHXR(date){
	var datestr = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate();
    return datestr;
}

function createComboBox(xwidth, xfont, textHint, picker_data, changeHandler){
	
   if(!isTablet){
   	xfont.fontSize = 12;
   }
	

	var btnurl = '/images/buttons/embed.png';
	var drop_button =  Titanium.UI.createButton({
		style:Titanium.UI.iPhone.SystemButton.DISCLOSURE,
	});

	var my_combo = Titanium.UI.createTextField({
		hintText:textHint,
		height:isTablet ? 40 : 30,
		width:xwidth,
		font:xfont,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		rightButton:drop_button,
		rightButtonMode:Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
	});
	

	var picker_view = Titanium.UI.createView({
		backgroundColor:'white',
		height:251,
		bottom:-500,
		zIndex: 99
	});

	var cancel =  Titanium.UI.createButton({
		title:'Cancel',
		style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});

	var done =  Titanium.UI.createButton({
		title:'Done',
		style:Titanium.UI.iPhone.SystemButtonStyle.DONE
	});

	var spacer =  Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});


	var toolbar =  Titanium.UI.createToolbar({
		top:0,
		items:[cancel,spacer,done],
		barColor: 'silver'
	});

	var picker = Titanium.UI.createPicker({
		top:45
	});
	picker.selectionIndicator=true;

	picker.add(picker_data);

	picker_view.add(toolbar);
	picker_view.add(picker);



	var slide_in =  Titanium.UI.createAnimation({bottom:0});
	var slide_out =  Titanium.UI.createAnimation({bottom:-500});



	my_combo.addEventListener('focus', function() {
		my_combo.blur();
		picker_view.animate(slide_in);
	});

	drop_button.addEventListener('click',function() {
		picker_view.animate(slide_in);
		my_combo.blur();
	});

	cancel.addEventListener('click',function() {
		picker_view.animate(slide_out);
	});

	done.addEventListener('click',function() {
		my_combo.value =  picker.getSelectedRow(0).label;
		var item = picker.getSelectedRow(0).item;
		picker_view.animate(slide_out);
		changeHandler(my_combo.value, item);
	});
	
	my_combo.picker = picker_view;
	my_combo.blur();
	return my_combo;
}

function createTableView(){
	var tableView =  Ti.UI.createTableView({
		backgroundColor: 'transparent',
		separatorColor: 'black',
		//top: 40,
		//bottom: 40
	});
	return tableView;
}

function createTableViewRow(obj){
	var tableRow = Ti.UI.createTableViewRow({
		backgroundColor : 'transparent',
		item : obj
	});
	
	return tableRow;
}

function createLine(lcolor){
	var line = Ti.UI.createView({
		height : 2,
		backgroundColor : lcolor
	});
	return line;
}

//show message with title and message param
function createIndicatorWindow(msg,isplain){
	var t = Titanium.UI.create2DMatrix();
		t = t.scale(0);
	
	var w = Titanium.UI.createWindow({
			backgroundColor:'#576996',//'#336699',
			borderWidth:8,
			borderColor:'silver',//'#999',
			height:Ti.UI.SIZE,
			width:200,
			borderRadius:10,
			layout:'vertical',
			modal:true,
			transform:t
		});
		
	
	// create first transform to go beyond normal size
	var t1 = Titanium.UI.create2DMatrix();
	t1 = t1.scale(1.1);
	var a = Titanium.UI.createAnimation();
	a.transform = t1;
	a.duration = 200;
	
	// when this animation completes, scale to normal size
	a.addEventListener('complete', function()
	{
		var t2 = Titanium.UI.create2DMatrix();
		t2 = t2.scale(1.0);
		w.animate({transform:t2, duration:200});
	});
	
	var indicator = createActivityIndicator(msg,isplain);
	w.add(Ti.UI.createLabel({
			height:30
		}));
	w.add(indicator);
	w.add(Ti.UI.createLabel({
			height:30
		}));
	indicator.show();
	
	w.closeForm = function(){
		var t3 = Titanium.UI.create2DMatrix();
			t3 = t3.scale(0);
			w.close({transform:t3,duration:300});
	};
	w.openForm = function(){
		w.open(a);
	};
	
	return w;
}

function showMessage(title, message){
		var t = Titanium.UI.create2DMatrix();
		t = t.scale(0);
		
		var w = Titanium.UI.createWindow({
			//backgroi:'#576996',//'#336699',
			height: height,
			width: width,
			transform:t
		});
	
		var view = Titanium.UI.createView({
			backgroundColor:'#576996',//'#336699',
			borderWidth:8,
			borderColor:'silver',//'#999',
			height:Ti.UI.SIZE,
			width:300,
			borderRadius:10,
			layout:'vertical',
			center : '50%'
		});
		
		
	
		// create first transform to go beyond normal size
		var t1 = Titanium.UI.create2DMatrix();
		t1 = t1.scale(1.1);
		var a = Titanium.UI.createAnimation();
		a.transform = t1;
		a.duration = 200;
	
		// when this animation completes, scale to normal size
		a.addEventListener('complete', function()
		{
			var t2 = Titanium.UI.create2DMatrix();
			t2 = t2.scale(1.0);
			w.animate({transform:t2, duration:200});
		});
	
		// create a button to close window
		var b = Titanium.UI.createButton({
			color:'#576996',
			backgroundImage:'/images/BUTT_gry_off.png',
			backgroundSelectedImage:'/images/BUTT_gry_on.png',
			backgroundDisabledImage: '/images/BUTT_dry_off.png',
			title:'Close',
			height:30,
			width:150,
			//bottom:50
		});
		var tlabel = Ti.UI.createLabel({
			font:{fontSize:20,fontWeight:'bold'},
			top:15,
			left:15,
			right: 15,
			color:'white',
			text:title,
			textAlign:'center'
		});
		var msg = Ti.UI.createLabel({
			font:{fontSize:14,fontWeight:'bold'},
			left:15,
			right : 15,
			color:'white',
			text:message,
			textAlign:'center'
		});
		view.add(tlabel);
		view.add(Ti.UI.createLabel({
			height:30
		}));
		view.add(msg);
		view.add(Ti.UI.createLabel({
			height:30
		}));
		view.add(b);
		view.add(Ti.UI.createLabel({
			height:20
		}));
		b.addEventListener('click', function()
		{
			var t3 = Titanium.UI.create2DMatrix();
			t3 = t3.scale(0);
			w.close({transform:t3,duration:300});
		});

		w.add(view);
	
		w.open(a);
	}

function openMyAccounts(acctList){
	MyAccounts = require('ui/common/accounts/MyAccounts');
	var myacct = new MyAccounts(acctList);
	var t1 = Titanium.UI.create2DMatrix();
	t1 = t1.scale(1.1);
	var a = Titanium.UI.createAnimation();
	a.transform = t1;
	a.duration = 200;
		
	// when this animation completes, scale to normal size
	a.addEventListener('complete', function()
	{
		var t2 = Titanium.UI.create2DMatrix();
		t2 = t2.scale(1.0);			
		myacct.animate({transform:t2, duration:200});
	});
	myacct.open(a);
}


function createDashboardViewItem(imgurl, iwidth, iheight, lbl){
	var item = Titanium.UI.createDashboardItem();
	var view = Titanium.UI.createView({
		layout : 'vertical'
	});
	var img = Titanium.UI.createImageView({
		image: imgurl,
		width: iwidth,
		height: iheight
	});
	view.add(img);
	item.image = view.toImage(null, true);
	item.label = lbl;
	return item;
}

//create button
function createButton(left, top, width, title){
	var btncolor = '#576996';
	var btn = Ti.UI.createButton({
		left: left,
		top: top,
		color:btncolor,
		/*backgroundImage:'/images/button-blue-on.png',
		backgroundSelectedImage:'/images/button-blue-on.png',
		backgroundDisabledImage: '/images/button-blue-on.png',		*/
		backgroundImage:'/images/BUTT_gry_off.png',
		backgroundSelectedImage:'/images/BUTT_gry_on.png',
		backgroundDisabledImage: '/images/BUTT_dry_off.png',	
		width:width,
		title: title,
	});
	return btn;
}


function createLoadingRow(height){
		var tableRow = createTableViewRow();
		tableRow.backgroundColor = '#576996';
		tableRow.height = height;
		var actInd = Titanium.UI.createActivityIndicator({
			width : Ti.UI.SIZE,
			height : Ti.UI.SIZE,
			style : isTablet ? Titanium.UI.iPhone.ActivityIndicatorStyle.BIG : Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN
		});
		actInd.font = {
			fontFamily : 'Helvetica Neue',
			fontSize : isTablet ? 15 : 12,
			fontWeight : 'bold'
		};
		actInd.color = 'white';
		actInd.message = 'loading... please wait.';
		tableRow.add(actInd);
		actInd.show();

		return tableRow;
	}
	
function loadMyAccounts(){
	var acctList = getMyAccounts();
	openMyAccounts(acctList);
	//accounts existing
	/*if(acctList.length > 0){
		
	}
	else{//no accounts exist yet
		AddAccount = require('ui/common/accounts/AddAccount');
		var addacct = new AddAccount();
		addacct.addEventListener('close',function(e){
			acctList = getMyAccounts();
			openMyAccounts(acctList);
		});
		addacct.open();
	}
	*/
}


function openGallery(popoverView, arrowDirection, imageView) {
	Titanium.Media.openPhotoGallery({
	
		success:function(event)
		{
			var cropRect = event.cropRect;
			var image = event.media;
			var xsize = isTablet ? 180  : 160;
			var minheight = isTablet ? 160 : 140;
			// set image view
			Ti.API.debug('Our type was: '+event.mediaType);
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
			{
				var f = Ti.App.Properties.getString("picPath");
				var bgImg = f != null ? Titanium.Filesystem.getFile(f) : null;
				
				var newheight = parseInt(image.height / image.width * xsize);
				if(newheight < minheight){
					newheight = xsize;
					xsize = parseInt(image.width / image.height * newheight);
				}

				Ti.App.Properties.setString('imageHeight',newheight);
				Ti.App.Properties.setString('imageWidth', xsize);
				
				var finalimg = event.media.imageAsResized(newheight, xsize);
				
				var filename = Titanium.Filesystem.applicationDataDirectory + "/profilepic.jpg";
				Ti.App.Properties.setString("picPath", filename);
				if (bgImg != null)
				{
					bgImg.deleteFile();
				}
				bgImg = Titanium.Filesystem.getFile(filename);
				bgImg.write(finalimg);
				
				imageView.height = newheight;
				imageView.width = xsize;
				imageView.image = finalimg;
				Ti.API.info('width : '+imageView.width+'   height : '+imageView.height);
				imageView.top = isTablet ? 5 : 10;// - parseInt((newheight - xsize)/2);
				imageView.left = isTablet ? 10 : 0;
				if(isTablet == false) imageView.top-=20;
				Ti.API.info('new height is '+newheight);
			}
			else{}// is this necessary?
	
			Titanium.API.info('PHOTO GALLERY SUCCESS cropRect.x ' + cropRect.x + ' cropRect.y ' + cropRect.y  + ' cropRect.height ' + cropRect.height + ' cropRect.width ' + cropRect.width);
		},
		cancel:function(){},
		error:function(error){},
		allowEditing:true,
		popoverView:popoverView,
		arrowDirection:arrowDirection,
		mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO]
	});
}
		
