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

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("selection");

    console.log("Query parameter value:", myParam);

    // Element selectors
    // price locations
    const itemAmountDiv = document.querySelectorAll('.order-summary-item--amount'); // this is 2 divs with subtotals - will change with radio selection
    const termDescriptions = document.querySelectorAll('.term-description'); // this is 3 divs with term descriptions - will change with radio selection


    // plan name locations - set on page load
    const mainTitle = document.querySelector('.service-terms--header h2');
    const itemizedTitle = document.querySelector('.order-summary-item--name');

    // radio will change these
    const itemDescription = document.querySelector('.order-summary-item--description');




    switch (myParam) {
        case 'free':
            if (itemAmountDiv[0]) itemAmountDiv[0].innerText = '$0';
            if (itemAmountDiv[1]) itemAmountDiv[1].innerText = '$0';
            mainTitle.innerText = 'Free';
            itemizedTitle.innerText = 'Free';
            break;
        case 'personal':
            // Code for option2
            mainTitle.innerText = 'Personal';
            itemizedTitle.innerText = 'Personal';
            showTermSelections();
            break;
        case 'professional':
            // Code for option3
            mainTitle.innerText = 'Professional';
            itemizedTitle.innerText = 'Professional';
            showTermSelections();
            break;
        case 'performance':
            // Code for option4
            mainTitle.innerText = 'Performance';
            itemizedTitle.innerText = 'Performance';
            showTermSelections();
            break;
        default: // default to free
            if (itemAmountDiv[0]) itemAmountDiv[0].innerText = '$0';
            if (itemAmountDiv[1]) itemAmountDiv[1].innerText = '$0';
            mainTitle.innerText = 'Free';
            itemizedTitle.innerText = 'Free';
            break;
    }

    setTermDescriptions();
});

function showTermSelections() {
    const termSelections = document.querySelectorAll('.service-terms--body');
    termSelections.forEach(function(element) {
        element.style.display = "block";
    });
}


// on radio click and on load
function setTermDescriptions(){
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("selection");

    console.log("Query parameter value:", myParam);
    if (myParam !== 'personal' && myParam !== 'professional' && myParam !== 'performance') return;

    const termDescriptions = document.querySelectorAll('.term-description');

    console.log('termDescriptions', termDescriptions);
    termDescriptions[0].innerText = '$' + priceDictionary[myParam].opt1.price + '.00 x 1 month';
    termDescriptions[1].innerText = '$' + priceDictionary[myParam].opt2.price + '.00 x 12 months';
    termDescriptions[2].innerText = '$' + priceDictionary[myParam].opt3.price + '.00 x 24 months';

    // set the savings divs
    const termItems = document.querySelectorAll('.service-terms--item');
    termItems.forEach((item, index) => {
        const savingsValue = priceDictionary[myParam]['opt' + (index + 1)].savings;
        const savingsContainer = item.querySelector('.term-savings');
        if (savingsContainer && savingsContainer.firstElementChild) {
            savingsContainer.firstElementChild.innerText = savingsValue ? 'SAVE $' + savingsValue : '';
        }
    });
}