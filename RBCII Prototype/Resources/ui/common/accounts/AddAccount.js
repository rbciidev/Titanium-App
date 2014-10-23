/**
 * @author Royale Dev
 * For Adding User Accounts 
 */

function AddAccount(selectedAccount, myaccounts){
	Ti.include('etc/Helpers/DataHelper.js');
	Ti.include('etc/Helpers/TextHelper.js');
	Ti.include('etc/Helpers/ViewHelper.js');
	
	var self = Ti.UI.createWindow({
		backgroundColor : 'white',
		title : 'Add Royale Account',
		borderWidth:8,
		borderRadius:10,
		borderColor: 'silver',
		width: isTablet ? '40%' : '80%',
		height: 400,
	});
	
	var container = Ti.UI.createView({
		layout : 'vertical',
		backgroundColor : 'white'
	});
	
	var labelFont = Font14Bold();
	var textFont = Font14Normal();
	var bstyle = Ti.UI.INPUT_BORDERSTYLE_ROUNDED;
	
	var title = Ti.UI.createLabel({
		top : '5%',
		font : Font16Bold(),
		text : selectedAccount == null ? 'Create a new Account' : selectedAccount.AccountName,
		textAlign : 'center',
		width : Ti.UI.FILL
	});
	
	var acctlabel = Ti.UI.createLabel({
		font : labelFont,
		text : 'Account Name',
		left : '5%',
		top : '5%'
	});
	
	var acctText = Ti.UI.createTextField({
		font : textFont,
		value: selectedAccount != null ? selectedAccount.AccountName : '',
		hintText : 'Enter Account Name\Description',
		left : '5%',
		borderStyle : bstyle
	});
	
	
	var unameLabel = Ti.UI.createLabel({
		font : labelFont,
		text : 'Username',
		left : '5%',
		top : '3%'
	});
	
	var unameText = Ti.UI.createTextField({
		font : textFont,
		hintText : 'Enter Username',
		left : '5%',
		borderStyle : bstyle,
		value: selectedAccount != null ? selectedAccount.UserName : ''
	});
	
	var pwordLabel = Ti.UI.createLabel({
		font : labelFont,
		left : '5%',
		top : '3%',
		text : 'Password'
	});
	
	var pwordText = Ti.UI.createTextField({
		font: textFont,
		passwordMask:true,
		left : '5%',
		hintText : 'Enter your password',
		borderStyle : bstyle
	});
	
	var btnview = Ti.UI.createView({
		layout : 'horizontal'
	});
	
	var grayon = '/images/BUTT_gry_on.png';
	var grayoff = '/images/BUTT_gry_off.png';
	var dryoff = '/images/BUTT_dry_off.png';
	var btncolor = '#576996';
	
	var saveBtn = Ti.UI.createButton({
		backgroundImage : grayoff,
		backgroundSelectedImage : grayon,
		backgroundDisabledImage : dryoff,
		color : btncolor,
		title : 'Save',
		left : '5%',
		width : 100
	});
	
	var cancelBtn = Ti.UI.createButton({
		backgroundImage : grayoff,
		backgroundSelectedImage : grayon,
		backgroundDisabledImage : dryoff,
		color : btncolor,
		title : 'Cancel',
		left : '2%',
		width : 100
	});
	
	var actInd = createActivityIndicator('validating login info...');
	
	btnview.add(saveBtn);
	btnview.add(cancelBtn);
	
	container.add(title);
	container.add(acctlabel);
	container.add(acctText);
	container.add(unameLabel);
	container.add(unameText);
	container.add(pwordLabel);
	container.add(pwordText);
	container.add(Ti.UI.createLabel({
		height : 50
	}));
	container.add(btnview);
	container.add(actInd);
	
	
	function enableControls(isEnabled){
		acctText.blur();
		unameText.blur();
		pwordText.blur();
		
		cancelBtn.enabled =
		saveBtn.enabled =
		acctText.enabled = 
		unameText.enabled =
		pwordText.enabled = isEnabled;
	}
	
	function accountExists(account){
		if(myaccounts == null) return false;
		for(var i = 0; i < myaccounts.length; i++){
			var myacct = myaccounts[i];
			if(account.AccountName == myacct.AccountName ||
				account.UserName == myacct.UserName)
				return true;
		}
		return false;
	}
	
	saveBtn.addEventListener('click', function(e){
		actInd.show();
		enableControls(false);
		var account = {
			Id: selectedAccount != null ? selectedAccount.Id : 0,
			AccountName : acctText.value,
			UserName : unameText.value,
			Password : pwordText.value
		};
		if(false == accountExists(account)){
			validateLogin(account, function(){
				var data = JSON.parse(this.responseText);
				if(data.length > 0){
					for(var i=0; i < data.length; i++){
						var acct = data[0];
						account.FullName = acct.FullName;
						account.InfoId = acct.InfoId;
					}
					if(selectedAccount == null){
						addNewAccount(account);
					}
					else{
						updateMyAccount(account);
					}
					
					//showMessage('Account Validated', 'Your account has been added successfully!');
					self.close();
				}
				else{
					actInd.hide();
					enableControls(true);
					showMessage('Invalid User name and\\or Password', 'Please verify your username and password and try again');
					pwordText.focus();
				}
			
			},
			function(e){
				actInd.hide();
				enableControls(true);
				showMessage('Network Problem', 'Unable to connect to the server, please check your internet connection and try again\n[Error :'+e.error+ ']');
			});
		}
		else{
			showMessage('Account Exists','Account Name and/or Username already exists!');
			enableControls(true);
		}
		
	});
	
	cancelBtn.addEventListener('click', function(e){
		var closetrans = Titanium.UI.create2DMatrix();
		closetrans = closetrans.scale(0);
		self.close({transform:closetrans,duration:300});
	});
	
	
	self.add(container);
	
	return self;
}
module.exports = AddAccount;

