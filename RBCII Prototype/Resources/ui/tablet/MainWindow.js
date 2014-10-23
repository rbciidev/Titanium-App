/**
 * @author Royale Developer
 */
function MainWindow(){
	var DashboardUI = require('ui/common/DashboardUI');
	
	var self = Ti.UI.createWindow({
		title: L('maintitle'),
		backgroundColor: 'silver',
		backgroundImage: '/images/background.png'
	});
	

	var rightbtn = Ti.UI.createButton({
			backgroundImage:'/images/buttons/gear.png',
			height:33,
			width:33
		});
	
	self.rightNavButton = rightbtn;
	
	var dashboardUI = new DashboardUI();
	self.add(dashboardUI);
	
	
	return self;
}
module.exports = MainWindow;
