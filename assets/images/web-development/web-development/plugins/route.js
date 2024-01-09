'use strict';
import Vue from 'vue';
function changeelement(statescript) {
  statescript.forEach((item) => {
    const j = document.createElement('script'),
      s = document.getElementsByTagName('script')[0],
      old = document.querySelector('script#' + item.id);

    if (!old) {
      j.charset = 'UTF-8';
      j.src = item.src;
      j.id = item.id;
      s.parentNode.insertBefore(j, s);
    }
  });
}
export default (ref) => {
  const {app, store} = ref;
  app.router.beforeEach((to, from, next) => {
    Vue.$pubsub.clearAllSubscriptions();
    let isTrade = /^(\/trade|\/person\/legal-currency)/g.test(to.fullPath);
    if (process.client) {
      if (isTrade) {
        changeelement(store.state.tradeScript);
      }
      if (!("from" in Array)) {
        changeelement([{src: '/js/polyfill.min.js', id: 'polyfill'}]);
      }
    }
    next();
  })
};
