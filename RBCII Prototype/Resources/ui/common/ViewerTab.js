/**
 * @author Royale Dev
 */
function ViewerTab(url){
	var self = Ti.UI.createTabGroup();
	var MainViewer = require('ui/common/MainViewer');
	
	var mainViewer = new MainViewer(self, url);
	
	var tab1 = Ti.UI.createTab({
		//title: L('home'),
		//icon: '/images/buttons/calendar.png',
		window: mainViewer
	});
	mainViewer.containingTab = tab1;
	
	self.addTab(tab1);
	
	return self;
	
}
module.exports = ViewerTab;
