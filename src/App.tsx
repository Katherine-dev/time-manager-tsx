import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld';

import './App.css'

@Component
export default class App extends Vue {
  render() {
    return (
      <div id="app">
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
      </div>
    )
  }
}
