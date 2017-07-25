// retourne la ligne d'execution quand c'est possible
const ln = function() {
	var e = new Error();
	if (!e.stack) try {
		// IE requires the Error to actually be throw or else the Error's 'stack'
		// property is undefined.
		throw e;
	} catch (e) {
		if (!e.stack) {
			return 0; // IE < 10, likely
		}
	}
	var stack = e.stack.toString().split(/\r\n|\n/);
	// We want our caller's frame. It's index into |stack| depends on the
	// browser and browser version, so we need to search for the second frame:
	var frameRE = /:(\d+):(?:\d+)[^\d]*$/;
	do {
		var frame = stack.shift();
	} while (!frameRE.exec(frame) && stack.length);
	return frameRE.exec(stack.shift())[1];
};
const waitLoader = function(callback){
	return {
		step:0,
		addStep(n = 1){
			this.step+=n;
		},
		completeStep(n = 1){
			this.step-=n;
			if (this.step <= 0) {
				callback();
			}
		},
		addStepClosure(_callback = console.log){
			var _this = this;
			this.addStep();
			return function(...args){
				_callback.apply(args);
				_this.completeStep();
			};
		},
	};
};
const ecoApi = {
	/**
	 * permet de faire des SELECT en BDD
	 * @param request nom de la requete à executer
	 * @param data objet à passer en arrgument pour la requete
	 * @param callback fonction appelé lorsque l'appel est terminé, prend un seul argument, false si la requete à échoué, ou objet response si requete réussi
	 */
	get(request, data = {}, callback = ecoApi.log){
		this.log(ln());
		// on fait une requete post vers l'api
		// @TODO limiter la variable request
		// @TODO checker le contenu de data selon request
		var url = '/api/v1/get/'+request;
		$.post(url, data, function get_success(response) {
			ecoApi.log(ln(), response);
			// peut être pas besoin de parseJson si $.post s'en occupe
			callback(response);
		}, 'json')
		.fail(function get_fail() {
			ecoApi.warn(ln());
			callback(false);
		});
	},
	/**
	 * permet de faire des INSERT/UPDATE en BDD
	 * @param request nom de la requete à executer
	 * @param data objet à passer en arrgument pour la requete
	 * @param callback fonction appelé lorsque l'appel est terminé, prend un seul argument, false si la requete à échoué, ou objet response si requete réussi
	 */
	push(request, data, callback){
		this.log(ln());
		// on fait une requete post vers l'api
		// @TODO limiter la variable request
		// @TODO checker le contenu de data selon request
		$.post('/api/v1/push/'+request, data, function(response) {
			this.log(ln(), response);
			callback(response);
		}, 'json')
		.fail(function() {
			this.warn(ln(), response);
			callback(false);
		});
	},
	/**
	 * Permet de chercher un fichier js de façon dynamique
	 * @param url
	 * @param callback
	 */
	requireJS(url, callback){
		var scriptTag = document.createElement('script');
		scriptTag.src = url;

		scriptTag.onload = callback;
		scriptTag.onreadystatechange = callback;

		document.body.appendChild(scriptTag);
	},
	/**
	 * Permet d'utiliser JSON.parse sans bloqué l'execution des script si le json est malformé
	 * @param json chaine de caractère JSON
	 * @return false ou objet json traduit
	 */
	safelyParseJSON(json) {
		var parsed;
		try { parsed = JSON.parse(json) }
		catch (e) { console.warn('JSON.parse(json) failed') }
		return typeof parsed == 'undefined' ? false : parsed;
	},
	guid() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		s4() + '-' + s4() + s4() + s4();
	},
	/********************************************************************************/
	/***           LOG                                                            ***/
	/*** window.location.host.indexOf('dev-') -> si on est en dev, log, sinon non
	/*** usage exemple : this.log(ln(), 'blablabla') -> "ecoApi.js : line LIGNE | ecoApi.FONCTION(), blablabla"
	/********************************************************************************/
		log: function(...args){
			if (window.location.host.indexOf('dev-') != -1){
				if (!isNaN(parseInt(args[0]))) {
					args[0] = "ecoApi.js : line " + args[0] + ' | ecoApi.'+this.log.caller.name+'()';
				}
				console.log.apply(console, args);
			};
		},
		info: function(...args){
			if (window.location.host.indexOf('dev-') != -1){
				if (!isNaN(parseInt(args[0]))) {
					args[0] = "ecoApi.js : line " + args[0] + ' | ecoApi.'+this.info.caller.name+'()';
				}
				console.info.apply(console, args);
			};
		},
		warn: function(...args){
			if (window.location.host.indexOf('dev-') != -1){
				if (!isNaN(parseInt(args[0]))) {
					args[0] = "ecoApi.js : line " + args[0] + ' | ecoApi.'+this.warn.caller.name+'()';
				}
				console.warn.apply(console, args);
			};
		}
};
