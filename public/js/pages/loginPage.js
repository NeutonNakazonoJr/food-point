import dispatchOnStateChange from "../events/onStateChange.js";
import getHeader from "../components/header.js";
import showToast from "../components/toast.js";
import htmlCreator from "../utils/htmlCreator.js";
import createModal from "./modal/createModal.js";
import { postRecoverPasswordEmail } from "../api/passwordApi.js";

const createFormToRecoverPass = () => {
    const inputEmail = htmlCreator.createInput({type: 'email', id: 'input-email-recover-pass', labelText: 'Digite seu email cadastrado:'});
    const span = htmlCreator.createSpan('Enviaremos um código e um link para a redefinição da senha.');

    const title = htmlCreator.createTitle('h3', 'Recuperar senha'); 
    
    const submitEmailBtn = htmlCreator.createButton('Enviar', 'submit-recover-pass-btn');
    
    submitEmailBtn.addEventListener('click', async (e) => {
        e.preventDefault(); 
        const submitEmail = document.getElementById('input-email-recover-pass').value;
        console.log(submitEmail);
        if (!submitEmail) {
            showToast('Email indefinido')
            return
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailPattern.test(submitEmail)) {
            showToast('Email inválido')
            return
        }

        const requestToSendEmail = await postRecoverPasswordEmail({email: submitEmail});
  
        if (requestToSendEmail.error) {
            showToast(requestToSendEmail.error)
            return
        }

        return showToast(requestToSendEmail.message);
    })

    
    
    const fieldset = document.createElement('fieldset');
    fieldset.id = 'fieldset-login-recover-pass';
    fieldset.appendChild(inputEmail);
    fieldset.appendChild(span);
    fieldset.appendChild(submitEmailBtn);
    
    const forgetPassForm = document.createElement('form');
    forgetPassForm.id = ('login-form-forget-pass');
    forgetPassForm.appendChild(title);
    forgetPassForm.appendChild(fieldset);

    const modal = createModal(forgetPassForm);
    return modal;
}



