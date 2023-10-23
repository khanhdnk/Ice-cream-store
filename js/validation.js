// Registration form validation 
function registrationValidation(){
    var uname = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var genm = document.getElementById("male").checked;
    var gemf = document.getElementById("female").checked;
    var genother = document.getElementById("other").checked;
    var email = document.getElementById("email").value;
    var rating = document.getElementById("rating").value;
    var coffeeTypesArray = document.getElementById("icetypes").getElementsByTagName("input");
    var errMsg = "";
    var result = true;
    var pattern9Char = /^(?=.{9,})/;

    // Checking the data 
    if (uname == ""){
        errMsg += "You must enter your username\n";
    }
    if ((password == "") || (!password.match(pattern9Char))){
		errMsg += "You must enter your password that contains at least 9 characters.\n";
	}
    if (!genm && !gemf && !genother){
        errMsg += "You must choose your gender!\n";
    }
    if (email == ""){
        errMsg += "You must enter your email\n";
    }
    
    errMsg += "You must select your ice cream\n";
    for(var i=0; i < coffeeTypesArray.length; i++){
        if (coffeeTypesArray[i].checked){
            errMsg = errMsg.replace("You must select your ice cream\n", "");
            break;
        }
    }
    
    if (rating == "none"){
        errMsg += "You need to select your rating\n";
    }
    // Alert if there is does not meet requirement
    if (errMsg != "") {
		alert(errMsg);
		result = false;
	}
    return result;
}

// Order form validation 
function orderValidation(){
    var deliOption = document.getElementById("delivery-option").value;
    var deliAddress = document.getElementById("delivery-address").value;
    var sameAsDeli = document.getElementById("sameas").checked;
    var billAddress = document.getElementById("billing-address").value;
    var contactNumber = document.getElementById("contact-number").value;
    var emailReceipt = document.getElementById("email-receipt").value;
    var payMethod = document.getElementById("pay-option").value;
    var credittypes = document.getElementById("credittypes").value;
    var creditCard = document.getElementById("credit-card-info").value;
    var postcode = document.getElementById("postcode").value;

    var errMsg = "";
    var result = true;
    var pattern4Dig = /^\d{4}$/;
    var patternCreditCard = "";

    // Adaptive Credit Card Length 
    if ((credittypes == "visa") || (credittypes == "mastercard")){
        patternCreditCard = "^\\d{16}$";
    }else if (credittypes == "american_express"){
        patternCreditCard = "^\\d{15}$";
    }
    
    // Checking the data 
    if (deliOption == "none"){
        errMsg += "You must choose delivery or pickup.\n";
    }
    if ((deliOption == "delivery") && (deliAddress == "")){
        errMsg += "You must enter your delivery address.\n";
    }
    if (billAddress == ""){
        errMsg += "You must enter your billing address.\n";
    }
    if (contactNumber == ""){
        errMsg += "You must enter your contact number.\n";
    }
    if (emailReceipt == ""){
        errMsg += "You must enter your email for reciept.\n";
    }
    if (payMethod == "none"){
        errMsg += "You must select Pay on Pickup or Online.\n";
    }
    if ((payMethod == "online") && (credittypes == "none")){
        errMsg += "You must choose your type of credit cards.\n"
    }
    if ((payMethod == "online") && (creditCard == "")){
        errMsg += "You must enter your credit card information.\n";
    }
    if ((payMethod == "online") && (!creditCard.match(patternCreditCard))){
        errMsg += "You must enter the right type of your credit card!\n"
        alert("You did not enter the right type of your credit card.\n");
    }
    if ((postcode == "") || (!postcode.match(pattern4Dig))){
        errMsg += "You must enter your postcode that has 4 digits.\n";
    }
    
    // Alert if there is does not meet requirement
    if (errMsg != "") {
		alert(errMsg);
		result = false;
	}
    return result;


}

// Automatic Input of Billing Address and auto enable other input fields 
function enableWhenChoose(){
    var deliOption = document.getElementById("delivery-option");
    var deliAddress = document.getElementById("delivery-address");
    var sameAsDeli = document.getElementById("sameas");
    var billAddress = document.getElementById("billing-address");
    var payMethod = document.getElementById("pay-option");
    var credittypes = document.getElementById("credittypes");
    var creditCard = document.getElementById("credit-card-info");


    // delivery or pickup 
    deliOption.addEventListener("change", function() {
        if (deliOption.value == "delivery") {
            deliAddress.disabled = false;
            sameAsDeli.disabled = false;
        } else {
            deliAddress.disabled = true;
            sameAsDeli.disabled = true;
            sameAsDeli.checked = false;

        }
    });
    
    // auto fill delivery address 
    sameAsDeli.addEventListener("change", function() {
        if ((sameAsDeli.checked == true) && (deliAddress.value != "")){
            billAddress.value = deliAddress.value;
        }else if ((deliAddress.value == "")){
            alert("Please enter your delivery address first.\n");
            sameAsDeli.checked = false;
        }
    })

    // pay online and credit card 
    payMethod.addEventListener("change", function(){
        if (payMethod.value == "online"){
            creditCard.disabled = false;
            credittypes.disabled = false;

        }else {
            creditCard.disabled = true;
            credittypes.disabled = true;
        }
    })

}


function init(){
    var secondpage = document.getElementById("secondform");
    var firstpage = document.getElementById("firstform");
    if (firstpage != null){
        firstpage.onsubmit = registrationValidation;
    }
    if (secondpage != null){
        enableWhenChoose(); 
        secondpage.onsubmit = orderValidation;
    }
}

window.onload = init;