const eco = {
	init(){
		this.log(ln());
		var dev = (window.location.host.indexOf('dev-') != -1 ? true : false);

		// je créer mon loader qui va appeler eco.displayHome() quand tout les composants seront chargé
		var waitress = waitLoader(eco.displayHome);

		// je charge mon composant qui permet de charger le nombre de signalement
		ecoApi.requireJS('/js/assets/homeNumber'+(dev ? '' : '.min')+'.js', waitress.addStepClosure());
		//ecoApi.requireJS('/js/assets/eco.loadSignalement'+'.js');
		//ecoApi.requireJS('/js/assets/eco.loadEnlevement'+'.js');
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
						'<button id="'+id.btnSignalement+'">Signaler un emcombrant</button>'+
						'<div id="signalement"></div>'+
					'</div>'+
					'<div class="col-md-12 text-center">'+
						'<button id="'+id.btnEnlevement+'">Prendre un rendez-vous</button>'+
						'<div id="enlevement"></div>'+
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
		function initViewSignalement(){
			var geocodeAddress = function(geocoder, resultsMap) {
				var address = document.getElementById('adresse').value;
				geocoder.geocode({'adresse': address}, function(results, status) {
					if (status === 'OK') {
						resultsMap.setCenter(results[0].geometry.location);
						var marker = new google.maps.Marker({
							map: resultsMap,
							position: results[0].geometry.location
						});
					} else {
						alert('Geocode was not successful for the following reason: ' + status);
					}
				});
			};

			ecoApi.requireJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyBbflqxVw3bGNQudga69dcaMMuyDDjr1qY", function(){
				var map = new google.maps.Map(document.getElementById('map'), {
					zoom: 16,
					center: {lat: 44.8637065, lng: -0.6561808}
				});
				var geocoder = new google.maps.Geocoder();
				document.getElementById('submit').addEventListener('click', function() {
					geocodeAddress(geocoder, map);
				});
			});

			$("#saveSignalement").click(function(){
				console.info('#saveSignalement triggered');
				// @TODO vérifier que l'user est connecter
				// non -> connexion eco.loadLoginPage(callback)
				// oui -> enregistrement
				$.post('/demande_post', {
					taille: $("#taille").val(),
					poid: $('#poid').val(),
				}, function(data, textStatus, xhr) {
					console.info('textStatus = ', textStatus);
					console.info('data = ', data);
					if(data=="1") /* si la connexion en php a fonctionnée */
					{
						alert("Merci pour votre enlèvement");
						/* on désactive l'affichage du formulaire et on affiche un message de bienvenue à la place */
					}
					else /* si la connexion en php n'a pas fonctionnée */
					{
						alert("Erreur lors de l'enregistrement");
						/* on affiche un message d'erreur dans le span prévu à cet effet */
					}
					$('#signalement').remove();
				});
				return false;
			});
		};
		$('#signalement').load('signalement', initViewSignalement);
	},

	loadEnlevement(){
		eco.log(ln());
		function initViewEnlevement(){
			var geocodeAddress = function(geocoder, resultsMap) {
				var address = document.getElementById('adresse').value;
				geocoder.geocode({'adresse': address}, function(results, status) {
					if (status === 'OK') {
						resultsMap.setCenter(results[0].geometry.location);
						var marker = new google.maps.Marker({
							map: resultsMap,
							position: results[0].geometry.location
						});
					} else {
						alert('Geocode was not successful for the following reason: ' + status);
					}
				});
			};

			ecoApi.requireJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyBbflqxVw3bGNQudga69dcaMMuyDDjr1qY", function(){
				var map = new google.maps.Map(document.getElementById('map'), {
					zoom: 16,
					center: {lat: 44.8637065, lng: -0.6561808}
				});
				var geocoder = new google.maps.Geocoder();
				document.getElementById('submit').addEventListener('click', function() {
					geocodeAddress(geocoder, map);
				});
			});

			$("#saveEnlevement").click(function(){
				console.info('#saveEnlevement triggered');
				// @TODO vérifier que l'user est connecter
				// non -> connexion eco.loadLoginPage(callback)
				// oui -> enregistrement
				$.post('/demande_post', {
					taille: $("#taille").val(),
					poid: $('#poid').val(),
				}, function(data, textStatus, xhr) {
					console.info('textStatus = ', textStatus);
					console.info('data = ', data);
					if(data=="1") /* si la connexion en php a fonctionnée */
					{
						alert("Merci pour votre enlèvement");
						/* on désactive l'affichage du formulaire et on affiche un message de bienvenue à la place */
					}
					else /* si la connexion en php n'a pas fonctionnée */
					{
						alert("Erreur lors de l'enregistrement");
						/* on affiche un message d'erreur dans le span prévu à cet effet */
					}
					$('#enlevement').remove();
				});
				return false;
			});
		};
		$('#enlevement').load('enlevement', initViewEnlevement);
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
