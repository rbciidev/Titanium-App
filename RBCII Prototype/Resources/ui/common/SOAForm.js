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
		separatorColor :'transparent',
		height: '50%',
		top:'51%',
		allowsSelection: true
	});
	
	var summaryView = Ti.UI.createTableView({
		backgroundColor:'transparent',
		separatorColor :'transparent',
		top:0,
		scrollable:false,
		allowsSelection: false,
		height:'50%'
	});
	
	var title = Ti.UI.createLabel({
		text:'Account Summary',
		backgroundColor:'silver',
		textAlign:'center',
		width: Ti.UI.FILL
	});
	
	var headerFont = Font14Bold();
 	var detailFont = Font14Normal();
 	var bgcolor = '#576996'; //'#D8E1FF';
	var hcolor = 'white';
	var selectedRow = 0;
	var countryCode = Ti.App.Properties.getString('countryCode');
	var selectedAccount = {};
		
	function createSection(){
		var section = Ti.UI.createTableViewSection();
        var header = Ti.UI.createView({
            height: 50,
            layout: 'horizontal',
            backgroundColor: bgcolor
        });
        
        var userid = Ti.UI.createLabel({
			text: 'User Id',
			font : headerFont,
			left : '3%',
			textAlign : 'left',
			width : '12%',
			color :hcolor,
			height : Ti.UI.FILL,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});
		
		var datereg = Ti.UI.createLabel({
			text : 'Date Registered',
			font : headerFont,
			left : '1%',
			textAlign : 'left',
			width : '25%',
			color : hcolor,
			height : Ti.UI.FILL,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});
		
		var balance = Ti.UI.createLabel({
			text : 'Balance',
			font : headerFont,
			left : '1%',
			textAlign : 'right',
			width : '15%',
			color :hcolor,
			height : Ti.UI.FILL,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});
		var leftPts = Ti.UI.createLabel({
			text : 'Left PPV Available',
			font : headerFont,
			left : '1%',
			textAlign : 'right',
			width : '12%',
			color :hcolor,
			height : Ti.UI.FILL,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});
		var rightPts = Ti.UI.createLabel({
			text : 'Right PPV Available',
			font : headerFont,
			left : '1%',
			textAlign : 'right',
			width : '12%',
			color : hcolor,
			height : Ti.UI.FILL,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});
		var todayPairs = Ti.UI.createLabel({
			text : 'Match Bonus Today',
			font : headerFont,
			left : '1%',
			textAlign : 'right',
			width : '12%',
			color :hcolor,
			height : Ti.UI.FILL,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});

		header.add(userid);
		header.add(datereg);
		header.add(balance);
		header.add(leftPts);
		header.add(rightPts);
		header.add(todayPairs);

        section.headerView = header;
        return section;
	}
	
	function createSummarySection(userid, daterange){
		var section = Ti.UI.createTableViewSection();
        var header = Ti.UI.createView({
            height: 50,
            layout: 'horizontal',
            backgroundColor: bgcolor
        });
        
        var userid = Ti.UI.createLabel({
			text: 'Account Summary for '+ userid,
			font : headerFont,
			left : '3%',
			textAlign : 'left',
			width : '30%',
			color :hcolor,
			height : Ti.UI.FILL,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});
		
		var daterange = Ti.UI.createLabel({
			text : 'From '+daterange,
			font : headerFont,
			left : '1%',
			textAlign : 'left',
			width : '30%',
			color :hcolor,
			height : Ti.UI.FILL,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});
		

		header.add(userid);
		header.add(daterange);

        section.headerView = header;
        return section;
	}
	
	
	function createRow(item){
		var h_height = 40;

		
		//Accoount Balance
		//MemberId, Balance, EntryDate
		
		var row = Ti.UI.createTableViewRow({
			backgroundColor: 'transparent',
			selectedBackgroundColor : selectedBGColor, //'#D8E1FF',
			height : h_height,
			className : 'datarow',
			clickName : 'row'
		});
		
		var container = Ti.UI.createView({
			height: Ti.UI.FILL,
			layout: 'horizontal'
		});
		
		var memberid = Ti.UI.createLabel({
			text: item.MemberId,
			font : detailFont,
			left : '3%',
			textAlign : 'left',
			width : '12%',
			height : Ti.UI.FILL,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});
		
		var entryDate = Ti.UI.createLabel({
			text : item.EntryDate,
			font : detailFont,
			left : '1%',
			textAlign : 'left',
			width : '25%',
			height : Ti.UI.FILL,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});
		
		var balance = Ti.UI.createLabel({
			text : item.Balance,
			//color : 'white',
			font : detailFont,
			left : '1%',
			textAlign : 'right',
			width : '15%',
			hheight : Ti.UI.FILL,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});		
		var leftpts = Ti.UI.createLabel({
			text : item.LeftPoints,
			//color : 'white',
			font : detailFont,
			left : '1%',
			textAlign : 'right',
			width : '12%',
			height : Ti.UI.FILL,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});	
		var rightpts = Ti.UI.createLabel({
			text : item.RightPoints,
			//color : 'white',
			font : detailFont,
			left : '1%',
			textAlign : 'right',
			width : '12%',
			hheight : Ti.UI.FILL,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});	
		var todayPairs = Ti.UI.createLabel({
			text : item.TodayPairs,
			//color : 'white',
			font : detailFont,
			left : '1%',
			textAlign : 'right',
			width : '10%',
			height : Ti.UI.FILL,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});	
		row.add(container);

		container.add(memberid);
		container.add(entryDate);
		container.add(balance);
		container.add(leftpts);
		container.add(rightpts);
		container.add(todayPairs);
		
		row.account = item;
        	
		return row;
	}
	
	function createSummaryItem(name, value){
		var h_height = 30;
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
			height:Ti.UI.FILL
		});
		var namelabel = Ti.UI.createLabel({
			font : headerFont,
			left:  '5%',
			width:'25%',
			textAlign:'left',
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
			text:name,
			height:Ti.UI.FILL
		});
		
		var separator = Ti.UI.createLabel({
			font : headerFont,
			left:'1%',
			width:'2%%',
			textAlign:'left',
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
			text:':',
			height:Ti.UI.FILL
		});

		var valuelabel = Ti.UI.createLabel({
			font : headerFont,
			left:'1%',
			width:'20%',
			textAlign:'right',
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
			text:value,
			height:Ti.UI.FILL
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
		if(selectedNavIndex == 1 && distance < lastDistance && !pulling){
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
		xhr.open('GET', url, true);

		var xdata = {id : userid};
		xhr.send(xdata);
	}
	

	
	function createDetailsSection(){
		var section = Ti.UI.createTableViewSection();
        var header = Ti.UI.createView({
            height: 50,
            layout: 'horizontal',
            backgroundColor: bgcolor
        });
		
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

        section.headerView = header;
        return section;
	}
	
	var selectedBGColor = '#59D2ED';
	
	function createDetailRow(item){
		var row = Ti.UI.createTableViewRow({
			backgroundColor: 'transparent',
			selectedBackgroundColor : selectedBGColor,//'#D8E1FF',
			height : 40,
			className : 'datarow',
			clickName : 'row',
		});
		
		var container = Ti.UI.createView({
			height: Ti.UI.FILL,
			layout: 'horizontal'
		});
		
		var transdate = Ti.UI.createLabel({
			text : item.TransDate,
			font : detailFont,
			left : '3%',
			textAlign : 'left',
			width : '20%',
			height : Ti.UI.FILL,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});
		
		var tcode = Ti.UI.createLabel({
			text : item.TCode,
			//color : 'white',
			font : detailFont,
			left : '1%',
			textAlign : 'right',
			width : '5%',
			hheight : Ti.UI.FILL,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});		
		var description = Ti.UI.createLabel({
			text : item.Description,
			//color : 'white',
			font : detailFont,
			left : '1%',
			textAlign : 'left',
			width : '35%',
			height : Ti.UI.FILL,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});	
		var debit = Ti.UI.createLabel({
			text : item.Debit,
			//color : 'white',
			font : detailFont,
			left : '1%',
			textAlign : 'right',
			width : '10%',
			hheight : Ti.UI.FILL,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});	
		var credit = Ti.UI.createLabel({
			text : item.Credit,
			//color : 'white',
			font : detailFont,
			left : '1%',
			textAlign : 'right',
			width : '10%',
			height : Ti.UI.FILL,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});	
		var balance = Ti.UI.createLabel({
			text : item.Balance,
			//color : 'white',
			font : detailFont,
			left : '1%',
			textAlign : 'right',
			width : '10%',
			height : Ti.UI.FILL,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		});	
		row.add(container);

		container.add(transdate);
		//container.add(tcode);
		container.add(description);
		container.add(debit);
		container.add(credit);
		container.add(balance);
		
		row.account = item;
        	
		return row;
	}
	
	var reloading = false;
	var loadingRow = Ti.UI.createTableViewRow({title:"Loading..."}); 
	var pagenum = 1;
	var lastDistance = 0;
	function beginScrollReload(){
		reloading = true;
		pagenum+=1;
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
		xhr.open('GET', url, true);
		var sdata = {id : userid, pagenum: pageno};
		xhr.send(sdata);
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
		xhr.open('GET', url, true);
		var usrid = {id : infoid};
		xhr.send(usrid);
		addUserSession(function(e){},function(e){});
	}
	
	
	//TOOLBAR
	var bbar = Titanium.UI.createButtonBar({
		labels:['Summary', 'Details'],
		backgroundColor:'#576996',
	});
	var flexSpace = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	self.setToolbar([flexSpace,bbar,flexSpace]);
	
	var selectedNavIndex = 0;
	bbar.addEventListener('click',function(e){
		//tblView.animate({view:tblView.data[0], transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN});
		if(e.index == 0){
			reloadData();
		}
		else{
			pagenum = 1;
			lastDistance = 0;
			getDetailsData(selectedMemberId, pagenum);
		}
		selectedNavIndex = e.index;
	});
	
	
	reloadData();
	self.add(tblView);
	self.add(summaryView);
	
	
	
	return self;
}

module.exports = SOAForm;
