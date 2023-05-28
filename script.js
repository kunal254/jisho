let  base_address = localStorage.getItem("base_address");

function updateBaseAddress(){
	base_address = window.prompt("Please enter the domain", localStorage.getItem("base_address"))
	localStorage.setItem("base_address", base_address);
	location.reload();
}

$(document).ready(function(){
	$.get(`http://${base_address}/api/getAllCollection`, function(data, status){
		for(let collection of data){
			$(".collection-list")
			.append(`<li class="list-group-item" onclick="window.open('./words.html?id=${collection.id}', '_self')">${collection.name}</li>`)
		}
	});

	$(".addCollection-btn").click(function(){
		$.ajax({
			url: `http://${base_address}/api/addCollection`,
			type: 'POST',
			contentType: "application/json",
			data: JSON.stringify({
				collectionName: $("#collection_name").val(),
			}),
			dataType: 'json',
			success: function(data){
				location.reload();
			}
	
		});
	});
});