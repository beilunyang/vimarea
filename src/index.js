import proxy from './proxy';
import './index.css';

document.addEventListener('keyup', (e) => {
  if (e.ctrlKey && e.keyCode === 13) {
    const target = e.target;
    if (target.value) {
      proxy.recover(target);
    } else {
      proxy.create(target);
    }
  }
});
