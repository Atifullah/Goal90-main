'use strict';
import Vue from 'vue';
function createScript(scripts) {
   //console.log('statescript', scripts);

  scripts.forEach((item) => {
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

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-2EZEDNXHL7');


}
export default (ref) => {
  const { app, store } = ref;
  createScript([{ src: 'https://www.googletagmanager.com/gtag/js?id=G-2EZEDNXHL7', id: 'googletagmanager' }]);
};
