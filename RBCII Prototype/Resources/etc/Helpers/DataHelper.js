/**
 * @author Royale Dev
 */

var royaledb = 'RoyaleDB';

var urlroot = 'https://royaledirectsales.com/rosv2/Titanium/';

//Local Database connection
//init local database
function initLocalDB(){
	var db = Ti.Database.open(royaledb);
	if(Ti.Platform.osname != 'android')
		db.file.setRemoteBackup(false);
	db.execute('CREATE TABLE IF NOT EXISTS myaccounts(id INTEGER PRIMARY KEY, accountName TEXT, fullName TEXT, infoId TEXT, username TEXT, password TEXT);');
	//db.execute('DELETE FROM myaccounts');
	db.close();
	Ti.API.info(royaledb +' is initialized');
}

//retrieve locally stored accounts
function getMyAccounts(){
	var result = [];
	var db = Ti.Database.open(royaledb);
	var myaccounts = db.execute('SELECT id, accountName, fullName, infoId, username, password FROM myaccounts');
	while(myaccounts.isValidRow()){
		var account = {
			Id : myaccounts.fieldByName('id'),
			AccountName : myaccounts.fieldByName('accountName'),
			FullName : myaccounts.fieldByName('fullName'),
			InfoId : myaccounts.fieldByName('infoId'),
			UserName : myaccounts.fieldByName('username'),
			Password : myaccounts.fieldByName('password')	
		};
		result.push(account);
		myaccounts.next();
	}
	myaccounts.close();
	db.close();
	return result;
}

//add new account to local db
function addNewAccount(account){
	var db = Ti.Database.open(royaledb);
	db.execute('INSERT INTO myaccounts(accountName, fullName, infoId, username, password) VALUES (?,?,?,?,?)', account.AccountName, account.FullName, account.InfoId, account.UserName, account.Password);
	var rowId = db.lastInsertRowId;
	db.close();
	return rowId;
}

//update an account in local db
function updateMyAccount(account){
	var db = Ti.Database.open(royaledb);
	Ti.API.info('accoutnName: '+account.AccountName+'  username:'+account.UserName+'  id:'+account.Id);
	db.execute('UPDATE myaccounts SET accountName = ?, username = ?, password = ? WHERE id = ?', account.AccountName, account.UserName, account.Password, account.Id);
	db.close();
	return true;
}

//delete an account in local db
function removeMyAccount(accountId){
	var db = Ti.Database.open(royaledb);
	db.execute('DELETE FROM myaccounts WHERE id = ?', accountId);
	db.close();
	return true;
}






//validate account login info from rbcii server
function validateLogin(account, onloadHandler, errorHandler){
	var url = urlroot+'ValidateLogin/';
		var data;
		var xhr = Ti.Network.createHTTPClient({
			onload: onloadHandler,
			onerror: errorHandler
		});
		xhr.open('GET', url, true);
		var data = {id : account.UserName, id2: account.Password};
		Ti.API.info('username: '+data.id +'  password: '+data.id2);
		xhr.send(data);
		
}

//add a user session in rbcii server
function addUserSession(onloadHandler, errorHandler){
	var url = urlroot+'AddSession/';
		var data;
		var xhr = Ti.Network.createHTTPClient({
			onload: onloadHandler,
			onerror: errorHandler
		});
		xhr.open('GET', url, true);
		
		var memberid = Ti.App.Properties.getString('memberId');
		var fullName = Ti.App.Properties.getString('fullName');
		
		var deviceId = Ti.Platform.id;
		var user = '['+Ti.Platform.osname.toUpperCase()+'] ' + memberid +' - ' + fullName;
		var data = {id : deviceId, ruser: user};
		xhr.send(data);
}

//update user session in rbcii server
function updateUserSession(sessionId, onloadHandler, errorHandler){
	var url = urlroot+'UpdateSession/';
		var data;
		var xhr = Ti.Network.createHTTPClient({
			onload: onloadHandler,
			onerror: errorHandler
		});
		xhr.open('GET', url, true);

		var data = {id : sessionId};
		xhr.send(data);
}

function updateSession(){
	var sessionid = Ti.App.Properties.getString('sessionId');
	updateUserSession(sessionid,
		function(e){}, function(e){});
}


function getAccountBalance(infoid, onloadHandler, errorHandler){
	infoid = Ti.App.Properties.getString('infoId');
	var result = [];
	var url = urlroot+'GetAccountBalance/';
		var data;
		var xhr = Ti.Network.createHTTPClient({
			onload: onloadHandler,
			onerror: errorHandler != null ? errorHandler : function(e){
				alert(e.error);
			}
		});
		xhr.open('GET', url, true);
		var usrid = {id : infoid};
		xhr.send(usrid);
		Ti.API.info('retrieving account balance...');
}
