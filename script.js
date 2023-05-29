let  base_address = localStorage.getItem("base_address");

function updateBaseAddress(){
	base_address = window.prompt("Please enter the domain", localStorage.getItem("base_address"))
	localStorage.setItem("base_address", base_address);
	location.reload();
}

let onDelete = null;
$(document).ready(function(){
	$.get(`https://${base_address}/api/getAllCollection`, function(data, status){
		for(let collection of data){
			$(".collection-list")
			.append(`<li class="list-group-item d-flex justify-content-between" onclick="window.open('./words.html?id=${collection.id}', '_self')">
					${collection.name}
					<i class="material-icons text-danger" onclick="onDelete(${collection.id})">delete</i>
					</li>`)
		}
	});

	$(".addCollection-btn").click(function(){
		$.ajax({
			url: `https://${base_address}/api/addCollection`,
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

	onDelete = function(num){
		event.stopPropagation();
		if(window.confirm("are you sure?")){
			$.ajax({
				url: `https://${base_address}/api/${num}/deleteCollection`,
				type: 'DELETE',
				success: function(data){
					location.reload();
				}
		
			});
		}
	}

});