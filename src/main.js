import Vue from 'vue'
import VueResource from 'vue-resource'

import App from './App.vue'
import router from './router'
import store from './store'

import DragMixin from './plugins/drag_mixin'
import DataFormMixin from './plugins/data_form'
import BaseMixin from './plugins/mixin'
import Http from './plugins/services'

import InitApp from './plugins/init'

Vue.use(VueResource)
Vue.use(DragMixin)
Vue.use(DataFormMixin)
Vue.use(BaseMixin)
Vue.use(Http)

Vue.use(InitApp)

Vue.prototype.$eventBus = new Vue()
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
