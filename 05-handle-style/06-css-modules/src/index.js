import writeContent from './writeContent.js';
import './js/with_style.js'
import avatarJpg from './image/avatar.jpg';
import './scss/style.scss';

// css modules
import styles from './css/style.css';

document.write('My first Webpack app.<br/>');
document.write("<p class='title'>same publicPath. </p><br/>");
document.write(`bundled jpg: ${avatarJpg} <br/>`);
document.write(`<img src='${avatarJpg}' /> <br/>`);
writeContent();

document.write(
    '<div class="container"><div class="title">SCSS My Webpack app.</div></div>'
);


document.write(`<h1 class="${styles['red-title']}">My Webpack app.</h1>`);
document.write(`<h1 class="${styles.title}">My Webpack app.</h1>`);