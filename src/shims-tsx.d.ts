// eslint-disable-next-line no-unused-vars
import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Element extends VNode {
    }

    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {
    }

    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

/**
 * A better solution would be to create a type with the intersection so that it can be reused across multiple components.
 * @see <a href='https://stackoverflow.com/questions/52109471/typescript-in-vue-property-validate-does-not-exist-on-type-vue-element'>Stack Overflow</a>
 */
export type VForm = Vue & { validate: () => boolean }
