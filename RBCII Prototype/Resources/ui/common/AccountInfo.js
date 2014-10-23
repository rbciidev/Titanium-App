/**
 * @author Royale Developer
 */
function AccountInfo() {
	// current window
	var win1 = Titanium.UI.createWindow({
		title: 'Account Information'
	});
	
	var win2 = Ti.UI.createWindow({
		title: 'Basic Information'
	});
	
	var win3 = Ti.UI.createWindow({
		title: 'Bank Information'
	});
	
	//var tab = Titanium.UI.createTab({
		//title: 'Account Information'
	//});
	
	win1.open({
		transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
	});
	
	var backgroundImage = '/images/mainmenu/bg_login.png';
	win1.backgroundImage = backgroundImage;
	win2.backgroundImage = backgroundImage;
	win3.backgroundImage = backgroundImage;
	
	var view1 = Ti.UI.createView();
	var view2 = Ti.UI.createView();
	var view3 = Ti.UI.createView();
	
	var btnNext1 = Ti.UI.createButton({
		title: 'Next',
		top:370,
		right:10,
		width:100,
		height:35
	});
	
	btnNext1.addEventListener('click', function(e){
		win3.close();
		win2.close();
		win2.open({
			transition: Ti.UI.iPhone.AnimationStyle.CURL_UP
		});
	});

	var btnPrevious1 = Ti.UI.createButton({
		title: 'Close',
		top:370,
		left:10,
		width:100,
		height:35
	});
	
	btnPrevious1.addEventListener('click', function(e){
		win3.close();
		win2.close();
		win1.close({
			transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
		});
	});
	
	var btnNext2 = Ti.UI.createButton({
		title: 'Next',
		top:535,
		right:10,
		width:100,
		height:35
	});
	
	btnNext2.addEventListener('click', function(e){
		win1.close();
		win3.close();
		win3.open({
			transition: Ti.UI.iPhone.AnimationStyle.CURL_UP
		});
	});

	var btnPrevious2 = Ti.UI.createButton({
		title: 'Previous',
		top:535,
		left:10,
		width:100,
		height:35
	});
	
	btnPrevious2.addEventListener('click', function(e){
		win3.close();
		win1.close();
		win1.open({
			transition: Ti.UI.iPhone.AnimationStyle.CURL_DOWN
		});
	});
	
	var btnNext3 = Ti.UI.createButton({
		title: 'Close',
		top:240,
		right:10,
		width:100,
		height:35
	});
	
	btnNext3.addEventListener('click', function(e){
		win1.close();
		win2.close();
		win3.close({
			transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
		});
	});

	var btnPrevious3 = Ti.UI.createButton({
		title: 'Previous',
		top:240,
		left:10,
		width:100,
		height:35
	});
	
	btnPrevious3.addEventListener('click', function(e){
		win1.close();
		win2.close();
		win2.open({
			transition: Ti.UI.iPhone.AnimationStyle.CURL_DOWN
		});
	});
	
	view1.add(btnNext1);
	view1.add(btnPrevious1);
	view2.add(btnNext2);
	view2.add(btnPrevious2);
	view3.add(btnNext3);
	view3.add(btnPrevious3);
	
	win1.rightNavButton = btnNext1;
	win1.leftNavButton = btnPrevious1;
	
	win1.add(view1);
	win2.add(view2);
	win3.add(view3);
	
	win1.open();

	//win.barColor = '#13386c';

	//
	//  CREATE FIELD ONE
	//
		
	var userNameLabel = Titanium.UI.createLabel({
		color:'#000',
		text:'Username',
		top:75,
		left:30,
		width:250,
		height:'auto'
	});
	
	win1.add(userNameLabel);
	
	var userNameField = Titanium.UI.createLabel({
		color:'#000',
		text:'RBCII',
		top:100,
		left:30,
		width:250,
		height:'auto'
	});
	
	win1.add(userNameField);
	
	var passwordLabel = Titanium.UI.createLabel({
		color:'#000',
		text:'Password',
		top:140,
		left:30,
		width:250,
		height:'auto'
	});
	
	win1.add(passwordLabel);
	
	var passwordField = Titanium.UI.createTextField({
		hintText:'Enter Password',
		passwordMask:true,
		height:35,
		top:165,
		left:30,
		width:250,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	win1.add(passwordField);
	
	var accountIDLabel = Titanium.UI.createLabel({
		color:'#000',
		text: 'Account ID',
		top:205,
		left:30,
		width:250,
		height:'auto'
	});
	
	win1.add(accountIDLabel);
	
	var accountIDField = Titanium.UI.createLabel({
		color:'#000',
		text: '00000001',
		top:230,
		left:30,
		width:250,
		height:'auto'
	});
	
	win1.add(accountIDField);
	
	var registerDateLabel = Titanium.UI.createLabel({
		color:'#000',
		text:'Registration Date',
		top:270,
		left:30,
		width:250,
		height:'auto'
	});
	
	win1.add(registerDateLabel);
	
	var registerDateField = Titanium.UI.createLabel({
		color:'#000',
		text:'January 29, 2006',
		top:295,
		left:30,
		width:250,
		height:'auto'
	});
	
	win1.add(registerDateField);
	
	var firstNameLabel = Titanium.UI.createLabel({
		color:'#000',
		text:'First Name',
		top:75,
		left:30,
		width:250,
		height:'auto'
	});
	
	win2.add(firstNameLabel);
	
	var firstNameField = Titanium.UI.createLabel({
		color:'#000',
		text:'Royale',
		top:100,
		left:30,
		width:250,
		height:'auto'
	});
	
	win2.add(firstNameField);
	
	var middleNameLabel = Titanium.UI.createLabel({
		color:'#000',
		text:'Middle name',
		top:140,
		left:30,
		width:250,
		height:'auto'
	});
	
	win2.add(middleNameLabel);
	
	var middleNameField = Titanium.UI.createLabel({
		color:'#000',
		text:'Business',
		height:'auto',
		top:165,
		left:30,
		width:250
	});
	
	win2.add(middleNameField);
	
	var lastNameLabel = Titanium.UI.createLabel({
		color:'#000',
		text: 'Last Name',
		top:205,
		left:30,
		width:250,
		height:'auto'
	});
	
	win2.add(lastNameLabel);
	
	var lastNameField = Titanium.UI.createLabel({
		color:'#000',
		text: 'Club',
		top:230,
		left:30,
		width:250,
		height:'auto'
	});
	
	win2.add(lastNameField);
	
	var birthdDateLabel = Titanium.UI.createLabel({
		color:'#000',
		text:'Date of Birth',
		top:270,
		left:30,
		width:250,
		height:'auto'
	});
	
	win2.add(birthdDateLabel);
	
	var birthDateField = Titanium.UI.createLabel({
		color:'#000',
		text:'January 29, 2006',
		top:295,
		left:30,
		width:250,
		height:'auto'
	});
	
	win2.add(birthDateField);
	
	var addressLabel = Titanium.UI.createLabel({
		color:'#000',
		text:'Address',
		top:335,
		left:30,
		width:250,
		height:'auto'
	});
	
	win2.add(addressLabel);
	
	var addressField = Titanium.UI.createTextArea({
		hintText:'Enter Address',
		text:'Quezon Ave. West Trianlge, Quezon City',
		height:100,
		top:360,
		left:30,
		width:'50%',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	win2.add(addressField);
	
	
	var bankNameLabel = Titanium.UI.createLabel({
		color:'#000',
		text:'Bank Name',
		top:75,
		left:30,
		width:250,
		height:'auto'
	});
	
	win3.add(bankNameLabel);
	
	var bankNameField = Titanium.UI.createTextField({
		hintText:'Enter Bank Name',
		text:'Royale',
		top:100,
		left:30,
		width:250,
		height:35,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	win3.add(bankNameField);
	
	var bankAccountLabel = Titanium.UI.createLabel({
		color:'#000',
		text:'Bank Account No.',
		top:140,
		left:30,
		width:250,
		height:'auto'
	});
	
	win3.add(bankAccountLabel);
	
	var bankAccountField = Titanium.UI.createTextField({
		hintText:'Enter Bank Account No.',
		text:'000000123456',
		height:35,
		top:165,
		left:30,
		width:250,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	win3.add(bankAccountField);
	
	/*
	var birthdayLabel = Titanium.UI.createLabel({
		color:'#000',
		text: 'Birthday',
		top:195,
		left:30,
		width:100,
		height:'auto'
	});
	win.add(birthdayLabel);
	
	var minDate = new Date();
	minDate.setFullYear(2009);
	minDate.setMonth(0);
	minDate.setDate(1);
	
	var maxDate = new Date();
	maxDate.setFullYear(2009);
	maxDate.setMonth(11);
	maxDate.setDate(31);
	
	var value = new Date();
	value.setFullYear(2009);
	value.setMonth(0);
	value.setDate(1);
	
	var birthday = Ti.UI.createPicker({
		type:Ti.UI.PICKER_TYPE_DATE,
		minDate:minDate,
		maxDate:maxDate,
		value:value,
		top: 195,
		left: 130
	});
	
	win.add(birthday);
	*/
	
	
	//var save = Titanium.UI.createButton({
		//title:'Save my Information',
		//top:500,
		//left:30,
		//height:30,
		//width:250
	//});
	//win.add(save);
	
	//save.addEventListener('click',function(){
		//win.close();
	//});
	
/*	//
	//  CREATE INFO MESSAGE
	//
	var messageView = Titanium.UI.createView({
		bottom:10,
		backgroundColor:'#111',
		height:40,
		width:270,
		borderRadius:10
	});
	
	var messageLabel = Titanium.UI.createLabel({
		color:'#fff',
		text:'Register for a free toaster!',
		height:'auto',
		width:'auto',
		textAlign:'center'
	});
	
	messageView.add(messageLabel);
	
	win.add(messageView);
	*/
	
	
	return win1;

};

module.exports = AccountInfo;
