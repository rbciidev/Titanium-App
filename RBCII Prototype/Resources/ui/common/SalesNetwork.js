/**
 * @author Royale Dev
 */
function SalesNetwork(){
	var self = Ti.UI.createWindow({
		
	});
	webview = Ti.UI.createWebView({
		scalesPageToFit : true
	});
	
	
	var selectedMemberId = Ti.App.Properties.getString('memberId');
	var ownerid = selectedMemberId;
	var infoid = Ti.App.Properties.getString('infoId'); 
	//getAccountBalance(infoid, accountBalanceHandler);
	
	function updateAccountCombo(){
		var adata = [], data = [];
		data = data.concat(accountList);//JSON.parse(this.responseText);
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
			prow.add(label);
			adata.push(prow);
		}
		
		var accountCombo = createComboBox(isTablet ? 150 : 100,{fontSize:14, fontWeight:'bold'},'Select a User Id', adata, selectionChangedHandler);
		accountCombo.value = selectedMemberId;
	    self.rightNavButton = accountCombo;
		self.add(accountCombo.picker);
	}
	updateAccountCombo();
	
	function selectionChangedHandler(value){
		selectedMemberId = value;
		Ti.App.Properties.setString('memberId',value); 
		reloadData();
	}
	function reloadData(){
		addUserSession(function(e){},function(e){});
		var url = urlroot+"GetSalesNetwork/";
		url+=selectedMemberId+"?id2="+ownerid;
		webview.setUrl(url);
	}
	
	self.add(webview);
	
	reloadData();
	
	return self;
}
module.exports = SalesNetwork;

