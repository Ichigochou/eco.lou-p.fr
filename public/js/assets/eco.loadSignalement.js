function initViewEnlevement(){
	var geocodeAddress = function(geocoder, resultsMap) {
		var address = document.getElementById('address').value;
		geocoder.geocode({'address': address}, function(results, status) {
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
};

$('#btnSignalement').click(function(){
	$('#signalement').load('signalement',function(){
		alert('Blablabla');
	});

});

$(".demande").on('submit',function(){

	$.post('/demande_post', {
		taille: $("#taille").val(),
		poid: $('#poid').val(),
	}, function(data, textStatus, xhr) {
		console.log(textStatus);
		console.log(data);
		if(msg==1) /* si la connexion en php a fonctionnée */
		{
			$("div#connexion").html("<span id=\"confirmMsg\">Vous &ecirc;tes maintenant connect&eacute;.</span>");
			/* on désactive l'affichage du formulaire et on affiche un message de bienvenue à la place */
		}
		else /* si la connexion en php n'a pas fonctionnée */
		{
			$("span#erreur").html("<img src=\"bomb.png\" style=\"float:left;\" />&nbsp;Erreur lors de la connexion, veuillez v&eacute;rifier votre login et votre mot de passe.");
			/* on affiche un message d'erreur dans le span prévu à cet effet */
		}
	});
});
