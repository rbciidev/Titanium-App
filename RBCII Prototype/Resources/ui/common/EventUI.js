/**
 * @author Royale Developer
 */
function EventUI(){
	var self = Ti.UI.createWindow({
		backgroundImage: '/images/mainmenu/bg_login.png',
		title: L('events')
	});
	
	var data = [];
	var isize = 95;
	var iheight = 117;
	
	//Trainings and seminars
	var trgitem = Titanium.UI.createDashboardItem();
	var trgview = Titanium.UI.createView({
		layout:'vertical'
	});
	var trgimg = Titanium.UI.createImageView({
		image:'/images/dashboard/big/trainings.png',
		width: isize,
		height:iheight
	});
	trgview.add(trgimg);
	var trglbl = Titanium.UI.createLabel({
		text: L('trainings'),
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		color:'#ffffff'
	});
	//trgview.add(trglbl);
	//trgitem.add(trgview);
	trgitem.image = trgview.toImage(null, true);
	data.push(trgitem);
	
	//parties and special events
	var ptyitem = Titanium.UI.createDashboardItem();
	var ptyview = Titanium.UI.createView({
		layout:'vertical'
	});
	var ptyimg = Titanium.UI.createImageView({
		image:'/images/dashboard/big/parties.png',
		width: isize,
		height:iheight
	});
	ptyview.add(ptyimg);
	var ptylbl = Titanium.UI.createLabel({
		text: L('parties'),
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		color:'#ffffff'
	});
	//ptyview.add(ptylbl);
	//ptyitem.add(ptyview);
	ptyitem.image = ptyview.toImage(null, true);
	data.push(ptyitem);
	
	//UNI Level
	var awditem = Titanium.UI.createDashboardItem();
	var awdview = Titanium.UI.createView({
		layout:'vertical'
	});
	var awdimg = Titanium.UI.createImageView({
		image:'/images/dashboard/big/awards.png',
		width:isize,
		height:iheight
	});
	awdview.add(awdimg);
	var awdlbl = Titanium.UI.createLabel({
		text: L('awards'),
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		color:'#ffffff'
	});
	//awdview.add(awdlbl);
	//awditem.add(awdview);
	awditem.image = awdview.toImage(null, true);
	data.push(awditem);
	
	//Announcements
	var annitem = Titanium.UI.createDashboardItem();
	var annview = Titanium.UI.createView({
		height: 90
	});
	var annimg = Titanium.UI.createImageView({
		image:'/images/dashboard/big/announcements.png',
		width:isize,
		height:iheight,
		top: 0
	});
	
	var annlbl = Titanium.UI.createLabel({
		text: 'Announcements',	
		color:'white',
		textAlign: 'center',
		font: {fontSize:10},
		height: 14,
		top: 68,
		left: 0,
		right: 0
	});
	//annview.add(annlbl);
	annview.add(annimg);
	//annitem.add(annview);
	annitem.label = 'announcements';
	annitem.image = annview.toImage(null, true);
	data.push(annitem);
	
	
	var dashboard = Titanium.UI.createDashboardView({
		backgroundImage: '/images/background.png',
		data:data
	});
	
	dashboard.addEventListener('click', function(e){		
	});
	
	self.add(dashboard);
	return self;
}

module.exports = EventUI;
