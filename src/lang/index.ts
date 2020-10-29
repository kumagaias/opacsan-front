import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ja from '@/lang/ja'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'ja',
  messages: {
    ja,
  },
})
