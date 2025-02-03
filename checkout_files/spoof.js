const priceDictionary = {
    personal: {
        opt1: {price: 13, savings: null},
        opt2: {price: 10, savings: 36},
        opt3: {price: 9, savings: 96}
    },
    professional: {
        opt1: {price: 16, savings: null},
        opt2: {price: 12, savings: 48},
        opt3: {price: 10, savings: 144}
    },
    performance: {
        opt1: {price: 29, savings: null},
        opt2: {price: 26, savings: 36},
        opt3: {price: 22, savings: 168}
    }

}

const urlParams = new URLSearchParams(window.location.search);
const selection = urlParams.get("selection");
const termLength = urlParams.get("termLength");

document.addEventListener('DOMContentLoaded', function() {

    const itemAmountDivs = document.querySelectorAll('.order-summary-item--amount');
    const itemDescription = document.querySelector('.order-summary-item--description');

    var perString = '';
    var itemSummary = 'For your site Ignorant Money Club <br> ';
    if(termLength === '1') {
        perString = ' /mo';
        itemSummary += '1 month';
    } else if(termLength === '12') {
        perString = ' /yr';
        itemSummary += '1 year';
    } else if(termLength === '24') {
        perString = '<br>for 2 years';
        itemSummary += '2 years';
    }
    const price = '$' + priceDictionary[selection].opt1.price * termLength + '.00';
    itemAmountDivs[0].innerHTML = price + perString;
    itemAmountDivs[1].innerText = price;

    itemDescription.innerHTML = itemSummary;
    
});