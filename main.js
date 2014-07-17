var cargoLoad = 3000;
var weightCounter = 0;
var waterContributionCount = 0;
var mealsContributionCount = 0;
var fuelContributionCount = 0;

var waterNeeded = 0;
var mealsNeeded = 0;
var fuelNeeded = 0;

var waterWeight = 0;
var mealsWeight = 0;
var fuelWeight = 0;

var supplyArray = [];
var orgsArray = [];

var Supply = function (type, qty, weight){

	this.type = type
	this.qty = qty
	this.weight = weight
};

var contributionArray= [];

validSupplyTypes = ['fuel','meals', 'water'];

// OBJECT-ORGANIZATION
var Organization = function(name, waterContributed, mealsContributed, fuelContributed){
		this.name = name
		this.waterContributed = waterContributed
		this.mealsContributed = mealsContributed
		this.fuelContributed = fuelContributed
	};



var ContributionInput = function(org, sType, qty1){

	this.org = org
	this.sType = sType
	this.qty = qty1

};


var contributionStatus = function($icon, needed, contributions){
	if(contributions/needed<=0.5){
		$icon.addClass('red')
	} 

	else if(contributions/needed<0.8 && contributions/needed>0.5){
		$icon.removeClass('red')
		$icon.addClass('redYellow')
	}
	else if(contributions/needed<1.00 && contributions/needed>=0.8){
		$icon.removeClass('red')
		$icon.removeClass('redYellow')
		$icon.addClass('yellowGreen')

	}

	else if(contributions/needed>=1.00){
		$icon.removeClass('red')
		$icon.removeClass('redYellow')
		$icon.removeClass('yellowGreen')
		$icon.addClass('green')

	}
}

