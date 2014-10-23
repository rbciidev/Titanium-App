/**
 * @author Royale Developer
 */
function Unilevel(){
	Ti.include('etc/Helpers/ViewHelper.js');
	Ti.include('etc/Helpers/DataHelper.js');
	Ti.include('etc/Helpers/TextHelper.js');
	
	var self = Ti.UI.createWindow({
		backgroundImage: '/images/mainmenu/bg_login.png',
		title:L('uninetwork')
	});
	
	var tblView = Ti.UI.createTableView({
		backgroundColor : 'transparent',
		//separatorColor :'transparent',
	});
	
	var headerFont = Font14Bold();
 	var detailFont = Font14Normal();
 	var bgcolor = '#576996'; //'#D8E1FF';
	var hcolor = 'white';
	var section = createSection();
	var selectedNavIndex = 0;
	
	function createSummarySection(){
		var section = Ti.UI.createTableViewSection();
 		var h_height = 40;
        var header = Ti.UI.createView({
            height: 50,
            layout: 'horizontal',
            backgroundColor: bgcolor
        });
        
        var lbl1 = Ti.UI.createLabel({
			text: 'Month',
			font : headerFont,
			color: hcolor,
			left : '3%',
			textAlign : 'left',
			width : '45%',
			height : h_height
		});
		
		var lbl2 = Ti.UI.createLabel({
			text : 'Income',
			font : headerFont,
			color: hcolor,
			left : '1%',
			textAlign : 'right',
			width : '45%',
			height : h_height
		});
		
		

		header.add(lbl1);
		header.add(lbl2);
        section.headerView = header;
        return section;
	}
	
	function createSummaryRow(item){
		var tablerow = Ti.UI.createTableViewRow({
			height: 45,
			backgroundColor: 'transparent',
			selectedBackgroundColor : 'transparent',
		});
		
		var h_height = 40;
		var viewOne = Ti.UI.createView({
			height: h_height,
			layout: 'horizontal'
		});
		
		var lbl1 = Ti.UI.createLabel({
			text: item.MonthName,
			font : detailFont,
			left : '3%',
			textAlign : 'left',
			width : '45%',
			height : h_height
		});
		
		var lbl2 = Ti.UI.createLabel({
			text : item.Rebates,
			//color : 'white',
			font : detailFont,
			left : '1%',
			textAlign : 'right',
			width : '45%',
			height : h_height
		});
		
		
		viewOne.add(lbl1);
		viewOne.add(lbl2);
		tablerow.add(viewOne);
		
		return tablerow;
	}
	
	function createSection(items){
		var section = Ti.UI.createTableViewSection();
 		var h_height = 40;
        var header = Ti.UI.createView({
            height: 50,
            layout: 'horizontal',
            backgroundColor: bgcolor
        });
        
        var lbl1 = Ti.UI.createLabel({
			text: 'Date',
			font: headerFont,
			color: hcolor,
			left : '3%',
			textAlign : 'left',
			width : '25%',
			height : h_height
		});
		
		var lbl2 = Ti.UI.createLabel({
			text : 'Distributor Info',
			font: headerFont,
			color: hcolor,
			left : '1%',
			textAlign : 'left',
			width : '50%',
			height : h_height
		});
		
		var lbl3 = Ti.UI.createLabel({
			text : 'Rebate',
			font: headerFont,
			color: hcolor,
			left : '1%',
			textAlign : 'right',
			width : '16%',
			height : h_height
		});
		

		header.add(lbl1);
		header.add(lbl2);
		header.add(lbl3);

        section.headerView = header;
        return section;
	}
	
	function createRow(items){
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
			text: items.TransDate,
			font : detailFont,
			left : '3%',
			textAlign : 'left',
			width : '25%',
			height : h_height
		});
		
		var memberinfo = items.FullName + ' ('+items.MemberId+')';
		var lbl2 = Ti.UI.createLabel({
			text : memberinfo,
			font : detailFont,
			left : '1%',
			textAlign : 'left',
			width : '50%',
			height : h_height
		});
		
		var lbl3 = Ti.UI.createLabel({
			text : items.UPV,
			font : detailFont,
			left : '1%',
			textAlign : 'right',
			width : '16%',
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

		tablerow.add(viewOne);
		
		return tablerow;
	}
	
	function formatDate(dateOnly){
		var date = new Date();
		var datestr = date.getMonth()+'/'+date.getDate()+'/'+date.getFullYear();
		if(dateOnly == false){
			if(date.getHours()>12){
				datestr+= ' '+date.getHours()-12+':'+date.getMinutes()+' PM';
			}
			else{
				datestr+= ' '+date.getHours()+':'+date.getMinutes()+' AM';
			}
		}
		return datestr;
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
		navActInd.show();
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
			
			if(distance < lastDistance && !pulling){
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
	
	function reloadSummary(){
		var url = urlroot + 'GetUPVSummary';
		var data;
		var xhr = Ti.Network.createHTTPClient({
			onload: function(){
				data = JSON.parse(this.responseText);
				var emptyData = [];
				ssection = createSummarySection();
				emptyData.push(ssection);
				tblView.setData(emptyData);

				for(var i=0; i<data.length; i++){
					var summary = data[i];
					tblView.appendRow(createSummaryRow(summary));
				}
			},
			onerror: function(e){
				showMessage('Loading Problem', 'Cannot load summary because '+ e.error);
			}
		});
		xhr.open('GET', url, true);
		var sdata = {id:selectedMemberId};
		xhr.send(sdata);
		
	}
	
	function reloadData(pageno, isscroll){
		var url = urlroot+'GetUPVList';
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
					navActInd.hide();
				}
			},
			onerror: function(e){
				alert(e.error);
			}
		});
		xhr.open('GET', url, true);
		var tdata = {id : selectedMemberId, pagenum : pageno};
		xhr.send(tdata);
		addUserSession(function(e){},function(e){});
	}
	
	var selectedMemberId = Ti.App.Properties.getString('memberId'); //'00000001';
	var infoid = 103197;//for debugging purposes only
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
		
		var accountCombo = createComboBox(150,{fontSize:14, fontWeight:'bold'},'Select a User Id', adata, selectionChangedHandler);
		//self.titleControl = accountCombo;
		accountCombo.value = selectedMemberId;
	    self.rightNavButton = accountCombo;
		self.add(accountCombo.picker);
	}
	updateAccountCombo();
	
	function selectionChangedHandler(value){
		selectedMemberId = value;
		Ti.App.Properties.setString('memberId',value); //
		pagenum = 1;
		reloadData(pagenum);
	}
	
	var loadingRow = Ti.UI.createTableViewRow({title:"Loading..."}); 
	var navActInd = Ti.UI.createActivityIndicator();
	self.setRightNavButton(navActInd);

	
	//TOOLBAR
	var bbar = Titanium.UI.createButtonBar({
		labels:['Details', 'Summary'],
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
		//self.animate({view:tblView, transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
		var emptyData = [];
		var loading = createTableViewRow();
		emptyData.push(createLoadingRow(40));
		tblView.setData(emptyData);
		if(index == 0){
			reloadData(pagenum);
		}
		else{
			reloadSummary();
		}
	}

	
	
	self.add(tblView);
	
	reloadPage(0);
	
	return self;
}

module.exports = Unilevel;
