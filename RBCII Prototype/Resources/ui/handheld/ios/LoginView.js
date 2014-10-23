/**
 * @author Royale Dev
 */
function LoginView(parent){
	var bgcolor = 'e8e8e8';
	var imgpfx = '/images/mainmenu/';
	
	var isPortrait = Ti.Gesture.isPortrait();
	
	var bgimg = isPortrait ? '/images/FA-iphone_portrait2.png' : '/images/FA-iphone_landscape.png';
	
	var self = Ti.UI.createWindow({
		//backgroundImage : bgimg,
	});
	
	
	var mainview = Ti.UI.createView({
		backgroundImage : bgimg,
		layout: 'vertical',
	});
	


	
	var topview = Ti.UI.createView({
		backgroundColor : 'transparent',
		height: isPortrait ? '30%' : '8%',
		
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
			//right: '10%',
			layout : 'vertical',
			width: Ti.UI.SIZE
		});
	
		var controlWidth = isTablet ? 200 : 170;
		var textHeight = isTablet ? 50 : 40;
	  
		var ulabel = Ti.UI.createLabel({
			left: '2%',
			text : 'Username',
			font : {fontSize : 12, fontWeight : 'bold'},
			textAlign : 'left'
			,color : '9e9e9e'
		});
		
		var plabel = Ti.UI.createLabel({
			text : 'Password',
			left: '2%',
			font : {fontSize : 12, fontWeight : 'bold'},
			textAlign : 'left'
			,color : '9e9e9e'
		});
	
		var utext = Ti.UI.createTextField({
			left: '5%',
			width : controlWidth,
			borderStyle : bstyle
			,font: {fontSize: 20}
			,height:textHeight,
			tintColor : 'silver'
		});
		
	
		var ptext = Ti.UI.createTextField({
			left: '6%',
			passwordMask:true,
			width : controlWidth,
			borderStyle : bstyle
			,font: {fontSize: 20}
			,height:textHeight,
			tintColor : 'silver',
			focusable : true
		});
		
	
		var loginbtn = Ti.UI.createButton({
			backgroundImage : '/images/mainmenu/btn-login.png',
			width : 80,
			height : 30
		});
		var cancelbtn = Ti.UI.createButton({
			left : '1%',
			backgroundImage : '/images/mainmenu/btn-cancel.png',
			width : 88,
			height : 30
		});
	
		var btnview = Ti.UI.createView({
			top : '5%',
			left: '27%',
			backgroundColor : 'transparent',
			layout : 'horizontal',
			width : Ti.UI.SIZE
		});
		var actInd = createActivityIndicator('validating login info...');
		
	
		btnview.add(loginbtn);
		btnview.add(cancelbtn);
	
		cancelbtn.addEventListener('click', function(e){
			//mainview.animate({view:container, transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
			self.close();
		});
		
		
		function loginMe(e){
			ActivityIndicatorWindow = require('ui/common/ActivityIndicatorWindow');
			var args = {top: '48%', text: 'logging in...'};
			var indicatorWin = new ActivityIndicatorWindow(args);
			indicatorWin.openIndicator();
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
					indicatorWin.closeIndicator();
					showMessage('Network Problem', 'Unable to connect to the server, please check your internet connection and try again\n[Error :'+e.error+ ']');
				});
		}
		
		ptext.addEventListener('return',function(e){loginMe(e);});
		
		loginbtn.addEventListener('click', function(e){loginMe(e);});
	
		var uview = Ti.UI.createView({
			layout : 'horizontal',
			height : Ti.UI.SIZE,
			top : '20%'
		});
		uview.add(ulabel);
		uview.add(utext);
		
		var pview = Ti.UI.createView({
			layout : 'horizontal',
			height : Ti.UI.SIZE,
			top : '2%'
		});
		pview.add(plabel);
		pview.add(ptext);
		
		loginview.add(uview);
		loginview.add(pview);
		loginview.add(btnview);
		loginview.add(actInd);
	
	mainview.add(topview);
	//mainview.add(img);
	mainview.add(loginview);
	self.add(mainview);
	
	
	var lastorientation = 0;
	/*Ti.Gesture.addEventListener('orientationchange', function(e){
		if(e.orientation > 4 || lastorientation == e.orientation) return;
		Ti.API.info('orientation is '+e.orientation);
		isPortrait = e.orientation == 1 || e.orientation == 2 || e.orientation == 0;
		//img.image = getRoyaleImage();
		//img.left = isPortrait ? 0 : '5%';
		pview.layout = isPortrait ? 'horizontal' : 'vertical';
		uview.layout = isPortrait ? 'horizontal' : 'vertical';
		if(isPortrait){
			uview.top = '20%';
			uview.left = pview.left = '10%';
			loginview.left = 0;
			img.height = Ti.UI.SIZE;
			btnview.left = '34%';
		}
		else{
			uview.top = uview.left = pview.left = 0;
			img.height = 50;
			loginview.left = '63%';
			btnview.left = '5%';
		}
		mainview.backgroundImage = isPortrait ? '/images/FA-iphone_portrait.png' : '/images/FA-iphone_landscape.png';
	});
	*/
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
	
	
	return self;
}
module.exports = LoginView;