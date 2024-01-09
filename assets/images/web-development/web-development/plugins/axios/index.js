'use strict';

import AxiosConfig from './config';
import Crypto from './crypto';
  import init from '../../init';

export default function ({ app, store, $axios, redirect }) {
  Object.assign($axios.defaults, AxiosConfig.config);
  $axios.onRequest(config => {
    async function _g() {
      config.url = init.api + config.url;
      const baseInfo = AxiosConfig.getBaseInfo(store);
      if (config.data) {
        config.data = Object.assign({}, baseInfo, config.data);
      } else {
        config.data = baseInfo;
      }
      const access_token = AxiosConfig.getToken(store);
      if (config.data) {
        const strData = JSON.stringify(config.data);
        console.log(config.url)
        console.log(strData)
        config.data = strData ? Crypto.encrypt(strData, access_token) : '';
      }
      const { headers } = AxiosConfig.setHeader(store, config);
      config.headers = headers;
      return config;
    }
    return _g();
  });
  $axios.onResponse(response => {
    async function _new() {
      let _data = response.data, newData = null;
      if (response.status == 401 || _data.code == '-40002' || _data.code == '-40003') { 
        // store.commit('set_message', {
        //   type: 'error',
        //   text: "Login timeout!"
        // });
        // store.commit('remove_user_info');
        // return;
      }
      if (_data.code == '200') {
        if (_data.hexdata) {
          let access_token = response.config.headers.Authorization.replace("Bearer ", "");
          newData = Crypto.decrypt(_data.hexdata, access_token);
        } else {
          newData = _data.data;
        }
      } else {
        if (!(response.request.responseURL.indexOf('assets.master.depositcomfrim') !== -1 ||
          response.request.responseURL.indexOf('assets.imove.deposit.comfirm') !== -1)) {
          store.commit('set_message', {
            type: 'error',
            text: _data.msg
          });
        }
      }
      _data.data = newData;
      return _data;
    }
    return _new();
  });
  $axios.onError((error) => {
    return {};
  })
}
