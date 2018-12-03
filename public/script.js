

window.onload = function(){
	var state = document.getElementById("state");
	if(state){
		state.value = "";
	}
}




function selectCity(state,city){
	
     
    var state = document.getElementById(state);
    var city = document.getElementById(city);
	
    city.innerHTML = "Select City";
    
	if(state.value == "fruits"){
		var optionArray = ["|","Banana|Banana","Apple|Apple","Cherry|Cherry","Grape|Grape","Orange|Orange","Melon|Melon", "Blackberries|Blackberries","Blackcurrant|Blackcurrant","Kiwi|Kiwi","Pineapple|Pineapple"];
	} 

	else if(state.value == "vegetables"){
		var optionArray = ["|","Carrot boiled|Carrot boiled","Broccoli|Broccoli","Cabbage boiled|Cabbage boiled","Cauliflower|Cauliflower","Cucumber|Cucumber","Onion|Onion","Spinach|Spinach","Mushrooms boiled|Mushrooms boiled","Lettuce|Lettuce","Leek boiled|Leek boiled"];
	}
	else if(state.value == "breadsandcereals")
	{
		var optionArray = ["|","Bagel|Bagel","Jaffa cake|Jaffa cake","Bread white|Bread white","Bread wholemeal|Bread wholemeal","Cornflakes|Cornflakes","Macaroni boiled|Macaroni boiled","Pasta|Pasta","Porridge oats|Porridge oats","Muesli|Muesli","Crumpets|Crumpets"];
	}

	else if(state.value == "meatsandfish")
	{
		var optionArray = ["|","Beef roast|Beef roast","Chicken|Chicken","Bacon average fried|Bacon average fried","Bacon average grilled|Bacon average grilled","Crab fresh|Crab fresh","Duck roast|Duck roast","Fish cake|Fish cake","Fish fingers|Fish fingers","Gammon|Gammon","Ham|Ham","Lamb roast|Lamb roast"];
	}

	else if(state.value == "milkanddairy"){
		var optionArray = ["|","Cheese average|Cheese average","Cottage Cheese|Cottage Cheese","Custard|Custard","Eggs|Eggs","Ice cream|Ice cream","Milk whole|Milk whole", "Milk semi skimmed|Milk semi skimmed","Milk Soy|Milk Soy","Mousse flavored|Mousse flavored","Yogurt natural|Yogurt natural"];
	} 
	else if(state.value == "fatsandsugars"){
		var optionArray = ["|","Butter|Butter","Chocolate|Chocolate","Cod liver oil|Cod liver oil","Corn snack|Corn snack","Honey|Honey","Jam|Jam", "Popcorn average|Popcorn average","Syrup|Syrup","Sugar white|Sugar white","Lard|Lard"];
	} 
    
    for(var option in optionArray){
		var pair = optionArray[option].split("|");
		var newOption = document.createElement("option");
		//console.log(pair);
		newOption.value = pair[0];
		newOption.innerHTML = pair[1];
		city.options.add(newOption);
	}

}
function gohere(){
	var statee = document.getElementById("state");
	var citt = document.getElementById("city");
	if(statee.value == "" && citt.value == ""){
		statee.style.boxShadow = "1px 1px 11px #FF0000";
		citt.style.boxShadow = "1px 1px 11px #FF0000";
	}

	else if(statee.value == ""){
		statee.style.boxShadow = "1px 1px 11px #FF0000";
	}

	else if(citt.value == ""){
		citt.style.boxShadow = "1px 1px 11px #FF0000";
	}
}
function searchRestaurant(state, city, cuisine){

}

