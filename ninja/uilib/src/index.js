//
import Tooltip from './ui/tooltip';
import Dropdown from './ui/dropdown';
import Tabs from './ui/tabbed';
import Snackbar from './ui/snackbars';

const tooltip = new Tooltip(document.querySelector('.tooltip'));
tooltip.init();
//
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dd => {
  const instance = new Dropdown(dd);
  instance.init();
});
//
const tabs = new Tabs(document.querySelector('.tabs'));
tabs.init();
//
const snackbar = new Snackbar();
snackbar.init();
const button = document.querySelector('button');
button.addEventListener('click', () => {
  snackbar.show('hellllloo you clicked me');
});
