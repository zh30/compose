import { createApp }   from 'vue'
import App             from './App.vue'

import SplitContainer, { SplitGutter } from '@axlejs/split-layout'
import '@axlejs/split-layout/main.css'
import './index.css'

customElements.define('split-container', SplitContainer)
customElements.define('split-gutter', SplitGutter)

const app = createApp(App)

app.config.isCustomElement = tag => tag === 'split-container'
app.mount('#app')