const createLoginForm = () => {
    const bodyLogin = document.createElement('div');
    bodyLogin.classList.add('body-login');

    const headerLogin = getHeader(true, false);
    bodyLogin.appendChild(headerLogin);

    const blackOverlayLogin = document.createElement('div');
    blackOverlayLogin.classList.add('black-overlay');
    bodyLogin.appendChild(blackOverlayLogin);

    const loginScreen = document.createElement('section');
    loginScreen.id = 'login-screen';
    bodyLogin.appendChild(loginScreen);

    const loginForm = document.createElement('form');
    loginForm.id = 'login-modal';
    loginScreen.appendChild(loginForm);

    const loginFormDiv = document.createElement('div');
    loginFormDiv.id = 'login-form';
    loginForm.appendChild(loginFormDiv);

    const landing = document.createElement("div");
    landing.id = "landing-button"
    const home = document.createElement("button");
    home.id = "back-landing"
    home.textContent = "Voltar"
    const backIcon = document.createElement("img")
    backIcon.id = "back-flag"
    backIcon.src = "/assets/icons/flag-back-wine.svg"

    home.appendChild(backIcon)
    landing.appendChild(home)
    loginFormDiv.appendChild(landing)

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

    const forgetBtn = htmlCreator.createButton('Esqueceu sua senha?', 'forget-pass-btn-login');

    forgetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const form = createFormToRecoverPass()

        const containerRoot = document.getElementById('root');
        containerRoot.appendChild(form);
    })

    const dataLoginDiv = document.createElement('div');
    dataLoginDiv.id = 'data-login';
    loginCompleteSection.appendChild(dataLoginDiv);

    const emailImg = document.createElement('img');
    emailImg.src = './assets/icons/email-symbol.svg';
    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email:';
    const emailInput = document.createElement('input');
    emailInput.id = "email-login"
    emailInput.type = 'email';
    emailInput.placeholder = 'Digite seu email';
    emailInput.alt = 'Digite seu email';
    dataLoginDiv.appendChild(emailImg);
    dataLoginDiv.appendChild(emailLabel);
    dataLoginDiv.appendChild(emailInput);

    const passwordLoginDiv = document.createElement('div');
    passwordLoginDiv.id = 'password-login-div';
    const passwordImg = document.createElement('img');
    passwordImg.src = './assets/icons/password-symbol.svg';
    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = 'Senha:';
    const passwordInput = document.createElement('input');
    passwordInput.id = "password-login";
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Digite sua senha';
    passwordInput.alt = 'Digite sua senha';
    passwordLoginDiv.appendChild(passwordImg);
    passwordLoginDiv.appendChild(passwordLabel);
    passwordLoginDiv.appendChild(passwordInput);
    dataLoginDiv.appendChild(passwordLoginDiv);
    dataLoginDiv.appendChild(forgetBtn);

    function createPasswordToggleBtn(passwordField) {
        const toggleBtn = document.createElement('button');
        toggleBtn.innerHTML = '<img src="./assets/icons/vision-on.svg" alt="Mostrar Senha">';
        toggleBtn.type = 'button';
        toggleBtn.classList.add('toggle-password-btn');

        toggleBtn.addEventListener('click', function () {
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                toggleBtn.innerHTML = '<img src="./assets/icons/vision-off.svg" alt="Ocultar Senha">';
            } else {
                passwordField.type = 'password';
                toggleBtn.innerHTML = '<img src="./assets/icons/vision-on.svg" alt="Mostrar Senha">';
            }
        });

        return toggleBtn;
    }

    const toggleBtn = createPasswordToggleBtn(passwordInput);
    passwordLoginDiv.appendChild(toggleBtn);

    // const rememberPasswordDiv = document.createElement('div');
    // rememberPasswordDiv.id = 'remember-password';
    // loginCompleteSection.appendChild(rememberPasswordDiv);

    // const rememberAllPasswordDiv = document.createElement('div');
    // rememberAllPasswordDiv.id = 'remember-all-password';
    // rememberPasswordDiv.appendChild(rememberAllPasswordDiv);

    // const rememberPasswordInput = document.createElement('input');
    // rememberPasswordInput.type = 'checkbox';
    // rememberPasswordInput.id = 'remember-passw';
    // rememberPasswordInput.alt = 'lembrar senha';
    // const rememberPasswordLabel = document.createElement('label');
    // rememberPasswordLabel.textContent = 'Lembrar minha senha';
    // rememberPasswordLabel.setAttribute('for', 'remember-passw');
    // rememberAllPasswordDiv.appendChild(rememberPasswordInput);
    // rememberAllPasswordDiv.appendChild(rememberPasswordLabel);

    const loginButton = document.createElement('button');
    loginButton.type = 'button';
    loginButton.id = 'loginPage-btn';
    loginButton.alt = 'Entrar';
    loginButton.textContent = 'Entrar';

    // loginButton.addEventListener("click", (e) => {
    //     e.preventDefault();
    //     console.log("click");
    //     dispatchOnStateChange("/home");
    // })
    loginFormDiv.appendChild(loginButton);

    function validateLoginForm() {
        const email = document.getElementById("email-login").value;
        const password = document.getElementById("password-login").value;
        const regex = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
        const emailValid = regex.test(email);

        if (!email || !password) {
            showToast("Por favor, preencha todos os campos.");
            return false;
        }
        else if ( emailValid === false){
            showToast("Insira um endereço de email valido!");
            return false
        }
        return true;
    }

    function submitLoginForm() {
        const email = document.getElementById("email-login").value;
        const password = document.getElementById("password-login").value;

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else if (response.status === 400 || response.status === 401) {
                    return response.json().then(data => {
                        showToast(data.error);
                        throw new Error(data.error);
                    });
                } else {
                    throw new Error('Erro interno no servidor');
                }
            })
            .then(data => {
                dispatchOnStateChange("/home");
                showToast('Login realizado com sucesso');
            })
            .catch(error => {
                console.error(error);
            });
    }

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (validateLoginForm()) {
            submitLoginForm();
        }
    });

    bodyLogin.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if (validateLoginForm()) {
                submitLoginForm();
            }
        }
    });

    home.addEventListener("click", () => {
        dispatchOnStateChange("/")
    })

    return bodyLogin;
};

export default createLoginForm;
