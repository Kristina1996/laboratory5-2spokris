import Vue from 'vue';
import App from './App.vue';
import VueMqtt from "vue-mqtt";
import Swatches from 'vue-swatches';

Vue.config.productionTip = false;

Vue.use(VueMqtt, "ws://iot.eclipse.org/ws", {
  clientId: "spokris" + parseInt(Math.random() * 100000)
});

Vue.component('todo-item', {
  template: '\
    <li>\
      {{ title }}\
    </li>\
  ',
  props: ['title']
});

new Vue({
	el: '#app',
	render: h => h(App)
})