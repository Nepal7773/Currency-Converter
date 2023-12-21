const dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('form button');
const fromCurr = document.querySelector('form .from select');
const toCurr = document.querySelector('form .to select');
const msg = document.querySelector('.msg');

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement('option');
        newOption.value = currCode;
        newOption.innerText = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = true;
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = true;
        }
        select.append(newOption);
    }
    select.addEventListener('change', (e) => {
        updateFlag(e.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newUrl = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let flagImg = element.parentElement.querySelector('img');
    flagImg.src = newUrl;
}

const updateExchangeRate = async () => {
    let amount = document.querySelector('.amount input');
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = 1;
    }

    // console.log(fromCurr.value, toCurr.value, amtVal);
    const URL = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];

    let finalAmt = (rate * amtVal).toFixed(2);

    msg.innerHTML = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}

btn.addEventListener('click', (e) => {
    e.preventDefault();
    updateExchangeRate();
});

window.addEventListener('load', () => {
    updateFlag(fromCurr);
    updateFlag(toCurr);
    updateExchangeRate();
});