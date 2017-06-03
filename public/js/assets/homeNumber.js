const homeNumber = {
	init(){
		// création du composant
		homeNumber.block = $('<p>Nombre de signalement = <span>Chargement ...</span></p>');
		homeNumber.block.data('nbSignalement', false);
		homeNumber.block.attr('id', ecoApi.guid());
		ecoApi.get('nbSignalement', function (response){
			if (response !== false) {
				response = response[0];
				homeNumber.block.find('span').html(response.nbSignalement);
				homeNumber.block.data('nbSignalement', response.nbSignalement);
			} else {
				homeNumber.block.html('Erreur lors du chargement azdabelfibl');
			}
		});
		return homeNumber.block;
	},
};
