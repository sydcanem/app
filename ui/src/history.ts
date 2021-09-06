import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

history.listen((location) => {
  setTimeout(() => {
    if (location.hash) {
      const ele = window.document.querySelector(location.hash);
      if (ele) {
        ele.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, 1);
});

export default history;
