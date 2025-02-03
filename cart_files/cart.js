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
const selectionParam = urlParams.get("selection");

document.addEventListener("DOMContentLoaded", function() {

    console.log("Query parameter value:", selectionParam);

    // Element selectors
    // price locations
    const itemAmountDiv = document.querySelectorAll('.order-summary-item--amount'); // this is 2 divs with subtotals - will change with radio selection

    // plan name locations - set on page load
    const mainTitle = document.querySelector('.service-terms--header h2');
    const itemizedTitle = document.querySelector('.order-summary-item--name');

    switch (selectionParam) {
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

    // add event listener for radio buttons
    document.querySelectorAll('input[name="term-selection"]').forEach(radio => {
        radio.addEventListener('change', () => {
          const termLength = radio.dataset.termLength;
          updateOrderSummary(termLength, selectionParam);
        });
      });

      updateOrderSummary(1, selectionParam);
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
    const selectionParam = urlParams.get("selection");

    console.log("Query parameter value:", selectionParam);
    if (selectionParam !== 'personal' && selectionParam !== 'professional' && selectionParam !== 'performance') return;

    const termDescriptions = document.querySelectorAll('.term-description');

    console.log('termDescriptions', termDescriptions);
    termDescriptions[0].innerText = '$' + priceDictionary[selectionParam].opt1.price + '.00 x 1 month';
    termDescriptions[1].innerText = '$' + priceDictionary[selectionParam].opt2.price + '.00 x 12 months';
    termDescriptions[2].innerText = '$' + priceDictionary[selectionParam].opt3.price + '.00 x 24 months';

    // set the savings divs
    const termItems = document.querySelectorAll('.service-terms--item');
    termItems.forEach((item, index) => {
        const savingsValue = priceDictionary[selectionParam]['opt' + (index + 1)].savings;
        const savingsContainer = item.querySelector('.term-savings');
        if (savingsContainer && savingsContainer.firstElementChild) {
            savingsContainer.firstElementChild.innerText = savingsValue ? 'SAVE $' + savingsValue : '';
        }
    });
}

function updateOrderSummary(termLength, selection) {
    // Update your order summary amounts based on termLength
    console.log('Updating order summary for term length:', termLength);
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
  }

  let currentTermLength = '1';  // default term length

// Update term length when radio button changes
document.querySelectorAll('input[name="term-selection"]').forEach(radio => {
  radio.addEventListener('change', () => {
    currentTermLength = radio.dataset.termLength;
    updateOrderSummary(currentTermLength, currentSelection);
  });
});

// Override the checkout button click to include URL parameters
const checkoutButton = document.querySelector('[data-dd-action-name="Continue to checkout"]');
if (checkoutButton) {
  checkoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    const checkoutUrl = `checkout.html?selection=${encodeURIComponent(selectionParam)}&termLength=${encodeURIComponent(currentTermLength)}`;
    location.replace(checkoutUrl);
  });
}
