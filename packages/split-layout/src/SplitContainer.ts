// const divNode = document.createElement('div')
const ValidAttr = ['split-direction', 'split-gutter', 'split-auto-hide', '']
const eleGutter = document.createElement('div')
eleGutter.classList.add('splitter')
// Object.assign(eleGutter.style, {
//   position: 'absolute',
//
// })

class LinkList {
  private _map: Map<any, any>

  constructor(props: any, props2: any) {
    console.log(props, props2)
    this._map = new Map()
  }

}

function checkDisabled(groups: any): boolean {
  let enabled: boolean = true
  groups.forEach(
    (group: any): any => {
      const [ele, flag] = group
      if (enabled && ele && ele.hasAttribute('split-disabled')) {
        let value: any = ele.getAttribute('split-disabled')
        if (value === flag || value === 'both') enabled = false
      }
    })
  return enabled
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

        this.getBrotherDisabled(node)

      } else {
        if (node.nodeName === '#comment') return
        throw new Error('\r\n[SplitContainer]: parse child element error!' + `
  <split-container class="${this.classList}">...'s child must be a HTMLElement!
  But find <${node.nodeName} />, probably you should wrap with a div element`)
      }
    })

    this.observer.observe(this, { childList: true })
  }

  getBrotherDisabled(node: HTMLElement) {
    const {
            previousElementSibling: broPrev,
            nextElementSibling: broNext
          } = node

    let left: boolean = false
    let right: boolean = false
    if (broPrev) {
      left = checkDisabled([[broPrev, 'right'], [node, 'left']])
    }
    if (broNext) {
      right = checkDisabled([[node, 'right'], [broNext, 'left']])
    }
    console.log('left', left, 'right', right)

    // node1 gutter node2
    // node1 => gutter, node2 => gutter
    // gutter => { left: node1, right : node2}
    let gutter = this.splitterMap.get(node)
    if (!gutter) gutter = eleGutter.cloneNode()

    let value = this.splitterMap.get(gutter) || { type: 'gutterValue' }

    if (left) {
      value.left = node
      this.splitterMap.set(node, gutter)
    }
    if (right && broNext) {
      value.right = broNext
      this.splitterMap.set(broNext, gutter)
    }

    this.splitterMap.set(gutter, value)
    // new LinkList('key', 'value')
    console.log('this.splitterMap', this.splitterMap)
  }

  // lifecycle destroy
  disconnectedCallback() {
    console.log('disconnectedCallback')
    this.observer.disconnect()
  }
}

export default SplitContainer
