/**
 * @author Royale Dev
 */
function MyAccounts(myaccounts){
	Ti.include('etc/Helpers/DataHelper.js');
	Ti.include('etc/Helpers/TextHelper.js');
	Ti.include('etc/Helpers/ViewHelper.js');
	
	var logging = false;
	var self = Ti.UI.createWindow({
		backgroundColor:'silver',
		backgroundImage : '/images/mainmenu/bg_login.png',
        touchEnabled:true,
        height:Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: 'vertical'
	});
	var topview = Ti.UI.createView({
		height: '18%'
	});
	
	var container = Ti.UI.createView({
		backgroundColor: 'white',
		title: 'My Accounts', 
		//transform : trans,
		borderWidth:8,
		borderRadius:10,
		borderColor: 'silver',
		width : isTablet ? '50%' : '90%',
		height : '60%'
	});
	
	var tableView = createTableView();
	tableView.bottom = tableView.top = 40;
	
	var newAccount = Ti.UI.createTableViewRow({title:'Add New Account'});
	
	function openAddAccount(selectedAccount){
		AddAccount = require('ui/common/accounts/AddAccount');
		var addacct = new AddAccount(selectedAccount, myaccounts);
		addacct.addEventListener('close',function(){
			myaccounts = getMyAccounts();
			loadAccounts();
		});
		addacct.open();
	}
	
	newAccount.addEventListener('click', function(e){
 		openAddAccount();
	});
	
	
	function createErrorRow(row, msg){
		var tableRow = createTableViewRow(row.item);
		tableRow.backgroundColor = 'white';
		tableRow.height = 100;
		var errmsg = Ti.UI.createLabel({
			left: '5%',
			right: '5%',
			color : 'red',
			text: 'Login Failed. Please check your internet connection and try again.'
		});
		tableRow.add(errmsg);
		
		tableRow.accountRow = row;
		return tableRow;
	}
	
	function createLoginRow(row){
		var tableRow = createTableViewRow(row.item);
		tableRow.backgroundColor = '#576996';
		tableRow.height = 100;
		var actInd = Titanium.UI.createActivityIndicator({
			width : Ti.UI.SIZE,
			height : Ti.UI.SIZE,
			style : Titanium.UI.iPhone.ActivityIndicatorStyle.BIG
		});
		actInd.font = {
			fontFamily : 'Helvetica Neue',
			fontSize : 15,
			fontWeight : 'bold'
		};
		actInd.color = 'white';
		actInd.message = 'logging in...';
		tableRow.add(actInd);
		actInd.show();
		
		tableRow.accountRow = row;
		return tableRow;
	}
	
	function createAccountRow(account){
		var tableRow = createTableViewRow(account);
			tableRow.height = 100;
			var photo  = Ti.UI.createView({
				backgroundImage : '/images/misc/anonymous.png',
				top:5,
				left:10,
				width:90,
				height:90,
				clickName:'photo'
			});
			tableRow.add(photo);				
			var acctName = Ti.UI.createLabel({
				font:{fontSize:16,fontWeight:'bold', fontFamily:'Arial'},
				left:110,
				top:2,
				height:30,
				clickName:'acctName',
				text:account.AccountName
			});
			tableRow.add(acctName);
				
			var uname = Ti.UI.createLabel({
				font:{fontSize:14,fontWeight:'normal', fontFamily:'Arial'},
				left:110,
				top:21,
				height:50,
				width:200,
				clickName:'uname',
				text:'Username : ' + account.UserName
			});
			tableRow.add(uname);
			
			var btnView = Ti.UI.createView({
				top: 60,
				left: 110,
				layout: 'horizontal',
				clickName: 'btnview'
			});

			var bbar = Titanium.UI.createButtonBar({
				labels:['edit', 'remove'],
				backgroundColor:'#576996',
				clickName: 'button'
			});
			
			bbar.addEventListener('click', function(e){
				if(e.index == 0){
					openAddAccount(account);
				}
				else{
					removeMyAccount(account.Id);
					myaccounts = getMyAccounts();
					loadAccounts();
				}
			});
			
			btnView.add(bbar);
			
			tableRow.add(btnView);
			return tableRow;
	}
	
	function loadAccounts(){
		var emptydata = [];
		tableView.setData(emptydata);
		accounts = myaccounts;
		for(var i=0; i < accounts.length; i++){
			var account = accounts[i];
			
			var tableRow = createAccountRow(account);
			tableView.appendRow(tableRow);
		}
		
		tableView.appendRow(newAccount);
		//if(accounts == null || accounts.length <= 0){
			//openAddAccount();
		//}
		
	}
	
	var title = Ti.UI.createLabel({
		text : 'Select an account',
		font : {fontSize : 16, fontWeight : 'bold'},
		textAlign : 'center',
		width: Ti.UI.FILL,
		top : '2%'
	});
	
	
	
	function logmein(win, rowinfo){
		var infoId = rowinfo.row.item.InfoId;
		getAccountBalance(infoId, 
				function(e){
					Ti.API.info('account balance retrieved.');
				   var data = JSON.parse(this.responseText);
				   if(data.length > 0){
				   		Ti.App.Properties.setString('memberId', data[0].MemberId);
				   		Ti.App.Properties.setString('countryCode', data[0].CountryCode);
				   		Ti.App.Properties.setString('accountBalance', data[0].Balance);
				   }
				   self.close({transition: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL});
				},
				function(e){
					tableView.updateRow(rowinfo.index, createErrorRow(rowinfo.row, 'Login failed. '+e.error),{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.LEFT});
					setTimeout(function(evt){
						tableView.updateRow(rowinfo.index, rowinfo.row,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.LEFT});
						logging = false;
					},3000);
					
				}
			);
	}

	
	tableView.addEventListener('click', function(e){
		var rownum = e.index;
		var source = e.source.clickName;
		Ti.API.info('source : '+source);
		if(e.row.item != null && logging == false ){
			if(source != 'button'){
				logging = true;
				Ti.App.Properties.setString('infoId', e.row.item.InfoId);
				tableView.updateRow(e.index, createLoginRow(e.row),{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.LEFT});
				logmein(self, e);
			}
		}
	});
	
	var grayon = '/images/BUTT_gry_on.png';
	var grayoff = '/images/BUTT_gry_off.png';
	var dryoff = '/images/BUTT_dry_off.png';
	var btncolor = '#576996';
	var cancelbtn = Ti.UI.createButton({
		backgroundImage : grayoff,
		backgroundSelectedImage : grayon,
		backgroundDisabledImage : dryoff,
		color : btncolor,
		title : 'Cancel',
		width : 100
	});
	cancelbtn.addEventListener('click',function(){
		self.close();
	});
	container.add(title);
	container.add(tableView);
	self.add(topview);
	self.add(container);
	self.add(cancelbtn);
	loadAccounts();
	return self;
	
}
module.exports = MyAccounts;
