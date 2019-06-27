/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./example/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./example/index.js":
/*!**************************!*\
  !*** ./example/index.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_Modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/Modal */ "./src/Modal.js");

const confirmButton = document.querySelector('#confirmButton');
const tempButton = document.querySelector('#tempButton');
const slotButton = document.querySelector('#slotButton');

const onClose = () => alert('modal close callback');

const onComfirm = modal => {
  alert('modal comfirm');
  modal.close();
};

const onCancel = modal => {
  alert('modal cancel');
  modal.close();
}; // ===================== Function mode =====================


const confirmButtons = [{
  text: 'confirm',
  action: onComfirm
}, {
  text: 'cancel',
  action: onCancel
}];
const confirmModal = new _src_Modal__WEBPACK_IMPORTED_MODULE_0__["default"]({
  name: 'confirm-modal',
  onClose,
  onComfirm,
  onCancel,
  buttons: confirmButtons,
  content: 'this is a confirm modal',
  container: document.querySelector('#confirm')
});
confirmButton.addEventListener('click', () => {
  confirmModal.show();
}); // ===================== Function mode with template content =====================

const tempModal = new _src_Modal__WEBPACK_IMPORTED_MODULE_0__["default"]({
  name: 'temp-modal',
  onClose,
  content: document.importNode(document.querySelector('#content').content, true),
  buttons: [{
    text: 'ok i know',
    action: onCancel
  }],
  container: document.querySelector('#template')
});
tempButton.addEventListener('click', tempModal.show); // ===================== Shadow slot =====================

const slotModal = new _src_Modal__WEBPACK_IMPORTED_MODULE_0__["default"]({
  name: 'slot-modal'
});

window.onComfirmClick = () => onComfirm(slotModal);

window.onCancelClick = () => onCancel(slotModal);

slotButton.addEventListener('click', slotModal.show);

/***/ }),

