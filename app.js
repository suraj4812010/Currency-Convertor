const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const btn = document.querySelector("button");
const msg = document.querySelector(".msg");


window.addEventListener("load", () => {
    updateExchangeRate();
})


// currency code
// for(currCode in countryList){
//     console.log(currCode)
// }


for (let select of dropdowns) {
    for (currCode in countryList) {
        // create new options for all country
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        // add all other options to select 
        select.append(newOption);

    }

    // updates the flag as country is selected/changed
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })

}


const updateFlag  = (element) => {
    
    let currCode = element.value;
    // console.log(currCode);
    let countryCode = countryList[currCode];
    // console.log(countryCode);
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img =  element.parentElement.querySelector("img");
    img.src = newSrc;
    
}


btn.addEventListener("click",  (evt) => {
    evt.preventDefault();
    updateExchangeRate();
})


let updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    // console.log("amtvalue = ",amtValue);

    if(amtValue === "" || amtValue < 1){
        amtValue = 1;
        amount.value = "1";
    }

    // console.log("From :", fromCurr.value, "To :", toCurr.value);

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    // console.log("rate :",rate);

    let finalAmt = amtValue * rate;
    // console.log("final amount = ",finalAmt);

    msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmt} ${toCurr.value}` ;
}