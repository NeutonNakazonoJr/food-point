import dispatchOnStateChange from "../events/onStateChange.js";
import getHeader from "../components/header.js";

const createRegisterForm = () => {
    const bodyRegister = document.createElement('div');
    bodyRegister.classList.add('body-register');
    
    const headerRegister = getHeader(true, false);
    bodyRegister.appendChild(headerRegister);

    const blackOverlay = document.createElement('div');
    blackOverlay.id = 'black-overlay';
    bodyRegister.appendChild(blackOverlay);

    const registerScreen = document.createElement('section');
    registerScreen.id = 'register-screen';
    bodyRegister.appendChild(registerScreen);

    const registerForm = document.createElement('form');
    registerForm.id = 'register-modal';
    registerScreen.appendChild(registerForm);

    const registerFormDiv = document.createElement('div');
    registerFormDiv.id = 'register-form';
    registerForm.appendChild(registerFormDiv);

    const imgLogoDiv = document.createElement('div');
    imgLogoDiv.id = 'img-logo';
    const imgLogo = document.createElement('img');
    imgLogo.src = '../icons/main-logo-login.svg';
    imgLogo.alt = 'logo';
    imgLogoDiv.appendChild(imgLogo);
    registerFormDiv.appendChild(imgLogoDiv);

    const registerHeader = document.createElement('h1');
    registerHeader.textContent = 'Cadastrar';
    registerFormDiv.appendChild(registerHeader);

    const registerCompleteSection = document.createElement('section');
    registerCompleteSection.id = 'register-complete';
    registerFormDiv.appendChild(registerCompleteSection);

    const dataRegisterDiv = document.createElement('div');
    dataRegisterDiv.id = 'data-register';
    registerCompleteSection.appendChild(dataRegisterDiv);

    const emailImg = document.createElement('img');
    emailImg.src = '../icons/email-symbol.svg';
    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email:';
    const emailInput = document.createElement('input');
    emailInput.id = "email-register"
    emailInput.type = 'email';
    emailInput.placeholder = 'Digite seu email';
    emailInput.alt = 'Digite seu email';
    dataRegisterDiv.appendChild(emailImg);
    dataRegisterDiv.appendChild(emailLabel);
    dataRegisterDiv.appendChild(emailInput);

    const fullNameImg = document.createElement('img');
    fullNameImg.src = '../icons/userLogin.svg';
    const fullNameLabel = document.createElement('label');
    fullNameLabel.textContent = 'Nome completo:';
    const fullNameInput = document.createElement('input');
    fullNameInput.id = "fullName-register"
    fullNameInput.type = 'text';
    fullNameInput.placeholder = 'Digite seu nome';
    fullNameInput.alt = 'Digite seu nome';
    dataRegisterDiv.appendChild(fullNameImg);
    dataRegisterDiv.appendChild(fullNameLabel);
    dataRegisterDiv.appendChild(fullNameInput);

    const passwordImg = document.createElement('img');
    passwordImg.src = '../icons/password-symbol.svg';
    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = 'Senha:';
    const passwordInput = document.createElement('input');
    passwordInput.id = "password-register"
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Digite sua senha';
    passwordInput.alt = 'Digite sua senha';
    dataRegisterDiv.appendChild(passwordImg);
    dataRegisterDiv.appendChild(passwordLabel);
    dataRegisterDiv.appendChild(passwordInput);

    const confirmPasswordImg = document.createElement('img');
    confirmPasswordImg.src = '../icons/password-symbol.svg';
    const confirmPasswordLabel = document.createElement('label');
    confirmPasswordLabel.textContent = 'Confirmar senha:';
    const confirmPasswordInput = document.createElement('input');
    confirmPasswordInput.id = "confirm-password"
    confirmPasswordInput.type = 'password';
    confirmPasswordInput.placeholder = 'Digite novamente sua senha';
    confirmPasswordInput.alt = 'Digite novamente sua senha';
    dataRegisterDiv.appendChild(confirmPasswordImg);
    dataRegisterDiv.appendChild(confirmPasswordLabel);
    dataRegisterDiv.appendChild(confirmPasswordInput);

    const registerButton = document.createElement('button');
    registerButton.type = 'button';
    registerButton.id = 'registerPage-btn';
    registerButton.alt = 'Cadastrar';
    registerButton.textContent = 'Cadastrar';

    registerButton.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("click");
    })
    registerFormDiv.appendChild(registerButton);

    return bodyRegister;
};

export default createRegisterForm;
