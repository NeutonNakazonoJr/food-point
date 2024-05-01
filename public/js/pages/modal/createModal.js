import  htmlCreator  from '../../utils/htmlCreator.js';

export default function createModal(innerContainer) {
    const modalContainer = htmlCreator.createDiv('modal');
    modalContainer.style.display = 'flex';
    modalContainer.appendChild(innerContainer);

    function closeModal(event) {
        if (event.target === modalContainer) {
          modalContainer.style.display = 'none';
        }
    }
      
    window.onclick = function(event) {
        closeModal(event);
    }

    return modalContainer;
}