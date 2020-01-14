import cheerio from 'cheerio'

export class DomUtil {
  /**
   * Get fitst level text array.
   *
   * For example:
   * <ul>
   * <li><a href='ExList/NeckWt'>Neck</a>
   * <ul>
   * <li><a href='ExList/NeckWt#Sternocleidomastoid'>Sternocleidomastoid</a></li>
   * <li><a href='ExList/NeckWt#Splenius'>Splenius</a></li>
   * </ul>
   * </li>
   * <li><a href='https://exrx.net/Lists/ExList/ShouldWt'>Shoulders</a>
   * <ul>
   * <li><p>Deltoid</p>
   * <ul>
   * <li><a href='ExList/ShouldWt#Anterior'>Anterior</a></li>
   * <li><a href='ExList/ShouldWt#Lateral'>Lateral</a></li>
   * <li><a href='ExList/ShouldWt#Posterior'>Posterior</a></li>
   * </ul>
   * </li>
   * <li><a href='ExList/ShouldWt#Supraspinatus'>Supraspinatus</a>
   * </li>
   *
   * </ul>
   * </li>
   *
   * The result will be: ['Neck', 'Shoulders'].
   * @param rootNode root node.
   */
  static getFirstLevelTextArray = (rootNode: Cheerio): string[] => {
    if (!rootNode.children().length) {
      throw new Error('Cannot recursively traverse given node! The length of node\'s children is incorrect.')
    }
    const result: string[] = []
    rootNode.children().each((index, element) => {
      result.push(DomUtil.getFirstText(element))
    })
    return result
  }

  /**
   * Get first text from the element.
   * @param cheerioElement element.
   */
  static getFirstText = (cheerioElement: CheerioElement): string => {
    if (cheerioElement.type !== 'text') {
      return DomUtil.getFirstText(cheerioElement.firstChild)
    }
    return cheerioElement.data ? cheerioElement.data.trim() : 'NONE'
  }

  /**
   * Merge same level unordered list.
   *
   * Root node must contain one or more <ul> node.
   * @param rootNode root node.
   */
  static mergeSameLevelUnorderedList = (rootNode: Cheerio): Cheerio => {
    if (!rootNode.length) {
      throw new Error(`Cannot merge same level unordered list by given node: ${rootNode}!`)
    }
    for (let index = 1; index < rootNode.length; index++) {
      rootNode[0].children = [...rootNode[0].children, ...rootNode[index].children]
    }
    return cheerio.load(rootNode[0]).root()
  }
}
