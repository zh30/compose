declare interface DataSet {
  direction?: 'row' | 'column',
  autoHide?: boolean
}

export const defaultContainerDataSet: DataSet = {
  direction: 'row',
  autoHide: true
}

class SplitContainer extends HTMLElement {
  _anglePostion: Map<Node, any>

  constructor() {
    super()

    this._anglePostion = new Map()

    console.log(this.dataset)
  }

  // lifecycle mounted, after children parsed
  connectedCallback() {
    this.collectAnglePosition()
    console.log(this._anglePostion)
  }

  collectAnglePosition() {
    this.childNodes.forEach(node => {
      console.dir( node)
      if (node instanceof HTMLElement) {
        console.log(node.offsetLeft, node.offsetTop)
        this._anglePostion.set(node, {
          left: node.offsetLeft,
          top: node.offsetTop,

        })
      } else {
        throw new Error('\r\n[SplitContainer]: parse child element error!' +`
  <split-container class="${this.classList}">...'s child must be a HTMLElement!
  But find <${node.nodeName} />, probably you should wrap with a div element`)
      }
    })
  }

  // lifecycle destroy
  disconnectedCallback() {

  }
}

export default SplitContainer
