/**
 * @author Royale Developer
 */
function Recruitments(){
	Ti.include('etc/Helpers/ViewHelper.js');
	Ti.include('etc/Helpers/DataHelper.js');
	
	var self = Ti.UI.createWindow({
		backgroundImage: '/images/mainmenu/bg_login.png',
		title: L('recruitments')
	});
	
	var tableView =  createTableView();
	
	var loadingRow = Ti.UI.createTableViewRow({title:"Loading..."}); 
	
	
	var pagenum = 1;
	var reloading = false;
	
	
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
	

	function createRow(item){
		var row = Ti.UI.createTableViewRow({
			backgroundColor: 'transparent',
			selectedBackgroundColor : '#fff',
			height : 100,
			className : 'datarow',
			clickName : 'row',
			item: item
		});
		
		var container = Ti.UI.createView({
			layout:'vertical',
			top:10,
			left: 90,
			width: Ti.UI.SIZE
		});
		
		var photo  = Ti.UI.createView({
			backgroundImage : '/images/misc/wellness.png',
			top:10,
			left:10,
			width:64,
			height:64,
			clickName:'photo'
		});		
		row.add(photo);
		
		var memberinfo = item.MemberId + ' - ' + item.FullName;

		var recinfo = Ti.UI.createLabel({
			font:{fontSize:14,fontWeight:'bold', fontFamily:'Arial'},
			left:'1%',
			clickName:'product',
			text:memberinfo
		});

		container.add(recinfo);

		var regdate = Ti.UI.createLabel({
			//color:'white',
			font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial'},
			left:'1%',
			clickName:'regdate',
			text:'Date Registered : ' + item.EntryDate
		});
		container.add(regdate);
		
		var wing = Ti.UI.createLabel({
			font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial'},
			left:'1%',
			clickName:'wing',
			text:'Position : ' + item.Wing
		});
		container.add(wing);
		
		var category = Ti.UI.createLabel({
			font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial'},
			left:'1%',
			clickName:'category',
			text:'Category/Type : ' + item.ActivationCategory+'/'+item.ActivationType
		});
		container.add(category);
		
		var sponsorinfo = item.SponsorId + ' - ' + item.SponsorName;
		var sponsor = Ti.UI.createLabel({
			font:{fontSize:12,fontWeight:'normal', fontFamily:'Arial'},
			left:'1%',
			clickName:'category',
			text:'Sponsor : ' + sponsorinfo
		});
		container.add(sponsor);
		
		row.add(container);
		
		row.storeItem = item;
        	
		return row;
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
		font: {fontSize:11, fontWeight:'bold'},
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
	tableView.headerPullView = tableHeader;
	
	var lastDistance = 0;
	var lastRow = 0;
	var pulling = false;
	var reloading = false;
	var pagenum = 1;
	
	function beginReloading(){
		pagenum=1;
		reloadData(pagenum, false);
		tableView.setContentInsets({top:0}, {animated:true});
		reloading = false;
		lastUpdatedLabel.text = "Last Updated: "+ formatDate();
		statusLabel.text = "Pull down to refresh...";
		actInd.hide();
		arrow.show();
	}
	
	function beginScrollReload(){
		reloading = true;
		//navActInd.show();
		pagenum+=1;
		tableView.appendRow(loadingRow);
		
		reloadData(pagenum, true);	
	}
	
	
	tableView.addEventListener('scroll', function(e){
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
	
	
	});
	
	tableView.addEventListener('dragend',function(e){
		if(pulling && !reloading){
			reloading = true;
			pulling = false;
			arrow.hide();
			actInd.show();
			statusLabel.text = "Reloading";
			tableView.setContentInsets({top:60},{animated:true});
			arrow.transform = Ti.UI.create2DMatrix();
			beginReloading();
		}
	});
	
	
	function reloadData(pageno, isscroll){
		var emptydata = [];
		if(pageno == 1){
			emptydata.push(createLoadingRow(40));
			tableView.setData(emptydata);
		}
		var url = urlroot+'GetRecruitments/';
		var data;
		var xhr = Ti.Network.createHTTPClient({
			onload: function(){
				reloading = false;
				data = JSON.parse(this.responseText);
				
				if(isscroll == true){
					tableView.deleteRow(tableView.data[0].rowCount-1, {animationStyle:Ti.UI.iPhone.RowAnimationStyle.NONE});					
				}
				else 
				{
					emptydata = [];
					tableView.setData(emptydata);
				}
				lastRow+=data.length;
				for(var i=0; i<data.length;i++){
					tableView.appendRow(createRow(data[i]));
				}	
				if(isscroll == true){
					//tableView.scrollToIndex(lastRow-(data.length-1), {animated:true, position:Ti.UI.iPhone.TableViewScrollPosition.BOTTOM});
					//navActInd.hide();
				}
				//for(var i=0; i < data.length; i++){
					//tableView.appendRow(createRow(data[i]));
				//}
			},
			onerror: function(e){
				alert(e.error);
			}
		});
		xhr.open('GET', url);
		var rdata = {id : selectedMemberId, pagenum:pageno};
		xhr.send(rdata);
		addUserSession(function(e){},function(e){});
	}
	
	var selectedMemberId = Ti.App.Properties.getString('memberId'); //'00000001';
	var infoid = Ti.App.Properties.getString('infoId');//103197;//for debugging purposes only
	//getAccountBalance(infoid, accountBalanceHandler);
	
	function updateAccountCombo(){
		var adata = [];
		var data = [];
		data =  data.concat(accountList);//JSON.parse(this.responseText);
		for(var i=0; i<data.length; i++){
			var item = data[i];
			var prow = Ti.UI.createPickerRow();
			var label = Ti.UI.createLabel({
				text:item.MemberId,
				font:{fontSize:16,fontWeight:'bold'},
				width:'auto',
				height:'auto'
			});
			prow.label = prow.value = item.MemberId;
			prow.add(label);
			adata.push(prow);
		}
		
		var accountCombo = createComboBox(100,{fontSize:12, fontWeight:'bold'},'Select a User Id', adata, selectionChangedHandler);
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
	
	self.add(tableView);
	reloadData(pagenum);
	return self;
	
}
module.exports = Recruitments;
