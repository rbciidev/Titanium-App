/**
 * @author Royale Dev
 */
function MainMenu(){
	Ti.include('etc/Helpers/DataHelper.js');
	Ti.include('etc/Helpers/TextHelper.js');
	Ti.include('etc/Helpers/ViewHelper.js');

	
	var bgcolor = 'e8e8e8';
	var imgpfx = '/images/mainmenu/';
	var isPortrait = Ti.Gesture.isPortrait() ||  Ti.Gesture.orientation == Ti.UI.FACE_UP || osname === 'ipad';
	
	var self = Ti.UI.createWindow({
		backgroundImage : imgpfx+'bg_login.png',
		layout: 'vertical',
	});
	
	if(isTablet) self.orientationModes = [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT];
	
	var topview = Ti.UI.createView({
		backgroundColor : 'transparent',
		height: isPortrait ? 0 : '12%',
	});
	
	
	function getRoyaleImage(){
		return imgpfx + (isPortrait ? 'royale.png' : 'royale-landscape.png');
	}
		
	var img = Ti.UI.createImageView({
		image : getRoyaleImage(),
		left : isPortrait ? 0 : '5%'
	});
	
	
	
	var tblview;
	var tblview2;
	var container = Ti.UI.createView({
			left: '5%',
			right: '5%',
			layout : 'horizontal',
		});
	
	function resetContainer(){
		tblview = Ti.UI.createTableView({
			backgroundColor : 'transparent',
			separatorColor : 'transparent',
			scrollable : false
		});
		tblview2 = Ti.UI.createTableView({
			backgroundColor : 'transparent',
			separatorColor : 'transparent',
			scrollable : false
		});
		tblview.addEventListener('click', function(e){
			tblviewListener(e);
		});
		tblview2.addEventListener('click', function(e){
			tblviewListener(e);
		});
		
		container.add(tblview);
		container.add(tblview2);
	}
	resetContainer();
			
	var imgheight = isPortrait ? 32 : 40;
	var lblheight = isPortrait ? 60 : 80;
	var fsize = isPortrait ? 18 : 22;
		
	if(isTablet == false){
		imgheight = isPortrait ? 14 : 20;
		lblheight = isPortrait ? 30 : 40;
		fsize = isPortrait ? 14 : 18;
	}
		
	function createMenuRow(title, imageurl, idx, hasChild){
		var bgurl = '/images/mainmenu/middleRow';
		if(idx == 0){
			bgurl = '/images/mainmenu/topRow';
		}
		else if(idx == 2){
			bgurl = '/images/mainmenu/bottomRow';
		}
		
		
		var row = Ti.UI.createTableViewRow({
			backgroundImage: bgurl+'.png',
			selectedBackgroundImage: bgurl + 'Selected.png'
		});

		
		var img = Ti.UI.createView({
			backgroundImage: imageurl,
			top: isTablet ? 20 : 10,
			left: 25,
			width: imgheight,
			height: imgheight,
			clickName: 'img'
		});
		row.add(img);
		
		var menulabel = Ti.UI.createLabel({
			left: 75,
			top: 5,
			height: lblheight,
			color: '9e9e9e',
			font : {fontSize:fsize, fontWeight:'bold'},
			text: title,
			clickName: 'lbl'
		});
		
		
		
		row.add(menulabel);
		
		if(hasChild == true){
			var haschildLabel  = Ti.UI.createLabel({
				right: '5%',
				text : '>>',
				height: lblheight,
				color: '9e9e9e',
				font : {fontSize:fsize, fontWeight:'bold'},
			});
			row.add(haschildLabel);
		}
		row.item = title;
		row.bgurl = bgurl;
		row.imageurl = imageurl;
		return row;
	}
	
	
	self.add(topview);
	self.add(img);
	self.add(container);
	
	function resetMenu(){
		var emptyData = [];
		tblview.setData(emptyData);
		tblview2.setData(emptyData);
		
		tblview.appendRow(createMenuRow("Log In","/images/mainmenu/login.png", 0));
		tblview.appendRow(createMenuRow("Register","/images/mainmenu/register.png", 1));
		tblview.appendRow(createMenuRow("About Us","/images/mainmenu/aboutus.png", 1, true));
		tblview.appendRow(createMenuRow("Shop","/images/mainmenu/shop.png", isPortrait ? 1 : 2));
		var table = isPortrait ? tblview : tblview2;
		table.appendRow(createMenuRow("Products","/images/mainmenu/products.png", isPortrait ? 1 : 0, true));
		table.appendRow(createMenuRow("Presentation","/images/mainmenu/presentation.png", 1, true));
		table.appendRow(createMenuRow("News & Announcements","/images/mainmenu/news.png", 1));
		table.appendRow(createMenuRow("Reach Us","/images/mainmenu/reachus.png", 2, true));
		
		tblview.width = isPortrait ? '100%' : '50%';
		tblview2.width = isPortrait ? 0 : '50%';
		topview.height = isPortrait ? '5%' : '12%';
	}
	
	var lastorientation = -1;
	
	function updateLayout(eorientation){
		Ti.API.info(eorientation);
			if(eorientation > 4 || lastorientation == eorientation) return;
			isPortrait = eorientation == 1 || eorientation == 2 || eorientation == 0;
			img.image = getRoyaleImage();
			img.left = isPortrait ? 0 : '5%';
			lastorientation = eorientation;
			resetMenu();
		//}
	}
	
	Ti.Gesture.addEventListener('orientationchange', function(e){
		updateLayout(e.orientation);
	});
	
	function resetIndex(source){
		if(source == "About Us" ||
		   source == 'Products')
		  return 4;
		  else if (source == "Presentation" ||
		  		   source == "Reach Us")
		  		   return 2;
		  else return 0;
	}
	
	
	var selectedButton = "";
	function tblviewListener(e){
		var row = e.row;
		var source = row.item;
		var clickName = e.source.clickName;
		var index = e.index;
		
		Ti.API.info(clickName);
		
		var ViewerTab = require('ui/common/ViewerTab');
		if(source == 'Log In'){
			//mainview.animate({view:loginview, transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
			container.hide();
			var LoginView;
			if (isTablet) LoginView = require('ui/common/LoginView');
			else LoginView = require('ui/handheld/ios/LoginView');
			
			var login = new LoginView(self);
			login.addEventListener('close',function(){
				container.show();
			});
			login.open();
		}
		else if(source == 'Register'){
			var viewer = new ViewerTab('https://www.royaledirectsales.com/N_register.aspx');
			viewer.open();
		}
		else if(source == 'Shop'){
			var viewer = new ViewerTab('http://royale-international.com');
			viewer.open();
		}
		else if(source == 'About Us'){
			resetMenu();
			if(selectedButton == source){
				selectedButton = "";
			}
			else{
				var xrow = createUpdateRow(row);
				tblview.updateRow(index, xrow);
				tblview.insertRowAfter(index,createSubRow("President's Page"));
				tblview.insertRowAfter(index,createSubRow("Chairman's Page"));
				tblview.insertRowAfter(index,createSubRow('Code of Conduct'));
				tblview.insertRowAfter(index,createSubRow('Our Story'));
				selectedButton = source;
			}
			
		}
		else if (source == 'Our Story' || source == 'Code of Conduct' ||
		 		source == "President's Page" || source == "Chairman's Page"){
			if(source == "Chairman's Page")
				viewer = new ViewerTab('http://royalebusinessclub.com/rbcii_phil/chairmans-page2.php');
			else  if (source == "President's Page")
				viewer = new ViewerTab('http://royalebusinessclub.com/rbcii_phil/presidents-page2.php');
			else if (source == "Code of Conduct")
				viewer = new ViewerTab('http://royalebusinessclub.com/rbcii_phil/code-of-conduct2.php');
			else 
				viewer = new ViewerTab('http://royalebusinessclub.com/rbcii_phil/our-story2.php');
			viewer.open();			
		}
		else if(source == 'Products'){
			resetMenu();
			if(selectedButton == source){
				selectedButton = "";
			}
			else if(selectedButton != source){
				index -= index <= 5 ? 0 : resetIndex(selectedButton);
				var table = isPortrait ? tblview : tblview2;
				var xrow = createUpdateRow(row);
				table.updateRow(index, xrow);
				table.insertRowAfter(index,createSubRow("Product Package Hyperplan"));
				table.insertRowAfter(index,createSubRow("L'OPULENT"));
				table.insertRowAfter(index,createSubRow('Royale Beauty'));
				table.insertRowAfter(index,createSubRow('Royale Wellness'));
				selectedButton = source;
			}
		}
		else if(source == "L'OPULENT" || source == 'Royale Beauty' || source == 'Royale Wellness' || source == "Product Package Hyperplan"){
  			if(source == "L'OPULENT")
				viewer = new ViewerTab('http://royalebusinessclub.com/rbcii_phil/lopulent2.php');
			else  if (source == "Royale Beauty")
				viewer = new ViewerTab('http://royalebusinessclub.com/rbcii_phil/royale-beauty2.php');
			else if (source == "Product Package Hyperplan")
				viewer = new ViewerTab('http://royalebusinessclub.com/rbcii_phil/product-package-hp2.php');
			else 
				viewer = new ViewerTab('http://royalebusinessclub.com/rbcii_phil/royale-wellness2.php');
			viewer.open();
		}
		else if(source == 'Presentation'){
			resetMenu();
			if(selectedButton == source){
				selectedButton = "";
			}
			else if(selectedButton != source){
				index -= index <= 6 ? 0 : resetIndex(selectedButton);
				var table = isPortrait ? tblview : tblview2;
				var xrow = createUpdateRow(row);
				table.updateRow(index, xrow);	
				table.insertRowAfter(index,createSubRow("Product Presentation"));
				table.insertRowAfter(index,createSubRow("RBP"));
				selectedButton = source;
			}
		}
		else if(source == "Product Presentation" || source == 'RBP'){
			var viewer;
			if(source == "RBP")
				viewer = new ViewerTab('http://royalebusinessclub.com/rbcii_phil/RBP2.php');
			else 
				viewer = new ViewerTab('http://royalebusinessclub.com/rbcii_phil/product-presentation2.php');
			viewer.open();
		}
		else if(source == 'News & Announcements'){
			var viewer = new ViewerTab('http://royalebusinessclub.com/rbcii_phil/news2.php');
			viewer.open();
		}
		else if(source == 'Reach Us'){
			resetMenu();
			if(selectedButton == source){
				selectedButton = "";
			}
			else if(selectedButton != source){
				index -= index <= 7 ? 0 : resetIndex(selectedButton);
				var table = isPortrait ? tblview : tblview2;
				var xrow = createUpdateRow(row);
				table.updateRow(index, xrow);	
				table.insertRowAfter(index,createSubRow("Philippine Branches"));
				table.insertRowAfter(index,createSubRow("Worlwide Offices"));
				selectedButton = source;
			}
		}
		else if(source == "Philippine Branches" || source == 'Worlwide Offices'){
			var viewer;
			if(source == "Worlwide Offices")
				viewer = new ViewerTab('http://royalebusinessclub.com/rbcii_phil/worldwideoffices-app.php');
			else 
				viewer = new ViewerTab('http://royalebusinessclub.com/rbcii_phil/store-locations2.php');
			viewer.open();
		}
	}
	
	
	function createSubRow(title){
		var row = Ti.UI.createTableViewRow();
		var label = Ti.UI.createLabel({
			text : title,
			left: 50,
			top: isTablet ? 5 : '1%',
			color: '9e9e9e',
			height : isTablet ? lblheight : lblheight-15,
			font : {fontSize:fsize},
		});
		row.add(label);
		row.item = title;
		return row;
	}
	
	function createUpdateRow(xrow){
		var bgurl = xrow.bgurl;
		
		var row = Ti.UI.createTableViewRow({
			backgroundImage: bgurl + 'Selected.png'
		});
		
		
		var img = Ti.UI.createView({
			backgroundImage: xrow.imageurl,
			top: isTablet ? 20 : 10,
			left: 25,
			width: imgheight,
			height: imgheight,
			clickName: 'image'
		});
		row.add(img);
		
		var menulabel = Ti.UI.createLabel({
			left: 75,
			top: 5,
			height: lblheight,
			color: '9e9e9e',
			font : {fontSize:fsize, fontWeight:'bold'},
			text: xrow.item
		});
		
		
		
		row.add(menulabel);
		
		var haschildLabel  = Ti.UI.createLabel({
			right: '5%',
			text : '>',
			height: lblheight,
			color: '9e9e9e',
			font : {fontSize:fsize, fontWeight:'bold'},
		});
		haschildLabel.transform = Ti.UI.create2DMatrix().rotate(90);
		row.add(haschildLabel);

		row.item = xrow.item;
		row.bgurl = xrow.bgurl;
		row.imageurl = xrow.imageurl;
		xrow.xheight = lblheight;
		return row;
	}
	
	
	
	function createLoginView(){
		var bstyle = Ti.UI.INPUT_BORDERSTYLE_ROUNDED;
		var loginview = Ti.UI.createView({
			backgroundColor : 'transparent',
			left: '5%',
			right: '5%',
			layout : 'vertical',
		});
	
	
		var ulabel = Ti.UI.createLabel({
			top : '10%',
			text : 'Username',
			center : '50%',
			font : {fontSize : 14, fontWeight : 'bold'},
			textAlign : 'left'
			,width : 300
			,color : '9e9e9e'
		});
		
		var plabel = Ti.UI.createLabel({
			text : 'Password',
			center : '50%',
			font : {fontSize : 14, fontWeight : 'bold'},
			top : '5%',
			textAlign : 'left'
			,width : 300
			,color : '9e9e9e'
		});
	
		var utext = Ti.UI.createTextField({
			center : '50%',
			width : 300,
			borderStyle : bstyle
			,font: {fontSize: 24}
			,height:50
		});
	
		var ptext = Ti.UI.createTextField({
			center : '50%',
			passwordMask:true,
			width : 300,
			borderStyle : bstyle
			,font: {fontSize: 24}
			,height:50
		});
	
		var loginbtn = Ti.UI.createButton({
			backgroundImage : '/images/mainmenu/btn-login.png',
			width : 80,
			height : 30
		});
		var cancelbtn = Ti.UI.createButton({
			backgroundImage : '/images/mainmenu/btn-cancel.png',
			width : 88,
			height : 30
		});
	
		var btnview = Ti.UI.createView({
			top : '2%',
			backgroundColor : 'transparent',
			layout : 'horizontal',
			center : '50%',
			width : 300
		});
		var actInd = createActivityIndicator('validating login info...');
		
	
		btnview.add(loginbtn);
		btnview.add(cancelbtn);
	
		cancelbtn.addEventListener('click', function(e){
			mainview.animate({view:container, transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
		});
		
		loginbtn.addEventListener('click', function(e){
			actInd.show();
			//enableControls(false);
			var uname = utext.value;
			var pword = ptext.value; 
			var account = {
				Id: 0,
				AccountName : 'Main Menu Login',
				UserName : utext.value,
				Password : ptext.value
			};
			validateLogin(account, function(){
					var data = JSON.parse(this.responseText);
					if(data.length > 0){
						for(var i=0; i < data.length; i++){
							var acct = data[0];
							account.FullName = acct.FullName;
							account.InfoId = acct.InfoId;
						}
						
						var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
  						var apptab = new ApplicationTabGroup(account.InfoId);
  						apptab.open();
					}
					else{
						actInd.hide();
						//enableControls(true);
						showMessage('Invalid User name and\\or Password', 'Please verify your username and password and try again');
						pwordText.focus();
					}
				
				},
				function(e){
					actInd.hide();
					//nableControls(true);
					showMessage('Network Problem', 'Unable to connect to the server, please check your internet connection and try again\n[Error :'+e.error+ ']');
				});
		});
	
		loginview.add(ulabel);
		loginview.add(utext);
		loginview.add(plabel);
		loginview.add(ptext);
		loginview.add(btnview);
		//loginview.add(actInd);
		return loginview;
	}
	
	var loginview = createLoginView();

	
	updateLayout(Ti.Gesture.orientation);
	
	return self;
}
module.exports = MainMenu;