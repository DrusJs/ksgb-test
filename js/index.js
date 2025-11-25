document.getElementById('basket-button').addEventListener('click', function() {
    document.querySelector('.basket-container').classList.toggle('active');
    document.querySelector('.base-actions').classList.toggle('active');
});

document.getElementById('price-visible-button').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.basket-inner').classList.toggle('js-price-visible');
});

document.getElementById('favorite-button').addEventListener('click', function() {
    this.classList.toggle('active');
});

document.querySelectorAll('.favorite-accordion-head').forEach(function(head) {
    head.addEventListener('click', function() {
        this.closest('.favorite-accordion').classList.toggle('active');
    });
});

document.querySelectorAll('.favorite-accordion-price .price-visible-button').forEach(function(btn) {
    btn.addEventListener('click', function() {
        this.closest('.favorite-accordion-price').classList.toggle('active');
    });
});

document.querySelectorAll('.accordion-head').forEach(function(btn) {
    btn.addEventListener('click', function() {
        const accordion = this.closest('.accordion');
        const dropdown = accordion.querySelector('.accordion-dropdown');
        
        if (accordion.classList.contains('active')) {
            accordion.classList.remove('active');
            accordion.style.height = '54px';
            accordion.style.maxHeight = '54px';
        } else {
            const contentHeight = dropdown.scrollHeight;
            accordion.classList.add('active');
            accordion.style.height = `calc(58px + ${contentHeight}px)`;
            accordion.style.maxHeight = `calc(58px + ${contentHeight}px)`;
        }
    });
});


document.querySelectorAll('.js-toggle').forEach(function(btn) {
    btn.addEventListener('click', function() {
        this.classList.toggle('active');
    });
});



const menuButtons = document.querySelectorAll('[data-menu]');

if (menuButtons.length > 0) {
    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-menu');
            const targetMenu = document.getElementById(targetId);
            
            if (!targetMenu) return;

            document.querySelectorAll('.menu-block').forEach(menu => {
                if (menu !== targetMenu) {
                    menu.classList.remove('active');
                }
            });
            
            menuButtons.forEach(btn => {
                if (btn !== button) {
                    btn.classList.remove('active');
                }
            });
            button.classList.toggle('active')
            targetMenu.classList.toggle('active');
        });
    });
}


const fieldsets = document.querySelectorAll('.form-overflow fieldset');
const filterhead = document.querySelector('.filter-head');
const filtercontent = document.querySelector('.filter-form');
const filterinner = document.querySelector('.menu-scroll');
const acceptfitler = document.querySelector('.accept-filter');
const resetfitler = document.querySelector('.reset-filter');

filterhead.addEventListener('click', function() {
        filterhead.classList.toggle('active');
        filtercontent.classList.toggle('active');
        filterinner.classList.toggle('hidden');
});

for (let i = 0; i < fieldsets.length; i++) {
    const fieldset = fieldsets[i];
    const resetBtn = fieldset.querySelector('.reset-fieldset');
    const inputs = fieldset.querySelectorAll('input[type="checkbox"], input[type="radio"]');
    
    function checkFieldsetState() {
        let hasChecked = false;
        
        for (let j = 0; j < inputs.length; j++) {
            if (inputs[j].checked) {
                hasChecked = true;
                break;
            }
        }
        
        if (hasChecked) {
            resetBtn.classList.add('active');
        } else {
            resetBtn.classList.remove('active');
        }
    }
    
    for (let k = 0; k < inputs.length; k++) {
        inputs[k].addEventListener('change', checkFieldsetState);
    }
    
    resetBtn.addEventListener('click', function(e) {
        e.preventDefault();
        for (let l = 0; l < inputs.length; l++) {
            inputs[l].checked = false;
        }
        checkFieldsetState();
    });

    checkFieldsetState();
}

resetfitler.addEventListener('click', function() {
    filterhead.classList.remove('active');
    filtercontent.classList.remove('active');
});

acceptfitler.addEventListener('click', function() {
    filterhead.classList.remove('active');
    filtercontent.classList.remove('active');
});
