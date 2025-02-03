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
    const selectionTitle = document.querySelector('.order-summary-item--name');

    selectionTitle.innerText = selection.charAt(0).toUpperCase() + selection.slice(1);

    var perString = '';
    var itemSummary = 'For your site Ignorant Money Club <br> ';
    var basePrice = 0;
    if(selection === 'free') {
        itemAmountDivs[0].innerText = '$0';
        itemAmountDivs[1].innerText = '$0';
        itemDescription.innerText = '';
        return;
    }
    if(termLength === '1') {
        perString = ' /mo';
        itemSummary += '1 month';
        basePrice = priceDictionary[selection].opt1.price;
    } else if(termLength === '12') {
        perString = ' /yr';
        itemSummary += '1 year';
        basePrice = priceDictionary[selection].opt2.price;
    } else if(termLength === '24') {
        perString = '<br>for 2 years';
        itemSummary += '2 years';
        basePrice = priceDictionary[selection].opt3.price;
    }
    const price = '$' + basePrice * termLength + '.00';
    itemAmountDivs[0].innerHTML = price + perString;
    itemAmountDivs[1].innerText = price;

    itemDescription.innerHTML = itemSummary;
    
});