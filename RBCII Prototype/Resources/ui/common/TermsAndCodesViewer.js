/**
 * @author Royale Dev
 */
function TermsAndCodesViewer(parent){
	Ti.include('etc/Helpers/ViewHelper.js');
	
	var termurl = "https://royaledirectsales.com/m_term.aspx";
	var codeurl = 'https://royaledirectsales.com/m_codesofconduct.aspx';
	var termAgreed = false;
	
	var self = Ti.UI.createWindow({
		backgroundColor: 'white',
		navBarHidden: false
	});
	
	var container = Ti.UI.createView({
		layout: 'vertical'
	});
	
	webview = Ti.UI.createWebView({
		//scalesPageToFit : true,
		height : '90%'
	});
	
	var agreebtn = createButton(null,10,150,'Agree');
	
	agreebtn.addEventListener('click', function(e){
		if(!termAgreed){
			termAgreed = true;
			reloadView(codeurl);
		}
		else{
			var memberid = Ti.App.Properties.getString('memberId');
			var date = new Date();
			var datestr = String.formatDate(date) + " " + String.formatTime(date) + ' (Manila Time).';
			showMessage('Terms Acceptance','You have accepted our Terms and Conditions and Codes of Ethics on '+datestr+'\nWe have saved this info in our database for future legal reference.');
			var url = urlroot + 'AcceptTermsAndCodesOfEthics/';
			var data;
			var xhr = Ti.Network.createHTTPClient({
				onload: function(e){
					self.close();
				},
				onerror: function(e){
					showMessage("Data Error", e.error);
				}
			});
			xhr.open('GET', url, true);
			var data = {id : memberid};
			xhr.send(data);
		}
	});
	
  	function reloadView(url){
  		webview.setUrl(url);
  	}
  
  	container.add(webview);
  	container.add(agreebtn);
  
  	self.add(container);
	reloadView(termurl);
	return self;
}
module.exports = TermsAndCodesViewer;
