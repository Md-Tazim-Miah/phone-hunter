document.addEventListener("DOMContentLoaded", function () {
  const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
  };

  const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById("phones-container");
    phonesContainer.textContent = "";
    // Display no phone
    const noPhone = document.getElementById("no-phone");
    if (phones.length == 0) {
      noPhone.classList.remove("d-none");
    } else {
      noPhone.classList.add("d-none");
    }
    // Display 9 phones only.
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
      phones = phones.slice(0, 10);
      showAll.classList.remove('d-none');
    } else{
      showAll.classList.add('d-none');
    }
    phones.forEach((phone) => {
      const phoneDiv = document.createElement("div");
      phoneDiv.classList.add("col");
      phoneDiv.innerHTML = `
              <div class="card h-100 p-4">
                  <img src="${phone.image}" class="card-img-top" alt="...">
                  <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <button onclick="loadPhonesDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phones-detail-modal">Show Details</button>
                  </div>
              </div>
          `;
      phonesContainer.appendChild(phoneDiv);
    });
    // Stop the Spinner
    toggleSpinner(false);
  };

  const searchProcess = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadPhones(searchText,dataLimit);
  }

  // Toggle Spinner
  const toggleSpinner = (isLoading) => {
    const spinnerContainer = document.getElementById("spinner-container");
    if (isLoading) {
      spinnerContainer.classList.remove("d-none");
    } else {
      spinnerContainer.classList.add("d-none");
    }
  };
  // Show All button eventHandler
  document.getElementById('btn-show-all').addEventListener("click", function(){
  searchProcess();
  })

  // Search button eventhandler
  document.getElementById("btn-search").addEventListener("click", function (event) {
      event.preventDefault();
      // Start the spinner
      searchProcess(10);
    });

  // Search button control by Enter key handler
    const searchField = document.getElementById('search-field');
    searchField.addEventListener('keypress', function(event){
      if(event.key === 'Enter'){
        searchProcess(10);
      };
    });
    
    loadPhones('iphone', 10);
});

  const loadPhonesDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
  };

  const displayPhoneDetails = phone => {
    const modalTitle = document.getElementById('phones-detail-modalLabel');
    const modalBody = document.getElementById('modal-body');
    modalTitle.innerText = phone.name;
    modalBody.innerHTML = `
      <p><strong>Brand:</strong> ${phone.brand}</p>
      <p><strong>Release Date:</strong> ${phone.releaseDate || 'N/A'}</p>
      <p><strong>Specifications:</strong></p>
      <ul>
        <li><strong>Chipset:</strong> ${phone.mainFeatures.chipSet || 'N/A'}</li>
        <li><strong>Storage:</strong> ${phone.mainFeatures.storage || 'N/A'}</li>
        <li><strong>Display Size:</strong> ${phone.mainFeatures.displaySize || 'N/A'}</li>
        <li><strong>Memory:</strong> ${phone.mainFeatures.memory || 'N/A'}</li>
      </ul>
    `;
  };
