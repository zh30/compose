import { createApp } from 'vue'
import App           from './App.vue'

import SplitContainer from '@axlejs/split-layout'
import '@axlejs/split-layout/main.css'
import './index.css'

customElements.define('split-container', SplitContainer)

const app = createApp(App)

app.config.isCustomElement = tag => tag === 'split-container'
app.mount('#app')
