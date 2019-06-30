## Shadow-DOM-Modal

this project just start for shadow learning.

[live demo](https://mioco.github.io/modal-by-shadowdom-demo/index.html)

---

### Usage
```js
new Modal(Options);
```

#### Options

|Option|Type|Required|Description|
|:----:|:--:|:------:|:----------|
| name | `{String}` | true | A DOMString For CustomElementRegistry.define() first param |
| onClose | `{Function}` | false |
| onComfirm | `{Function}` | false |
| onCancel | `{Function}` | false |
| buttons | `{Array.<Button>}` | false |
| content | `{String|Element}` | false |
| container | `{Element}` | false | Parent node of the Modal component |
| className | `{String}` | false |

#### Button
|Option|Type|Required|Description|
|:----:|:--:|:------:|:----------|
| text | `{String}` | true | Button text |
| action | `{Function}` | true | A function to be executed after the button click |

---

### Example

#### Base

````js
const modal = new Modal({
  name: 'modal',
  buttons: [{ action: ({ close }) => close(), text: 'close' }],
  content: 'this is a modal',
});

modal.show();
````

#### With template content

````html
<template id="template">
  <p>this is a modal</p>
</template>
````

````js
const { content } = document.querySelector('#template');
const modal = new Modal({
  name: 'modal',
  content: document.importNode(content, true),
  buttons: [{ action: ({ close }) => close(), text: 'close' }],
});
````

#### With Shadow slot

````html
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

````js
// You still need to instantiate a Modal to register the custom element
const slotModal = new Modal({ name: 'slot-modal' });

window.closeModal = slotModal.close;
````

***Tip:*** If your javascript code is executed after HTML parse, you need to code css like the following for the slot element to prevent it from appearing before the custom element is registered.
````css
slot-modal:not(:defined) *[slot] {
  display: none;
}
````