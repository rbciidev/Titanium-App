/**
 * @author Royale Developer
 */
function MyNetworkUI(title){
	var self = Ti.UI.createWindow({
		title: title,
		backgroundColor: 'silver'
	});
	
	var data = [];
	
	//Sales Network
	var binitem = Titanium.UI.createDashboardItem();
	var binview = Titanium.UI.createView({
		layout:'vertical'
	});
	var binimg = Titanium.UI.createImageView({
		image:'/images/buttons/pyramid.png',
		width: 60,
		height:60
	});
	binview.add(binimg);
	var binlbl = Titanium.UI.createLabel({
		text: L('salesnetwork'),
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		color:'#ffffff'
	});
	binview.add(binlbl);
	binitem.add(binview);
	data.push(binitem);
	
	//MLM Network
	var mlmitem = Titanium.UI.createDashboardItem();
	var mlmview = Titanium.UI.createView({
		layout:'vertical'
	});
	var mlmimg = Titanium.UI.createImageView({
		image:'/images/buttons/hierarchy.png',
		width: 60,
		height:60
	});
	mlmview.add(mlmimg);
	var mlmlbl = Titanium.UI.createLabel({
		text: L('mlmnetwork'),
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		color:'#ffffff'
	});
	mlmview.add(mlmlbl);
	mlmitem.add(mlmview);
	data.push(mlmitem);
	
	//UNI Level
	var uniitem = Titanium.UI.createDashboardItem();
	var uniview = Titanium.UI.createView({
		layout:'vertical'
	});
	var uniimg = Titanium.UI.createImageView({
		image:'/images/buttons/layer.png',
		width:60,
		height:60
	});
	uniview.add(uniimg);
	var unilbl = Titanium.UI.createLabel({
		text: L('uninetwork'),
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		color:'#ffffff'
	});
	uniview.add(unilbl);
	uniitem.add(uniview);
	data.push(uniitem);
	
	//Conference
	var conitem = Titanium.UI.createDashboardItem();
	var conview = Titanium.UI.createView({
		layout:'vertical'
	});
	var conimg = Titanium.UI.createImageView({
		image:'/images/buttons/message.png',
		width:60,
		height:60
	});
	conview.add(conimg);
	var conlbl = Titanium.UI.createLabel({
		text: L('conference'),
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		color:'#ffffff'
	});
	conview.add(conlbl);
	conitem.add(conview);
	data.push(conitem);
	
	
	var dashboard = Titanium.UI.createDashboardView({
		data:data
	});
	
	self.add(dashboard);
	return self;
}

module.exports = MyNetworkUI;

