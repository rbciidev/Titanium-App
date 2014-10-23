function ProductsUI(parent){
	Ti.include('etc/Helpers/ViewHelper.js');
	
	var data = [];
	var isize = 180;
	var iheight = 180;
	//spirulina
	var spritem = createDashboardViewItem('/images/products/large/spirulina.png',isize,iheight,'spr');
	data.push(spritem);
	
	//prime
	var prmitem = createDashboardViewItem('/images/products/large/prime.png',isize,iheight,'prm');
	data.push(prmitem);
	
	//lgluta power
	var lglitem = createDashboardViewItem('/images/products/large/lgluta.png',isize,iheight,'lgl');
	data.push(lglitem);
	
	//lgluta 700
	var lgl7item = createDashboardViewItem('/images/products/large/lgluta700.png',isize,iheight,'lg7');
	data.push(lgl7item);
	
	
	//pinkish glow
	var pnkitem = createDashboardViewItem('/images/products/large/pinkishglow.png',isize,iheight,'pnk');
	data.push(pnkitem);
	
	//royale-c
	var rylcitem = createDashboardViewItem('/images/products/large/royale-c-bottle.png',isize-60,iheight,'rylc');
	data.push(rylcitem);
	
	//fiberich
	var fbritem = createDashboardViewItem('/images/products/large/fiberich.png',isize,iheight,'fbr');
	data.push(fbritem);
	
	//diabetwatch
	var dbtitem = createDashboardViewItem('/images/products/large/diabetwatch.png',isize,iheight,'dbt');
	data.push(dbtitem);
	
	//royale grapeseed
	var grpitem = createDashboardViewItem('/images/products/large/grapeseed.png',isize,iheight,'grp');
	data.push(grpitem);
	
	//fitshape
	var fititem = createDashboardViewItem('/images/products/large/fitshape.png',isize,iheight,'fit');
	data.push(fititem);
	
	//riqall
	var riqitem = createDashboardViewItem('/images/products/large/riqall.png',isize,iheight,'riq');
	data.push(riqitem);
	
	//performax
	var maxitem = createDashboardViewItem('/images/products/large/performax.png',isize,iheight,'max');
	data.push(maxitem);
	
	//royale blend coffee regular
	var regitem = createDashboardViewItem('/images/products/large/coffee_reg.png',isize,iheight,'reg');
	data.push(regitem);
	
	//royale blend coffee lite
	var lteitem = createDashboardViewItem('/images/products/large/coffee_lite.png',isize,iheight,'lte');
	data.push(lteitem);
	
	//choco all8
	var choitem = createDashboardViewItem('/images/products/large/choco.png',isize,iheight,'cho');
	data.push(choitem);
	
	//corn beverage
	var crnitem = createDashboardViewItem('/images/products/large/corn.png',isize,iheight,'crn');
	data.push(crnitem);
	
	//richarge
	var ricitem = createDashboardViewItem('/images/products/large/richarge.png',isize,iheight,'ric');
	data.push(ricitem);
	
	//pinkish glow brightening & smoothening cream
	var pcritem = createDashboardViewItem('/images/products/large/pinkishcream.png',isize+60,iheight+60,'pcr');
	data.push(pcritem);
	
	//pinkish glow toner
	var tonitem = createDashboardViewItem('/images/products/large/pinkishtoner.png',isize,iheight,'ton');
	data.push(tonitem);
	
	//kojic papaya soap
	var kojitem = createDashboardViewItem('/images/products/large/kojicsoap.png',isize,iheight,'koj');
	data.push(kojitem);
	
	//Royale Beauty Lipstick
	var lipitem = createDashboardViewItem('/images/products/large/lipstick.png',isize,iheight,'lip');
	data.push(lipitem);
	
	//L-Gluta Power Whitening and Smoothening Cream
	var gcritem = createDashboardViewItem('/images/products/large/glutaWHITENINGcream.png',isize,iheight,'gcr');
	data.push(gcritem);
	
	//L-Gluta Power Line Corrector Cream
	var gccitem = createDashboardViewItem('/images/products/large/glutaANTIageingCREAM.png',isize,iheight,'gcc');
	data.push(gccitem);
	
	//L-Gluta Power Lightening Lotion
	var gllitem = createDashboardViewItem('/images/products/large/glutaLIGHTENINGlotion.png',isize,iheight,'gll');
	data.push(gllitem);
	
	//L-Gluta Power Anti-Ageing soap
	var aasitem = createDashboardViewItem('/images/products/large/glutaPOWERantiAGEING.png',isize,iheight,'aas');
	data.push(aasitem);
	
	//L-Gluta Power soap
	var sopitem = createDashboardViewItem('/images/products/large/glutasoap.png',isize,iheight,'sop');
	data.push(sopitem);
	
	//L'Opulent Jeune
	var jeuitem = createDashboardViewItem('/images/products/large/jeune.png',isize-90,iheight,'jeu');
	data.push(jeuitem);
	
	//L'Opulent Lumiere
	var lumitem = createDashboardViewItem('/images/products/large/lumiere.png',isize-90,iheight,'lum');
	data.push(lumitem);
	
	//L'Opulent Meilleur
	var meiitem = createDashboardViewItem('/images/products/large/lumiere.png',isize-90,iheight,'mei');
	data.push(meiitem);
	
	//L'Opulent rejuv
	var juvitem = createDashboardViewItem('/images/products/large/rejuv.png',isize-90,iheight,'juv');
	data.push(juvitem);
	
	//L'Opulent Deodorant
	var deoitem = createDashboardViewItem('/images/products/large/glutadeo.png',isize,iheight,'deo');
	data.push(deoitem);

	
	var dashboard = Titanium.UI.createDashboardView({
		backgroundImage: '/images/background.png',
		data:data
	});
	
	
	dashboard.addEventListener('click', function(e){		
		if(e.item.label == 'spr'){
			SOAForm = require('ui/common/SOAForm');
			var soaForm = new SOAForm();
			parent.containingTab.open(soaForm,{adnimated:true});
		}
	});
	
	return dashboard;
}
module.exports = ProductsUI;