$(document).on('ready', function() {


// MANAGER MODE BUTTON INTERACTION

$('.btn-manager').click(function(){
	$('.btn-needed-supply').show()
	$('.btn-contributed-supply').hide()
	$('.btn-supplyContributors').show()
});

// CONTRIBUTION MODE BUTTON INTERACTION

$('.btn-contributor').click(function(){
	$('.btn-needed-supply').hide()
	$('.btn-contributed-supply').show()
	$('.supply-status').show()
	$('.btn-supplyContributors').hide()
	$('.orgMetrics').hide()
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
	$('#supply-form').remove()

	// PUTS THE DROPDOWN VALUES BACK IN THE LIST

	$('#supplyType').append('<option class="bottles">Bottles of Water</option>')
		
	$('#supplyType').append('<option class="meals1">Meals</option>')
		
	$('#supplyType').append('<option class="liters1">Liters of Fuel</option>')
		


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


// SUPPLY FORM SUBMIT BUTTON INTERACTION

$(document).on('click', '.form-submit', function(){
	$('.plane').remove()
	$('.supply-status').show()
	var name = $('#supplyType').val()
	console.log(name)
	weightCounter += $('#inputWeight').val() * $('#inputQuantity').val()
	console.log(weightCounter)

	// CREATES THE APPLICABLE SUPPLY ICON

	if(name === 'Bottles of Water'){
		waterNeeded = $('#inputQuantity').val()
		waterWeight = $('#inputWeight').val()
		console.log(waterNeeded)
	}
	else if(name === 'Liters of Fuel'){

			fuelNeeded = $('#inputQuantity').val()
			fuelWeight = $('#inputWeight').val()
	}
	else if (name === 'Meals'){
			mealsNeeded = $('#inputQuantity').val()
			mealsWeight = $('#inputWeight').val()
		}

	$('#inputQuantity').val('')
	$('#inputWeight').val('')
	$('.suppliesRequested').empty();
	$('.contContainer').empty();

	if (fuelNeeded){
		$('.suppliesRequested').append('<div class=" icons col-lg-3 text-center fuel" data-type="fuel" data-qty='+fuelNeeded+' data-weight='+fuelWeight+'><p class="icon-text">' + fuelNeeded+ '  Liters of Fuel</p><button type="button" class="btn btn-supplies-needed btn-fuel btn-default btn-lg"><span class="glyphicon glyphicon-tint liters"></span><p class="remove"> x </p></button><p class="contributionsText">'+fuelContributionCount+' Total Contributions</p></div>');

		$('.contContainer').append('<div class=" icons col-lg-2 text-center fuel" data-type="fuel" data-qty='+fuelNeeded+' data-weight='+fuelWeight+'><p class="icon-text">Liters of Fuel</p><button type="button" class="btn btn-supplies-needed btn-fuel btn-default btn-lg"><span class="glyphicon glyphicon-tint liters"></span></button></div>');

			$('.liters1').remove()
	}
	if (mealsNeeded){
		$('.suppliesRequested').append('<div  class=" icons col-lg-3 text-center meals" data-type="meal" data-qty='+mealsNeeded+' data-weight='+mealsWeight+'><p class="icon-text">' + mealsNeeded + ' Meals</p><button type="button" class="btn btn-supplies-needed btn-meals btn-default btn-lg"><span class="glyphicon glyphicon-cutlery"></span><p class="remove"> x </p></button><p class="contributionsText">'+mealsContributionCount+' Total Contributions</p></div>');

		$('.contContainer').append('<div  class=" icons col-lg-2 text-center meals" data-type="meal" data-qty='+mealsNeeded+' data-weight='+mealsWeight+'><p class="icon-text">Meals</p><button type="button" class="btn btn-supplies-needed btn-meals btn-default btn-lg"><span class="glyphicon glyphicon-cutlery"></span></button></div>');

			$('.meals1').remove()
	}
	if (waterNeeded){
		$('.suppliesRequested').append('<div class=" icons col-lg-3 text-center water" data-type="water" data-qty='+waterNeeded+' data-weight='+waterWeight+'><p class="icon-text">' +waterNeeded + ' Bottles of Water</p><button type="button" class="btn btn-supplies-needed btn-water btn-default btn-lg"><span class="glyphicon glyphicon-tint"></span><p class="remove"> x </p></button><p class="contributionsText">'+waterContributionCount+' Total Contributions</p> </div>');

		$('.contContainer').append('<div class=" icons col-lg-2 text-center water" data-type="water" data-qty='+waterNeeded+' data-weight='+waterWeight+'><p class="icon-text"> Bottles of Water</p><button type="button" class="btn btn-supplies-needed btn-water btn-default btn-lg"><span class="glyphicon glyphicon-tint"></span></button> </div>');

			// REMOVES THE VALUE FROM THE DROPDOWN
			$('.bottles').remove()	
	}

	
	
	
	


	// CREATES THE PLANE ICON WITH TEXT
	if(weightCounter >= cargoLoad){
		var planeLoad = Math.floor(weightCounter / cargoLoad) 
		$('.supply-status').append('<div class=" icons col-lg-3 text-center plane"><button type="button" class="btn btn-supplies-needed btn-default btn-lg"><span class="glyphicon glyphicon-plane"></span></button><p class="icon-text plane-text">' +planeLoad + ' Flights Required</p></div>');


		console.log(planeLoad)

		}



	return false;


});


// ACTIVATES THE CONTRIBUTORS METRIC DASHBOARD

$(document).on('click', '.btn-supplyContributors', function(){
	$('.orgMetrics').toggle()
});


// CONTRIBUTION FORM SUBMIT BUTTON INTERACTION

$(document).on('click', '.form-submit1', function(e){
	e.preventDefault()
	
var org = $('#inputOrg').val()
var sType = $('#supplyType').val()
	console.log(name)
var qty1 = +$('#inputQuantity1').val()
	$('#inputQuantity1').val('')
	console.log(qty1)
// var weight1 = $('#inputWeight1').val()
// 	$('#inputWeight1').val('')
// 	console.log(weight1)

// LOOKS FOR THE NAME OF THE ORG THAT WAS JUST SUBMITTED VIA THE CONTRIBUTION FORM	
var organization = {};

if(_.where(orgsArray,{name:org}).length){
	organization = _.where(orgsArray,{name:org})[0];

}

else{
	var organization = new Organization(org, 0, 0, 0)

	orgsArray.push(organization);
}


// ADDS THE CONTRIBUTION VALUE TO THE ICON CONTRIBUTION TEXT
	if(sType ==='Bottles of Water'){
		organization.waterContributed += qty1;
		waterContributionCount += +qty1;
		$('.water .contributionsText').text((waterContributionCount    + ' Total Contributions'));
		$icon = $('.btn-water')
		contributionStatus($icon,waterNeeded,waterContributionCount);

		
	}

	else if(sType ==='Liters of Fuel'){
		organization.fuelContributed += qty1;
		fuelContributionCount += +qty1;
		$('.fuel .contributionsText').text((fuelContributionCount    + ' Total Contributions'));
		$icon = $('.btn-fuel')
		contributionStatus($icon,fuelNeeded,fuelContributionCount);

		
	}

	else if(sType ==='Meals'){
		organization.mealsContributed += qty1;
		mealsContributionCount += +qty1;
		$('.meals .contributionsText').text((mealsContributionCount    + ' Total Contributions'));
		$icon = $('.btn-meals')
		contributionStatus($icon,mealsNeeded,mealsContributionCount);

		
	}


	console.log(weightCounter)
	$('.orgContribution').empty();
	for(var i=0; i<orgsArray.length; i++){
		var totalCont = orgsArray[i].waterContributed + orgsArray[i].fuelContributed + orgsArray[i].mealsContributed

		var someDiv =  $('<div class="row contStats"></div>')
		$(someDiv).append('<div class="col-lg-2 orgName">'+orgsArray[i].name+'</div>')
		$(someDiv).append('<div class="col-lg-2 contTotal">'+totalCont+'</div>')

		if(fuelNeeded){
		$(someDiv).append('<div class="col-lg-2 qtyfuel qtyText">'+orgsArray[i].fuelContributed+'</div>'

		)};

		if(mealsNeeded){
		$(someDiv).append('<div class="col-lg-2 qtyMeals qtyText">'+orgsArray[i].mealsContributed+'</div>'
		)};

		if(waterNeeded){
		$(someDiv).append('<div class="col-lg-2 qtyWater qtyText">'+orgsArray[i].waterContributed+'</div>'
		)};
			
		$('.orgContribution').append(someDiv)

		if(i%2){
			someDiv.css({
				'background-color': 'lightblue',
				});
		}

	}
		





});

// WHEN IN MANAGER MODE REMOVES THE ICON, ADDS THE VALUE BACK TO THE DROPDOWN, HIDES THE STATUS DASHBOARD IF IT IS EMPTY
$(document).on('click', '.remove', function(){
	$('.plane').remove()
	var icon = $(this).closest(".icons").attr('data-type')
	if(icon === 'water'){
	$('#supplyType').append('<option class="bottles">Bottles of Water</option>')
	 waterNeeded = 0;	
	}

	else if (icon === 'meal'){
		$('#supplyType').append('<option class="meals1">Meals</option>')
		mealsNeeded = 0;
	}

	else if (icon === 'fuel'){
		$('#supplyType').append('<option class="liters1">Liters of Fuel</option>')
		
		fuelNeeded = 0;
	}


// REMOVES THE SUPPLY QUANTITY FROM THE GLOBAL QTY AND WEIGHT COUNTER & THE PLANE ICON IF APPLICABLE
	var removeQuantity = $(this).closest('.icons').attr('data-qty')
	var removeWeight = $(this).closest('.icons').attr('data-weight')
	$(this).closest('.icons').remove()
	console.log(removeQuantity, removeWeight)
	weightCounter -= removeQuantity * removeWeight;

	if(weightCounter >= cargoLoad){
	var planeLoad = Math.floor(weightCounter / cargoLoad) 
	$('.supply-status').append('<div class=" icons col-lg-3 text-center plane"><button type="button" class="btn btn-supplies-needed btn-default btn-lg"><span class="glyphicon glyphicon-plane"></span></button><p class="icon-text">' +planeLoad + ' Flights Required</p></div>');
	console.log(planeLoad)


	}	

	if( $('.suppliesRequested').children().length <1){
		console.log('r')
			$('.supply-status').hide()

	}

	});
  
});