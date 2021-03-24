class SplitContainer extends HTMLElement {
  _isRow: boolean
  _splitterMap: Map<Node, any>
  _observer: MutationObserver

  constructor() {
    super()
    this._isRow = true
    this._splitterMap = new Map()
    this._observer = new MutationObserver(this.observerCallback.bind(this))
  }

  // lifecycle mounted, after children parsed
  connectedCallback() {
    this._observer.observe(this, { childList: true })
    this._isRow = [].some.call(this.classList,
      (className: string) => className === 'split-row')

    this.findDirection()
    this.genSplitter()
    const splitter = document.createElement('div')
    console.dir(splitter)
    console.log('splitter.classList', splitter.classList)
    splitter.style.height = this.clientHeight + 'px'
    splitter.classList.add('split-gutter')

    this.appendChild(splitter)
  }

  observerCallback(records: MutationRecord[]) {
    this._splitterMap.clear()
    this.genSplitter()
  }

  findDirection() {
    for (let index = this.classList.length - 1; index >= 0; index--) {
      const className = this.classList[index]
      if (className === 'split-column') {
        this._isRow = false
        break
      }
    }
  }

  genSplitter() {
    console.log(this._isRow)
    console.log(this.classList)
    this.childNodes.forEach(node => {
      // console.dir( node)
      if (node instanceof HTMLElement) {
        console.dir(node)
        console.log(`
    ${node.offsetLeft},${node.offsetTop} -------- ${node.offsetLeft +
        node.clientWidth},${node.offsetTop}
     |                  |
     |                  |
     |                  |
     |                  |
    ${node.offsetLeft},${node.offsetTop +
        node.clientHeight} -------- ${node.offsetLeft +
        node.clientWidth},${node.offsetTop + node.clientHeight}`)

      } else {
        if (node.nodeName === '#comment') return
        throw new Error('\r\n[SplitContainer]: parse child element error!' + `
  <split-container class="${this.classList}">...'s child must be a HTMLElement!
  But find <${node.nodeName} />, probably you should wrap with a div element`)
      }
    })
  }

  // lifecycle destroy
  disconnectedCallback() {
    this._observer.disconnect()
  }
}

export default SplitContainer
