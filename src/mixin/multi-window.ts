import { Component, Vue } from 'vue-property-decorator'

/**
 * Multi Window Options
 */
export interface MultiWindowOptions {
  /**
   * Whether delay closing opened window for 300 ms. Default: true
   */
  delayClosingWindow?: boolean

  /**
   * Vue instance of opener callback function name
   */
  callback?: string

  /**
   * Other data
   */
  [key: string]: any
}

/**
 * Multi window mixin
 *
 * Can i use mixins global in vue? i am use typescript with vue
 * @see <a href='https://github.com/kaorun343/vue-property-decorator/issues/226#issuecomment-515568960'>GitHub</a>
 */
@Component
export class MultiWindow extends Vue {
  private $multiWindowOptions: MultiWindowOptions = {
    delayClosingWindow: true,
    callback: ''
  }

  mounted () {
    this.$data.$multiWindowOptions.delayClosingWindow = this.$route.query.delayClosingWindow === 'true'
    this.$data.$multiWindowOptions.callback = this.$route.query.callback
  }

  openWindow (context: Vue, url: string, multiWindowOptions?: MultiWindowOptions): void {
    // Set default delayClosingWindow as true
    if (multiWindowOptions?.delayClosingWindow === undefined) {
      // @ts-ignore
      multiWindowOptions.delayClosingWindow = true
    }
    const path = /\/$/.test(url) ? url : `${url}/`
    // the value of process.env.BASE_URL is equal to the `publicPath` configured in vue.config.js
    const baseUrl = process.env.BASE_URL
    const target = /^(http|https):\/\//.test(path) ? url : `${baseUrl}#${url}`
    // Passing information to opened window by query string
    let queryString = ''
    for (const key in multiWindowOptions) {
      // Determines whether an object has a property with the specified name.
      // eslint-disable-next-line no-prototype-builtins
      if (!multiWindowOptions.hasOwnProperty(key)) {
        break
      }
      const val = ((multiWindowOptions[key] === null) || (multiWindowOptions[key] === undefined) ? '' : multiWindowOptions[key])
      queryString += queryString === '' ? `?${key}=${val}` : `&${key}=${val}`
    }
    const newWindow = window.open(`${target}${queryString}`)
    if (!newWindow) {
      window.alert('Please give us permission to open new page!')
    } else {
      newWindow.opener.$vue = context
    }
  }

  windowBack (argument?: any): void {
    const context = window.opener.$vue
    const callback = this.$data.$multiWindowOptions.callback
    const delayClosingWindow = this.$data.$multiWindowOptions.delayClosingWindow
    if (!context) {
      window.alert('Cannot find context!')
      return
    }
    // Check whether opener's callback is valid
    if (callback && typeof context[callback] === 'function') {
      context[callback](argument)
    } else {
      window.alert('Cannot find callback!')
      return
    }
    if (delayClosingWindow) {
      setTimeout(() => {
        window.close()
      }, 300)
    } else {
      window.close()
    }
  }
}
