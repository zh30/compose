// const divNode = document.createElement('div')
const ValidAttr = ['split-direction', 'split-gutter', 'split-auto-hide', '']
const eleGutter = document.createElement('div')
eleGutter.classList.add('splitter')
// Object.assign(eleGutter.style, {
//   position: 'absolute',
//
// })

function getBrotherDisabled(node: HTMLElement) {
  const {
          previousElementSibling: broPrev,
          nextElementSibling: broNext
        } = node
  let enanled: boolean = true
  let value: any = ''

  ;[[broPrev, 'right'], [broNext, 'left']].forEach(
    (group: any): void => {
      const [ele, flag] = group
      if (ele && ele.hasAttribute('split-disabled')) {
        value = ele.getAttribute('split-disabled')
        enanled = value !== flag
      }
    })

}

class SplitContainer extends HTMLElement {
  isRow: boolean
  commonGutter: number
  autoHide: boolean
  autoHideWidth: number

  splitterMap: Map<Node, any>
  observer: MutationObserver

  // splitterContainer: HTMLElement

  constructor() {
    super()
    this.isRow = true
    this.commonGutter = 20
    this.autoHide = true
    this.autoHideWidth = 100

    this.splitterMap = new Map()
    this.observer = new MutationObserver(this.observerCallback.bind(this))

    // this.splitterContainer = divNode.cloneNode(true) as HTMLElement
    // this.splitterContainer.classList.add('splitter-container')
  }

  parseAttrs() {
    ValidAttr.forEach((attr: string) => {
      let value: any = null
      if (this.hasAttribute(attr)) value = this.getAttribute(attr)

      switch (attr) {
        case 'split-direction':
          this.isRow = value !== 'column'
          break
        case 'split-gutter':
          if (value >>> 0 !== 0) {
            this.commonGutter = value
          }
          break
        case 'split-auto-hide':
          if (value === 'false') {
            this.autoHide = false
          } else {
            value = value >>> 0
            this.autoHideWidth = value > Math.ceil(this.commonGutter / 2)
              ? value
              : this.commonGutter
          }
          break
      }
    })
  }

  // lifecycle mounted, after children parsed
  connectedCallback() {
    this.parseAttrs()

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

        const { left, right } = getBrotherDisabled(node)

      } else {
        if (node.nodeName === '#comment') return
        throw new Error('\r\n[SplitContainer]: parse child element error!' + `
  <split-container class="${this.classList}">...'s child must be a HTMLElement!
  But find <${node.nodeName} />, probably you should wrap with a div element`)
      }
    })

    this.observer.observe(this, { childList: true })
  }

  // lifecycle destroy
  disconnectedCallback() {
    console.log('disconnectedCallback')
    this.observer.disconnect()
  }
}

export default SplitContainer
