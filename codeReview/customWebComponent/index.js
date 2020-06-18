class UserCard extends HTMLElement {
  constructor() {
    super();
    var shadow = this.attachShadow( { mode: 'closed' } );
    // console.log(shadow)
    var templateElem = document.getElementById('userCardTemplate');
    var content = templateElem.content.cloneNode(true);
    content.querySelector('img').setAttribute('src', this.getAttribute('image'));
    content.querySelector('.container>.name').innerText = this.getAttribute('name');
    content.querySelector('.container>.email').innerText = this.getAttribute('email');

    shadow.appendChild(content);
    // 注意如果有使用阴影没有进行操作的话，组件会消失
    
    this.$button = shadow.querySelector('button');
    this.$button.addEventListener('click', () => {
      console.log('Hello from within the Custom Element')
      // 自定义触发事件
      this.dispatchEvent(
        new CustomEvent('onClick', {
          detail: 'Hello from within the Custom Element',
        })
      );
    });
  }
  // 观察label字段是否有变
  static get observedAttributes() {
    return ['label', 'email'];
  }
  // 有变就触发回调
  attributeChangedCallback(name, oldVal, newVal) {
    this[name] = newVal;
    console.log(name, oldVal, newVal)
  }
}
// 定义web自定义组件
window.customElements.define('user-card', UserCard);