const eco = {
	init(){
		this.log(ln());
		var dev = (window.location.host.indexOf('dev-') != -1 ? true : false);

		// je créer mon loader qui va appeler eco.displayHome() quand tout les composants seront chargé
		var waitress = waitLoader(eco.displayHome);

		// je charge mon composant qui permet de charger le nombre de signalement
		ecoApi.requireJS('/js/assets/homeNumber'+(dev ? '' : '.min')+'.js', waitress.addStepClosure());
	},
	displayHome(){
		eco.log(ln());
		var id = {
			homeNumberContainer   :   ecoApi.guid(),
			btnSignalement        :   ecoApi.guid(),
			btnEnlevement         :   ecoApi.guid(),
		};
		$('main').html(
			'<div class="container">'+
				'<div class="row">'+
					'<div id="'+id.homeNumberContainer+'" class="col-md-12 text-center"></div>'+
					'<div class="col-md-12 text-center">'+
						'<a href="signalement.php" id="'+id.btnSignalement+'">btnSignalement</a>'+
					'</div>'+
					'<div class="col-md-12 text-center">'+
						'<a href="#" id="'+id.btnEnlevement+'">btnEnlevement</a>'+
					'</div>'+
				'</div>'+
			'</div>'
		);

		$('#'+id.homeNumberContainer).append(homeNumber.init());
		$('#'+id.btnSignalement).click(eco.loadSignalement);
		$('#'+id.btnEnlevement).click(eco.loadEnlevement);
	},
	loadSignalement(){
		eco.log(ln());
		ecoApi.requireJS('/js/assets/signalement'+(dev ? '' : '.min')+'.js', waitress.addStepClosure());
	},
	loadEnlevement(){
		eco.log(ln());
	},
	/*********************************/
	/***           LOG             ***/
	/*********************************/
		log: function(...args){
			if (window.location.host.indexOf('dev-') != -1){
				if (!isNaN(parseInt(args[0]))) {
					args[0] = "eco.js : line " + args[0] + ' | eco.'+this.log.caller.name+'()';
				}
				console.log.apply(console, args);
			};
		},
		info: function(...args){
			if (window.location.host.indexOf('dev-') != -1){
				if (!isNaN(parseInt(args[0]))) {
					args[0] = "eco.js : line " + args[0] + ' | eco.'+this.info.caller.name+'()';
				}
				console.info.apply(console, args);
			};
		},
		warn: function(...args){
			if (window.location.host.indexOf('dev-') != -1){
				if (!isNaN(parseInt(args[0]))) {
					args[0] = "eco.js : line " + args[0] + ' | eco.'+this.warn.caller.name+'()';
				}
				console.warn.apply(console, args);
			};
		}
};
