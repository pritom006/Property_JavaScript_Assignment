document.addEventListener('DOMContentLoaded', () => {
    // Region and Currency Element PickUp
    const regionLink = document.querySelector('.top-nav a'); // First link in top-nav
    const popup = document.getElementById('regionPopup');
    const closeIcon = popup.querySelector('.close-icon');
    const saveBtn = popup.querySelector('.save-btn');
    const regionSelect = document.getElementById('regionSelect');
    const currencyDisplay = document.getElementById('currencyDisplay');

    // Travelers Increment & Decrement Element PickUp
    const travelersButton = document.getElementById('travelersButton');
    const travelersPopup = document.getElementById('travelersPopup');
    const totalTravelersDisplay = document.getElementById('totalTravelers');
    const adultsCountDisplay = document.getElementById('adultsCount');
    const childrenCountDisplay = document.getElementById('childrenCount');
    const doneButton = document.querySelector('.done-btn');


    // Gallery Image Modal Element pickUp
    const modal = document.querySelector('.modal');
    const modalImage = document.querySelector('.modal-image');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const imageCounter = document.querySelector('.image-counter');
    const imageTitle = document.querySelector('.image-title');
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    const lastImage = document.querySelector('.last-image');
    const photoCount = document.querySelector('.photo-count');


    // PickUp The Share and Love Buttons
    const shareBtn = document.getElementById('share-btn');
    const loveBtn = document.getElementById('love-btn');
    const heartIcon = document.getElementById('heart-icon');

    const shareModal = document.getElementById('share-modal');
    const closeShareModal = document.getElementById('close-modal');
    const copyLinkBtn = document.getElementById('copy-link');

    let counts = {
        adults: 2,
        children: 0
    };

    const images = [
        {
            src: "./assets/Juneau.jpg",
            title: "Juneau Vacation Rental",
            alt: "Waterfront deck view"
        },
        {
            src: "./assets/house-exterior.jpeg",
            title: "House Exterior",
            alt: "House exterior view"
        },
        {
            src: "./assets/living1.jpeg",
            title: "Living Room",
            alt: "Living room view"
        },
        {
            src: "./assets/living2.jpeg",
            title: "Dining Area",
            alt: "Dining area view"
        },
        {
            src: "./assets/living3.jpeg",
            title: "Kitchen",
            alt: "Kitchen view"
        }
    ];

    // Currency mapping
    const regionCurrency = {
        'PT': 'EUR - Euro',
        'US': 'USD - US Dollar',
        'GB': 'GBP - British Pound',
        'FR': 'EUR - Euro',
        'DE': 'EUR - Euro',
        'CA': 'CAD - Canadian Dollar',
        'AU': 'AUD - Australian Dollar',
        'JP': 'JPY - Japanese Yen',
        'CN': 'CNY - Chinese Yuan',
        'BR': 'BRL - Brazilian Real',
        'MX': 'MXN - Mexican Peso',
        'RU': 'RUB - Russian Ruble',
        'IN': 'INR - Indian Rupee',
        'ZA': 'ZAR - South African Rand',
        'SE': 'SEK - Swedish Krona',
    };

    currencyDisplay.value = regionCurrency[regionSelect.value];


    regionLink.addEventListener('click', (e) => {
        e.preventDefault();
        popup.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    const closePopup = () => {
        popup.style.display = 'none';
        document.body.style.overflow = '';
    };

    // Close with X button
    closeIcon.addEventListener('click', closePopup);

    // Close when clicking outside
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });

    // Update currency based on region
    regionSelect.addEventListener('change', () => {
        const selectedRegion = regionSelect.value;
        currencyDisplay.value = regionCurrency[selectedRegion];
    });

    // Save changes
    saveBtn.addEventListener('click', () => {
        const selectedRegion = regionSelect.options[regionSelect.selectedIndex].text;
        regionLink.textContent = `🌍 ${selectedRegion}`;
        closePopup();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePopup();
        }
    });


    // Travelers Increment Decrement Functionality

    travelersButton.addEventListener('click', () => {
        travelersPopup.style.display = 'block';
    });

    doneButton.addEventListener('click', () => {
        travelersPopup.style.display = 'none';
        updateTotalDisplay();
    });

    // Handle increment/decrement buttons
    document.querySelectorAll('.counter-btn').forEach(button => {
        button.addEventListener('click', () => {
        const type = button.dataset.type;
        const isIncrease = button.classList.contains('increase');
        
        if (isIncrease) {
            counts[type]++;
        } else {
            counts[type]--;
        }

        const display = type === 'adults' ? adultsCountDisplay : childrenCountDisplay;
        display.textContent = counts[type];

        updateButtonStates();
        });
    });


    // Update adult and children button
    function updateButtonStates() {
        const adultDecrease = document.querySelector('.decrease[data-type="adults"]');
        const adultIncrease = document.querySelector('.increase[data-type="adults"]');
        adultDecrease.disabled = counts.adults <= 0;
        adultIncrease.disabled = false;

        const childDecrease = document.querySelector('.decrease[data-type="children"]');
        const childIncrease = document.querySelector('.increase[data-type="children"]');
        childDecrease.disabled = counts.children <= 0;
        childIncrease.disabled = false
    }


    function updateTotalDisplay() {
        const total = counts.adults + counts.children;
        totalTravelersDisplay.textContent = total;
      }
    
    // Close popup when clicking outside
    document.addEventListener('click', (e) => {
        if (!travelersPopup.contains(e.target) && !travelersButton.contains(e.target)) {
          travelersPopup.style.display = 'none';
        }
    });
    
    // Initial button states
    updateButtonStates();



    // Gallery Modal View Functionality
    photoCount.textContent = `${images.length} Photos`;
    let currentImageIndex = 0;

    function openModal(index) {
        currentImageIndex = index; 
        updateModalImage();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // galleryImages.forEach((img, index) => {
    //     img.addEventListener('click', () => openModal(index));
    // });
    
    lastImage.addEventListener('click', () => openModal(images.length - 1)); 

    function closeModal() {
        modal.style.display = 'none';
        // Restore Scrolling
        document.body.style.overflow = '';
    }

    function updateModalImage() {
        modalImage.src = images[currentImageIndex].src;
        modalImage.alt = images[currentImageIndex].alt;
        imageCounter.textContent = `${currentImageIndex + 1}/${images.length}`;
        imageTitle.textContent = images[currentImageIndex].title;
        
        prevBtn.disabled = currentImageIndex === 0;
        nextBtn.disabled = currentImageIndex === images.length - 1;
    }

    function showPreviousImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateModalImage();
        }
    }

    function showNextImage() {
        if (currentImageIndex < images.length - 1) {
            currentImageIndex++;
            updateModalImage();
        }
    }


    lastImage.addEventListener('click', () => openModal(0));
    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });


    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.style.display || modal.style.display === 'none') return;
        
        switch(e.key) {
            case 'ArrowLeft':
                showPreviousImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
            case 'Escape':
                closeModal();
                break;
        }
    });


    // Heart and Share button

    // Check if the heart icon was previously saved in localStorage
    const isHeartSaved = localStorage.getItem('isHeartSaved') === 'true';
    if (isHeartSaved) {
        heartIcon.textContent = '♥';
        loveBtn.classList.add('btn-red');
    }

    shareBtn.addEventListener('click', () => {
        shareModal.classList.remove('hidden');
    });


    // Toggle the heart icon text and update the localStorage
    loveBtn.addEventListener('click', () => {
        if (heartIcon.textContent === '♡') {
            heartIcon.textContent = '♥';
            loveBtn.classList.add('btn-red');
            localStorage.setItem('isHeartSaved', 'true');
        } else {
            heartIcon.textContent = '♡';
            loveBtn.classList.remove('btn-red');
            localStorage.setItem('isHeartSaved', 'false');
        }
    });

    //Close the share modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === shareModal) {
            shareModal.classList.add('hidden');
        }
    });

    closeShareModal.addEventListener('click', () => {
        shareModal.classList.add('hidden');
    });


    // copy link function
    copyLinkBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentUrl = window.location.href;
        
        const tempInput = document.createElement('input');
        tempInput.value = currentUrl;
        document.body.appendChild(tempInput);
        
        tempInput.select();
        document.execCommand('copy');
        
        document.body.removeChild(tempInput);       
        alert('Link copied to clipboard!');
        shareModal.classList.add('hidden');
    });

});