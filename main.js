var cargoLoad = 3000;
var weightCounter = 0;

var supplyArray = [];

var SupplyInput = function (name, qty, weight){

	this.name = name
	this.qty = qty
	this.weight = weight
};

$(document).on('ready', function() {


// MANAGER MODE BUTTON INTERACTION

$('.btn-manager').click(function(){
	$('.btn-needed-supply').show()
	$('.btn-contributed-supply').hide()
});

// CONTRIBUTION MODE BUTTON INTERACTION

$('.btn-contributor').click(function(){
	$('.btn-needed-supply').hide()
	$('.btn-contributed-supply').show()
	$('.supply-status').show()
});

// CREATE SUPPLY BUTTON INTERACTION

$('.btn-needed-supply').click(function(){
	$('#supply-form').show()
	$('.btn-needed-supply').hide()
});

// PROVIDE CONTRIBUTION BUTTON INTERACTION

$('.btn-contributed-supply').click(function(){
	$('#contribution-form').show()
	$('.btn-contributed-supply').hide()

});


// SUPPLY FORM CANCEL BUTTON INTERACTION

$('.form-cancel').click(function(e){
	e.preventDefault()
	$('#supply-form').hide()
	$('.btn-needed-supply').show()

});

// CONTRIBUTION FORM CANCEL BUTTON INTERACTION

$('.form-cancel1').click(function(e){
	e.preventDefault()
	$('#contribution-form').hide()
	$('.btn-contributed-supply').show()

});


$(document).on('click', '.form-submit', function(){
	$('.plane').remove()
	$('.supply-status').show()
	var name = $('#supplyType').val()
	console.log(name)
	var qty = $('#inputQuantity').val()
	$('#inputQuantity').val('')
	console.log(qty)
	var weight = $('#inputWeight').val()
	$('#inputWeight').val('')
	console.log(weight)
	weightCounter += weight * qty;
	console.log(weightCounter)


	if(name === 'Bottles of Water'){
		$('.supply-status').append('<div class=" icons col-lg-3 text-center water" data-type="water" data-qty='+qty+' data-weight='+weight+'><button type="button" class="btn btn-supplies-needed btn-default btn-lg"><span class="glyphicon glyphicon-tint"></span><p class="remove"> x </p> </button><p class="icon-text">' +qty + ' Bottles of Water <br> Needed Every 30 Days</p></div>');

			$('.bottles').remove()	
	}

	else if(name === 'Liters of Fuel'){
		$('.supply-status').append('<div class=" icons col-lg-3 text-center" data-type="fuel" data-qty='+qty+' data-weight='+weight+'><button type="button" class="btn btn-supplies-needed btn-default btn-lg"><span class="glyphicon glyphicon-tint liters"></span><p class="remove"> x </p></button><p class="icon-text">' + qty+ '  Liters of Fuel <br> Needed Every 30 Days</p></div>');

			$('.liters1').remove()
	}

	else if (name === 'Meals'){
		$('.supply-status').append('<div  class=" icons col-lg-3 text-center meals" data-type="meal" data-qty='+qty+' data-weight='+weight+'><button type="button" class="btn btn-supplies-needed btn-default btn-lg"><span class="glyphicon glyphicon-cutlery"></span><p class="remove"> x </p></button><p class="icon-text">' + qty + ' Meals <br> Needed Every 30 Days</p></div>');

			$('.meals1').remove()
	
	}


	if(weightCounter >= cargoLoad){
		var planeLoad = Math.floor(weightCounter / cargoLoad) 
		$('.supply-status').append('<div class=" icons col-lg-3 text-center plane"><button type="button" class="btn btn-supplies-needed btn-default btn-lg"><span class="glyphicon glyphicon-plane"></span></button><p class="icon-text">' +planeLoad + ' Flights Required <br> Every 30 Days</p></div>');
		console.log(planeLoad)

		}



	return false;


});

$(document).on('click', '.remove', function(){
	$('.plane').remove()
	var icon = $(this).closest(".icons").attr('data-type')
	if(icon === 'water'){
	$('#supplyType').append('<option class="bottles">Bottles of Water</option>')
		
	}

	else if (icon === 'meal'){
		$('#supplyType').append('<option class="meals1">Meals</option>')
		
	}

	else if (icon === 'fuel'){
		$('#supplyType').append('<option class="liters1">Liters of Fuel</option>')
		
	}

	if( $('.supply-status').children().length <=2){

			$('.supply-status').hide()

	}


	




	var removeQuantity = $(this).closest('.icons').attr('data-qty')
	var removeWeight = $(this).closest('.icons').attr('data-weight')
	$(this).closest('.icons').remove()
	console.log(removeQuantity, removeWeight)
	weightCounter -= removeQuantity * removeWeight;

	if(weightCounter >= cargoLoad){
	var planeLoad = Math.floor(weightCounter / cargoLoad) 
	$('.supply-status').append('<div class=" icons col-lg-3 text-center plane"><button type="button" class="btn btn-supplies-needed btn-default btn-lg"><span class="glyphicon glyphicon-plane"></span></button><p class="icon-text">' +planeLoad + ' Flights Required <br> Every 30 days</p></div>');
	console.log(planeLoad)


	}	


	});
  
});