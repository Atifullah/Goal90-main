import Cookie from 'cookie';
import * as jsCokie from 'js-cookie';
import Vue from 'vue';

function changeelement(statescript, headscript, add) {
  if (statescript) {
    statescript.forEach((item) => {
      const i = headscript.findIndex((_item) => {
        return item.id == _item.id;
      });
      if (add) {
        if (i < 0) {
          headscript.push(item);
        }
      } else {
        if (i >= 0) {
          headscript.splice(i, 1);
        }
      }
    })
  }
}

export default function ({ app, store, route, redirect, query, res, req }) {
  if (route.name === null) {
    // Redirect to the custom 404 page with status code 404
    redirect('/404', undefined, { statusCode: 404 });
  }
  let isPerson = /^\/person/g.test(route.fullPath);
  let isP2p = /^\/p2p/g.test(route.fullPath);
  let isLogin = /^\/login/g.test(route.fullPath);
  let isTrade = /^(\/trade|\/person\/legal-currency)/g.test(route.fullPath);
  //没有登录跳转到登录
  if (process.client) {
    const uid = jsCokie.get(store.state.hex_uid.type);
    if (!uid) {
      store.commit('remove_user_info');
      if (isPerson) {
        return redirect('/');
      }
    }
    if (uid && isLogin) {
      return redirect('/');
    }
  }
  if (process.server) {
    if(req){
      const userAgent = req.headers['user-agent'];
      const currentRoute = route.name
      if (userAgent && userAgent.toLowerCase().includes('mobile') && currentRoute != 'inviteMobile'  && currentRoute != 'help-dashboard-channel') {
        if (currentRoute == 'invite') {
          return redirect('/inviteMobile', route.query);
        } else if (currentRoute != 'registerMobile' && currentRoute!= 'terms-sub_title') {
          return redirect('/services/downloads');
        }
      }
    }
    if (isTrade) {
      changeelement(store.state.tradeScript, app.head.script, true);
    } else {
      changeelement(store.state.tradeScript, app.head.script, false);
    }
    const cookie = Cookie.parse(req.headers.cookie ? req.headers.cookie : '');
    const uid = cookie[store.state.hex_uid.type];

    if (isPerson && !(cookie && uid)) {
      return redirect('/login?returnurl=' + route.path);

    }
    // if (isP2p && !(cookie && uid)) {
    //   return redirect('/');
    // }
    if (isLogin && cookie && uid) {
      return redirect('/');
    }
  }

  if (isPerson) {
    let r = route.path;
    if (/^\/person\/security/g.test(route.fullPath)) {
      r = '/person/security';
    }
    if (/^\/person\/api/g.test(route.fullPath)) {
      r = '/person/api';
    }
    if (/^\/person\/address/g.test(route.fullPath)) {
      r = '/person/address';
    }
    store.commit('set_active_route', r);
  }
  if (isP2p) {
    let r = route.path;
    if (/^\/p2p\/orders-history/g.test(route.fullPath)) {
      r = '/p2p/orders-history';
    }
    if (/^\/p2p\/in-process/g.test(route.fullPath)) {
        r = '/p2p/in-process';
      }
    store.commit('set_active_route', r);
  }
}
