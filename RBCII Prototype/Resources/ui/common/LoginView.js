/**
 * @author Royale Dev
 */
function LoginView(parent){
	var bgcolor = 'e8e8e8';
	var imgpfx = '/images/mainmenu/';
	
	var isPortrait = Ti.Gesture.isPortrait() ||  Ti.Gesture.orientation == Ti.UI.FACE_UP;
	
	function getMainImage(){
		if (isPortrait)
		   return '/images/FA-ipad_portrait.png';
		else
			return '/images/FA-ipad_landscape.png';
	}
	
	var self = Ti.UI.createWindow({
		//backgroundImage : '/images/mainmenu/bg-login.png',
	});
	
	
	var mainview = Ti.UI.createView({
		//backgroundImage : getMainImage(),
		layout: 'vertical',
	});
	


	
	var topview = Ti.UI.createView({
		backgroundColor : 'transparent',
		height: isPortrait ? '15%' : '12%',
		
	});
	
	
	function getRoyaleImage(){
		return imgpfx + (isPortrait ? 'royale.png' : 'royale-landscape.png');
	}
		
	var img = Ti.UI.createImageView({
		backgroundColor : 'transparent',
		image : getRoyaleImage(),
		left : isPortrait ? 0 : '5%',
		opacity:0,
	});
	
	var bstyle = Ti.UI.INPUT_BORDERSTYLE_ROUNDED;
	var loginview = Ti.UI.createView({
			backgroundColor : 'transparent',
			left: '10%',
			right: '10%',
			layout : 'vertical',
		});
	
		var controlWidth = isTablet ? 300 : 200;
		var textHeight = isTablet ? 50 : 30;
	  
		var ulabel = Ti.UI.createLabel({
			top : '10%',
			text : 'Username',
			center : '50%',
			font : {fontSize : 14, fontWeight : 'bold'},
			textAlign : 'left'
			,width : controlWidth
			,color : '9e9e9e'
		});
		
		var plabel = Ti.UI.createLabel({
			text : 'Password',
			center : '50%',
			font : {fontSize : 14, fontWeight : 'bold'},
			top : '5%',
			textAlign : 'left'
			,width : controlWidth
			,color : '9e9e9e'
		});
	
		var utext = Ti.UI.createTextField({
			center : '50%',
			width : controlWidth,
			borderStyle : bstyle
			,font: {fontSize: 24}
			,height:textHeight
		});
	
		var ptext = Ti.UI.createTextField({
			center : '50%',
			passwordMask:true,
			width : controlWidth,
			borderStyle : bstyle
			,font: {fontSize: 24}
			,height:textHeight
		});
	
		var loginbtn = Ti.UI.createButton({
			backgroundImage : '/images/mainmenu/btn-login.png',
			width : 80,
			height : isTablet ? 30 : 20
		});
		var cancelbtn = Ti.UI.createButton({
			backgroundImage : '/images/mainmenu/btn-cancel.png',
			width : 88,
			height : isTablet ? 30 : 20
		});
	
		var btnview = Ti.UI.createView({
			top : '2%',
			backgroundColor : 'transparent',
			layout : 'horizontal',
			center : '50%',
			width : controlWidth
		});
		var actInd = createActivityIndicator('validating login info...');
		
	
		btnview.add(loginbtn);
		btnview.add(cancelbtn);
	
		cancelbtn.addEventListener('click', function(e){
			//mainview.animate({view:container, transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
			self.close();
		});
		
		loginbtn.addEventListener('click', function(e){
			ActivityIndicatorWindow = require('ui/common/ActivityIndicatorWindow');
			var args = {top: isPortrait ? 500 : 400, text: 'logging in...'};
			var indicatorWin = new ActivityIndicatorWindow(args);
			indicatorWin.openIndicator();
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
							account.MemberId = acct.UserId;
							Ti.App.Properties.setString("infoId", acct.InfoId);
							Ti.App.Properties.setString('memberId', acct.UserId);
				   			Ti.App.Properties.setString('countryCode', acct.CountryCode);
				   			Ti.App.Properties.setString('accountBalance', acct.Balance);
				   			Ti.App.Properties.setString('fullName', acct.FullName);
						}
						indicatorWin.closeIndicator();
						parent.close();
						self.close();
						var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
  						var apptab = new ApplicationTabGroup(account.InfoId, true);
  						apptab.addEventListener('close', function(e){
  							var MainMenu = require('ui/common/MainMenu');
 	  						new MainMenu().open();
  						});
  						addUserSession(function(e){
  							var sessionid = JSON.parse(this.responseText);
  							Ti.API.info(sessionid[0]);
  							Ti.App.Properties.setString('sessionId', sessionid[0]);
  						},
  						function(e){
  							
  						});
  						apptab.open();
					}
					else{
						indicatorWin.closeIndicator();
						//enableControls(true);
						showMessage('Invalid User name and\\or Password', 'Please verify your username and password and try again');
						ptext.focus();
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
		loginview.add(actInd);
	
	mainview.add(topview);
	//mainview.add(img);
	mainview.add(loginview);
	self.add(mainview);
	
	
	var lastorientation = 0;
	function updateLayout(eorientation){
		if(eorientation > 4 || lastorientation == eorientation) return;
		isPortrait = eorientation == 1 || eorientation == 2 || eorientation == 0;
		//img.height = isPortrait ? Ti.UI.FILL : '30%';
		topview.height = isPortrait ? "45%" : "30%";
		mainview.backgroundImage = getMainImage();
		if(isPortrait){
			loginview.left = '10%';
		}
		else{
			loginview.left = '60%';
		}
	}
	Ti.Gesture.addEventListener('orientationchange', function(e){
		updateLayout(e.orientation);
	});
	
	var backbtn = Ti.UI.createButton({
		backgroundImage : '/images/icon_arrow_left_gray.png',
		//title : 'BACK TO MAIN',
		left : '2%',
		top : '3%'
	});
	backbtn.addEventListener('click', function(e){
		self.close();
	});
	
	self.add(backbtn);
	
	updateLayout(Ti.Gesture.orientation);
	return self;
}
module.exports = LoginView;