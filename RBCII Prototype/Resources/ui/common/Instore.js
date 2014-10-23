/**
 * @author Royale Developer
 */
function Instore(parent){
	Ti.include('etc/Helpers/ViewHelper.js');
	Ti.include('etc/Helpers/DataHelper.js');


	var self = Ti.UI.createWindow({
		backgroundImage: '/images/mainmenu/bg_login.png',
		title: L('instore')
	});
	

	function createRow(item){
		var row = Ti.UI.createTableViewRow({
			backgroundColor: 'transparent',
			selectedBackgroundColor : '#fff',
			height : 100,
			className : 'datarow',
			clickName : 'row',
			item: item
		});
		
		var photo  = Ti.UI.createView({
			backgroundImage : '/images/products/'+item.ProductCode+'.png',
			top:5,
			left:10,
			width:90,
			height:90,
			clickName:'photo'
		});		
		row.add(photo);
		var prodname = item.ProductCode + ' - ' + item.ProductName;

		var prodinfo = Ti.UI.createLabel({
			font:{fontSize:16,fontWeight:'bold', fontFamily:'Arial'},
			left:110,
			top:2,
			height:30,
			clickName:'product',
			text:prodname
		});
		//row.filter = prodinfo.text;
		row.add(prodinfo);
		
		var comment = Ti.UI.createLabel({
			//color:'white',
			font:{fontSize:14,fontWeight:'normal', fontFamily:'Arial'},
			left:110,
			top:21,
			height:50,
			width:200,
			clickName:'comment',
			text:'Balance : ' + item.Balance
		});
		row.add(comment);
		
		var btn1 = createButton(null,10,150,'Claim');
		btn1.clickName = 'claim';
		btn1.right = 10;
		/*Ti.UI.createButton({
			right: 10,
			top: 10,
			color:'#576996',
			backgroundImage:'/images/BUTT_gry_off.png',
			backgroundSelectedImage:'/images/BUTT_gry_on.png',
			backgroundDisabledImage: '/images/BUTT_dry_off.png',
			width:150,
			title: 'Claim',
			clickName: 'claim'
		});*/
		row.add(btn1);
		
		var btn2 = createButton(null,50,150,'Forward');
		btn2.clickName = 'forward';
		btn2.right =10;
		/*Ti.UI.createButton({
			right: 10,
			top: 50,
			color:'#576996',
			backgroundImage:'/images/BUTT_gry_off.png',
			backgroundSelectedImage:'/images/BUTT_gry_on.png',
			backgroundDisabledImage: '/images/BUTT_dry_off.png',
			width:150,
			title: 'Forward',
			clickName: 'forward'
		});*/
		row.add(btn2);
        	
		return row;
	}
	
	function createClaimRow(index, row, isclaim){
		var qty = 1;
		var claimRow = Ti.UI.createTableViewRow();
		claimRow.backgroundColor = 'white';
		claimRow.selectedBackgroundColor = 'white';
		claimRow.layout = 'vertical';
		
		var prodinfo = Ti.UI.createLabel({
			//color:'white',
			font:{fontSize:16,fontWeight:'bold', fontFamily:'Arial'},
			//left:110,
			//top:2,
			height:30,
			//width:200,
			clickName:'product',
			text:row.item.ProductCode + '-' + row.item.ProductName
		});
		claimRow.add(prodinfo);
		
		//claimRow.isUpdateRow = true;
		var picker = Ti.UI.createPicker();
		picker.addEventListener('change',function(e)
		{
			Ti.API.info("You selected row: "+e.row+", column: "+e.column+", custom_item: "+e.row.custom_item);
			qty = e.row.qty;
		});
		
		for(var i=1; i<=row.item.Balance; i++){
			var prow = Ti.UI.createPickerRow();
			var label = Ti.UI.createLabel({
				text:i,
				font:{fontSize:24,fontWeight:'bold'},
				width:'auto',
				height:'auto'
			});
			prow.qty = i;
			prow.add(label);
			picker.add(prow);	
		}
		
		claimRow.add(picker);
		
		if(isclaim != true){
			var tf1 = Titanium.UI.createTextField({
				height:35,
				hintText : 'Enter User ID',
				borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
			});
			claimRow.add(tf1);
		}		
		
		var btnClaim = Ti.UI.createButton({
			color:'#576996',
			backgroundImage:'/images/BUTT_gry_off.png',
			backgroundSelectedImage:'/images/BUTT_gry_on.png',
			backgroundDisabledImage: '/images/BUTT_dry_off.png',
			width:150,
			title: isclaim == true ? 'Claim' : 'Forward',
			clickName: isclaim == true ?'claiming' : 'forwarding'
		});
		
		var actInd = Titanium.UI.createActivityIndicator({
					width : Ti.UI.SIZE,
					height : Ti.UI.SIZE,
					style : Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
				});
				actInd.font = {
					fontFamily : 'Helvetica Neue',
					fontSize : 15,
					fontWeight : 'bold'
				};
				actInd.color = 'black';
				actInd.message = 'processing...';
				
		btnClaim.addEventListener('click', function(e){
			if(isclaim != true){
				tf1.blur();
				actInd.show();
				//call forwardPoints function
				forwardPoints(qty, row.item, tf1.value, index, actInd);
			}
			else{
				actInd.show();
				//process claiming
				claimPoints(qty, row.item, index);
			}
		});
		claimRow.add(btnClaim);
		
		var btnCancel = Ti.UI.createButton({
			color:'#576996',
			backgroundImage:'/images/BUTT_gry_off.png',
			backgroundSelectedImage:'/images/BUTT_gry_on.png',
			backgroundDisabledImage: '/images/BUTT_dry_off.png',
			width:150,
			title: "Cancel",
			clickName: "Cancelling"
		});
		claimRow.add(btnCancel);
		btnCancel.addEventListener('click', function(e){
			tableView.updateRow(index,row,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.RIGHT});
		});
		
		claimRow.add(actInd);
		
		claimRow.oldrow = row;
		
		return claimRow;
	}
	
	function claimPoints(qty, item, index){
		var prodcode = item.ProductCode;
		var url = urlroot+'ClaimPoints/';
		var data;
		var xhr = Ti.Network.createHTTPClient({
			onload: function(){
				item.Balance-= qty;
				Ti.API.info("item.Balance: "+item.Balance+", Index: "+index);
				if(item.Balance > 0 ){
					var updatedRow = createRow(item);
					tableView.updateRow(index,updatedRow,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.RIGHT});
				}
				else{
					tableView.deleteRow(index, {animated:true});
				}
				
			},
			onerror: function(e){
				alert(e.error);
			}
		});
		xhr.open('GET', url, true);
		var fdata = {id : selectedMemberId, points:''+qty, prodcode: prodcode};
		xhr.send(fdata);
		addUserSession(function(e){},function(e){});
	}
	
	function processForward(qty, item, forwardid, index){
		var prodcode = item.ProductCode;
		var url = urlroot+'ForwardPoints/';
		var data;
		var xhr = Ti.Network.createHTTPClient({
			onload: function(){
				item.Balance-= qty;
				Ti.API.info("item.Balance: "+item.Balance+", Index: "+index);
				if(item.Balance > 0 ){
					var updatedRow = createRow(item);
					tableView.updateRow(index,updatedRow,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.RIGHT});
				}
				else{
					tableView.deleteRow(index, {animated:true});
				}
				
			},
			onerror: function(e){
				alert(e.error);
			}
		});
		xhr.open('GET', url, true);
		var fdata = {id : selectedMemberId, points:''+qty, prodcode: prodcode, downlineId : forwardid};
		xhr.send(fdata);
		addUserSession(function(e){},function(e){});
	}
	
	
	
	function forwardPoints(qty, item, forwardid, index, actInd){
		//validate forward id first
		var prodcode = item.ProductCode;
		var url = urlroot+'CheckForwardId/';
		var data;
		var xhr = Ti.Network.createHTTPClient({
			onload: function(){
				data = JSON.parse(this.responseText);
				if(data.length > 0 && data[0].Result != undefined){
					Ti.API.info("Forwarding...  qty: "+qty+", prodcode: "+prodcode+", forwardid: "+forwardid+", data: "+data[0].Result);
					processForward(qty, item, forwardid, index);
				}
					else {
						actInd.hide();
						showMessage('Invalid User Id','You cannot forward points to '+forwardid+'. Please enter a valid user id');
					}
			},
			onerror: function(e){
				alert(e.error);
			}
		});
		xhr.open('GET', url, true);
		var fdata = {id : selectedMemberId, forwardid : forwardid};
		xhr.send(fdata);
		//if forwardid is validated proceed with the points forwarding
	}
	
	function reloadData(){
		var emptydata = [];
		emptydata.push(createLoadingRow(40));
		tableView.setData(emptydata);

		var url = urlroot+'GetInstore/';
		var data;
		var xhr = Ti.Network.createHTTPClient({
			onload: function(){
				data = JSON.parse(this.responseText);
				emptydata = [];
				tableView.setData(emptydata);
				for(var i=0; i < data.length; i++){
					tableView.appendRow(createRow(data[i]));
				}
			},
			onerror: function(e){
				alert(e.error);
			}
		});
		xhr.open('GET', url, true);
		var usrid = {id : selectedMemberId};
		xhr.send(usrid);
		addUserSession(function(e){},function(e){});
	}
	
	var tableView =  Ti.UI.createTableView({
		backgroundColor: 'transparent',
		separatorColor: 'black',
		top: 40,
		bottom: 40
	});
	
	
	
	tableView.addEventListener('click', function(e){
		var rownum = e.index;
		var source = e.source.clickName;
		if(source == 'claim' || source == 'forward'){
			var newrow = createClaimRow(rownum, e.row, source == 'claim');
			tableView.updateRow(rownum,newrow,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.LEFT});
		}
	});
	
	var selectedMemberId = Ti.App.Properties.getString('memberId'); 
	var infoid = Ti.App.Properties.getString('infoId'); 
	//getAccountBalance(infoid, accountBalanceHandler);
	
	function updateAccountCombo(){
		var data  = [], adata = [];
		data = data.concat(accountList);
		for(var i=0; i<data.length; i++){
			var item = data[i];
			var prow = Ti.UI.createPickerRow();
			var label = Ti.UI.createLabel({
				text:item.MemberId,
				font:{fontSize:24,fontWeight:'bold'},
				width:'auto',
				height:'auto'
			});
			prow.item = item;
			prow.label = prow.value = item.MemberId;
			prow.add(label);
			adata.push(prow);
		}
		
		var accountCombo = createComboBox(150,{fontSize:14, fontWeight:'bold'},'Select a User Id', adata, selectionChangedHandler);
		accountCombo.value = selectedMemberId;
	    self.rightNavButton = accountCombo;
		self.add(accountCombo.picker);
	}
	
	updateAccountCombo();
	
	
	function selectionChangedHandler(value){
		selectedMemberId = value;
		Ti.App.Properties.setString('memberId',value); //
		reloadData();
	}
	
	//TOOLBAR
	var bbar = Titanium.UI.createButtonBar({
		labels:['Product Points'],
		backgroundColor:'#576996'
	});
	var flexSpace = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	self.setToolbar([flexSpace,bbar,flexSpace]);
	
	bbar.addEventListener('click',function(e){
		ProductPoints = require('ui/common/ProductPoints');
		var productPoints = new ProductPoints();
		parent.containingTab.open(productPoints,{adnimated:true});
		
	});
	
	
	self.add(tableView);
	reloadData();
	return self;
	
}
module.exports = Instore;
