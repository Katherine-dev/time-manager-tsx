import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    // eslint-disable-next-line @typescript-eslint/ban-types
    interface ElementAttributesProperty { $props: {} }
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
