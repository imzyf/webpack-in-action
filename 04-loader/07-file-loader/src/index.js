import writeContent from './writeContent.js';
import './js/with_style.js'
import avatarJpg from './image/avatar.jpg';

document.write('My first Webpack app.<br/>');
document.write("<p class='title'>same publicPath. </p><br/>");
document.write(`bundled jpg: ${avatarJpg} <br/>`);
document.write(`<img src='${avatarJpg}' /> <br/>`);
writeContent();