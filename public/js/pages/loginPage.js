import getHeader from "../components/header.js";

const createLoginForm = () => {
    const bodyLogin = document.createElement('div');
    bodyLogin.classList.add('body-login');

    const headerLogin = getHeader(true, false);
    bodyLogin.appendChild(headerLogin);
    
    const blackOverlay = document.createElement('div');
    blackOverlay.id = 'black-overlay';
    bodyLogin.appendChild(blackOverlay);
    
    const loginScreen = document.createElement('section');
    loginScreen.id = 'login-screen';
    bodyLogin.appendChild(loginScreen);

    const loginForm = document.createElement('form');
    loginForm.id = 'login-modal';
    loginScreen.appendChild(loginForm);
    
    const loginFormDiv = document.createElement('div');
    loginFormDiv.id = 'login-form';
    loginForm.appendChild(loginFormDiv);

    const imgLogoDiv = document.createElement('div');
    imgLogoDiv.id = 'img-logo';
    const imgLogo = document.createElement('img');
    imgLogo.src = './assets/icons/main-logo-login.svg';
    imgLogo.alt = 'logo';
    imgLogoDiv.appendChild(imgLogo);
    loginFormDiv.appendChild(imgLogoDiv);

    const loginHeader = document.createElement('h1');
    loginHeader.textContent = 'Login';
    loginFormDiv.appendChild(loginHeader);

    const loginCompleteSection = document.createElement('section');
    loginCompleteSection.id = 'login-complete';
    loginFormDiv.appendChild(loginCompleteSection);

    const dataLoginDiv = document.createElement('div');
    dataLoginDiv.id = 'data-login';
    loginCompleteSection.appendChild(dataLoginDiv);

    const emailImg = document.createElement('img');
    emailImg.src = './assets/icons/email-symbol.svg';
    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email:';
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.placeholder = 'Digite seu email';
    emailInput.alt = 'Digite seu email';
    dataLoginDiv.appendChild(emailImg);
    dataLoginDiv.appendChild(emailLabel);
    dataLoginDiv.appendChild(emailInput);

    const passwordImg = document.createElement('img');
    passwordImg.src = './assets/icons/password-symbol.svg';
    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = 'Senha:';
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Digite sua senha';
    passwordInput.alt = 'Digite sua senha';
    dataLoginDiv.appendChild(passwordImg);
    dataLoginDiv.appendChild(passwordLabel);
    dataLoginDiv.appendChild(passwordInput);

    const rememberPasswordDiv = document.createElement('div');
    rememberPasswordDiv.id = 'remember-password';
    loginCompleteSection.appendChild(rememberPasswordDiv);

    const rememberAllPasswordDiv = document.createElement('div');
    rememberAllPasswordDiv.id = 'remember-all-password';
    rememberPasswordDiv.appendChild(rememberAllPasswordDiv);

    const rememberPasswordInput = document.createElement('input');
    rememberPasswordInput.type = 'checkbox';
    rememberPasswordInput.id = 'remember-passw';
    rememberPasswordInput.alt = 'lembrar senha';
    const rememberPasswordLabel = document.createElement('label');
    rememberPasswordLabel.textContent = 'Lembrar minha senha';
    rememberPasswordLabel.setAttribute('for', 'remember-passw');
    rememberAllPasswordDiv.appendChild(rememberPasswordInput);
    rememberAllPasswordDiv.appendChild(rememberPasswordLabel);

    const loginButton = document.createElement('button');
    loginButton.type = 'button';
    loginButton.id = 'login-btn';
    loginButton.alt = 'Entrar';
    loginButton.textContent = 'Entrar';
    loginFormDiv.appendChild(loginButton);

    return bodyLogin;
};

export default createLoginForm;
