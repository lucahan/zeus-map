import Vue from 'vue'
import "ol/ol.css";
import App from './App.vue'
import { Button, Layout, Menu,Row, Col, Icon } from 'ant-design-vue';
import router from './router/router'
import store from './store/store'

Vue.config.productionTip = false
Vue.component(Button.name, Button)
Vue.component(Layout.name, Layout)
Vue.component(Layout.Header.name, Layout.Header)
Vue.component(Layout.Sider.name, Layout.Sider)
Vue.component(Layout.Content.name, Layout.Content)
Vue.component(Menu.name, Menu)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Icon.name, Icon)
Vue.component(Menu.Item.name, Menu.Item)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
