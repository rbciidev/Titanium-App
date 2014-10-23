/**
 * @author Royale Dev
 */
function Home(parent){
	var bgcolor = '#576996';
	var picPath = Ti.App.Properties.getString("picPath");
	var pic = picPath != null ? Ti.Filesystem.getFile(picPath) : null;
	var isPortrait = Ti.Gesture.isPortrait() ||  Ti.Gesture.orientation == Ti.UI.FACE_UP;
	var selectedMemberId = Ti.App.Properties.getString('memberId');
	var infoId = Ti.App.Properties.getString('infoId');
	var currentBalance =  Ti.App.Properties.getString('totalBalance');
	var ismemo = true;
	
	var loadingRow = Ti.UI.createTableViewRow(); 
	var showMoreLbl = Ti.UI.createLabel({
		text : 'Show More',
		font : {fontSize : 20, fontWeight: 'bold'},
		color : bgcolor
	});
	loadingRow.add(showMoreLbl);
	loadingRow.addEventListener('click', function(e){
		pageno+=1;
		reload(true);
	});
	
	var self = Ti.UI.createWindow({
		layout: 'vertical',
		barColor : 'silver'
	});
	
	var topview = Ti.UI.createView({
		height : 30
	});
	
	var title = Ti.UI.createLabel({
		text : 'Royale Business Club International, Inc.'
	});
	topview.add(title);
	
	var frameview = Ti.UI.createView({
		height : 200
	});
	
	var xsize = 180;
	var imgheight = Ti.App.Properties.getString('imageHeight');
	var imgwidth = Ti.App.Properties.getString('imageWidth');
	if(imgwidth != null) xsize = imgwidth;
	var picimg = Ti.UI.createImageView({
		image : pic == null  ?  '/images/misc/wellness.png' : picPath,
		height :  pic == null ? xsize : imgheight,
		width : xsize,
		left : 10,
		top : 5
	});
	
	var hoverimg = Ti.UI.createImageView({
		height : xsize,
		width : xsize,
		left : 20,
		top : 30
	});
	
	var popoverView, arrowDirection;
	hoverimg.addEventListener('click', function(e){
		Ti.API.info('picimg clicked '+ picPath);
		if (Titanium.Platform.osname == 'ipad')
		{
			arrowDirection = Ti.UI.iPad.POPOVER_ARROW_DIRECTION_LEFT;
			popoverView = picimg;
		}
		openGallery(popoverView, arrowDirection, picimg);
	});
	
	var frameimg = Ti.UI.createImageView({
		image : isPortrait ? '/images/pic-frame-ipad0.png' : '/images/pic-frame-ipad1.png',
		clipMode : Titanium.UI.iOS.CLIP_MODE_DISABLED
	});
	
	var xleft = 200;
	var welcomelbl = Ti.UI.createLabel({
		text : 'Welcome back,',
		font : {fontSize : 16},
		left : xleft,
		top : 40
	});
	
	var namelbl = Ti.UI.createLabel({
		text : Ti.App.Properties.getString('fullName'),
		font : {fontSize : 20, fontWeight : 'bold'},
		left : xleft + 120,
		top :  35
	});
	
	var balancelbl = Ti.UI.createLabel({
		text: "Your current balance for all of your accounts is:",
		font : {fontSize : 14},
		left : xleft,
		top : 70
	});
	
	var balancelbl2 = Ti.UI.createLabel({
		text : currentBalance,
		font : {fontSize : 18, fontWeight : 'bold'},
		left : xleft,
		top : 90
	});
	
	var ranklbl = Ti.UI.createLabel({
		text : 'You are currently ranked as ',
		font : {fontSize : 14},
		left : xleft,
		top : 120
	});
	
	var rankdesc = Ti.UI.createLabel({
		text : Ti.App.Properties.getString('rank'),
		font :{fontSize : 14, fontWeight : 'bold'},
		left : xleft + 180,
		top : 120
	});
	
	var commentbox = Ti.UI.createTextField({
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_LINE,
		backgroundColor : 'white',
		width : 300,
		hintText : "What's on your mind",
		left : xleft,
		top : 165
	});
	
	var sharebtn = Ti.UI.createButton({
		title : 'share',
		color:'#576996',
		backgroundImage:'/images/mainmenu/middleRow.png',
		left : xleft + 305,
		top : 165,
		width : 80,
		height : 25,
		font : {fontSize : 12}
	});
	
	sharebtn.addEventListener('click', function(e){
		Ti.API.info('share clicked');
		if(commentbox.value.length < 4)
			showMessage("Message Too Short", "Please share something meaningful.");
		else{
			var url = urlroot+'AddStatusMessage/';
			var xhr = Ti.Network.createHTTPClient({
			onload: function(){
					data = JSON.parse(this.responseText);
					commentbox.value = '';
					if(ismemo == false){
						pageno = 1;
						reload();
					}
				},
				onerror: function(e){
					alert(e.error);
				}
			});
			xhr.open('GET', url, true);
			var rdata = {id : selectedMemberId, msg: commentbox.value, source: Ti.Platform.osname};
			xhr.send(rdata);
		}
	});
	
	frameview.add(picimg);
	frameview.add(frameimg);
	frameview.add(hoverimg);
	frameview.add(welcomelbl);
	frameview.add(namelbl);
	frameview.add(balancelbl);
	frameview.add(balancelbl2);
	frameview.add(ranklbl);
	frameview.add(rankdesc);
	frameview.add(commentbox);
	frameview.add(sharebtn);
	
	var memoview = Ti.UI.createView({
		//height : Ti.Platform.displayCaps.platformHeight - 230
	});
	
	var tableview = Ti.UI.createTableView({
		
	});
	
	memoview.add(tableview);
	
	var headerFont = GetFont(20, 'bold');
	var hcolor = 'white';
	
	function createSection(){
		var section = Ti.UI.createTableViewSection();
        var header = Ti.UI.createView({
            height: 50,
            layout: 'horizontal',
            backgroundColor: bgcolor
        });
        
        var title = Ti.UI.createLabel({
			text: ismemo ? 'Announcements' : 'Messages',
			font : headerFont,
			left : '3%',
			textAlign : 'left',
			color :hcolor,
			height : Ti.UI.FILL,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});

		header.add(title);

        section.headerView = header;
        return section;
	}
	
	var devwidth = Ti.Platform.displayCaps.platformWidth - 50;
	var htmlprefix = '<meta name="viewport" content="width='+devwidth+', initial-scale=1, maximum-scale=1">';
	
	function createRow(item){
		var tablerow = Ti.UI.createTableViewRow({
			height : Ti.UI.SIZE
		});
		
		var img = Ti.UI.createImageView({
			image : '/images/misc/wellness.png',
			height : 32,
			width : 32,
			left : 5,
			top : 12
		});
		
		var fullname = Ti.UI.createLabel({
			text : item.FullName,
			left:  40,
			top : 12,
			font : {fontSize : 16, fontWeight : 'bold'},
			color : 'blue'
		});
		
		var msgview = Ti.UI.createWebView({
			height : Ti.UI.SIZE,
			html : htmlprefix + item.Message,
			disableBounce : true
		});
		
		var container = Ti.UI.createView({
			layout : 'vertical',
			height : Ti.UI.SIZE,
			left : 40,
			top : 30	
		});
		
		var dateandpower = Ti.UI.createView({
			layout : 'horizontal',
			height : Ti.UI.SIZE
		});
			
		var datelbl = Ti.UI.createLabel({
			text : item.MessageDate,
			font : {fontSize : 12},
			left : '1%'
		});
		
		var separator = Ti.UI.createLabel({
			text : '|',
			left : '1%'
		});
		
		var powerbtn = Ti.UI.createButton({
			title : 'Power!',
			left : '1%',
			font : {fontSize : 12},
		});
		
		powerbtn.addEventListener('click', function(e){
			var url = urlroot+'PowerThis/';
			var xhr = Ti.Network.createHTTPClient({
			onload: function(){
					data = JSON.parse(this.responseText);
					powerbtn.visible = false;
					if (item.PowerCount == 0)
						powerlbl.text = "You powered this.";
					else if (item.PowerCount == 1)
						powerlbl.text == "You and another person powered this.";
					else
					powerlbl.text = "You and "+item.PowerCount+" other people powered this.";
				},
				onerror: function(e){
					alert(e.error);
				}
			});
			xhr.open('GET', url, true);
			var rdata = {id : selectedMemberId, recid: item.RecId, commentid: item.CommentId};
			xhr.send(rdata);
		});
		
		dateandpower.add(datelbl);
		dateandpower.add(separator);
		dateandpower.add(powerbtn);
		
		var powerlbl = Ti.UI.createLabel({
			font : {fontSize : 14, fontWeight : 'bold'},
			left : '1%',
		});
		var filler = Ti.UI.createLabel({
			font : {fontSize : 12}
		});
		
		
		msgview.addEventListener('touchmove',function(e) {
		    return false;
		});
		
		var url = urlroot+'GetPowerMessage/';
		var xhr = Ti.Network.createHTTPClient({
			onload: function(){
				data = JSON.parse(this.responseText);
				powerlbl.text = data[0].Result;
				if(powerlbl.text.length > 0)
				   container.add(filler);
			},
			onerror: function(e){
				alert(e.error);
			}
		});
		xhr.open('GET', url, true);
		var rdata = {id : infoId, list:item.PowerList, count: item.PowerCount};
		xhr.send(rdata);
		
		
		container.add(msgview);
		container.add(dateandpower);
		container.add(powerlbl);
		
		tablerow.add(img);
		tablerow.add(fullname);
		tablerow.add(container);
		tablerow.addEventListener('click',function(e){
			msgview.reload();
		});
		
		tablerow.msgview = msgview;
		return tablerow;
	}
	
	
	var border = Ti.UI.createView({
		backgroundColor: '#576c89',
		height: 2,
		bottom: 0
	});
	
	var tableHeader = Ti.UI.createView({
		backgroundColor: '#e2e7ed',
		width: 320,
		height: 60
	});
	
	tableHeader.add(border);
	
	var arrow = Ti.UI.createView({
		backgroundImage: '/images/whiteArrow.png',
		width: 23,
		height: 60,
		bottom: 10,
		left: 20
	});
	tableHeader.add(arrow);
	
	var statusLabel = Ti.UI.createLabel({
		text: "Pull to reload",
		left: 55,
		width: 200,
		bottom: 30,
		height: 'auto',
		color: '#576c89',
		textAlign: 'center',
		font: {fontSize:13, fontWeight:'bold'},
		shadowColor: '#999',
		shadowOffset:{x:0,y:1}
	});
	tableHeader.add(statusLabel);
	
	var lastUpdatedLabel = Ti.UI.createLabel({
		text: 'Last Updated: '+ formatDate(false),
		left: 55,
		width: 200,
		bottom: 15,
		height: 'auto',
		color: '#576c89',
		textAlign: 'center',
		font: {fontSize:12},
		shadowColor: '#999',
		shadowOffset:{x:0,y:1}
	});
	tableHeader.add(lastUpdatedLabel);
	
	var actInd = Ti.UI.createActivityIndicator({
		left:20,
		bottom:13,
		width:30,
		height:30
	});
	tableHeader.add(actInd);
	tableview.headerPullView = tableHeader;
	
	var pageno = 1;
	var lastDistance = 0;
	var lastRow = 0;
	var pulling = false;
	var reloading = false;
	var pagenum = 1;
	
	function beginReloading(){
		pageno=1;
		reload(false);
		tableview.setContentInsets({top:0}, {animated:true});
		reloading = false;
		lastUpdatedLabel.text = "Last Updated: "+ formatDate();
		statusLabel.text = "Pull down to refresh...";
		actInd.hide();
		arrow.show();
	}
	
	function beginScrollReload(){
		reloading = true;
		pageno+=1;
		
		reload(true);	
	}
	
	
	tableview.addEventListener('scroll', function(e){
		var offset = e.contentOffset.y;
		var height = e.size.height;
		var total = offset + height;
		var theEnd = e.contentSize.height;
		var distance = theEnd - total;
		
		 if(offset <= -65.0 && !pulling && !reloading){
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
		if(rowToReload != null)
			rowToReload.msgview.reload();
	});
	
	tableview.addEventListener('dragend',function(e){
		if(pulling && !reloading){
			reloading = true;
			pulling = false;
			arrow.hide();
			actInd.show();
			statusLabel.text = "Reloading";
			tableview.setContentInsets({top:60},{animated:true});
			arrow.transform = Ti.UI.create2DMatrix();
			beginReloading();
		}
	});
	
	
	function reload(isscroll){
		var emptydata = [];
		
		var url = urlroot+'GetStatusMessages/';
		if(ismemo==true) url = urlroot + 'GetMemos/';
		var data;
		var xhr = Ti.Network.createHTTPClient({
			onload: function(){
				reloading = false;
				data = JSON.parse(this.responseText);
				
				if(isscroll == true){
					tableview.deleteRow(tableview.data[0].rowCount-1, {animationStyle:Ti.UI.iPhone.RowAnimationStyle.NONE});					
				}
				else 
				{
					var section = createSection();
					emptydata.push(section);
					tableview.setData(emptydata);
				}
				lastRow = data.length;
				for(var i=0; i<data.length;i++){
					var newrow = createRow(data[i]);
					if(i == 0) rowToReload = newrow;
					tableview.appendRow(newrow);
				}
				if(lastRow > 0){
					tableview.appendRow(loadingRow);
				}
			},
			onerror: function(e){
				alert(e.error);
			}
		});
		xhr.open('GET', url, true);
		var rdata = {id : selectedMemberId, id2:pageno};
		if(ismemo) rdata = {id : pageno};
		xhr.send(rdata);
		addUserSession(function(e){},function(e){});
	}
	

	self.add(topview);
	self.add(frameview);
	self.add(memoview);
	
	var leftbtn = Ti.UI.createButton({
			backgroundImage:'/images/icon_arrow_left.png',
			height:33,
			width:33,
			toggle:false
		});
		
	leftbtn.addEventListener('click',function(e){
		parent.close();
	});
	
	self.leftNavButton = leftbtn;
	
	reload();
	
	self.addEventListener('open',function(){
		getAccountBalance(infoId, 
				function(e){
				  accountList = [];
				   var data = JSON.parse(this.responseText);
				   accountList = accountList.concat(data);
				   if(data.length > 0){
				   		var memberid = data[0].MemberId;
				   		Ti.App.Properties.setString('memberId', data[0].MemberId);
				   		Ti.App.Properties.setString('countryCode', data[0].CountryCode);
				   		Ti.App.Properties.setString('accountBalance', data[0].Balance);
				   		Ti.App.Properties.setString('rank', data[0].Rank);
				   		memberAcceptedTermsAndCodes(memberid);
				   		var total = 0;
				   		for(var i=0; i<data.length;i++){
							total += parseFloat(data[i].Balance.replace(',',''));
						}	
						Ti.App.Properties.setString('totalBalance', AddCommas(total.toFixed(2)));
						
						selectedMemberId = Ti.App.Properties.getString('memberId');
						infoId = Ti.App.Properties.getString('infoId');
						currentBalance =  Ti.App.Properties.getString('totalBalance');
						balancelbl2.text = currentBalance;
						var rank = rankdesc.text = Ti.App.Properties.getString('rank');
						
						var isdiamond = rank.indexOf('Diamond') > -1;
						commentbox.visible = sharebtn.visible = isdiamond;
				   }
				},
				function(e){
					showMessage('There was a problem loading the accounts!');
					parent.close();
					
				}
			);
	});
	
	function memberAcceptedTermsAndCodes(memberid){
		var url = urlroot + 'MemberAcceptedTermsAndCodes/';
		var data;
		var xhr = Ti.Network.createHTTPClient({
			onload: function(e){
				var data = JSON.parse(this.responseText);
				if(data[0] == '0'){
					TermsAndCodesViewer = require('ui/common/TermsAndCodesViewer');
					termviewer = new TermsAndCodesViewer(self);
					termviewer.open();
				}
			},
			onerror: function(e){
				showMessage("Data Error", e.error);
			}
		});
		xhr.open('GET', url, true);
		var data = {id : memberid};
		xhr.send(data);
	}
	
	//TOOLBAR
	var bbar = Titanium.UI.createButtonBar({
		labels:['Announcements', 'Messages'],
		backgroundColor:'#576996',
	});
	var flexSpace = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	self.setToolbar([flexSpace,bbar,flexSpace]);
	
	var selectedNavIndex = 0;
	bbar.addEventListener('click',function(e){
		//tblView.animate({view:tblView.data[0], transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN});
		if(e.index == 0 && !ismemo){
			ismemo = true;
			pageno = 1;
			reload();
		}
		else if(ismemo == true){
			pageno = 1;
			ismemo = false;
			reload();
		}
		selectedNavIndex = e.index;
	});
	
	var lastorientation = 0;
	Ti.Gesture.addEventListener('orientationchange', function(e){
		if(e.orientation > 4 || lastorientation == e.orientation) return;
		Ti.API.info('orientation is '+e.orientation);
		isPortrait = e.orientation == 1 || e.orientation == 2 || e.orientation == 0;
		frameimg.image =  isPortrait ? '/images/pic-frame-ipad0.png' : '/images/pic-frame-ipad1.png';
	});
	
	return self;
	
}

module.exports = Home;
