/**
 * @author Royale Dev
 */

function Font11Normal(){
	return {fontSize : 11, fontWeight: 'normal'};
}

function Font11Bold(){
	return {fontSize : 11, fontWeight: 'Bold'};
}

function Font12Normal(){
	return {fontSize : 12, fontWeight: 'normal'};
}

function Font12Bold(){
	return {fontSize : 12, fontWeight: 'Bold'};
}

function Font14Normal(){
	return {fontSize : 14, fontWeight: 'normal'};
}

function Font14Bold(){
	return {fontSize : 14, fontWeight: 'bold'};
}

function Font16Normal(){
	return {fontSize: 16, fontWeight: 'normal'};
}

function Font16Bold(){
	return {fontSize: 16, fontWeight: 'bold'};
}

function GetFont(size, weight){
	return {fontSize: size, fontWeight: weight};
}

function AddCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
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