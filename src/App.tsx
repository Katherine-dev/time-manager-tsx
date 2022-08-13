import { Component, Vue } from 'vue-property-decorator';
import { VNode } from 'vue';
import MainView from './views/MainView';

import './App.css';

@Component
export default class App extends Vue {
  render(): VNode | undefined {
    return (
      <div id="app">
        <MainView msg=''/>
      </div>
    );
  }
}
