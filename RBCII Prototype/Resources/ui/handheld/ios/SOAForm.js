/**
 * @author Royale Developers
 */
function SOAForm(){
	Ti.include('etc/Helpers/ViewHelper.js');
	Ti.include('etc/Helpers/TextHelper.js');
	Ti.include('etc/Helpers/DataHelper.js');
	
	var self = Ti.UI.createWindow({
		backgroundImage: '/images/mainmenu/bg_login.png',
		title:L('soa')
	});
	
	var tblView = Ti.UI.createTableView({
		backgroundColor:'transparent',
		//separatorColor :'transparent',
		//height: '30%',
		//top:'51%',
		allowsSelection: true
	});
	
	var summaryView = Ti.UI.createTableView({
		backgroundColor:'transparent',
		separatorColor :'transparent',
		top:0,
		scrollable:false,
		allowsSelection: false,
		//height:'70%'
	});
	
	var title = Ti.UI.createLabel({
		text:'Account Summary',
		backgroundColor:'silver',
		textAlign:'center',
		width: Ti.UI.FILL
	});
	
	var headerFont = Font12Bold();
 	var detailFont = Font12Normal();
 	var bgcolor = '#576996'; //'#D8E1FF';
	var hcolor = 'white';
	var selectedRow = 0;
	var countryCode = Ti.App.Properties.getString('countryCode');
	var selectedAccount = {};
		
	function createSection(){
		var section = Ti.UI.createTableViewSection();
        var header = Ti.UI.createView({
            height: 30,
            layout: 'vertical',
            backgroundColor: bgcolor
        });
		
		var templbl = Ti.UI.createLabel({height : 8});
		var titlelbl = Ti.UI.createLabel({
			font : headerFont,
			text : 'My Packages',
			color : hcolor
		});
		header.add(templbl);
		header.add(titlelbl);
		
        section.headerView = header;
        return section;
	}
	
	function createSummarySection(userid, daterange){
		var section = Ti.UI.createTableViewSection();
        var header = Ti.UI.createView({
            height: 40,
            layout: 'vertical',
            backgroundColor: bgcolor
        });
        
        var userid = Ti.UI.createLabel({
			text: 'Account Summary for '+ userid,
			font : headerFont,
			//textAlign : 'left',
			//width : '30%',
			color :hcolor,
			//height : Ti.UI.FILL,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});
		
		var daterange = Ti.UI.createLabel({
			text : 'From '+daterange,
			font : headerFont,
			top : '1%',
			//textAlign : 'left',
			//width : '30%',
			color :hcolor,
			//height : Ti.UI.FILL,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});
		

		header.add(userid);
		header.add(daterange);

        section.headerView = header;
        return section;
	}
	
	
	function createRowView(title, value, txtalign){
		var container = Ti.UI.createView({
			height : Ti.UI.SIZE,
			layout: 'horizontal'
		});
		
		var titleLabel = Ti.UI.createLabel({
			text: title,
			font : headerFont,
			width : '35%',
			left : '1%'
		});
		var separator = Ti.UI.createLabel({
			text : ':',
			font : headerFont,
			width: '2%',
			left : '1%'
		});
		var valueLabel = Ti.UI.createLabel({
			text: value,
			font : headerFont,
			left : '1%',
			textAlign : txtalign,
			width: '58%'
		});
		
		container.add(titleLabel);
		container.add(separator);
		container.add(valueLabel);
		return container;
	}
	
	function createRow(item){
		var h_height = 40;

		
		//Accoount Balance
		//MemberId, Balance, EntryDate
		
		var row = Ti.UI.createTableViewRow({
			backgroundColor: 'transparent',
			selectedBackgroundColor : selectedBGColor, //'#D8E1FF',
			//height : Ti.UI.SIZE,
			className : 'datarow',
			clickName : 'row'
		});
		
		var container = Ti.UI.createView({
			height: Ti.UI.SIZE,
			layout: 'vertical'
		});
		
		row.add(container);
		var uidrow = createRowView('User Id', item.MemberId, 'right');
		uidrow.top = '2%';
		container.add(uidrow);
		container.add(createRowView('Date Registered', item.EntryDate, 'right'));
		container.add(createRowView('Current Balance', item.Balance, 'right'));
		container.add(createRowView('Left Avbl. Pts.', item.LeftPoints, 'right'));
		container.add(createRowView('Right Avbl. Pts.', item.RightPoints, 'right'));
		container.add(createRowView('Today Pairs', item.TodayPairs, 'right'));
		
		row.account = item;
        	
		return row;
	}
	
	function createSummaryItem(name, value){
		var h_height = 20;
		var rownum = 1;
		if(summaryView.data[0].rows != null) 
			rownum = summaryView.data[0].rows.length+1;
		var row = Ti.UI.createTableViewRow({
			backgroundColor: 'transparent',
			selectedBackgroundColor : '#fff',
			height : h_height+5,
			className : 'datarow',
			clickName : 'row'
		});
		
		var itemView = Ti.UI.createView({
			backgroundColor: rownum % 2 > 0 ? 'silver' : 'white',
			layout:'horizontal',
			opacity: '0.7',
			//height:Ti.UI.FILL
		});
		var namelabel = Ti.UI.createLabel({
			font : headerFont,
			left:  '5%',
			width:'45%',
			textAlign:'left',
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
			text:name,
			//height:Ti.UI.FILL
		});
		
		var separator = Ti.UI.createLabel({
			font : headerFont,
			left:'1%',
			width:'2%%',
			textAlign:'left',
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
			text:':',
			//height:Ti.UI.FILL
		});

		var valuelabel = Ti.UI.createLabel({
			font : headerFont,
			left:'1%',
			width:'40%',
			textAlign:'right',
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
			text:value,
			//height:Ti.UI.FILL
		});
		itemView.add(namelabel);
		itemView.add(separator);
		itemView.add(valuelabel);
		row.add(itemView);
		Ti.API.info("adding summary item name: "+name+' value:'+value+' itemcount:'+ rownum-1 );
		return row;
	}
	function createSummary(item){
		//SOA Summary
		//MemberId, FullName, StartDate, EndDate, BeginningBalance, TotalTax, TotalProcessingFee, TotalMatchBonus, TotalDRFee, TotalEncashments, TotalUni, TotalMulti, TotalAdjustments, TotalAdditionals, EndingBalance
		if(item == null){
			item = {
				MemberId:selectedAccount.MemberId,
				StartDate: selectedAccount.EntryDate,
				EndDate: selectedAccount.EntryDate,
				BeginningBalance: 0,
				TotalTax:0,
				TotalProcessingFee: 0,
				TotalMatchBonus: 0,
				TotalDRFee: 0,
				TotalEncashments: 0,
				TotalUni: 0,
				TotalMulti: 0,
				TotalAdjustments: 0,
				TotalAdditionals: 0,
				EndingBalance: 0
			};
		}
		var sData = [];
		var summarySection = createSummarySection(item.MemberId, item.StartDate + ' TO ' + item.EndDate);
		sData.push(summarySection);
		summaryView.setData(sData);

		summaryView.appendRow(createSummaryItem('Beginning Balance', item.BeginningBalance));
		
		//Only Philippine Accounts have withholding tax
		if(countryCode == 'PHIL'){
			summaryView.appendRow(createSummaryItem('Withholding Taxes', item.TotalTax));
		}
		
		summaryView.appendRow(createSummaryItem('Processing Fees', item.TotalProcessingFee));
		summaryView.appendRow(createSummaryItem('Match Bonuses', item.TotalMatchBonus));
		summaryView.appendRow(createSummaryItem('Direct Referral Rebates', item.TotalDRFee));
		summaryView.appendRow(createSummaryItem('Multilevel Rebates', item.TotalMulti));
		summaryView.appendRow(createSummaryItem('Unilevel Rebates', item.TotalUni));
		summaryView.appendRow(createSummaryItem('Other Additionals', item.TotalAdditionals));
		summaryView.appendRow(createSummaryItem('Other Deductions', item.TotalAdjustments));
		summaryView.appendRow(createSummaryItem('Encashments', item.TotalEncashments));
		summaryView.appendRow(createSummaryItem('Current Balance', item.EndingBalance));
	}
	
	var tableHeader = createTableViewHeaderForRefresh();
	var actInd = tableHeader.indicator;
	var arrow = tableHeader.arrow;
	var lastUpdatedLabel = tableHeader.lastUpdated;
	var statusLabel = tableHeader.status;
	var lastDistance = 0;
	var pulling = false;
	var reloading = false;
	tblView.headerPullView = tableHeader;
	
	function beginReloading(){
		pagenum=1;
		reloadData();
		tblView.setContentInsets({top:0}, {animated:true});
		reloading = false;
		lastUpdatedLabel.text = "Last Updated: "+ formatDate();
		statusLabel.text = "Pull down to refresh...";
		actInd.hide();
		arrow.show();
	}
	
	var selectedMemberId = Ti.App.Properties.getString('memberId'); //'';
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
	
	tblView.addEventListener('scroll', function(e){
		var offset = e.contentOffset.y;
		var height = e.size.height;
		var total = offset + height;
		var theEnd = e.contentSize.height;
		var distance = theEnd - total;
		
		Ti.API.info('navindex: '+selectedNavIndex+'  distance: '+distance+'  lastDistance: '+lastDistance);
		if(selectedNavIndex == 1 && distance < lastDistance){
			var nearEnd = theEnd * .85;
			if(!reloading && (total >= nearEnd)){				
				beginScrollReload();
			}	
		}
		
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
	
	
	});
	
	tblView.addEventListener('click', function(e){
		selectedRow = e.index;
		selectedAccount = e.rowData.account;
		var usrid = selectedAccount.MemberId;
		countryCode = selectedAccount.CountryCode;
		Ti.App.Properties.setString('countryCode', countryCode);
		getSummaryData(usrid);
		pagenum = 1;
	});
	
	function getSummaryData(userid){
		selectedMemberId = userid;
		Ti.App.Properties.setString('memberId',userid); //
		var url = urlroot+'GetSOASummary/';
		var data;
		
		Ti.API.info("fetching  GetSummaryAccountInfo id:"+userid);
		var xhr = Ti.Network.createHTTPClient({
			onload: function(){	
				data = JSON.parse(this.responseText);
				Ti.API.info("summary data count: "+data.length);
				if(data.length > 0){
					for(var i=0; i < data.length; i++){
						var item = data[i];
						Ti.API.info("creating summary for "+item.MemberId);
						createSummary(data[i]);
					}
				}
				else{
					createSummary(null);
				}
			},
			onerror: function(e){
				alert(e.error);
			}
		});
		xhr.open('GET', url);

		var xdata = {id : userid};
		xhr.send(xdata);
		addUserSession(function(e){},function(e){});
	}
	

	
	function createDetailsSection(){
		var section = Ti.UI.createTableViewSection();
        var header = Ti.UI.createView({
            height: 30,
            layout: 'vertical',
            backgroundColor: bgcolor
        });
		/*
		var transdate = Ti.UI.createLabel({
			text : 'Transaction Date',
			font : headerFont,
			left : '3%',
			textAlign : 'left',
			width : '20%',
			color : hcolor,
			height : Ti.UI.FILL,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});
		
		var tcode = Ti.UI.createLabel({
			text : 'Code',
			font : headerFont,
			left : '1%',
			textAlign : 'right',
			width : '5%',
			color :hcolor,
			height : Ti.UI.FILL,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});
		var description = Ti.UI.createLabel({
			text : 'Description',
			font : headerFont,
			left : '1%',
			textAlign : 'left',
			width : '35%',
			color :hcolor,
			height : Ti.UI.FILL,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});
		var debit = Ti.UI.createLabel({
			text : 'Debit',
			font : headerFont,
			left : '1%',
			textAlign : 'right',
			width : '10%',
			color : hcolor,
			height : Ti.UI.FILL,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});
		var credit = Ti.UI.createLabel({
			text : 'Credit',
			font : headerFont,
			left : '1%',
			textAlign : 'right',
			width : '10%',
			color :hcolor,
			height : Ti.UI.FILL,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});
		var balance = Ti.UI.createLabel({
			text : 'Balance',
			font : headerFont,
			left : '1%',
			textAlign : 'right',
			width : '10%',
			color :hcolor,
			height : Ti.UI.FILL,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});

		header.add(transdate);
		//header.add(tcode);
		header.add(description);
		header.add(debit);
		header.add(credit);
		header.add(balance);
		*/
        var titlelbl = Ti.UI.createLabel({
			text : 'Transaction Details',
			font : headerFont,
			color : hcolor,
		});
		header.add(titlelbl);
        section.headerView = header;
        return section;
	}
	
	var selectedBGColor = '#59D2ED';
	
	function createDetailRow(item){
		var row = Ti.UI.createTableViewRow({
			backgroundColor: 'transparent',
			selectedBackgroundColor : selectedBGColor,//'#D8E1FF',
			height : Ti.UI.SIZE,
			className : 'datarow',
			clickName : 'row',
		});
		
		var container = Ti.UI.createView({
			height: Ti.UI.SIZE,
			layout: 'horizontal'
		});
		
		
		row.add(container);

		var daterow = createRowView('Transaction Date', item.TransDate, 'right');
		daterow.top = '2%';
		container.add(daterow);
		container.add(createRowView('Description', item.Description, 'right'));
		container.add(createRowView('Debit', item.Debit, 'right'));
		container.add(createRowView('Credit', item.Credit, 'right'));
		container.add(createRowView('Balance', item.Balance, 'right'));
		
		row.account = item;
        	
		return row;
	}
	
	var reloading = false;
	var loadingRow = Ti.UI.createTableViewRow({title:"Loading..."}); 
	var pagenum = 1;
	var lastDistance = 0;
	function beginScrollReload(){
		reloading = true;
		pagenum=1;
		tblView.appendRow(loadingRow);
		
		getDetailsData(selectedMemberId, pagenum);	
	}	
	
	function getDetailsData(userid, pageno){
		//temp info id
		var infoid = 103197;
		var url = urlroot+'GetSOADetails/';
		var data;
		var xhr = Ti.Network.createHTTPClient({
			onload: function(){
				reloading = false;
				Ti.API.info('pageno:'+pageno);
				//reset data and section
				if(pageno == 1){
				var emptydata = [];
				section = createDetailsSection();
				emptydata.push(section);
				tblView.setData(emptydata);
				}
				if(pageno > 1){
					tblView.deleteRow(tblView.data[0].rowCount-1, {animationStyle:Ti.UI.iPhone.RowAnimationStyle.NONE});
				}
				data = JSON.parse(this.responseText);
				for(var i=0; i < data.length; i++){
					var item = data[i];
					tblView.appendRow(createDetailRow(item));
				}
				
			},
			onerror: function(e){
				alert(e.error);
			}
		});
		xhr.open('GET', url);
		var sdata = {id : userid, pagenum: pageno};
		xhr.send(sdata);
		addUserSession(function(e){},function(e){});
	}
	
	
	function reloadData(){
		//temp info id
		var infoid = Ti.App.Properties.getString('infoId'); //103197;
		var url = urlroot+'GetAccountBalance/';
		var data;
		var xhr = Ti.Network.createHTTPClient({
			onload: function(){
				//reset data and section
				var emptydata = [];
				section = createSection();
				emptydata.push(section);
				tblView.setData(emptydata);
					
				data = JSON.parse(this.responseText);
				
				for(var i=0; i < data.length; i++){
					var item = data[i];
					if(i == selectedRow){
						countryCode = item.CountryCode;
						Ti.App.Properties.setString('countryCode', countryCode);
						getSummaryData(item.MemberId);
					}
					tblView.appendRow(createRow(item));
				}
				
				tblView.selectRow(selectedRow);
			},
			onerror: function(e){
				alert(e.error);
			}
		});
		xhr.open('GET', url);
		var usrid = {id : infoid};
		xhr.send(usrid);
		addUserSession(function(e){},function(e){});
	}
	
	
	//TOOLBAR
	var bbar = Titanium.UI.createButtonBar({
		labels:['Packages','Summary', 'Details'],
		backgroundColor:'#576996',
	});
	var flexSpace = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	self.setToolbar([flexSpace,bbar,flexSpace]);
	
	var selectedNavIndex = 0;
	bbar.addEventListener('click',function(e){
		lastDistance = 0;
		if(e.index == 0){
			reloadData();
			self.animate({view:tblView, transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
		}
		else if(e.index == 1){
			reloadData();
			self.animate({view:summaryView, transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
		}
		else{
			pagenum = 1;
			getDetailsData(selectedMemberId, pagenum);
			self.animate({view:tblView, transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
		}
		selectedNavIndex = e.index;
	});
	
	
	reloadData();
	self.add(tblView);

	
	return self;
}

module.exports = SOAForm;
