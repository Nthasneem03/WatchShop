document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const form = document.getElementById('watch-form');
    console.log('Form:', form);
    if (form) {
        form.addEventListener('submit', watchUpload);
    } else {
        console.error('Form element not found');
    }

    const watchContainer = document.querySelector('.watch-container');
    console.log('Watch Container:', watchContainer);
    if (watchContainer) {
        watchDisplay();
    }
});





// upload or POST watches

function watchUpload(event) {
    event.preventDefault();
    const form = document.getElementById('watch-form');
    const formData = new FormData(form);
    for (let pair of formData.entries()) {
        console.log(pair[0], ' -> ', pair[1]); // prints the key and value
    }
    fetch('https://nthasneem03.pythonanywhere.com/api/watchCreate', {
        method: 'POST',
        body: formData,
    })
    .then((response)=>response.json())
    .then((data)=>
    {
        alert('Watch Added Successfully')
        watchDisplay();
    })
    .catch((error)=> {
        console.log('Error :',error);
        alert('Failed to connect to the server. Please make sure the server is running.') });
}




// display or GET watches

function watchDisplay() {
    fetch('https://nthasneem03.pythonanywhere.com/api/watchList')
    .then(response => response.json())
    .then(data => {
        const watchContainer = document.querySelector('.watch-container'); 
        watchContainer.innerHTML = ''; 
        const baseURL = 'https://nthasneem03.pythonanywhere.com';
        data.forEach(watch => { 
            const imgURL = baseURL + watch.image;
            const watchHTML = ` 
            <div class="card watch-list" style="width: 18rem;">
                <img src="${imgURL}" class="card-img-top watch-image" alt="watch">
                <div class="card-body">
                    <h5 class="card-title">${watch.name}</h5>
                    <p class="card-subtitle">${watch.brand}</p>
                    <p class="card-subtitle">₹  ${watch.price}</p>
                </div>
            </div>
            `;
            watchContainer.innerHTML += watchHTML;
        });
    })
    .catch((error)=> {
        console.log('Error :',error);
        alert('Failed to connect to the server. Please make sure the server is running.') });}



