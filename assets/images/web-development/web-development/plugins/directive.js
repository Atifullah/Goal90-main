'use strict';

import Vue from 'vue';
import Loading from '../components/public/page-loading';

const Mask = Vue.extend(Loading),
  directive = {};

directive.install = Vue => {
  if (Vue.prototype.$isServer) return;

  const toggleLoading = (el, binding) => {
    if (binding.value) {
      el.appendChild(el.mask);
      el.domInserted = true;
    } else {
      el.mask.style.opacity = 0;
      setTimeout(() => {
        el.mask.parentNode && el.mask.parentNode.removeChild(el.mask)
      }, 200);
    }
  };

  Vue.directive('hex-loading', {
    bind(el, binding, vnode, oldVnode) {
      const mask = new Mask({
        el: document.createElement('div')
      });
      el.instance = mask;
      el.mask = mask.$el;
      binding.value && toggleLoading(el, binding)
    },

    update: function (el, binding) {
      if (binding.oldValue !== binding.value) {
        toggleLoading(el, binding)
      }
    },

    unbind: function (el, binding) {
      if (el.domInserted) {
        el.mask &&
        el.mask.parentNode &&
        el.mask.parentNode.removeChild(el.mask);
      }
    }
  });

  Vue.directive('focus', {
    inserted: function (el) {
      el.focus();
    }
  });

  Vue.directive("enterMoney", { // 自定义指令名字 v-enter-money
    bind: function(el, { value = 2 }) {
      el = el.nodeName == "INPUT" ? el : el.children[0];
      let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
      el.addEventListener("keyup", function() {
        el.value = el.value.match(new RegExp(reg, "g"));
        el.dispatchEvent(new Event("input"));
      });
    }
  }); 
};

export default directive;
