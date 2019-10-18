import writeContent from './writeContent.js';
import './js/with_style.js'
import avatarJpg from './image/avatar.jpg';
import Vue from 'vue';
import App from './vue/App.vue'

document.write('My first Webpack app.<br/>');
document.write("<p class='title'>same publicPath. </p><br/>");
document.write(`bundled jpg: ${avatarJpg} <br/>`);
document.write(`<img src='${avatarJpg}' /> <br/>`);
writeContent();

const container = document.createElement('div');
container.id = 'app';
document.body.prepend(container);

new Vue({
    el: '#app',
    render: h => h(App),
});