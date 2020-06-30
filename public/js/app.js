// console.log('client side javascript is loaded!')



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = "Searching...";
    messageTwo.textContent = "";

    const location = search.value;
    fetch(`/weather?location=${location}`).then(response => {
        response.json().then(data => {

            const { name, region, country } = data.result.location;
            const { temperature } = data.result.current

            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = `${name}, ${region}, ${country}`;
                messageTwo.textContent = `The current temperature in ${name} is ${temperature}°C`;
            }
        });
    });
})