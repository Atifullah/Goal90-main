import * as jsCokie from "js-cookie";
import coin from "./coin";
import QRcode from "qrcode";

export default (await import('vue')).defineComponent({
components: {
Lang,
"hex-coin": coin
},
props: ["fromPage"],
computed: {
exchange: function () {
return this.$store.state.hex_client_exchange;
},
getUserInfoPhone: function () {
let info = this.$userinfo;
if (info) {
return info.phone ? info.phone : info.email;
}
}
}, 
data() {
return {
coinDataState: false,
marginDataState: false,
userstate: false,
exchangestate: false,
downloadstate: false,
coinTitleActive: "",
coinSearchString: "",
status: "0",
isSignIn: 0,
cointitle: [],
coinlists: [],
mouseState: false,
cointimer: null,
margintimer: null,
usertimer: null,
downloadtimer: null,
qrcode: "",
activeAssetsRoute: false,
activeDelegationRoute: false
};
},

created() { },
watch: {
$route(to, from) {
this.getPath();
this.activeDelegationRoute =
to.name == "person-margin-wallet-margin" ||
to.name == "person-financial-deal" ||
to.name == "person-legal-currency" ||
to.name == "person-deal" ||
to.name == "person-margin-wallet-margin" ||
to.name == "person-margin-margin-deal"
? true
: false;
this.activeAssetsRoute =
to.name == "person-margin" ||
to.name == "person-wallet" ||
to.name == "person-wallet-history"
? true
: false;
}
},
beforeMount() { },
mounted() {
this.getPath();
QRcode.toDataURL(this.$store.state.hex_config.mobiledown).then((url) => {
this.qrcode = url;
});
this.activeDelegationRoute =
this.$route.name == "person-margin-wallet-margin" ||
this.$route.name == "person-financial-deal" ||
this.$route.name == "person-legal-currency" ||
this.$route.name == "person-deal" ||
this.$route.name == "person-margin-wallet-margin" ||
this.$route.name == "person-margin-margin-deal"
? true
: false;
this.activeAssetsRoute =
this.$route.name == "person-margin" ||
this.$route.name == "person-wallet" ||
this.$route.name == "wallet-history"
? true
: false;
},
methods: {
getPath() {
let _path = $nuxt.$route.path;
let _arr = _path.split("/");
let sto_name = _arr[1];
if (sto_name == "deal" ||
sto_name == "margin" ||
sto_name == "contract") {
  window.localStorage.setItem(sto_name, _path);
}
},
nextPage(path, type) {
let _path = window.localStorage.getItem(path);
let _arr = null;
let id = null;
if (_path) {
_arr = _path.split("/");
id = _arr[_arr.length - 1];
}
if (path == "deal" || path == "margin") {
if (type == 1) {
_path = _path ? `/${path}/pro/${id}` : `/${path}/pro/btc_usdt`;
} else if (type == 2) {
_path = _path ? `/${path}/${id}` : `/${path}/btc_usdt`;
} else {
_path = _path ? _path : `/${path}/pro/btc_usdt`;
}
} else {
if (type == 1) {
_path = _path ? `/${path}/pro/${id}` : `/${path}/pro/btc_yx`;
} else if (type == 2) {
_path = _path ? `/${path}/${id}` : `/${path}/btc_yx`;
} else {
_path = _path ? _path : `/${path}/pro/btc_yx`;
}
}
this.$router.push({ path: _path });
},
setExchange(e) {
this.$store.commit("set_client_exchange", e);
jsCokie.set(this.$store.state.hex_client_exchange.type, e);
},
searchCoin() {
this.$refs.hexCoin.search(this.coinSearchString);
},
showCoinData(e) {
this.cointimer && clearTimeout(this.cointimer);
if (!e) {
this.cointimer = setTimeout(() => {
this.coinDataState = e;
}, 300);
} else {
this.coinDataState = e;
}
},
showexchange(e) {
this.exchangetimer && clearTimeout(this.exchangetimer);
if (!e) {
this.exchangetimer = setTimeout(() => {
this.exchangestate = e;
}, 300);
} else {
this.exchangestate = e;
}
},
showMarginData(e) {
this.margintimer && clearTimeout(this.margintimer);
if (!e) {
this.margintimer = setTimeout(() => {
this.marginDataState = e;
}, 300);
} else {
this.marginDataState = e;
}
},
showdownload(e) {
this.downloadtimer && clearTimeout(this.downloadtimer);
if (!e) {
this.downloadtimer = setTimeout(() => {
this.downloadstate = e;
}, 300);
} else {
this.downloadstate = e;
}
},
showUserData(e) {
this.usertimer && clearTimeout(this.usertimer);
if (!e) {
this.usertimer = setTimeout(() => {
this.userstate = e;
}, 300);
} else {
this.userstate = e;
}
},
changeCoinTitleTab(coin) {
this.coinTitleActive = coin;
},

quitAccount() {
this.$router.push("/");
this.$store.commit("remove_user_info");
},
goSignIn() {
  this.$router.push('/login?returnurl='+this.$route.path)
}
}
});
const __VLS_template = () => ({});
