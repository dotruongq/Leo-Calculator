



$( "input ,select").change(function() {
	var plan = parseFloat($('select').val())
	var estloan = parseFloat($('#estloan').val())
	var term = parseFloat($('#term').val())
	var recert = parseFloat($('#recert').val())
	var servicer = parseFloat($('#servicer').val())
	var interest = parseFloat($('#interest').val())
	var cus_pay = parseFloat($('#cus_pay').val())



	var forgive = (estloan- (((servicer+recert)*term)+plan))*100/estloan

	var p = estloan
	var r = (interest/100)/12
	var t = standardterm(estloan)
	var A = (p*r*Math.pow(1+r,t)) / (Math.pow(1+(r),t) - 1 )

	var hidden_term = findterm(cus_pay,p,r)

	console.log(p)
	console.log(r)
	console.log(t)
	console.log(A)
	console.log(hidden_term)

  	$('#result_loan').text(adddollarsign(estloan.toFixed(2).toLocaleString()))

	$('#result_loanI').text(adddollarsign((A*t).toFixed(2).toLocaleString())  + ' as ' + '$'+A.toFixed(2)+ ' / ' + t + ' terms')

 	$('#result_repayment').text(adddollarsign((((servicer+recert)*term)+plan).toFixed(2).toLocaleString()))

	$('#result_forgive').text(adddollarsign((estloan- (((servicer+recert)*term)+plan)   ).toFixed(2).toLocaleString()))


	$('#result_forgive_p').text(addpercentsign((forgive).toFixed(2).toLocaleString()))


	$('#result_cus_pay_term').text(((hidden_term).toFixed(2)) + ' months')


	$('#result_cus_pay_total').text(adddollarsign((hidden_term*cus_pay).toFixed(2)) + ' as ' + '$'+cus_pay.toFixed(2)+ ' / ' + (hidden_term).toFixed(2) + ' terms')


});

function adddollarsign(somestring){
	return '$'+somestring;
}

function addpercentsign(somestring){
	return somestring+' %';
}

function standardterm(some){
	var d = {
		7499:120,
		9999:144,
		19999:180,
		39999:240,
		59999:300,
		100000000:360
	}

	for(var key in d)
	{
	    if(some <= key)
	    	return d[key]
	}
}
 

function findterm(A,P,r){

 	return ( Math.log(A/(A-(P*r)))  / Math.log(1+r))
}