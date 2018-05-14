// id = 'tt3896198';
	 
$(document).ready(function(){
	
	$("#result").hide();
	$("#result1").hide();
	$("#rating").hide();
	$("#IdSelect").hide();
	$("#TitleSelect").hide();
	
	$("#SearchSelect").change(function() {
		var val = $(this).val();
		console.log(val);
		if(val === "MovieTitle") {
			$("#TitleSelect").show();
			$("#IdSelect").hide();
			$("#search").submit(function(event){
				 event.preventDefault();
				  let value = $("#titleM").val();
				  let year = $("#Myear").val();
				  SearchUrl = 'https://www.omdbapi.com/?t='+value+'&y='+year+'&apikey=20e2fbeb';
				  getAllDetails();
			  });
	 
			
		}
		else if(val === "imdbId") {
			$("#IdSelect").show();
			$("#TitleSelect").hide();
			$("#search1").submit(function(event){
				event.preventDefault();
				  let value = $("#OmId").val();
				  SearchUrl = 'https://www.omdbapi.com/?i='+value+'&apikey=20e2fbeb';
				  getAllDetails();
			  });
		}
	  });
	  
	  
       
}); // end document.ready function

let getAllDetails = () => {

console.log("inside detais");
    // API call to get user details

    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
		
        url : SearchUrl,

        success: (response) => {

  
            console.log(response);
			console.log(SearchUrl);
			if(response.Response == "True"){
				$("#result").empty();
				$("#ratingList").empty();
				$("#result1").empty();
				let ratingV = [];
				let ratingS = [];
				let Rating = response.Ratings
				var tempList;
				for(let i=0;i<Rating.length;i++){	
				console.log("inside for");
					 tempList = `<li class="list-group-item">${Rating[i].Source} - ${Rating[i].Value}</li>`;	
					 console.log(tempList);
					 $("#ratingList").append(tempList);
					 $("#rating").show();
				 }
				 let tempRow = ` <div class="card" style="width: 18rem;">
										  <img class="card-img-top" src="${response.Poster}" onerror="this.src='Default.jpg'" alt="Card image cap">
										  <div class="card-body">
											<h5 class="card-title">Movie title</h5>
											<p class="card-text">${response.Title}</p>
										  </div>
										  <ul class="list-group list-group-flush">
											<li class="list-group-item">Actors : ${response.Actors}</li>
											<li class="list-group-item">Awards : ${response.Awards}</li>
											<li class="list-group-item">BoxOffice : ${response.BoxOffice}</li>
											<li class="list-group-item">Country : ${response.Country}</li>
											<li class="list-group-item">DVD : ${response.DVD}</li>
											<li class="list-group-item">Director : ${response.Director}</li>
											<li class="list-group-item">Genre : ${response.Genre}</li>
											<li class="list-group-item">Language : ${response.Language}</li>
											<li class="list-group-item">Metascore : ${response.Metascore}</li>
											<li class="list-group-item">Production : ${response.Production}</li>
											<li class="list-group-item">Rated : ${response.Rated}</li>
											<li class="list-group-item">Released : ${response.Released}</li>
											<li class="list-group-item">Response : ${response.Response}</li>
											<li class="list-group-item">Runtime : ${response.Runtime}</li>
											<li class="list-group-item">Type : ${response.Type}</li>
											<li class="list-group-item">Website : ${response.Website}</li>
											<li class="list-group-item">Writer : ${response.Writer}</li>
											<li class="list-group-item">Year : ${response.Year}</li>
											<li class="list-group-item">imdbID : ${response.imdbID}</li>
											<li class="list-group-item">imdbRating : ${response.imdbRating}</li>
											<li class="list-group-item">imdbVotes : ${response.imdbVotes}</li>
										  </ul>
									</div>`
				$("#result").append(tempRow);
				$("#result").show();
				}
			else{
				console.log(response.Error);
				$("#result1").html('<p>'+response.Error+'</p>');
				$("#result1").show();
				$("#result").hide();
				$("#rating").hide();
			}
        }, error: (err) => {

            console.log(err.responseJSON.error.message);
            alert(err.responseJSON.error.message)

        }

    });// end ajax call 

}