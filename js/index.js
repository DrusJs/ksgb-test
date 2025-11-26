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


const accordionInputs = document.querySelectorAll('.favorite-accordion-input');
    
accordionInputs.forEach(accordionInput => {
    const inputWrapper = accordionInput.querySelector('.input-wrapper');
    const inputField = accordionInput.querySelector('input');
    const textarea = accordionInput.querySelector('.textarea');
    const charCounter = accordionInput.querySelector('.char-counter');
    
    inputWrapper.addEventListener('click', function() {
        accordionInput.classList.add('active');
        textarea.focus();
    });
    
    textarea.addEventListener('blur', function() {
        accordionInput.classList.remove('active');
        
        if (textarea.value.trim() !== '') {
            inputField.value = textarea.value;
        }
        
        textarea.value = '';
        charCounter.textContent = '0/255';
    });
    
    textarea.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            textarea.blur();
        }
    });
    
    textarea.addEventListener('input', function() {
        const currentLength = textarea.value.length;
        charCounter.textContent = `${currentLength}/255`;
        
        if (currentLength > 240) {
            charCounter.style.color = '#fe3f3fff';
        } else {
            charCounter.style.color = '#3b3b3b';
        }
    });
});

function initSearchDropdown(inputSelector, dropdownSelector) {
  const input = document.querySelector(inputSelector);
  const clear = input.parentElement.querySelector('button');
  const dropdown = document.querySelector(dropdownSelector);
  const items = dropdown.querySelectorAll('li');

  input.addEventListener('focus', function() {
    dropdown.classList.add('active');
    items.forEach(item => {
      item.style.display = 'block';
    });
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest(inputSelector) && !e.target.closest(dropdownSelector)) {
      dropdown.classList.remove('active');
    }
  });

  input.addEventListener('input', function() {
    const searchText = this.value.toLowerCase();
    let hasMatches = false;

    if (searchText.length > 0) {
      clear.classList.add('active');
    } else {
      clear.classList.remove('active');
    }

    items.forEach(function(item) {
      const itemText = item.textContent.toLowerCase();
      const originalText = item.textContent;
      
      item.innerHTML = originalText;
      
      if (searchText.length > 0) {
        if (itemText.includes(searchText)) {
          const startIndex = itemText.indexOf(searchText);
          const endIndex = startIndex + searchText.length;
          const before = originalText.substring(0, startIndex);
          const match = originalText.substring(startIndex, endIndex);
          const after = originalText.substring(endIndex);
          
          item.innerHTML = `${before}<span>${match}</span>${after}`;
          item.style.display = 'block';
          hasMatches = true;
        } else {
          item.style.display = 'none';
        }
      } else {
        item.style.display = 'block';
      }
    });
  });

  clear.addEventListener('click', function() {
    input.value = '';
    clear.classList.remove('active');
    
    items.forEach(item => {
      item.style.display = 'block';
      item.innerHTML = item.textContent;
    });
  });

  items.forEach(item => {
    item.addEventListener('click', function() {
      const selectedText = this.textContent;
      input.value = selectedText;
      dropdown.classList.remove('active');
      
      items.forEach(item => {
        item.innerHTML = item.textContent;
        item.style.display = 'block';
      });
    });
  });
}

initSearchDropdown('.basket-input', '.basket-select-dropdown');