/**
 * @author Royale Dev
 */
function EncodingSummary(){
	Ti.include('etc/Helpers/ViewHelper.js');
	Ti.include('etc/Helpers/DataHelper.js');
	Ti.include('etc/Helpers/TextHelper.js');
	
	var self = Ti.UI.createWindow({
		backgroundImage: '/images/mainmenu/bg_login.png',
		title:'Dashboard'
	});
	
	var tblView = createTableView();
	var headerFont = Font14Bold();
 	var detailFont = Font14Normal();
 	var bgcolor = '#576996'; //'#D8E1FF';
	var hcolor = 'white';
	var section = createSection();
	var selectedNavIndex = 0;
	
	function createSection( ismonthly){
		var section = Ti.UI.createTableViewSection();
 		var h_height = 40;
        var header = Ti.UI.createView({
            height: 50,
            layout: 'horizontal',
            backgroundColor: bgcolor
        });
        
        var lbl1 = Ti.UI.createLabel({
			text: ismonthly != true ? 'Entry Date' : 'Year and Month',
			font : headerFont,
			color: hcolor,
			left : '3%',
			textAlign : 'left',
			width : '25%',
			height : h_height
		});
		
		var lbl2 = Ti.UI.createLabel({
			text : 'Total',
			font : headerFont,
			color: hcolor,
			left : '1%',
			textAlign : 'right',
			width : '14%',
			height : h_height
		});
		
		var lbl3 = Ti.UI.createLabel({
			text : 'King',
			font : headerFont,
			color: hcolor,
			left : '1%',
			textAlign : 'right',
			width : '14%',
			height : h_height
		});
		
		var lbl4 = Ti.UI.createLabel({
			text : 'Premium',
			font : headerFont,
			color: hcolor,
			left : '1%',
			textAlign : 'right',
			width : '14%',
			height : h_height
		});
		
		var lbl5 = Ti.UI.createLabel({
			text : 'RDS',
			font : headerFont,
			color: hcolor,
			left : '1%',
			textAlign : 'right',
			width : '14%',
			height : h_height
		});
		
		var lbl6 = Ti.UI.createLabel({
			text : 'Others',
			font : headerFont,
			color: hcolor,
			left : '1%',
			textAlign : 'right',
			width : '14%',
			height : h_height
		});

		header.add(lbl1);
		header.add(lbl2);
		header.add(lbl3);
		header.add(lbl4);
		header.add(lbl5);
		header.add(lbl6);
        section.headerView = header;
        return section;
	}
	
	function createRow(items, ismonthly){
		var tablerow = Ti.UI.createTableViewRow({
			height: 45,
			backgroundColor: 'transparent',
			selectedBackgroundColor : 'transparent',
			id : items.id
		});
		
		var h_height = 40;
		var viewOne = Ti.UI.createView({
			height: h_height,
			layout: 'horizontal'
		});
		
		var lbl1 = Ti.UI.createLabel({
			text: ismonthly != true ? items.EntryDate : items.YearNo + '-' + (items.MonthNo < 10 ? '0'+items.MonthNo : items.MonthNo),
			font : detailFont,
			left : '3%',
			textAlign : 'left',
			width : '25%',
			height : h_height
		});
		
		var lbl2 = Ti.UI.createLabel({
			text : items.Total,
			//color : 'white',
			font : detailFont,
			left : '1%',
			textAlign : 'right',
			width : '14%',
			height : h_height
		});
		
		var lbl3 = Ti.UI.createLabel({
			text : items.King,
			//color : 'white',
			font : detailFont,
			left : '1%',
			textAlign : 'right',
			width : '14%',
			height : h_height
		});
		
		var lbl4 = Ti.UI.createLabel({
			text : items.Premium,
			//color : 'white',
			font : detailFont,
			left : '1%',
			textAlign : 'right',
			width : '14%',
			height : h_height
		});
		
		var lbl5 = Ti.UI.createLabel({
			text : items.RDS,
			//color : 'white',
			font : detailFont,
			left : '1%',
			textAlign : 'right',
			width : '14%',
			height : h_height
		});
		
		var lbl6 = Ti.UI.createLabel({
			text : items.OtherType,
			//color : 'white',
			font : detailFont,
			left : '1%',
			textAlign : 'right',
			width : '14%',
			height : h_height
		});
		
		if(items.type == "header"){
			lbl1.backgroundColor = 'gray';
			lbl2.backgroundColor = 'gray';
			lbl3.backgroundColor = 'gray';
		}
		
		viewOne.add(lbl1);
		viewOne.add(lbl2);
		viewOne.add(lbl3);
		viewOne.add(lbl4);
		viewOne.add(lbl5);
		viewOne.add(lbl6);
		tablerow.add(viewOne);
		
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
	tblView.headerPullView = tableHeader;
	
	var lastDistance = 0;
	var lastRow = 0;
	var pulling = false;
	var reloading = false;
	var pagenum = 1;
	
	function beginReloading(){
		pagenum=1;
		reloadData(pagenum, false);
		tblView.setContentInsets({top:0}, {animated:true});
		reloading = false;
		lastUpdatedLabel.text = "Last Updated: "+ formatDate();
		statusLabel.text = "Pull down to refresh...";
		actInd.hide();
		arrow.show();
	}
	
	function beginScrollReload(){
		reloading = true;
		pagenum+=1;
		tblView.appendRow(loadingRow);
		
		reloadData(pagenum, true);	
	}
	
	
	tblView.addEventListener('scroll', function(e){
		if(selectedNavIndex == 0){
			var offset = e.contentOffset.y;
				var height = e.size.height;
			var total = offset + height;
			var theEnd = e.contentSize.height;
			var distance = theEnd - total;
		
			if(distance < lastDistance){
				var nearEnd = theEnd * .85;
				if(!reloading && (total >= nearEnd)){				
					beginScrollReload();
				}	
			}	
		
			else if(offset <= -65.0 && !pulling && !reloading){
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
		}
	});
	
	tblView.addEventListener('dragend',function(e){
		if(pulling && !reloading){
			reloading = true;
			pulling = false;
			arrow.hide();
			actInd.show();
			statusLabel.text = "Reloading";
			tblView.setContentInsets({top:60},{animated:true});
			arrow.transform = Ti.UI.create2DMatrix();
			beginReloading();
		}
	});
	
	function reloadSummary(pageno){
		var url = urlroot + 'GetMonthlyEncodingSummary';
		var data;
		var xhr = Ti.Network.createHTTPClient({
			onload: function(){
				data = JSON.parse(this.responseText);
				var emptyData = [];
				ssection = createSection(true);
				emptyData.push(ssection);
				tblView.setData(emptyData);

				for(var i=0; i<data.length; i++){
					var summary = data[i];
					tblView.appendRow(createRow(summary, true));
				}
			},
			onerror: function(e){
				showMessage('Loading Problem', 'Cannot load summary because '+ e.error);
			}
		});
		xhr.open('GET', url, true);
		var sdata = {id:pageno};
		xhr.send(sdata);
		
	}
	
	function reloadData(pageno, isscroll){
		var url = urlroot+'GetDailyEncodingSummary';
		var data;
		var xhr = Ti.Network.createHTTPClient({
			onload: function(){
				reloading = false;
				data = JSON.parse(this.responseText);	
				if(isscroll == true){
					tblView.deleteRow(tblView.data[0].rowCount-1, {animationStyle:Ti.UI.iPhone.RowAnimationStyle.NONE});					
				}
				else 
				{
					var emptydata = [];
					section = createSection();
					emptydata.push(section);
					tblView.setData(emptydata);
				}
				lastRow+=data.length;
				for(var i=0; i<data.length;i++){
					tblView.appendRow(createRow(data[i]));
				}	
				if(isscroll == true){
					//tblView.scrollToIndex(lastRow-(data.length-1), {animated:true, position:Ti.UI.iPhone.TableViewScrollPosition.BOTTOM});
				}
			},
			onerror: function(e){
				showMessage('Loading Problem','Cannot load details because '+ e.error);
			}
		});
		xhr.open('GET', url, true);
		var tdata = {id : pageno};
		xhr.send(tdata);
	}
	
	var loadingRow = Ti.UI.createTableViewRow({title:"Loading..."}); 
	//TOOLBAR
	var bbar = Titanium.UI.createButtonBar({
		labels:['Daily', 'Monthly'],
		backgroundColor:'#576996'
	});
	var flexSpace = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	self.setToolbar([flexSpace,bbar,flexSpace]);
	
	bbar.addEventListener('click',function(e){
		selectedNavIndex = e.index;
		reloadPage(e.index);
	});

	function reloadPage(index){
		pagenum = 1;
		var emptyData = [];
		emptyData.push(createLoadingRow(40));
		tblView.setData(emptyData);
		if(index == 0){
			reloadData(pagenum);
		}
		else{
			reloadSummary(pagenum);
		}
	}
	
	self.add(tblView);
	reloadPage(0);	
	return self;
	
}
module.exports = EncodingSummary;
