## Shadow-DOM-Modal

I haven't written shadow dom since before, so this is a project that started for practice.

[live demo](https://mioco.github.io/modal-by-shadowdom-demo/index.html)
### Example

#### Base

````
const modal = new Modal({
  name: 'modal',
  buttons: [{ action: ({ close }) => close(), text: 'close' }],
  content: 'this is a modal',
});

modal.show();
````

#### With template content

````
<template id="template">
  <p>this is a modal</p>
</template>
````

````
const { content } = document.querySelector('#template');
const modal = new Modal({
  name: 'modal',
  content: document.importNode(content, true),
  buttons: [{ action: ({ close }) => close(), text: 'close' }],
});
````

#### With Shadow slot

````
<slot-modal>
  <h3 slot="content">This is a Modal create by slot mode</h3>
  <p slot="content">
    This is a Modal create by template mode.
  </p>
  <div slot="footer">
    <button onclick="closeModal()">confirm</button>
  </div>
</slot-modal>
````

````
// You still need to instantiate a Modal to register the custom element
const slotModal = new Modal({ name: 'slot-modal' });

window.closeModal = slotModal.close;
````

**Tip:** If your javascript code is executed after HTML parse, you need to code css like the following for the slot element to prevent it from appearing before the custom element is registered.
````
slot-modal:not(:defined) *[slot] {
  display: none;
}
````