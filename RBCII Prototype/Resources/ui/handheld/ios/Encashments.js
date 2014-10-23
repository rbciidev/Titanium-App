/**
 * @author Royale Developer
 */
function Encashments(){
	Ti.include('etc/Helpers/ViewHelper.js');
	Ti.include('etc/Helpers/DataHelper.js');
	Ti.include('etc/Helpers/TextHelper.js');
	
	var wdrInd = createActivityIndicator();
	
	var countryCode = Ti.App.Properties.getString('countryCode');
	var selectedMemberId = Ti.App.Properties.getString('memberId');
	var infoid = Ti.App.Properties.getString('infoId');
	Ti.API.info(infoid);
	var accountCombo; 
	var balance = Ti.App.Properties.getString('accountBalance');
	
	
	var self = Ti.UI.createWindow({
		backgroundImage: '/images/mainmenu/bg_login.png',
		title:L('encashments'),
	});
	
	var container = Ti.UI.createView({
		layout : 'vertical',
		backgroundColor : 'transparent'
	});
	
	var tblView = Ti.UI.createTableView({
		backgroundColor: 'transparent',
	});
	
	var queueView = Ti.UI.createTableView({
		backgroundColor: 'transparent',
		height : '40%'
	});
	
	var headerView = Ti.UI.createTableView({
		backgroundColor: 'transparent',
		separatorColor :'transparent',
		scrollable:false,
		allowsSelection: false,
		height : 150
	});
	
	var withdrawView = Ti.UI.createView({
		layout : 'horizontal',
		backgroundColor : 'transparent',
	});
	
	var balanceLabel = Ti.UI.createLabel({
		font : Font12Bold(),
		text: 'Your acount balance for '+selectedMemberId+' balance is '+ Ti.App.Properties.getString('accountBalance'),
	});
	
	
	function addDestRow(destText, destValue){
		var prow = Ti.UI.createPickerRow();
		var item = {value : destValue, label : destText};
		var label = Ti.UI.createLabel({
			text:destText,
			font:{fontSize:24,fontWeight:'bold'},
			width:'auto',
			height:'auto'
		});
		prow.label = destText;
		prow.value = destValue;
		prow.item = item;
		prow.add(label);
		return prow;
	}
	
	var destData = [];
	var destCombo = null;
	function initDestData(){
		var url = urlroot+'GetBranches';
		var data;
		var xhr = Ti.Network.createHTTPClient({
			onload: function(){
				destData = [];
				data = JSON.parse(this.responseText);
				for(var i=0; i<data.length;i++){
					var branch = data[i];
					destData.push(addDestRow(branch.BranchName, branch.BranchCode));
				}
				destCombo = createComboBox('45%',{fontSize:12, fontWeight:'bold'},'Select Destination', destData, destChangedHandler);
				destCombo.left = '2%';
				destCombo.top = '2%';
				destCombo.value = Ti.App.Properties.getString('destination');
				withdrawView.add(destCombo);
				withdrawView.add(amountText);
				withdrawView.add(withdrawBtn);
				withdrawView.add(wdrInd);
				self.add(destCombo.picker);
			},
			error: function(e){
				alert(e.error);
			}
			
		});
		xhr.open('GET', url);
		var qdata = {id :countryCode};
		xhr.send(qdata);
	}
	
	function destChangedHandler(value, item){
		Ti.App.Properties.setString('destination',item.label); 
		Ti.App.Properties.setString('destinationCode',item.value); 
		Ti.API.info('value : '+ item.value +'  label: '+item.label);
	}

	initDestData();
	var amountText = Ti.UI.createTextField({
		top: '2%',
		left: '2%',
		hintText : 'Enter amount to encash',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		height: 30,
		width :'50%',
		font: {fontSize:12, fontWeight:'bold'},
		value: balance,
		keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD
	});
	
	var withdrawBtn = createButton('2%', '2.3%', 100, 'Withdraw');
	withdrawBtn.font = {fontSize : 14};
	withdrawBtn.left = pcenter - (withdrawBtn.width/2);
		
	function validateForm(){
		var amount = parseFloat(amountText.value.replace(',',''));
		var bal = parseFloat(balance.replace(',',''));
		Ti.API.info('amount: '+amount + '  balance: '+bal);
		if (amount > bal || amount <= 0 ||
			(countryCode == 'PHIL' && amount < 500) ) return false;
		else return true;
	}	
	
	function enableWithdrawForm(enabled){
		if(enabled)
		  wdrInd.hide();
		else
		  wdrInd.show();
		  
		withdrawBtn.enabled = enabled;
		amountText.enabled = enabled;
		destCombo.enabled = enabled;     
	}
		
	withdrawBtn.addEventListener('click', function(){
		enableWithdrawForm(false);
		var isValid = validateForm();
		if(isValid == true){
			var url = urlroot+'EncashAmount/';
			var data;
			var xhr = Ti.Network.createHTTPClient({
				onload: function(){
					reloadData(pagenum);
					enableWithdrawForm(true);
				},
				onerror: function(e){
					alert(e.error);
					enableWithdrawForm(true);
				}
			});
			var dest = Ti.App.Properties.getString('destinationCode');
			xhr.open('GET', url);
			var fdata = {id : selectedMemberId, destination : dest, amount : amountText.value };
			xhr.send(fdata);
		}
		else{
			enableWithdrawForm(true);
			if(countryCode == 'PHIL' && parseFloat(amountText.value.replace(',','')) < 500)
				showMessage("Minimum Amount", "The mimimum amount you can encash is 500 pesos");
			else if(parseFloat(balance.replace(',','')) > 0)
			   showMessage("Invalid Amount", "The amount you are trying to encash is larger than your current balance");
			else
			   showMessage("Insufficient Balance", "You do not have enough money left for encashment");
		}
		addUserSession(function(e){},function(e){});
	});
	
	var headerFont = Font12Bold();
 	var detailFont = Font12Normal();
 	var bgcolor = '#576996'; 
 	var bgcolor2 = '#D8E1FF';
	var hcolor = 'white';
	var section = createSection();
	var qsection= createQueueSection();
	
	function createQueueSection(item){
		var section = Ti.UI.createTableViewSection();
 		var h_height = 20;
 		
 		var hcontainer = Ti.UI.createView({
 			backgroundColor : bgcolor,
 			layout : 'vertical',
 			height : 50
 		});
 		
 		
        var header = Ti.UI.createView({
            height: Ti.UI.SIZE,
            layout: 'horizontal',
            backgroundColor: bgcolor
        });
        
        
		var lbl4 = Ti.UI.createLabel({
			text : 'Queue#',
			font : headerFont,
			color: hcolor,
			left : '1%',
			textAlign : 'left',
			width : '14%',
			height : h_height
		});
		
        
        var lbl1 = Ti.UI.createLabel({
			text: 'Encashed Date',
			font : headerFont,
			color: hcolor,
			left : '1%',
			textAlign : 'left',
			width : '30%',
			height : h_height
		});
		
		var lbl2 = Ti.UI.createLabel({
			text : 'Amount',
			font : headerFont,
			color: hcolor,
			left : '1%',
			textAlign : 'right',
			width : '25%',
			height : h_height
		});
		
		var lbl3 = Ti.UI.createLabel({
			text : 'Destination',
			font : headerFont,
			color: hcolor,
			left : '1%',
			textAlign : 'right',
			width : '22%',
			height : h_height
		});
		
		header.add(lbl4);
		header.add(lbl1);
		header.add(lbl2);
		header.add(lbl3);
		
		var titleLabel = Ti.UI.createLabel({
			left: '1%',
			top: 5,
			text : 'Encashment Queue',
			textAlign : 'left',	
			font : {fontSize : 14, fontWeight : 'bold'},
			color : hcolor,
		});
		
		hcontainer.add(titleLabel);
		var line = createLine('white');
		line.left = line.right = '1%';
		hcontainer.add(line);
		hcontainer.add(header);
		
        section.headerView = hcontainer;
        return section;
	}
	function createQueueRow(items){
		var tablerow = Ti.UI.createTableViewRow({
			height: 45,
			backgroundColor: 'transparent',
			selectedBackgroundColor : 'transparent',
			id : items.id
		});
		
		var h_height = 40;
		var viewOne = Ti.UI.createView({
			height: h_height,
			layout: 'horizontal'
		});
		
		var queno = Ti.UI.createLabel({
			text : items.Id,
			font : detailFont,
			left : '1%',
			textAlign : 'left',
			width : '14%',
			height : h_height
		});
		
        
        var encdate = Ti.UI.createLabel({
			text: items.DateEncashed,
			font : detailFont,
			left : '1%',
			textAlign : 'left',
			width : '30%',
			height : h_height
		});
		
		var amt = Ti.UI.createLabel({
			text : items.Amount,
			font : detailFont,
			left : '1%',
			textAlign : 'right',
			width : '25%',
			height : h_height
		});
		
		var dest = Ti.UI.createLabel({
			text : items.Destination,
			font : detailFont,
			left : '1%',
			textAlign : 'right',
			width : '22%',
			height : h_height
		});
		
		
		viewOne.add(queno);
		viewOne.add(encdate);
		viewOne.add(amt);
		viewOne.add(dest);
		tablerow.add(viewOne);
		
		return tablerow;
	}
	function createSection(items){
		var section = Ti.UI.createTableViewSection();
 		var h_height = 30;
 		
 		var hcontainer = Ti.UI.createView({
 			backgroundColor : bgcolor,
 			layout : 'vertical',
 			height : 50
 		});
 		
        var header = Ti.UI.createView({
            height: 30,
            layout: 'horizontal',
            backgroundColor: bgcolor
        });
        
        var lbl1 = Ti.UI.createLabel({
			text: 'Ref. No.',
			font : headerFont,
			color: hcolor,
			left : '1%',
			textAlign : 'left',
			width : '14%',
			height : h_height
		});
		
		var lbl2 = Ti.UI.createLabel({
			text : 'Encashed Date',
			font : headerFont,
			color: hcolor,
			left : '1%',
			textAlign : 'left',
			width : '30%',
			height : h_height
		});
		
		var lbl3 = Ti.UI.createLabel({
			text : 'Amount',
			font : headerFont,
			color: hcolor,
			left : '1%',
			textAlign : 'right',
			width : '25%',
			height : h_height
		});
		
		var lbl4 = Ti.UI.createLabel({
			text : 'Destination',
			font : headerFont,
			color: hcolor,
			left : '1%',
			textAlign : 'right',
			width : '22%',
			height : h_height
		});

		header.add(lbl1);
		header.add(lbl2);
		header.add(lbl3);
		header.add(lbl4);
		
        var titleLabel = Ti.UI.createLabel({
        	left:'1%',
        	top :5,
			text : 'Encashments History',
			textAlign : 'left',	
			font : {fontSize : 14, fontWeight : 'bold'},
			color : hcolor
		});
		
		hcontainer.add(titleLabel);
		var line = createLine('white');
		line.left = line.right = '1%';
		hcontainer.add(line);
		hcontainer.add(header);
		
        section.headerView = hcontainer;
        return section;
	}
	
	function createRow(items){
		var tablerow = Ti.UI.createTableViewRow({
			height: 45,
			backgroundColor: 'transparent',
			selectedBackgroundColor : 'transparent',
			id : items.id
		});
		
		var h_height = 40;
		var viewOne = Ti.UI.createView({
			height: h_height,
			layout: 'horizontal'
		});
		
		var lbl1 = Ti.UI.createLabel({
			text: items.Eid,
			font : detailFont,
			left : '1%',
			textAlign : 'left',
			width : '14%',
			height : h_height
		});
		
		var lbl2 = Ti.UI.createLabel({
			text : items.DateEncashed,
			font : detailFont,
			left : '1%',
			textAlign : 'left',
			width : '30%',
			height : h_height
		});
		
		var lbl3 = Ti.UI.createLabel({
			text : items.Amount,
			font : detailFont,
			left : '1%',
			textAlign : 'right',
			width : '25%',
			height : h_height
		});
		
		var lbl4 = Ti.UI.createLabel({
			text : items.Destination,
			font : detailFont,
			left : '1%',
			textAlign : 'right',
			width : '22%',
			height : h_height
		});
		
		
		viewOne.add(lbl1);
		viewOne.add(lbl2);
		viewOne.add(lbl3);
		viewOne.add(lbl4);
		tablerow.add(viewOne);
		
		return tablerow;
	}
	
		
	var tableHeader = createTableViewHeaderForRefresh();
	var actInd = tableHeader.indicator;
	var lastUpdatedLabel = tableHeader.lastUpdated;
	var statusLabel = tableHeader.status;
	var arrow = tableHeader.arrow;
	tblView.headerPullView = tableHeader;
	
	var lastDistance = 0;
	var lastRow = 0;
	var pulling = false;
	var reloading = false;
	var pagenum = 1;
	
	function beginReloading(){
		pagenum=1;
		reloadData(pagenum, false);
		tblView.setContentInsets({top:0}, {animated:true});
		reloading = false;
		lastUpdatedLabel.text = "Last Updated: "+ formatDate();
		statusLabel.text = "Pull down to refresh...";
		actInd.hide();
		arrow.show();
	}
	
	function beginScrollReload(){
		reloading = true;
		navActInd.show();
		pagenum+=1;
		tblView.appendRow(loadingRow);
		
		reloadData(pagenum, true);	
	}
	
	
	tblView.addEventListener('scroll', function(e){
		var offset = e.contentOffset.y;
		var height = e.size.height;
		var total = offset + height;
		var theEnd = e.contentSize.height;
		var distance = theEnd - total;
		
		if(distance < lastDistance && !pulling){
			var nearEnd = theEnd * .85;
			if(!reloading && (total >= nearEnd)){				
				beginScrollReload();
			}	
		}
		
		else if(offset <= -65.0 && !pulling && !reloading){
			var t = Ti.UI.create2DMatrix();
			t = t.rotate(-180);
			pulling = true;
			arrow.animate({transform:t, duration:180});
			statusLabel.text = "Release to refresh";
		}
		else if(pulling && (offset > -65.0 && offset < 0) && !reloading){

			pulling = false;
			var t = Ti.UI.create2DMatrix();
			arrow.animate({transform:t, duration:180});
			statusLabel.text = "Pull down to refresh";
		}
		
		lastDistance = distance;
	
	
	});
	
	tblView.addEventListener('dragend',function(e){
		if(pulling && !reloading){
			reloading = true;
			pulling = false;
			arrow.hide();
			actInd.show();
			statusLabel.text = "Reloading";
			tblView.setContentInsets({top:60},{animated:true});
			arrow.transform = Ti.UI.create2DMatrix();
			beginReloading();
		}
	});
	
	function reloadQData(){
		var url = urlroot+'GetEncashmentQueue';
		var data;
		var xhr = Ti.Network.createHTTPClient({
			onload: function(){
				data = JSON.parse(this.responseText);
				var emptydata = [];
				qsection = createQueueSection();
				emptydata.push(qsection);
				queueView.setData(emptydata);
				for(var i=0; i<data.length;i++){
					queueView.appendRow(createQueueRow(data[i]));
				}
			},
			error: function(e){
				alert(e.error);
			}
			
		});
		xhr.open('GET', url);
		var qdata = {id :selectedMemberId};
		xhr.send(qdata);
	}
	
	function reloadData(pageno, isscroll){
		var emptydata = [];
		if(pageno == 1){
			emptydata.push(createLoadingRow(40));
			tblView.setData(emptydata);
		}
		getAccountBalance(infoid, accountBalanceHandler);
		reloadQData();
		var url = urlroot+'GetEncashments';
		var data;
		var xhr = Ti.Network.createHTTPClient({
			onload: function(){
				reloading = false;
				data = JSON.parse(this.responseText);	
				if(isscroll == true){
					tblView.deleteRow(tblView.data[0].rowCount-1, {animationStyle:Ti.UI.iPhone.RowAnimationStyle.NONE});					
				}
				else 
				{
					emptydata = [];
					section = createSection();
					emptydata.push(section);
					tblView.setData(emptydata);
				}
				lastRow+=data.length;
				for(var i=0; i<data.length;i++){
					tblView.appendRow(createRow(data[i]));
				}	
				if(isscroll == true){
					//tblView.scrollToIndex(lastRow-(data.length-1), {animated:true, position:Ti.UI.iPhone.TableViewScrollPosition.BOTTOM});
					navActInd.hide();
				}
			},
			onerror: function(e){
				alert(e.error);
			}
		});
		xhr.open('GET', url);
		var tdata = {id : selectedMemberId, pagenum : pageno};
		xhr.send(tdata);
		addUserSession(function(e){},function(e){});
	}
	
	var accountCombo;

	function accountBalanceHandler(){
		var adata = [];
		data = JSON.parse(this.responseText);
		for(var i=0; i<data.length; i++){
			var item = data[i];
			var prow = Ti.UI.createPickerRow();
			var label = Ti.UI.createLabel({
				text:item.MemberId,
				font:{fontSize:24,fontWeight:'bold'},
				width:'auto',
				height:'auto'
			});
			prow.label = prow.value = item.MemberId;
			prow.item = item;
			prow.add(label);
			adata.push(prow);
			if(item.MemberId == selectedMemberId)
			{
				Ti.App.Properties.setString('accountBalance', item.Balance);
				balance = item.Balance;
				updateHeaderInfo();
			}
		}
		if(accountCombo != null){
			self.remove(accountCombo.picker);
			self.remove(accountCombo);
		}
		accountCombo = createComboBox(100,{fontSize:14, fontWeight:'bold'},'Select a User Id', adata, selectionChangedHandler);
		accountCombo.value = selectedMemberId;
	    self.rightNavButton = accountCombo;
		self.add(accountCombo.picker);
	}
	//updateAccountCombo();	

	function updateHeaderInfo(){
		var balLabel = Ti.UI.createLabel({
			text : 'Your account balance for '+selectedMemberId+' is '+ balance,
			font : Font12Bold() 
		});
		amountText.value = balance;
		Ti.API.info(balLabel.text);
		var updateRow = Ti.UI.createTableViewRow();
		updateRow.add(balLabel);
		headerView.updateRow(0, updateRow, {animationStyle:Titanium.UI.iPhone.RowAnimationStyle.LEFT});
	}
	
	
	function selectionChangedHandler(value, item){
		selectedMemberId = item.MemberId;
		balance = item.Balance;
		Ti.App.Properties.setString('memberId', item.MemberId);
		Ti.App.Properties.setString('accountBalance', balance);
		Ti.App.Properties.setString('countryCode', item.CountryCode);
		updateHeaderInfo();
		countryCode = item.CountryCode;
		pagenum = 1;
		reloadData(pagenum);
	}
	

	
	var loadingRow = Ti.UI.createTableViewRow({title:"Loading..."}); 
	var navActInd = Ti.UI.createActivityIndicator();
	self.setRightNavButton(navActInd);
	var balanceRow = Ti.UI.createTableViewRow();
	var withdRow = Ti.UI.createTableViewRow();
	balanceRow.add(balanceLabel);
	withdRow.add(withdrawView);
	headerView.appendRow(balanceRow);
	headerView.appendRow(withdRow);
	headerView.height = 'auto';
	headerView.top = '2%';
	self.add(headerView);
	container.add(queueView);
	container.top = '30%';
	tblView.top = '2%';
	container.add(tblView);
	self.add(container);
	reloadData(pagenum);
	return self;
}

module.exports = Encashments;