/***/ "./src/Modal.js":
/*!**********************!*\
  !*** ./src/Modal.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Modal; });
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

class Modal {
  constructor(options) {
    this.eventMap = new Map();

    this.init = () => {
      const that = this;
      const {
        name,
        contentInit,
        eventInit
      } = this; // if the modal is not yet defined, the constructor would be HTMLElement
      // custom element only define once time

      if (document.createElement(name).constructor === HTMLElement) {
        // use shadow dom for encapsulate styles
        window.customElements.define(name, class extends HTMLElement {
          constructor() {
            super();
            this.attachShadow({
              mode: 'open'
            });
            this.shadowRoot.appendChild(style.content.cloneNode(true));
            that.wrapper = this;
            customElements.whenDefined(name).then(() => {
              contentInit(this);
              eventInit(this);
            });
          }

        });
      }
    };

    this.contentInit = wrapper => {
      const {
        container,
        content,
        className,
        buttons
      } = this;
      !container && (this.container = document.body);

      if (buttons || content) {
        const innerDOM = createDOM('div', {
          class: `${className}__content`
        }, content);
        const footerDOM = createDOM('div', {
          class: `${className}__footer`
        });

        if (Array.isArray(buttons)) {
          buttons.forEach(({
            text,
            action
          }) => {
            const btn = createDOM('button', {}, text); // register click event

            this.eventMap.set(btn, action);
            footerDOM.appendChild(btn);
          });
        }

        const contentDOM = wrapper.shadowRoot.querySelector('content');
        [innerDOM, footerDOM].forEach(d => contentDOM.appendChild(d));
        wrapper.shadowRoot.appendChild(contentDOM); // non-zero length slot indicates that the modal has been declared in html

        if (!wrapper.shadowRoot.querySelector('slot').assignedNodes().length) {
          container.appendChild(wrapper);
        }
      }
    };

    this.eventInit = wrapper => {
      wrapper.addEventListener('click', e => {
        const action = this.eventMap.get(e.path[0]);
        if (action instanceof Function) action(this, e);
      }); // click overlay can close the modal

      this.eventMap.set(wrapper, this.close);
    };

    this.show = () => {
      if (!this.wrapper) this.init();
      this.wrapper.setAttribute('show', '');
    };

    this.close = () => {
      const {
        onClose
      } = this;
      this.wrapper.removeAttribute('show');
      if (onClose instanceof Function) onClose();
    };

    const {
      onClose: _onClose,
      onComfirm,
      onCancel,
      buttons: _buttons = [],
      content: _content = '',
      container: _container = document.body,
      name: _name,
      className: _className = _name
    } = options;

    if (!_name) {
      throw new Error(`options 'name' is required`);
    }

    Object.assign(this, {
      onClose: _onClose,
      onComfirm,
      onCancel,
      buttons: _buttons,
      content: _content,
      container: _container,
      className: _className,
      name: _name
    });
    this.init();
  }

}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZXhhbXBsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTW9kYWwuanMiXSwibmFtZXMiOlsiY29uZmlybUJ1dHRvbiIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInRlbXBCdXR0b24iLCJzbG90QnV0dG9uIiwib25DbG9zZSIsImFsZXJ0Iiwib25Db21maXJtIiwibW9kYWwiLCJjbG9zZSIsIm9uQ2FuY2VsIiwiY29uZmlybUJ1dHRvbnMiLCJ0ZXh0IiwiYWN0aW9uIiwiY29uZmlybU1vZGFsIiwiTW9kYWwiLCJuYW1lIiwiYnV0dG9ucyIsImNvbnRlbnQiLCJjb250YWluZXIiLCJhZGRFdmVudExpc3RlbmVyIiwic2hvdyIsInRlbXBNb2RhbCIsImltcG9ydE5vZGUiLCJzbG90TW9kYWwiLCJ3aW5kb3ciLCJvbkNvbWZpcm1DbGljayIsIm9uQ2FuY2VsQ2xpY2siLCJzdHlsZSIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJjcmVhdGVET00iLCJ0YWciLCJwcm9wcyIsImRvbSIsIk9iamVjdCIsImVudHJpZXMiLCJmb3JFYWNoIiwicCIsInNldEF0dHJpYnV0ZSIsImluc2VydEFkamFjZW50SFRNTCIsIkhUTUxFbGVtZW50IiwiRG9jdW1lbnRGcmFnbWVudCIsImFwcGVuZENoaWxkIiwiQXJyYXkiLCJpc0FycmF5IiwiaXRlbSIsImNvbnN0cnVjdG9yIiwib3B0aW9ucyIsImV2ZW50TWFwIiwiTWFwIiwiaW5pdCIsInRoYXQiLCJjb250ZW50SW5pdCIsImV2ZW50SW5pdCIsImN1c3RvbUVsZW1lbnRzIiwiZGVmaW5lIiwiYXR0YWNoU2hhZG93IiwibW9kZSIsInNoYWRvd1Jvb3QiLCJjbG9uZU5vZGUiLCJ3cmFwcGVyIiwid2hlbkRlZmluZWQiLCJ0aGVuIiwiY2xhc3NOYW1lIiwiYm9keSIsImlubmVyRE9NIiwiY2xhc3MiLCJmb290ZXJET00iLCJidG4iLCJzZXQiLCJjb250ZW50RE9NIiwiZCIsImFzc2lnbmVkTm9kZXMiLCJsZW5ndGgiLCJlIiwiZ2V0IiwicGF0aCIsIkZ1bmN0aW9uIiwicmVtb3ZlQXR0cmlidXRlIiwiRXJyb3IiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBRUEsTUFBTUEsYUFBYSxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQXRCO0FBQ0EsTUFBTUMsVUFBVSxHQUFHRixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBbkI7QUFDQSxNQUFNRSxVQUFVLEdBQUdILFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixhQUF2QixDQUFuQjs7QUFFQSxNQUFNRyxPQUFPLEdBQUcsTUFBTUMsS0FBSyxDQUFDLHNCQUFELENBQTNCOztBQUVBLE1BQU1DLFNBQVMsR0FBSUMsS0FBRCxJQUFXO0FBQzNCRixPQUFLLENBQUMs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QSxRQURJO0FBRUpFLGVBRkk7QUFHSkcsY0FISTtBQUlKTyxhQUFPLEVBQVBBLFFBQU8sR0FBRyxFQUpOO0FBS0pDLGFBQU8sRUFBUEEsUUFBTyxHQUFHLEVBTE47QUFNSkMsZUFBUyxFQUFUQSxVQUFTLEdBQUdsQixRQUFRLENBQUNnRSxJQU5qQjtBQU9KakQsVUFBSSxFQUFKQSxLQVBJO0FBUUpnRCxlQUFTLEVBQVRBLFVBQVMsR0FBR2hEO0FBUlIsUUFTRmdDLE9BVEo7O0FBV0EsUUFBSSxDQUFDaEMsS0FBTCxFQUFXO0FBQ1QsWUFBTSxJQUFJZ0UsS0FBSixDQUFXLDRCQUFYLENBQU47QUFDRDs7QUFFRDdDLFVBQU0sQ0FBQzhDLE1BQVAsQ0FBYyxJQUFkLEVBQW9CO0FBQ2xCNUUsYUFBTyxFQUFQQSxRQURrQjtBQUNURSxlQURTO0FBQ0VHLGNBREY7QUFDWU8sYUFBTyxFQUFQQSxRQURaO0FBQ3FCQyxhQUFPLEVBQVBBLFFBRHJCO0FBQzhCQyxlQUFTLEVBQVRBLFVBRDlCO0FBQ3lDNkMsZUFBUyxFQUFUQSxVQUR6QztBQUNvRGhELFVBQUksRUFBSkE7QUFEcEQsS0FBcEI7QUFJQSxTQUFLbUMsSUFBTDtBQUNEOztBQXRCd0IsQyIsImZpbGUiOiJtb2RhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vZXhhbXBsZS9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBNb2RhbCBmcm9tICcuLi9zcmMvTW9kYWwnO1xuXG5jb25zdCBjb25maXJtQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbmZpcm1CdXR0b24nKTtcbmNvbnN0IHRlbXBCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGVtcEJ1dHRvbicpO1xuY29uc3Qgc2xvdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzbG90QnV0dG9uJyk7XG5cbmNvbnN0IG9uQ2xvc2UgPSAoKSA9PiBhbGVydCgnbW9kYWwgY2xvc2UgY2FsbGJhY2snKTtcblxuY29uc3Qgb25Db21maXJtID0gKG1vZGFsKSA9PiB7XG4gIGFsZXJ0KCdtb2RhbCBjb21maXJtJyk7XG4gIG1vZGFsLmNsb3NlKCk7XG59O1xuXG5jb25zdCBvbkNhbmNlbCA9IChtb2RhbCkgPT4ge1xuICBhbGVydCgnbW9kYWwgY2FuY2VsJyk7XG4gIG1vZGFsLmNsb3NlKCk7XG59O1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT0gRnVuY3Rpb24gbW9kZSA9PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgY29uZmlybUJ1dHRvbnMgPSBbXG4gIHsgdGV4dDogJ2NvbmZpcm0nLCBhY3Rpb246IG9uQ29tZmlybSB9LFxuICB7IHRleHQ6ICdjYW5jZWwnLCBhY3Rpb246IG9uQ2FuY2VsIH0sXG5dO1xuXG5jb25zdCBjb25maXJtTW9kYWwgPSBuZXcgTW9kYWwoe1xuICBuYW1lOiAnY29uZmlybS1tb2RhbCcsXG4gIG9uQ2xvc2UsXG4gIG9uQ29tZmlybSxcbiAgb25DYW5jZWwsXG4gIGJ1dHRvbnM6IGNvbmZpcm1CdXR0b25zLFxuICBjb250ZW50OiAndGhpcyBpcyBhIGNvbmZpcm0gbW9kYWwnLFxuICBjb250YWluZXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb25maXJtJyksXG59KTtcblxuY29uZmlybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgY29uZmlybU1vZGFsLnNob3coKVxufSk7XG5cbi8vID09PT09PT09PT09PT09PT09PT09PSBGdW5jdGlvbiBtb2RlIHdpdGggdGVtcGxhdGUgY29udGVudCA9PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgdGVtcE1vZGFsID0gbmV3IE1vZGFsKHtcbiAgbmFtZTogJ3RlbXAtbW9kYWwnLFxuICBvbkNsb3NlLFxuICBjb250ZW50OiBkb2N1bWVudC5pbXBvcnROb2RlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250ZW50JykuY29udGVudCwgdHJ1ZSksXG4gIGJ1dHRvbnM6IFt7IHRleHQ6ICdvayBpIGtub3cnLCBhY3Rpb246IG9uQ2FuY2VsIH1dLFxuICBjb250YWluZXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0ZW1wbGF0ZScpLFxufSk7XG5cbnRlbXBCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0ZW1wTW9kYWwuc2hvdyk7XG5cbi8vID09PT09PT09PT09PT09PT09PT09PSBTaGFkb3cgc2xvdCA9PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3Qgc2xvdE1vZGFsID0gbmV3IE1vZGFsKHtcbiAgbmFtZTogJ3Nsb3QtbW9kYWwnLFxufSk7XG5cbndpbmRvdy5vbkNvbWZpcm1DbGljayA9ICgpID0+IG9uQ29tZmlybShzbG90TW9kYWwpO1xud2luZG93Lm9uQ2FuY2VsQ2xpY2sgPSAoKSA9PiBvbkNhbmNlbChzbG90TW9kYWwpO1xuXG5zbG90QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2xvdE1vZGFsLnNob3cpO1xuIiwiLyoqXG4gKiBUT0RPOlxuICogMS4gY2xpY2sgb3ZlcmxheSB0byBjbG9zZSBtb2RhbFxuICogMi4gY3VzdG9tIGNvbnRlbnQgKGNhbiBiZSB0ZXh0IG9yIGVsZW1lbnQpXG4gKiAzLiBjdXN0b20gYnV0dG9uIHRleHRcbiAqIDQuIGNsb3NlIC8gY29uZmlybSAvIGNhbmNlbCBjYWxsYmFja1xuICovXG5cbmNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbnN0eWxlLmlubmVySFRNTCA9IGBcbiAgPHN0eWxlPlxuICAgIDpob3N0IHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tb3ZlcmxheS1iYWNrZ3JvdW5kLCByZ2JhKDAsIDAsIDAsIC4zKSk7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDA7XG4gICAgICBsZWZ0OiAwO1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gICAgOmhvc3QoW3Nob3ddKSB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgIH1cbiAgICBjb250ZW50IHtcbiAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1jb250ZW50LWJhY2tncm91bmQsICNmZmYpO1xuICAgIH1cbiAgPC9zdHlsZT5cbiAgPGNvbnRlbnQ+XG4gICAgPHNsb3QgbmFtZT1cImNvbnRlbnRcIiBkaXNwbGF5PVwibm9uZVwiPjwvc2xvdD5cbiAgICA8c2xvdCBuYW1lPVwiZm9vdGVyXCI+PC9zbG90PlxuICA8L2NvbnRlbnQ+XG5gO1xuXG5jb25zdCBjcmVhdGVET00gPSAodGFnLCBwcm9wcywgY29udGVudCkgPT4ge1xuXG4gIGNvbnN0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgcHJvcHMgJiYgT2JqZWN0LmVudHJpZXMocHJvcHMpLmZvckVhY2gocCA9PiBkb20uc2V0QXR0cmlidXRlKC4uLnApKTtcblxuICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgZG9tLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgY29udGVudCk7XG4gIH1cblxuICBpZiAoY29udGVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50IHx8IGNvbnRlbnQgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSB7XG4gICAgZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoY29udGVudCkpIHtcbiAgICBjb250ZW50LmZvckVhY2goaXRlbSA9PiBkb20uYXBwZW5kQ2hpbGQoaXRlbSkpO1xuICB9XG5cbiAgcmV0dXJuIGRvbTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZGFsIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uQ2xvc2UsXG4gICAgICBvbkNvbWZpcm0sXG4gICAgICBvbkNhbmNlbCxcbiAgICAgIGJ1dHRvbnMgPSBbXSxcbiAgICAgIGNvbnRlbnQgPSAnJyxcbiAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmJvZHksXG4gICAgICBuYW1lLFxuICAgICAgY2xhc3NOYW1lID0gbmFtZSxcbiAgICB9ID0gb3B0aW9ucztcblxuICAgIGlmICghbmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBvcHRpb25zICduYW1lJyBpcyByZXF1aXJlZGApO1xuICAgIH1cblxuICAgIE9iamVjdC5hc3NpZ24odGhpcywge1xuICAgICAgb25DbG9zZSwgb25Db21maXJtLCBvbkNhbmNlbCwgYnV0dG9ucywgY29udGVudCwgY29udGFpbmVyLCBjbGFzc05hbWUsIG5hbWVcbiAgICB9KTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgZXZlbnRNYXAgPSBuZXcgTWFwKCk7XG5cbiAgaW5pdCA9ICgpID0+IHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICBjb25zdCB7IG5hbWUsIGNvbnRlbnRJbml0LCBldmVudEluaXQgfSA9IHRoaXM7XG5cbiAgICAvLyBpZiB0aGUgbW9kYWwgaXMgbm90IHlldCBkZWZpbmVkLCB0aGUgY29uc3RydWN0b3Igd291bGQgYmUgSFRNTEVsZW1lbnRcbiAgICAvLyBjdXN0b20gZWxlbWVudCBvbmx5IGRlZmluZSBvbmNlIHRpbWVcbiAgICBpZiAoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lKS5jb25zdHJ1Y3RvciA9PT0gSFRNTEVsZW1lbnQpIHtcbiAgICAgIC8vIHVzZSBzaGFkb3cgZG9tIGZvciBlbmNhcHN1bGF0ZSBzdHlsZXNcbiAgICAgIHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUobmFtZSwgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gIFxuICAgICAgICAgIHRoaXMuc2hhZG93Um9vdC5hcHBlbmRDaGlsZChzdHlsZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICAgICAgXG4gICAgICAgICAgdGhhdC53cmFwcGVyID0gdGhpcztcblxuICAgICAgICAgIGN1c3RvbUVsZW1lbnRzLndoZW5EZWZpbmVkKG5hbWUpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29udGVudEluaXQodGhpcyk7XG4gICAgICAgICAgICBldmVudEluaXQodGhpcyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29udGVudEluaXQgPSAod3JhcHBlcikgPT4ge1xuICAgIGNvbnN0IHsgY29udGFpbmVyLCBjb250ZW50LCBjbGFzc05hbWUsIGJ1dHRvbnMgfSA9IHRoaXM7XG4gICAgIWNvbnRhaW5lciAmJiAodGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5ib2R5KTtcblxuICAgIGlmIChidXR0b25zIHx8IGNvbnRlbnQpIHtcbiAgICAgIGNvbnN0IGlubmVyRE9NID0gY3JlYXRlRE9NKCdkaXYnLCB7IGNsYXNzOiBgJHtjbGFzc05hbWV9X19jb250ZW50YCB9LCBjb250ZW50KTtcbiAgXG4gICAgICBjb25zdCBmb290ZXJET00gPSBjcmVhdGVET00oJ2RpdicsIHsgY2xhc3M6IGAke2NsYXNzTmFtZX1fX2Zvb3RlcmAgfSk7XG4gICAgICBcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGJ1dHRvbnMpKSB7XG4gICAgICAgIGJ1dHRvbnMuZm9yRWFjaCgoeyB0ZXh0LCBhY3Rpb24gfSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGJ0biA9IGNyZWF0ZURPTSgnYnV0dG9uJywge30sIHRleHQpO1xuICAgICAgICAgIC8vIHJlZ2lzdGVyIGNsaWNrIGV2ZW50XG4gICAgICAgICAgdGhpcy5ldmVudE1hcC5zZXQoYnRuLCBhY3Rpb24pO1xuICAgICAgICAgIGZvb3RlckRPTS5hcHBlbmRDaGlsZChidG4pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICBcbiAgICAgIGNvbnN0IGNvbnRlbnRET00gPSB3cmFwcGVyLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignY29udGVudCcpO1xuICAgICAgXG4gICAgICBbaW5uZXJET00sIGZvb3RlckRPTV0uZm9yRWFjaChkID0+IGNvbnRlbnRET00uYXBwZW5kQ2hpbGQoZCkpO1xuXG4gICAgICB3cmFwcGVyLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoY29udGVudERPTSk7XG5cbiAgICAgIC8vIG5vbi16ZXJvIGxlbmd0aCBzbG90IGluZGljYXRlcyB0aGF0IHRoZSBtb2RhbCBoYXMgYmVlbiBkZWNsYXJlZCBpbiBodG1sXG4gICAgICBpZiAoIXdyYXBwZXIuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCdzbG90JykuYXNzaWduZWROb2RlcygpLmxlbmd0aCkge1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQod3JhcHBlcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZXZlbnRJbml0ID0gKHdyYXBwZXIpID0+IHtcbiAgICB3cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMuZXZlbnRNYXAuZ2V0KGUucGF0aFswXSk7XG4gICAgICBpZiAoYWN0aW9uIGluc3RhbmNlb2YgRnVuY3Rpb24pIGFjdGlvbih0aGlzLCBlKTtcbiAgICB9KTtcblxuICAgIC8vIGNsaWNrIG92ZXJsYXkgY2FuIGNsb3NlIHRoZSBtb2RhbFxuICAgIHRoaXMuZXZlbnRNYXAuc2V0KHdyYXBwZXIsIHRoaXMuY2xvc2UpO1xuICB9XG5cbiAgc2hvdyA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMud3JhcHBlcikgdGhpcy5pbml0KCk7XG4gICAgdGhpcy53cmFwcGVyLnNldEF0dHJpYnV0ZSgnc2hvdycsICcnKTtcbiAgfVxuXG4gIGNsb3NlID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgb25DbG9zZSB9ID0gdGhpcztcbiAgICB0aGlzLndyYXBwZXIucmVtb3ZlQXR0cmlidXRlKCdzaG93Jyk7XG4gICAgaWYgKG9uQ2xvc2UgaW5zdGFuY2VvZiBGdW5jdGlvbikgb25DbG9zZSgpO1xuICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ==