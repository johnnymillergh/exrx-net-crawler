import Vue from 'vue'
import Vuetify from 'vuetify/lib'
// import { ColorSchemeUtil } from '@/utils/color-scheme-util'
import { darkTheme, lightTheme } from '@/plugins/vuetify/theme'
import Afrikaans from '@/i18n/afrikaans'
import English from '@/i18n/english'
import SimplifiedChinese from '@/i18n/simplified-chinese'
import VuetifyToast from '@/plugins/toast'

Vue.use(Vuetify)
Vue.use(VuetifyToast, {
  x: 'center',
  y: 'top',
  color: 'info',
  icon: 'info',
  iconColor: '',
  classes: [
    'body-2'
  ],
  timeout: 5000,
  dismissable: false,
  multiLine: false,
  vertical: false,
  queueable: false,
  showClose: false,
  closeText: '',
  closeIcon: 'close',
  closeColor: '',
  slot: [],
  shorts: {
    custom: {
      // color: 'purple'
    }
  },
  property: '$toast'
})

export default new Vuetify({
  lang: {
    locales: { Afrikaans, English, SimplifiedChinese },
    current: 'English'
  },
  theme: {
    // dark: ColorSchemeUtil.isDarkMode(),
    dark: false,
    options: {
      customProperties: true
    },
    themes: {
      dark: darkTheme,
      light: lightTheme
    }
  }
})
