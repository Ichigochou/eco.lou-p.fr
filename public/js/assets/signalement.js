$("#btnSignalement").on('click',function(){
	$.ajax({
		type: 'GET',
		url: 'contant.php?param=signalement',
		success: function(data){
			$('#signalement').html(data);

		},
		error: function(){
			alert('erreur de requete');
		}
	});
});
