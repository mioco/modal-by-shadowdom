import Modal from '../src/Modal';

const confirmButton = document.querySelector('#confirmButton');
const tempButton = document.querySelector('#tempButton');
const slotButton = document.querySelector('#slotButton');

const onClose = () => alert('modal close callback');

const onComfirm = (modal) => {
  alert('modal comfirm');
  modal.close();
};

const onCancel = (modal) => {
  alert('modal cancel');
  modal.close();
};

// ===================== Function mode =====================

const confirmButtons = [
  { text: 'confirm', action: onComfirm },
  { text: 'cancel', action: onCancel },
];

const confirmModal = new Modal({
  name: 'confirm-modal',
  onClose,
  onComfirm,
  onCancel,
  buttons: confirmButtons,
  content: 'this is a confirm modal',
  container: document.querySelector('#confirm'),
});

confirmButton.addEventListener('click', () => {
  confirmModal.show()
});

// ===================== Function mode with template content =====================

const tempModal = new Modal({
  name: 'temp-modal',
  onClose,
  content: document.importNode(document.querySelector('#content').content, true),
  buttons: [{ text: 'ok i know', action: onCancel }],
  container: document.querySelector('#template'),
});

tempButton.addEventListener('click', tempModal.show);

// ===================== Shadow slot =====================

const slotModal = new Modal({
  name: 'slot-modal',
});

window.onComfirmClick = () => onComfirm(slotModal);
window.onCancelClick = () => onCancel(slotModal);

slotButton.addEventListener('click', slotModal.show);
