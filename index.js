let isPromptOpen = false;
let contrastToggle = false;

async function contact(e) {
  e.preventDefault();

  const promptContact = document.querySelector('.prompt__contact');

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
    loading.style.display = 'flex';
    loading.style.zIndex = 1;
    // const parentParent = loading.parentNode.parentNode;
    loading.style.height = `${promptContact.clientHeight}px`;
    try {
      await emailjs.sendForm(
        'service_dzvlsmp',
        'template_i5fh409',
        e.target,
        'jMnUM9qjpgXZn-80Q'
      );
      setTimeout(function () {
        loading.style.display = 'none';
        loading.style.zIndex = -1;

        success.style.display = 'flex';
        success.style.zIndex = 1;
        // const successParent = success.parentNode.parentNode;
        success.style.height = `${promptContact.clientHeight}px`;

        console.log('it worked');
      }, 5000);
    } catch (error) {
      console.log(error);

      setTimeout(function () {
        loading.style.display = 'none';
        loading.style.zIndex = -1;

        failed.style.display = 'flex';
        failed.style.zIndex = 1;
        // const failedParent = failed.parentNode.parentNode;
        failed.style.height = `${promptContact.clientHeight}px`;

        console.log('it failed');
      }, 2000);
    }
  }
}

function handlePromptContactOnResize() {
  const promptContact = document.querySelector('.prompt__contact');
  const loading = document.querySelector('.prompt__contact--overlay-loading');
  const success = document.querySelector('.prompt__contact--overlay-success');
  const failed = document.querySelector('.prompt__contact--overlay-failed');

  failed.style.height = `${promptContact.clientHeight}px`;
  success.style.height = `${promptContact.clientHeight}px`;
  loading.style.height = `${promptContact.clientHeight}px`;
}
window.addEventListener('resize', handlePromptContactOnResize);

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

  loading.style.display = 'none';

  success.style.display = 'none';
  success.style.zIndex = -1;

  failed.style.display = 'none';
  failed.style.zIndex = -1;

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

      const statusDisplay = document.querySelector('.network-status');
      statusDisplay.innerHTML = 'Offline';

      const offlineBubble = document.querySelector('.bubble');
      offlineBubble.style.boxShadow = '0px 0px 134px 96px #ac2828';
    });

    window.addEventListener('online', (event) => {
      const networkWrapper = document.getElementById('network-wrapper');
      networkWrapper.style.display = 'block';

      const statusDisplay = document.querySelector('.network-status');
      statusDisplay.innerHTML = 'Online';

      const onlineBubble = document.querySelector('.bubble');
      onlineBubble.style.boxShadow = '0px 0px 134px 96px #2e882e';

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
    let initialContent =
      document.getElementById('button-85-contents').outerHTML;

    let contacts = document.getElementById('header-container');
    let nav = document.querySelector('.nav__link--main-container');

    let button = document.querySelector('.button-85');
    let wrapper = document.querySelector('.contacts-wrapper');
    let descTitle = document.querySelector('.header__desc--title-container');
    let descPara = document.querySelector('.header__desc--para');

    function toggleZindex() {
      var viewportHeight = window.innerHeight;

      if (viewportHeight <= 430 && contacts.classList.contains('show')) {
        nav.style.zIndex = 0;
        document.body.style.overflow = 'hidden';
        descTitle.style.visibility = 'hidden';
        descPara.style.visibility = 'hidden';
      } else {
        nav.style.zIndex = 1;
        document.body.style.overflow = 'scroll';
        descTitle.style.visibility = 'visible';
        descPara.style.visibility = 'visible';
      }
    }
    window.addEventListener('resize', toggleZindex);

    function toggleContacts() {
      var viewportHeight = window.innerHeight;

      if (!contacts.classList.contains('show')) {
        contacts.classList.add('show');
        if (viewportHeight <= 430) {
          nav.style.zIndex = 0;
          document.body.style.overflow = 'hidden';
          descTitle.style.visibility = 'hidden';
          descPara.style.visibility = 'hidden';
        }
      } else {
        contacts.classList.remove('show');
        nav.style.zIndex = 1;
        document.body.style.overflow = 'scroll';
        descTitle.style.visibility = 'visible';
        descPara.style.visibility = 'visible';
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

function toggleMenuBackdropResize() {
  var menuBackdrop = document.querySelector('.menu__backdrop');
  var windowWidth = window.innerWidth;

  if (windowWidth > 480) {
    menuBackdrop.classList.remove('.menu--open');
  }
}

window.addEventListener('resize', toggleMenuBackdropResize);
