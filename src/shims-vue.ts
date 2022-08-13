/* eslint-disable @typescript-eslint/ban-ts-comment */
import Vue from 'vue';

type CSSClass = (string | {
    [key: string]: string
})

// eslint-disable-next-line import/prefer-default-export, @typescript-eslint/ban-types
export class VueComponent<Props = {}> extends Vue {
  // @ts-ignore
  public $props: Props & {
    key?: string
    class?: CSSClass | CSSClass[]
  }
}
