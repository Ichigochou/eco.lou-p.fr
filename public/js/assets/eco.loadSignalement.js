/*$("#btnSignalement").on('click',function(){
	$.ajax({
		type: 'GET',
		url: 'main.php?param=signalement',
		success: function(data){
			$('#signalement').html(data);

		},
		error: function(){
			alert('erreur de requete');
		}
	});
});
*/

$('#id.btnSignalement').click(function(){
$('#signalement').load('signalement',function(){
	alert('Blablabla');
});

});