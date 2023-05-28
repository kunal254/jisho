let  base_address = localStorage.getItem("base_address");

function updateBaseAddress(){
	base_address = window.prompt("Please enter the domain", localStorage.getItem("base_address"))
	localStorage.setItem("base_address", base_address);
	location.reload();
}

$(document).ready(function(){

	var urlParams = new URLSearchParams(window.location.search);
	$.get(`http://${base_address}/api/${urlParams.get("id")}/getWords`, function(data, status){
		$("h5").text(data[0].collection.name)
		for(let item of data){
			$(".collection-list")
			.append(`<li class="list-group-item d-flex justify-content-between" onclick="window.open('./word_detail.html?id=${item.id}', '_self')">
					<div>${item.word}</div>
					<span class="badge bg-primary rounded-pill">${item.noOfSearch}</span>
					</li>`)
		}
	});

	

	$(".addWord-btn").click(function(){
		$.ajax({
			url: `http://${base_address}/api/${urlParams.get("id")}/addWord`,
			type: 'POST',
			contentType: "application/json",
			data: JSON.stringify({
				word: $("#word").val(),
				definition: $("#definition").val()
			}),
			dataType: 'json',
			success: function(data){
				location.reload();
			}
	
		});
	});

});