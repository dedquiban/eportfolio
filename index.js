let isPromptOpen = false;
let contrastToggle = false;

function contact(e) {
  e.preventDefault();

  const loading = document.querySelector('.prompt__contact--overlay-loading');
  const success = document.querySelector('.prompt__contact--overlay-success');
  const failed = document.querySelector('.prompt__contact--overlay-failed');

  var email = document.getElementById('input_email');
  var name = document.getElementById('input_name');
  var message = document.getElementById('input_message');

  let emailError = document.getElementById('error_email');
  let nameError = document.getElementById('error_name');
  let messageError = document.getElementById('error_message');
  if (!email.value) {
    emailError.style.display = 'block';
    emailError.innerHTML = 'Please enter your email address';
  } else if (email.value) {
    emailError.style.display = 'none';
  }
  if (!name.value) {
    nameError.style.display = 'block';
    nameError.innerHTML = 'Please enter your name';
  } else if (name.value) {
    nameError.style.display = 'none';
  }
  if (!message.value) {
    messageError.style.display = 'block';
    messageError.innerHTML = 'Please enter a message';
  } else if (message.value) {
    messageError.style.display = 'none';
  }

  if (name.value && email.value && message.value) {
    loading.classList += ' prompt__contact--overlay-visible';
    emailjs
      .sendForm(
        'service_dzvlsmp',
        'template_i5fh409',
        e.target,
        'jMnUM9qjpgXZn-80Q'
      )
      .catch((error) => {
        console.log(error);
        loading.classList.remove('prompt__contact--overlay-visible');
        failed.classList += ' prompt__contact--overlay-visible';
      });

    setTimeout(function () {
      loading.classList.remove('prompt__contact--overlay-visible');
      success.classList += ' prompt__contact--overlay-visible';
      console.log('it worked');
    }, 5000);
  }
}

function togglePrompt() {
  isPromptOpen = true;
  document.body.classList += ' prompt--open';
}

function closePrompt() {
  isPromptOpen = false;
  document.body.classList.remove('prompt--open');
  const loading = document.querySelector('.prompt__contact--overlay-loading');
  const success = document.querySelector('.prompt__contact--overlay-success');
  const failed = document.querySelector('.prompt__contact--overlay-failed');

  loading.classList += ' prompt__contact--overlay-invisible';
  success.classList += ' prompt__contact--overlay-invisible';
  failed.classList += ' prompt__contact--overlay-invisible';

  var email = document.getElementById('input_email');
  var name = document.getElementById('input_name');
  var message = document.getElementById('input_message');
  name.value = '';
  email.value = '';
  message.value = '';

  let nameError = document.getElementById('error_name');
  let emailError = document.getElementById('error_email');
  let messageError = document.getElementById('error_message');
  nameError.style.display = 'none';
  emailError.style.display = 'none';
  messageError.style.display = 'none';
}

function toggleContrast() {
  contrastToggle = !contrastToggle;
  if (contrastToggle) {
    document.body.classList += 'dark-theme';
    document.body.style.backgroundColor = '#242424';
  } else {
    document.body.classList.remove('dark-theme');
    document.body.style.backgroundColor = '#dde6ff';
  }
}

function openMenu() {
  document.body.classList += ' menu--open';
}

function closeMenu() {
  document.body.classList.remove('menu--open');
}

function handleNetworkListener() {
  document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('offline', (event) => {
      const networkWrapper = document.getElementById('network-wrapper');
      networkWrapper.style.display = 'block';
      // networkWrapper.style.backgroundColor = 'red';

      const statusDisplay = document.getElementById('networkStatus');
      statusDisplay.innerHTML = 'Offline';
    });

    window.addEventListener('online', (event) => {
      const networkWrapper = document.getElementById('network-wrapper');
      // networkWrapper.style.backgroundColor = 'green';
      networkWrapper.style.display = 'block';

      const statusDisplay = document.getElementById('networkStatus');
      statusDisplay.innerHTML = 'Online';

      setTimeout(function () {
        networkWrapper.style.display = 'none';
      }, 5000);
    });
  });
}

handleNetworkListener();

let timeoutId;
let timeoutId2;
function updateContacts() {
  document.addEventListener('DOMContentLoaded', () => {
    let contacts = document.getElementById('header-container');
    let initialContent =
      document.getElementById('button-85-contents').outerHTML;
    let button = document.querySelector('.button-85');
    let wrapper = document.querySelector('.contacts-wrapper');

    function toggleContacts() {
      if (!contacts.classList.contains('show')) {
        contacts.classList.add('show');
      } else {
        contacts.classList.remove('show');
      }
    }

    function hideContacts() {
      if (contacts.classList.contains('show')) {
        contacts.classList.remove('show');
      }
    }

    function changeTextBtn() {
      if (contacts.classList.contains('show')) {
        button.innerHTML = `Close`;
      }
    }

    function revertBtn() {
      if (!contacts.classList.contains('show')) {
        button.innerHTML = initialContent;
      }
    }

    function hideWrapper() {
      if (wrapper.classList.contains('pop')) {
        wrapper.classList.remove('pop');
        wrapper.style.opacity = 0;
      }
    }

    function showWrapper() {
      if (!wrapper.classList.contains('pop')) {
        wrapper.classList.add('pop');
        wrapper.style.opacity = 1;
      }
    }

    function closeCardOnScroll() {
      const callback = (entries, observer) => {
        if (entries[0].intersectionRatio <= 0) {
          hideContacts();
          revertBtn();
        }
      };

      const observer = new IntersectionObserver(callback);
      observer.observe(contacts);
    }
    closeCardOnScroll();

    button.addEventListener('click', function () {
      toggleContacts();
      revertBtn();

      clearTimeout(timeoutId);
      timeoutId = setTimeout(changeTextBtn, 800);

      hideWrapper();
      clearTimeout(timeoutId2);
      timeoutId2 = setTimeout(showWrapper, 1000);
    });
  });
}

updateContacts();
