import { putRecoverPassword } from "../api/passwordApi.js";
import htmlCreator from "../utils/htmlCreator.js";
import showToast from "../components/toast.js";
import dispatchOnStateChange from "../events/onStateChange.js";

export default function createForgetPasswordPage() {

    const inputOptions = [
        {
            type: 'password',
            id: 'forget-pass-input',
            classname: 'forget-pass-input-class',
            placeholder: 'Digite sua senha ex: aholose1',
        },
        {
            type: 'password',
            classname: 'forget-pass-input-class',
            placeholder: 'Digite novamente a senha',
        },
    ];

    const form = document.createElement('form');
    form.id = 'form-forget-pass';

    const inputCode = htmlCreator.createInput({type: 'text', id: 'input-code', labelText: 'Cole o códido de validação'});

    const eyeIconOne = document.createElement('img');
    eyeIconOne.src = './assets/icons/password-symbol.svg';
    eyeIconOne.classList.add = 'eye-icon-new-password';

    const inputPassword = htmlCreator.createInput(inputOptions[0]);
    const inputContainer = document.createElement('div');
    inputContainer.appendChild(inputPassword);
    inputContainer.appendChild(eyeIconOne);

    const eyeIconTwo = document.createElement('img');
    eyeIconTwo.src = './assets/icons/password-symbol.svg';
    eyeIconTwo.classList.add = 'eye-icon-new-password';

    const secondInputPassword = htmlCreator.createInput(inputOptions[1]);
    const secontInputContainer = document.createElement('div');
    secontInputContainer.appendChild(secondInputPassword);
    secontInputContainer.appendChild(eyeIconTwo);

    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.innerText = 'Recuperar Senha';
    fieldset.appendChild(legend);

    const submitBtn = htmlCreator.createButton('Confirmar', 'submit-recover-pass');

    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const token = document.getElementById('input-code').value;
        const password = document.getElementById('forget-pass-input').value

        const updateRequestPass = await putRecoverPassword({token, password});
        
        if (updateRequestPass.error) {
            showToast(updateRequestPass.error);
        } else {
            showToast(updateRequestPass.message);
            dispatchOnStateChange('/login');
        }
    })


    fieldset.appendChild(inputCode);
    fieldset.appendChild(inputContainer);
    fieldset.appendChild(secontInputContainer);
    fieldset.appendChild(submitBtn);
    form.appendChild(fieldset);

    const recoverPasswordContainer = htmlCreator.createSection('recover-pass-container');
    recoverPasswordContainer.appendChild(form);

    const main = document.createElement('main');
    main.appendChild(recoverPasswordContainer);

    const wrapper = document.createDocumentFragment();
	wrapper.appendChild(main);

    return wrapper;
}