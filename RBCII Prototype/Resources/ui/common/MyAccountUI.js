/**
 * @author Royale Developer
 */
function MyAccountUI(title)
{
	var self = Ti.UI.createWindow({
		title : title,
		backgroundColor: 'silver'
	});
		
	var data = [];
	
	//Statement of accounts
	var soaitem = Titanium.UI.createDashboardItem();
	var soaview = Titanium.UI.createView({
		layout:'vertical'
	});
	var soaimg = Titanium.UI.createImageView({
		image:'/images/buttons/paperwork.png',
		width: 60,
		height:60
	});
	soaview.add(soaimg);
	var soalbl = Titanium.UI.createLabel({
		text: L('soa'),
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		color:'#ffffff'
	});
	soaview.add(soalbl);
	soaitem.add(soaview);
	data.push(soaitem);
	
	//transactions
	var trnitem = Titanium.UI.createDashboardItem();
	var trnview = Titanium.UI.createView({
		layout:'vertical'
	});
	var trnimg = Titanium.UI.createImageView({
		image:'/images/buttons/file.png',
		width: 60,
		height:60
	});
	trnview.add(trnimg);
	var trnlbl = Titanium.UI.createLabel({
		text: L('transhistory'),
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		color:'#ffffff'
	});
	trnview.add(trnlbl);
	trnitem.add(trnview);
	data.push(trnitem);
	
	//encashments
	var encitem = Titanium.UI.createDashboardItem();
	var encview = Titanium.UI.createView({
		layout:'vertical'
	});
	var encimg = Titanium.UI.createImageView({
		image:'/images/buttons/wallet.png',
		width:60,
		height:60
	});
	encview.add(encimg);
	var enclbl = Titanium.UI.createLabel({
		text: L('encashments'),
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		color:'#ffffff'
	});
	encview.add(enclbl);
	encitem.add(encview);
	data.push(encitem);
	
	//instore
	var stritem = Titanium.UI.createDashboardItem();
	var strview = Titanium.UI.createView({
		layout:'vertical'
	});
	var strimg = Titanium.UI.createImageView({
		image:'/images/buttons/shopping-cart.png',
		width:60,
		height:60
	});
	strview.add(strimg);
	var strlbl = Titanium.UI.createLabel({
		text: L('instore'),
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		color:'#ffffff'
	});
	strview.add(strlbl);
	stritem.add(strview);
	data.push(stritem);
	
	//gift cheques
	var gcitem = Titanium.UI.createDashboardItem();
	var gcview = Titanium.UI.createView({
		layout:'vertical'
	});
	var gcimg = Titanium.UI.createImageView({
		image:'/images/buttons/gift.png',
		width:60,
		height:60
	});
	gcview.add(gcimg);
	var gclbl = Titanium.UI.createLabel({
		text: L('gc'),
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		color:'#ffffff'
	});
	gcview.add(gclbl);
	gcitem.add(gcview);
	data.push(gcitem);
	
	var dashboard = Titanium.UI.createDashboardView({
		data:data
	});
	
	self.add(dashboard);
	return self;
	
}

module.exports = MyAccountUI;
