'use strict';

import np from 'number-precision'

export default function install(Vue) {
  Vue.prototype.$np = np;
  Vue.$np = np
}
