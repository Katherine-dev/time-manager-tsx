import { Component, Vue } from 'vue-property-decorator';
import MainView from './views/MainView';

import './App.css'

@Component
export default class App extends Vue {
  render() {
    return (
      <div id="app">
        <MainView msg=''/>
      </div>
    )
  }
}
