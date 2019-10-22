import writeContent from './writeContent.js';
import './js/with_style.js'
import headerHTML from './header.html'

document.write(headerHTML);
document.write('My first Webpack app.<br/>');
document.write("<p class='title'>same publicPath. </p><br/>");
writeContent();