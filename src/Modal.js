/**
 * TODO:
 * 1. click overlay to close modal
 * 2. custom content (can be text or element)
 * 3. custom button text
 * 4. close / confirm / cancel callback
 */

const style = document.createElement('template');
style.innerHTML = `
  <style>
    :host {
      width: 100%;
      height: 100%;
      background: var(--overlay-background, rgba(0, 0, 0, .3));
      position: absolute;
      top: 0;
      left: 0;
      display: none;
    }
    :host([show]) {
      display: flex;
    }
    content {
      margin: auto;
      padding: 10px;
      background: var(--content-background, #fff);
    }
  </style>
  <content>
    <slot name="content" display="none"></slot>
    <slot name="footer"></slot>
  </content>
`;

const createDOM = (tag, props, content) => {

  const dom = document.createElement(tag);
  props && Object.entries(props).forEach(p => dom.setAttribute(...p));

  if (typeof content === 'string') {
    dom.insertAdjacentHTML('beforeend', content);
  }

  if (content instanceof HTMLElement || content instanceof DocumentFragment) {
    dom.appendChild(content);
  }

  if (Array.isArray(content)) {
    content.forEach(item => dom.appendChild(item));
  }

  return dom;
};

export default class Modal {
  constructor(options) {
    const {
      onClose,
      onComfirm,
      onCancel,
      buttons = [],
      content = '',
      container = document.body,
      name,
      className = name,
    } = options;

    if (!name) {
      throw new Error(`options 'name' is required`);
    }

    Object.assign(this, {
      onClose, onComfirm, onCancel, buttons, content, container, className, name
    });

    this.init();
  }

  eventMap = new Map();

  init = () => {
    const that = this;
    const { name, contentInit, eventInit } = this;

    // if the modal is not yet defined, the constructor would be HTMLElement
    // custom element only define once time
    if (document.createElement(name).constructor === HTMLElement) {
      // use shadow dom for encapsulate styles
      window.customElements.define(name, class extends HTMLElement {
        constructor() {
          super();
          this.attachShadow({ mode: 'open' });
  
          this.shadowRoot.appendChild(style.content.cloneNode(true));
          
          that.wrapper = this;

          customElements.whenDefined(name).then(() => {
            contentInit(this);
            eventInit(this);
          })
        }
      });
    }
  }

  contentInit = (wrapper) => {
    const { container, content, className, buttons } = this;
    !container && (this.container = document.body);

    if (buttons || content) {
      const innerDOM = createDOM('div', { class: `${className}__content` }, content);
  
      const footerDOM = createDOM('div', { class: `${className}__footer` });
      
      if (Array.isArray(buttons)) {
        buttons.forEach(({ text, action }) => {
          const btn = createDOM('button', {}, text);
          // register click event
          this.eventMap.set(btn, action);
          footerDOM.appendChild(btn);
        });
      }
    
      const contentDOM = wrapper.shadowRoot.querySelector('content');
      
      [innerDOM, footerDOM].forEach(d => contentDOM.appendChild(d));

      wrapper.shadowRoot.appendChild(contentDOM);

      // non-zero length slot indicates that the modal has been declared in html
      if (!wrapper.shadowRoot.querySelector('slot').assignedNodes().length) {
        container.appendChild(wrapper);
      }
    }
  }

  eventInit = (wrapper) => {
    wrapper.addEventListener('click', (e) => {
      const action = this.eventMap.get(e.path[0]);
      if (action instanceof Function) action(this, e);
    });

    // click overlay can close the modal
    this.eventMap.set(wrapper, this.close);
  }

  show = () => {
    if (!this.wrapper) this.init();
    this.wrapper.setAttribute('show', '');
  }

  close = () => {
    const { onClose } = this;
    this.wrapper.removeAttribute('show');
    if (onClose instanceof Function) onClose();
  }
}