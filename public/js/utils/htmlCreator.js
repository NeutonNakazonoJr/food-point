
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

    
    createInput: (inputOptions = { type, id, placeholder, className, value, pattern, labelText, classNameDiv }) => {
        const input = document.createElement('input');
    
        inputOptions.type ? input.type = inputOptions.type : null;
        inputOptions.id ? input.id = inputOptions.id : null;
        inputOptions.placeholder ? input.placeholder = inputOptions.placeholder : null;
        inputOptions.className ? input.classList.add(inputOptions.className) : null;
        inputOptions.value ? input.value = inputOptions.value : null;
        inputOptions.pattern ? input.pattern = inputOptions.pattern : null;
        if (inputOptions.labelText) {
            const label = document.createElement('label');
            label.innerText = inputOptions.labelText;
            label.setAttribute('for', inputOptions.id);
            
            const divInput = htmlCreator.createDiv();
            divInput.appendChild(label)
            divInput.appendChild(input);

            if (inputOptions.classNameDiv) {
                divInput.classList.add(inputOptions.classNameDiv);
            }
            return divInput;
        }
    
        return input;
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


    createForm: (formId = '', formTitle = "", inputOptions = [{type, id, placeholder, className, value, pattern, labelText, classNameDiv}], submitBtnName = '') => {
        const form = document.createElement('form');
        
        formId ? form.id = formId : null;

        if (formTitle) {
            formTitle = htmlCreator.createTitle('h2', formTitle);
            form.appendChild(formTitle);
        }
        
        inputOptions.forEach(inputInfos => {
            const newInput = htmlCreator.createInput(inputInfos);
            form.appendChild(newInput);
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

    createButton: (innerTextButton ='', buttonId = '', buttonClass = '') => {
        const btn = document.createElement('button');

        innerTextButton ? btn.innerText = innerTextButton : null;

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