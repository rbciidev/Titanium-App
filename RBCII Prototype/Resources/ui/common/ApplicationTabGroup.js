function ApplicationTabGroup(infoId) {
	Ti.include('etc/Helpers/ViewHelper.js');
	//create module instance
	var self = Ti.UI.createTabGroup({
		
	});
	
	
	MainWindow = require('ui/common/MainWindow');
	MainWindowPhone = require('ui/handheld/ios/MainWindow');
	Home = require('ui/common/Home');
	HomePhone = require('ui/handheld/ios/Home');
	ProductsWin = require('ui/common/ProductsWin');
	Experience = require('ui/common/Experience');
	
	var mainWin;
	var homeWin;

	if(isTablet) 
		mainWin = new MainWindow(self);
	else 
		mainWin = new MainWindowPhone(self);
		
	if(isTablet) homeWin = new Home(self);
	else homeWin = new HomePhone(self);
	var productsWin = new ProductsWin(self);
	var expWin = new Experience();
	

	var homeTab = Ti.UI.createTab({
		title: 'Home',
		icon: '/images/icons/home.png',
		window: homeWin
	});
	
	var accountsTab = Ti.UI.createTab({
		title: 'Accounts',
		icon: '/images/icons/accounts.png',
		window: mainWin
	});
	mainWin.containingTab = accountsTab;
	
	
	homeWin.containingTab = homeTab;
	
	var productsTab = Ti.UI.createTab({
		title: 'Products',
		icon: '/images/icons/products.png',
		window: productsWin
	});
	
	productsWin.containingTab = productsTab;
	
	var experienceTab = Ti.UI.createTab({
		title : 'Royale Experience',
		icon : 'images/icons/Film.png',
		window: expWin
	});
	expWin.containingTab = experienceTab;

	self.addTab(homeTab);
	self.addTab(accountsTab);
	self.addTab(productsTab);
	self.addTab(experienceTab);
	
	Titanium.UI.setBackgroundColor('#fff');
	self.model = Ti.Platform.model;

	
	return self;
};

module.exports = ApplicationTabGroup;


