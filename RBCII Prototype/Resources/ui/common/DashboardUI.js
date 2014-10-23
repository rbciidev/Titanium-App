function DashboardUI(parent){
	//var self = Ti.UI.createView();
		
	var data = [];
	var isize = 95;
	var iheight = 117;
	
	//Statement of accounts
	var soaitem = Titanium.UI.createDashboardItem();
	var soaview = Titanium.UI.createView({
		layout:'vertical'
	});
	var soaimg = Titanium.UI.createImageView({
		image:'/images/dashboard/big/my account.png',
		width: isize,
		height:iheight
	});
	soaview.add(soaimg);

	soaitem.image = soaview.toImage(null, true);
	soaitem.label = 'soa';
	data.push(soaitem);
	

	//transactions
	var trnitem = Titanium.UI.createDashboardItem();
	var trnview = Titanium.UI.createView({
		layout:'vertical'
	});
	var trnimg = Titanium.UI.createImageView({
		image:'/images/dashboard/big/transaction history.png',
		width: isize,
		height:iheight
	});
	trnview.add(trnimg);

	trnitem.image = trnview.toImage(null, true);
	trnitem.label = 'trn';
	data.push(trnitem);
	
	//encashments
	var encitem = Titanium.UI.createDashboardItem();
	var encview = Titanium.UI.createView({
		layout:'vertical'
	});
	var encimg = Titanium.UI.createImageView({
		image:'/images/dashboard/big/encashment history.png',
		width:isize,
		height:iheight
	});
	encview.add(encimg);

	encitem.image = encview.toImage(null, true);
	encitem.label = 'enc';
	data.push(encitem);
	
	//instore
	var stritem = Titanium.UI.createDashboardItem();
	var strview = Titanium.UI.createView({
		layout:'vertical'
	});
	var strimg = Titanium.UI.createImageView({
		image:'/images/dashboard/big/instore purchase.png',
		width:isize,
		height:iheight
	});
	strview.add(strimg);

	stritem.image = strview.toImage(null, true);
	stritem.label = 'str';
	data.push(stritem);
	
	//gift cheques
	var gcitem = Titanium.UI.createDashboardItem();
	var gcview = Titanium.UI.createView({
		layout:'vertical'
	});
	var gcimg = Titanium.UI.createImageView({
		image:'/images/dashboard/big/distributors.png',
		width:isize,
		height:iheight
	});
	gcview.add(gcimg);

	gcitem.image = gcview.toImage(null, true);
	gcitem.label = 'rec';
	data.push(gcitem);
	
	
	//Sales Network
	var binitem = Titanium.UI.createDashboardItem();
	var binview = Titanium.UI.createView({
		layout:'vertical'
	});
	var binimg = Titanium.UI.createImageView({
		image:'/images/dashboard/big/sales network.png',
		width: isize,
		height:iheight
	});
	binview.add(binimg);

	binitem.image = binview.toImage(null, true);
	binitem.label = 'bin';
	data.push(binitem);
	
	//MLM Network
	var mlmitem = Titanium.UI.createDashboardItem();
	var mlmview = Titanium.UI.createView({
		layout:'vertical'
	});
	var mlmimg = Titanium.UI.createImageView({
		image:'/images/dashboard/big/multi level.png',
		width: isize,
		height:iheight
	});
	mlmview.add(mlmimg);

	mlmitem.image = mlmview.toImage(null, true);
	mlmitem.label = 'mlm';
	data.push(mlmitem);
	
	//UNI Level
	var uniitem = Titanium.UI.createDashboardItem();
	var uniview = Titanium.UI.createView({
		layout:'vertical'
	});
	var uniimg = Titanium.UI.createImageView({
		image:'/images/dashboard/big/unilevel.png',
		width:isize,
		height:iheight
	});
	uniview.add(uniimg);

	uniitem.image = uniview.toImage(null, true);
	uniitem.label = 'uni';
	data.push(uniitem);
	
	//Conference
	var conitem = Titanium.UI.createDashboardItem();
	var conview = Titanium.UI.createView({
		layout:'vertical'
	});
	var conimg = Titanium.UI.createImageView({
		image:'/images/dashboard/big/conference.png',
		width:isize,
		height:iheight
	});
	conview.add(conimg);

	conitem.image = conview.toImage(null, true);
	conitem.label = 'con';
	data.push(conitem);
	
	
	var dashboard = Titanium.UI.createDashboardView({
		backgroundImage: '/images/mainmenu/bg_login.png',
		data:data
	});
	
	dashboard.addEventListener('click', function(e){		
		if(e.item.label == 'soa'){
			SOAForm = require('ui/common/SOAForm');
			var soaForm = new SOAForm();
			parent.containingTab.open(soaForm,{adnimated:true});
		}
		else if(e.item.label == 'str'){
			Instore = require('ui/common/Instore');
			var instore = new Instore(parent);
			parent.containingTab.open(instore,{adnimated:true});
		}
		else if(e.item.label == 'enc'){
			Encashments = require('ui/common/Encashments');
			var encashform = new Encashments();
			parent.containingTab.open(encashform, {animated:true});
		}
		else if(e.item.label == 'trn'){
			Transactions = require('ui/common/Transactions');
			var transactions = new Transactions();
			parent.containingTab.open(transactions, {animated:true});
		}
		else if(e.item.label == 'rec'){
			Recruitments = require('ui/common/Recruitments');
			var recruitments = new Recruitments();
			parent.containingTab.open(recruitments, {animated:true});
		}
		else if(e.item.label == 'bin'){
			SalesNetwork = require('ui/common/SalesNetwork');
			var salesNetwork = new SalesNetwork();
			parent.containingTab.open(salesNetwork, {animated:true});
		}
		else if(e.item.label == 'mlm'){
			Multilevel = require('ui/common/Multilevel');
			var mlm = new Multilevel();
			parent.containingTab.open(mlm, {animated:true});
		}
		else if(e.item.label == 'uni'){
			Unilevel = require('ui/common/Unilevel');
			var uni = new Unilevel();
			parent.containingTab.open(uni, {animated:true});
		}
		else if(e.item.label == 'con'){
			showMessage('Feature Not Available','This feature is not yet available and will be implemented soon.');
		}
	});
	
	return dashboard;
}
module.exports = DashboardUI;

