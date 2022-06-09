import { Component, Prop, Vue } from 'vue-property-decorator';
import { VueComponent } from '../../shims-vue';


import styles from './Home.css?module';

@Component
export default class Home extends VueComponent {

  render() {
    return (
      <div class={styles.home}>
        <h1>Manage your time & life</h1>
        <img src='images/cat.png' alt="" class={styles.image} />
      </div>
    )
  }
}
