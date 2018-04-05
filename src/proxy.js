import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/keybinding/vim';

let vim = null;
let originEle = null;

const remove = (only) => {
  if (!only) {
    originEle.value = vim.getValue();
  }
  originEle.focus();
  vim.destroy();
  const wrapper = document.querySelector('#vimarea-wrapper');
  wrapper.parentElement.removeChild(wrapper);
  localStorage.removeItem('vim');
};

brace.config.loadModule("ace/keyboard/vim", module => {
  const Vim = module.CodeMirror.Vim;
  Vim.defineEx('write', 'w', ({ ace }) => {
    document.execCommand('copy', false, ace.getValue());
    localStorage.setItem('vim', ace.getValue());
  });
  Vim.defineEx('quit', 'q', () => {
    remove(true);
  });
  Vim.defineEx('wq', 'wq', ({ ace }) => {
    document.execCommand('copy', false, ace.getValue());
    document.execCommand('copy');
    remove();
  });
});

const create = (ele, options) => {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('id', 'vimarea-wrapper');
  const div = document.createElement('div');
  div.setAttribute('id', 'vimarea');
  wrapper.appendChild(div);
  document.body.appendChild(wrapper);
  vim = brace.edit('vimarea', Object.assign({
    selectionStyle: 'text',
  }), options);
  vim.getSession().setMode('ace/mode/javascript');
  vim.setTheme('ace/theme/monokai');
  vim.setKeyboardHandler('ace/keyboard/vim');
  originEle = ele;
  const type = ele.nodeName.toLowerCase();
  switch (type) {
    case 'input':
      div.style.height = '30px';
      vim.commands.addCommand({
        name: 'wq',
        bindKey: { win: 'ENTER', mac: 'ENTER'},
        exec(vim) {
          vim.selectAll();
          document.execCommand('copy');
          remove();
        },
      });
      break;
    default:
      div.style.height = '200px';
  }
  vim.focus();
};

const recover = (ele) => {
  create(ele);
  vim.setValue(ele.value);
};

export default {
  create,
  remove,
  recover,
};
