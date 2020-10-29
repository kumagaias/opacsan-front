import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import App from '@/App.vue'
import router from '@/router'
import loaderUtil from '@/utils/loaderUtil'
import i18n from '@/lang'
import VueGoodTablePlugin from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'
import {
  extend,
  localize,
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import veeValidateJa from 'vee-validate/dist/locale/ja.json'
import VueToasted from 'vue-toasted'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { VueLoading } from 'vue-loading-template'
import { VueCsvImport } from 'vue-csv-import'

localize('ja', veeValidateJa)
Vue.component('validation-observer', ValidationObserver)
Vue.component('validation-provider', ValidationProvider)
for (const [rule, validation] of Object.entries(rules)) {
  extend(rule, { ...validation })
}

Vue.use(VueCompositionApi)
Vue.config.productionTip = false
loaderUtil.registerAllComponents(Vue)
Vue.use(VueGoodTablePlugin)
Vue.use(VueToasted)
Vue.component('fa', FontAwesomeIcon)
library.add(fas)
Vue.component('vue-loading', VueLoading)
Vue.component('vue-csv-import', VueCsvImport)

new Vue({
  i18n,
  render: h => h(App),
  router,
}).$mount('#app')
