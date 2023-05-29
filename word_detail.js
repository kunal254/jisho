let  base_address = localStorage.getItem("base_address");

function updateBaseAddress(){
	base_address = window.prompt("Please enter the domain", localStorage.getItem("base_address"))
	localStorage.setItem("base_address", base_address);
	location.reload();
}

$(document).ready(function(){

    var urlParams = new URLSearchParams(window.location.search);

    $.get(`https://${base_address}/api/${urlParams.get("id")}/getWord`, function(data, status){
        $(".back-btn").click(function(){
			window.open(`./words.html?id=${data.collection.id}`, '_self')
		})
        $("#word").val(data.word)
        $("#definition").text(data.definition)
        $("#count_value").val(data.noOfSearch)
    })

    $(".save-word").click(function(){
        $.ajax({
			url: `https://${base_address}/api/${urlParams.get("id")}/editWord`,
			type: 'PUT',
			contentType: "application/json",
			data: JSON.stringify({
				word: $("#word").val(),
				definition: $("#definition").val(),
                count: $("#count").is(":checked") ? parseInt($("#count_value").val()) + 1 : $("#count_value").val()
			}),
			dataType: 'json',
			success: function(data){
				location.reload();
			}
	
		});
    })
	
});