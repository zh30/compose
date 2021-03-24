let template = document.createElement('template')
template.innerHTML = `
<style>
.split-gutter:hover {
   background-color: rgba(156,156,156,0.2);
}
</style>
<div class="split-gutter"></div>
`

class SplitGutter extends HTMLElement {
  isRow: boolean

  constructor() {
    super()
    this.isRow = true
    let shadow = this.attachShadow({ mode: 'open' })

    shadow.appendChild(template.content.cloneNode(true))
  }

  connectedCallback() {
    if (!this.parentElement) return
    this.setGutterStyle(this.parentElement)
    if (!this.shadowRoot) return
    const gutter: HTMLElement = this.shadowRoot.querySelector(
      'div.split-gutter') as HTMLElement

    const gutterSize = this.parentElement.dataset.gutter || this.dataset.gutter || '10'

    if (gutter) {
      gutter.style[this.isRow ? 'height' : 'width'] = '100%'
      gutter.style[this.isRow ? 'width' : 'height'] = gutterSize + 'px'
    }
  }

  setGutterStyle(parentElement: HTMLElement) {
    const classList = parentElement.classList
    for (let index = classList.length - 1; index >= 0; index--) {
      const className = classList[index]
      if (className === 'split-column') {
        this.isRow = false
        break
      }
    }

  }
}

export default SplitGutter
