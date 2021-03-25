// const divNode = document.createElement('div')

class SplitContainer extends HTMLElement {
  isRow: boolean
  splitterMap: Map<Node, any>
  observer: MutationObserver

  // splitterContainer: HTMLElement

  constructor() {
    super()
    this.isRow = true
    this.splitterMap = new Map()
    this.observer = new MutationObserver(this.observerCallback.bind(this))

    // this.splitterContainer = divNode.cloneNode(true) as HTMLElement
    // this.splitterContainer.classList.add('splitter-container')
  }

  // lifecycle mounted, after children parsed
  connectedCallback() {
    this.isRow = this.getAttribute('split-direction') !== 'column'

    this.genSplitter()

    // const splitter = document.createElement('div')
    // console.dir(splitter)
    // console.log('splitter.classList', splitter.classList)
    // splitter.style.height = this.clientHeight + 'px'
    // splitter.classList.add('split-gutter')

    // this.appendChild(splitter)
  }

  observerCallback(records: MutationRecord[]) {
    this.splitterMap.clear()
    this.genSplitter()
  }

  genSplitter() {
    this.observer.disconnect()

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

    this.observer.observe(this, { childList: true, attributes: true })
  }

  // lifecycle destroy
  disconnectedCallback() {
    console.log('disconnectedCallback')
    this.observer.disconnect()
  }
}

export default SplitContainer
