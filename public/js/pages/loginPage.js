import dispatchOnStateChange from "../events/onStateChange.js";
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
    emailInput.id = "email-login"
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
    passwordInput.id = "password-login"
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
    loginButton.id = 'loginPage-btn';
    loginButton.alt = 'Entrar';
    loginButton.textContent = 'Entrar';

    // loginButton.addEventListener("click", (e) => {
    //     e.preventDefault();
    //     console.log("click");
    //     dispatchOnStateChange("/home");
    // })
    loginFormDiv.appendChild(loginButton);

    function showToast(message, duration = 3000) {
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('hide');
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, duration);
    }

    function validateLoginForm() {
        const email = document.getElementById("email-login").value;
        const password = document.getElementById("password-login").value;

        if (!email || !password) {
            showToast("Por favor, preencha todos os campos.");
            return false;
        }

        return true;
    }

    function submitLoginForm() {
        const email = document.getElementById("email-login").value;
        const password = document.getElementById("password-login").value;

        fetch('https://149.28.40.46/login', {
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
                console.log(data);
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



    return bodyLogin;
};

export default createLoginForm;