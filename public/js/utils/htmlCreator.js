
const htmlCreator = {

    createDiv: (divId) => {
        const div = document.createElement('div');
    
        if (divId) {
            if (divId.includes('.')) {
                div.classList.add(divId.substring(1));
                return div;
            }    

            div.id = divId;
        }
      
        return div;
    },

    createSection: (sectionId) => {
        const section = document.createElement('section');
        sectionId ? section.id = sectionId : null;
        return section;
    },

    createTitle: (titleType, innerText, titleId) => {
        const title = document.createElement(titleType);
        title.innerText = innerText;

        if (titleId) {
            titleId.includes('.') ? title.classList.add(titleId) : title.id = titleId;
        }
        
        return title;
    },

    createSpan: (innerText) => {
        const span = document.createElement('span');
        span.innerText = innerText;
        return span;
    },

    createImg: (url, id) => {
        const img = document.createElement('img');
    
        img.src = url;
        if (id) {
            img.id = id;
        }
    
        return img;
    },


    createInput: (type, id, placeholder, className, value, pattern) => {
        const input = document.createElement('input');
    
        type ? input.type = type : null;
        id ? input.id = id : null;
        placeholder ? input.placeholder = placeholder : null;
        className ? input.classList.add = className : null;
        value ? input.value = value : null;
        pattern ? input.pattern = pattern : null;
    
        return input;
    },

    createForm: (formTitle = "", formInputs = [{ type: '', id: '', placeholder: '', className: '', labelText: '', pattern: '' }], submitBtnName = '') => {
        const form = document.createElement('form');
    
        if (formTitle) {
            formTitle = htmlCreator.createTitle('h2', formTitle);
            form.appendChild(formTitle);
        }
    
        formInputs.forEach(input => {
            const { type, id, placeholder, className, value, pattern } = input;
            const newInput = htmlCreator.createInput(type, id, placeholder, className, value, pattern);
    
            if (input.labelText) {
    
                const divInput = htmlCreator.createDiv('.div-input-form');
    
                const label = document.createElement('label');
                label.innerText = input.labelText;
                label.setAttribute('for', id);
                divInput.appendChild(label)
                divInput.appendChild(newInput);
                form.appendChild(divInput);
            } else {
                form.appendChild(newInput);
            }
        })
    
        if (submitBtnName) {
            submitBtnName = htmlCreator.createButton(submitBtnName, 'submit-btn');
            form.appendChild(submitBtnName)
        }
    
        return form;
    }, 

    createNav: (navId, navClass) => {

        const nav = document.createElement('nav');
        navId ? nav.id = navId : null;
        navClass ? nav.classList = navClass : null;

        return nav;
    },

    createList: (listId, listClass, arrayItems) => {

        const list = document.createElement('ul');

        listId ? list.id = listId : null;
        listClass ? list.classList = listClass : null;

        arrayItems.forEach(item => {
            const li = document.createElement('li');
            li.innerText = item;
            list.appendChild(li)
        });

        return list;
    },

    createButton: (innerTextButton, buttonId, buttonClass) => {
        const btn = document.createElement('button');
        btn.innerText = innerTextButton;

        buttonId ? btn.id = buttonId : null;
        buttonClass ? btn.classList = buttonClass : null;
        
        return btn;
    },

    createParagraph: (innerText) => {
        const p = document.createElement('p');
        p.innerText = innerText;
        return p;
    }
}

export default htmlCreator;