var supplyArray = [];

var SupplyInput = function (name, weight, qty){

	this.name = name
	this.weight = weight
	this.qty = qty
};


$(document).on('ready', function() {

$('.btn-needed-supply').click(function(){
	$('.supply-status').show()
	$('#supply-form').show()
	$('.btn-needed-supply').hide()

});

$('.form-cancel').click(function(e){
	e.preventDefault()
	$('#supply-form').hide()
	$('.supply-status').show()
	$('.btn-needed-supply').show()

});

$(document).on('click', '.form-submit', function(e){
	var name = $('#supplyType').val()
	console.log(name)
	if(name === 'Bottles of Water'){
		$('.supply-status').append('<div class=" icons col-lg-4 text-center water"><button type="button" class="btn btn-supplies-needed btn-default btn-lg"><span class="glyphicon glyphicon-tint"></span></button><p class="icon-text">XX Bottles of Water <br> every 30 days</p></div>')


	}

	else if(name === '20 Person Tents'){
		$('.supply-status').append('<div class=" icons col-lg-4 text-center tents"><button type="button" class="btn btn-supplies-needed btn-default btn-lg"><span class="glyphicon glyphicon-home"></span></button><p class="icon-text">XX (20) Person Tents</p></div>')
	}

	else if (name === 'Meals'){
		$('.supply-status').append('<div  class=" icons col-lg-4 text-center meals"><button type="button" class="btn btn-supplies-needed btn-default btn-lg"><span class="glyphicon glyphicon-cutlery"></span></button><p class="icon-text">XX Meals <br> every 30 days</p></div>')
	
	}

	return false;

});

  
});