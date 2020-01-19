export class HyperlinkUtil {
  static baseUrl = process.env.VUE_APP_EXRX_NET_BASE_URL ? process.env.VUE_APP_EXRX_NET_BASE_URL : 'NONE'
  static pathPattern = /^(\.{0,2}|\\#)\/.*$/

  /**
   * Restore path to URL.
   * @param {string} path, pattern: '/[some-path]' or '../[some-path]' or '#/[some-path]'
   * @return URL
   */
  static restorePathToUrl = (path: string): string => {
    const valid = HyperlinkUtil.pathPattern.test(path)
    if (!valid) {
      throw new Error(`Invalid path. Path value: ${path}`)
    }
    return path.replace(/^(\.{0,2}|\\#)/, HyperlinkUtil.baseUrl)
  }
}
