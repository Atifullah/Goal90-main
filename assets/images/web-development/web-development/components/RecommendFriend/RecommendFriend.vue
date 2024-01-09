<template>
    <div class="bg-white">
        <div class="recommend-friend-header">
            <div class="main-content">
                <a-row :gutter="16" class="">
                    <a-col :lg="24">
                        <p class="p2p-account-heading fw-5 mb-2">{{ $t('public.ph65') }}</p>
                    </a-col>
                    <a-col :lg="12" :xl="10">
                        <p class="friend-desc fw-4 mb-0">{{ $t('public.ph67') }}</p>
                    </a-col>
                    <a-col :lg="24" class=" pt-4 mt-2 recommend-friend-header-btns">

                        <a-button class="primary-btn px-4" @click="() => $router.push('/person/invitation')">{{
                            $t('bscard.bsc39') }} <img class="mb-1 ml-1" src="/images/refral-arrow.png" alt="">
                        </a-button>
                        <nuxt-link to="/person/invitation"><a-button class="rules-btn fw-5 ml-2 pt-1"> <img
                                    class="mb-2 mr-2" src="/images/rules-icon.png" alt=""> {{ $t('public.ph66')
                                    }}</a-button>
                        </nuxt-link>
                    </a-col>

                </a-row>
            </div>
        </div>
        <div class="recommend-friend">
            <div class="main-content">
                <a-row :gutter="16" class="friend-list">
                    <a-col :lg="14" :xl="16">

                        <a-card class="mt-3 recommend-friend-card" :bordered="false">
                            <p class="event-guide fw-5 mb-1">{{ $t('frnd_recom.fr17') }}</p>
                            <p class="invite1-desc fw-4 mb-4">{{ $t('frnd_recom.fr41') }}</p>
                            <a-row :gutter="16" class="col-alignment pb-4">
                                <a-col :lg="8" v-for="(list, key) in commissionTiersDetails" :key="key">

                                    <a-card class="tiers-card-list" :bordered="false">
                                        <div class="join-img-circle mb-4"><img :src="list.img" alt=""></div>
                                        <p class="all-card-heading fw-5 mb-2">{{ list.title }}</p>
                                        <p class="all-card-desc fw-4 mb-0">{{ list.desc }}</p>
                                    </a-card>

                                </a-col>
                            </a-row>

                        </a-card>
                        <a-card :bordered="false" class="recommend-friend-card">
                            <p class="event-guide fw-5">{{ $t('activity.referral_10') }}</p>

                            <a-row :gutter="15" class="col-alignment pt-4 ">
                                <a-col :lg="8">
                                    <div class="join-img-circle">
                                        <img src="/images/sms-notification-refer.png" />
                                    </div>
                                    <p class="all-card-heading fw-5 mb-2 mt-4">{{ $t('frnd_recom.fr1') }}</p>
                                    <p class="all-card-desc fw-4 referal-2 pr-4">{{ $t('frnd_recom.fr3') }}</p>
                                </a-col>
                                <a-col :lg="8">
                                    <div class="join-img-circle">
                                        <img src="/images/card-tick.png" />
                                    </div>
                                    <p class="all-card-heading fw-5 mb-2 mt-4">{{ $t('frnd_recom.fr4') }}</p>
                                    <p class="all-card-desc fw-4 referal-2 pr-4">{{ $t('frnd_recom.fr5') }}</p>
                                </a-col>
                                <a-col :lg="8">
                                    <div class="join-img-circle">
                                        <img src="/images/discount-shape-refer.png" />
                                    </div>
                                    <p class="all-card-heading fw-5 mb-2 mt-4">{{ $t('frnd_recom.fr6') }}</p>
                                    <p class="all-card-desc fw-4 referal-2 pr-4">{{ $t('frnd_recom.fr7') }}</p>
                                </a-col>

                            </a-row>

                        </a-card>
                       
                    </a-col>
                    <a-col :lg="10" :xl="8" class="commision-login">

                        <a-card class="get-invite-card" v-if="!loggedIn">
                            <a-row>
                                <a-col :lg="18" :offset="3" class="text-center">
                                    <p class="event-guide login-heading fw-5 mb-2">{{ $t('frnd_recom.fr24') }}</p>
                                    <p class="all-card-desc fw- mb-0">{{ $t('frnd_recom.fr25') }} </p>
                                </a-col>
                            </a-row>
                            <a-row class="py-4 my-2">
                                <a-col :lg="24">
                                    <nuxt-link to="/login">
                                        <a-button class="primary-btn fw-5" block><img src="/images/invite-user.svg"
                                                class="pr-3" /> {{ $t('frnd_recom.fr26') }}</a-button>
                                    </nuxt-link>
                                </a-col>
                            </a-row>
                            <a-divider class="m-0">{{ $t('frnd_recom.fr27') }}</a-divider>
                            <a-row :gutter="16" class="py-4 my-2">
                                <a-col :lg="12"><a-button class="cancel-outline-btn fw-5" block @click="googleLogin"><img
                                            src="/images/google-icon.svg" class="pr-2" /> {{ $t('frnd_recom.fr28')
                                            }}</a-button></a-col>
                                <a-col :lg="12"><a-button class="cancel-outline-btn fw-5" block @click="appleLogin"><img
                                            src="/images/apple-icon.svg" class="pr-2" />{{ $t('frnd_recom.fr29')
                                            }}</a-button></a-col>
                            </a-row>
                        </a-card>
                        <a-card class="login-invite-card mb-5" :bordered="false" v-else>
                            <a-row class="pt-1">

                                <a-col v-if="activeBtn" :lg="24">
                                    <p class="main-heading fw-5 mb-0">{{ $t('frnd_recom.fr39') }}</p>
                                    <a-row :gutter="16" class="col-alignment my-4">
                                        <a-col :lg="16" :sm="12">
                                            <p class="mb-0 all-card-desc fw-4">{{ $t('frnd_recom.fr30') }}</p>
                                        </a-col>
                                        <a-col :lg="8" :sm="12">
                                            <p class="mb-0 our-Commission-title fw-5">35%</p>
                                        </a-col>
                                    </a-row>


                                    <a-row :gutter="16" class="col-alignment mb-3 d-block">
                                        <a-col :lg="24">
                                            <a-row type="flex" justify="space-between" align="middle"
                                                class="link-card fw-5">
                                                <a-col>
                                                    <p class="all-input-desc fw-4 mb-0">{{ $t('public.ph51') }} ID</p>
                                                </a-col>
                                                <a-col>
                                                    <span id='invitation' class="fw-5 all-input-desc">{{
                                                        $userinfo.invitationcode }}</span>
                                                    <AppClipboard target="#invitation" element-class="link-url1" />
                                                </a-col>
                                            </a-row>
                                        </a-col>
                                    </a-row>


                                    <a-row :gutter="16" class="col-alignment d-block">
                                        <a-col :lg="24">
                                            <a-row type="flex" justify="space-between" align="middle"
                                                class="link-card fw-5">
                                                <a-col>
                                                    <p class="all-input-desc fw-4 mb-0">{{ $t('frnd_recom.fr11') }}</p>
                                                </a-col>
                                                <a-col> <span id='keycopy' class="deposit-address-link"
                                                        :title="`https://bitnasdaq.com/invite?ref=${$userinfo.invitationcode}`">https://bitnasdaq.com/invite?ref={{
                                                            $userinfo.invitationcode }}</span>
                                                    <AppClipboard target="#keycopy" element-class="link-url1" />
                                                </a-col>
                                            </a-row>

                                        </a-col>
                                    </a-row>
                                    <a-row type="flex" class="text-center mt-4 d-block">
                                        <a-col :lg="20" :sm="20">
                                            <a-button class="primary-btn invite-btn fw-5" block
                                                @click="inviteUserModel = true">{{
                                                    $t('frnd_recom.fr31') }}<img class="mb-1 ml-1"
                                                    src="/images/refral-arrow.png" alt=""></a-button>
                                        </a-col>
                                        <a-col :lg="4">
                                            <a-button class="fw-5 invite-code-btn invite-btn ml-3" @click="showModal"><img
                                                    src="/images/qr-code-refer.png" alt=""></a-button>

                                            <a-modal v-model="visible" :title="false" :footer="null" :centered="true"
                                                wrapClassName="qr-modal">
                                                <a-row>
                                                    <a-col class="col-alignment">
                                                        <img src="/images/refer-logo.svg" alt="" width="40%">

                                                        <a-button class="qr-btn fw-5" block @click="closeModal"><img
                                                                src="/images/cross-refer.png" alt=""></a-button>


                                                    </a-col>
                                                    <a-col>

                                                        <p class="qr-invite-txt fw-5 py-3">
                                                            <!-- {{ $t('frnd_recom.fr32') }} -->{{$t('public.ph76')}}
                                                        </p>

                                                    </a-col>
                                                    <a-col>
                                                        <div class="currency-curve">
                                                            <div id="canvas"></div>

                                                        </div>
                                                        <p class="qr-invite-txt-grey fw-5 py-3 mb-0">{{$t('public.ph77')}}
                                                        </p>
                                                        <p class="qr-invite-txt-grey fw-4 mb-0">
                                                            {{$t('public.ph78')}}: <span class="fw-5">{{ $userinfo.invitationcode
                                                            }}</span>
                                                        </p>
                                                    </a-col>
                                                </a-row>
                                            </a-modal>

                                        </a-col>
                                    </a-row>
                                </a-col>





                            </a-row>
                        </a-card>
                        <a-card :bordered="false" class="ranking-card mt-4" :title="$t('frnd_recom.fr36')">
                            <div class="pb-2 mb-1">
                                <a-table id="ranking-table" :columns="commissionRankingColumns"
                                    :pagination="{ pageSize: 3 }" :data-source="commissiondataa">
                                    <div slot="rank" slot-scope="text,row">
                                        <img :src="row.url" alt="" v-if="row.url != undefined">
                                        <span v-else style="margin-left: 12px;">{{ row.rank }}</span>
                                    </div>
                                </a-table>
                            </div>
                        </a-card>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :lg="24" class="mt-3">
                        <a-card class="mt-5 my-invites-container" :bordered="false">
                            <a-row :gutter="16" class="col-alignment my-3">
                                <a-col :lg="12" :xl="10">
                                    <p class="mb-2 all-card-heading invite-heading fw-5">{{ $t('frnd_recom.fr12') }}
                                    </p>
                                    <p class="all-card-desc fw-5 mb-0">{{ $t('frnd_recom.fr13') }}</p>
                                </a-col>
                                <a-col :lg="12" :xl="14" align="end" class=""> <nuxt-link to="/person/invitation">
                                    <a-button
                                        class="primary-btn invite-now-btn fw-5">{{ $t('frnd_recom.fr14') }}
                                    </a-button>
                                </nuxt-link> </a-col>
                            </a-row>
                        </a-card>
                        <!-- <a-card :bordered="false" class="my-3">
                    <p class="event-guide fw-5 mb-1">FAQ</p>
                </a-card> -->
                        <a-card :bordered="false" class="myref" v-if="loggedIn">
                            <p class="event-guide fw-5 mb-3 mt-5">{{ $t('frnd_recom.fr40') }}</p>

                            <MyInvitationTable />
                        </a-card>

                        <a-card :bordered="false" class="my-3 faq-card">
                            <a-row class="">
                                <a-col :lg="24">
                                    <Faqs :channelid="85" :subtitle="'recommend_friend_faqs'" />
                                </a-col>
                            </a-row>
                        </a-card>
                    </a-col>
                </a-row>
                <InviteFriendModal :inviteUserModel="inviteUserModel" :close="close" />
            </div>
        </div>
    </div>
</template>

<script>
import InviteTable from '@/components/person/Invitation/InviteTable'
import MyInvitationTable from '@/components/person/Invitation/MyInvitationTable'
import Faqs from '@/components/public/Faqs'
 
import Qrlogo from '@/static/images/qrlogo.png'
import InviteFriendModal from './InviteFriendModal.vue';
import AppClipboard from '~/components/App/AppClipboard.vue';

export default {
    components: {
        InviteTable,
        Faqs,
        MyInvitationTable,
        InviteFriendModal,
        AppClipboard
    },
    watch: {
        '$store.state.hex_client_exchange.active': function (val) {
            this.getrate();
        }
    },
    data() {
        return {
            signModel: {
        username: '',
        password: '',
        verifycode: '',
        rememberme: true,
      },
      loginWith: 'email',
      thirdPartyLoginLoading: false,
      verifyModel: null,
            visible: false,
            loading: false,
            total: "",
            inviteUserModel: false,
            totalrate: [],
            activeBtn: true,
            found: false,
            show: false,
            totalPrice: 0,
            hoverKey: -1,
            loggedIn: false,
            page: {
                pagesize: 10,
                pageindex: 1
            },
            searchParam: {},
            earnings: [],
            invitedRecord: {},//邀请记录
            QRCodeStyling: null,
            incomeColumns: [
                {
                    title: this.$t("tableskeys.ms1"),
                    dataIndex: 'time',
                    scopedSlots: { customRender: 'time' },
                },
                {
                    title: this.$t("tableskeys.ms4"),
                    dataIndex: 'remark',
                },
                {
                    title: this.$t("tableskeys.ms5"),
                    dataIndex: 'amount',
                    scopedSlots: { customRender: 'amount' },
                },
                {
                    title: this.$t("tableskeys.ms6"),
                    dataIndex: 'typename',
                },
            ],
            commissionRankingColumns: [
                {
                    title: this.$t('frnd_recom.fr37'),
                    dataIndex: 'rank',
                    scopedSlots: { customRender: 'rank' },
                    width: 100
                },
                {
                    title: 'UID',
                    dataIndex: 'user_id',
                    width: 90

                },
                {
                    title: this.$t('frnd_recom.fr38'),
                    dataIndex: 'commission',
                    width: 140

                },
            ],
            commissiondataa: null,
            Rankimages: [
                { url: '/images/rank1.svg', altText: 'Image 1' },
                { url: '/images/rank2.svg', altText: 'Image 2' },
                { url: '/images/rank3.svg', altText: 'Image 3' }
            ],
            commissionRankingData: [
                {
                    commission: '170,689.51553528',
                    user_id: '6***4',

                },

                {
                    commission: '156,542.48259738',
                    user_id: '1***1',
                },
                {
                    commission: '59,881.26674491',
                    user_id: '2***4',
                },
                {
                    commission: '59,881.26674491',
                    user_id: '2***4',
                },
                {
                    commission: '156,542.48259738',
                    user_id: '1***1',
                },

            ],
            commissionTiersDetails: [
                {
                    img: '/images/refer-person-vector.png',
                    title: this.$t('public.ph68'),
                    desc: this.$t('frnd_recom.fr33')
                },
                {
                    img: '/images/refer-card-receive.png',
                    title: this.$t('public.ph71'),
                    desc: this.$t('frnd_recom.fr34')
                },
                {
                    img: '/images/refer-chart-vector.png',
                    title: this.$t('public.ph75'),
                    desc: this.$t('frnd_recom.fr35')
                },
            ]
        }
    },

    methods: {
        showModal() {
            this.visible = true;
        },
        closeModal() {
            this.visible = false;
        },
        async commissionRanking() {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({});

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch("https://testapi.bitnasdaq.io/userapi/v1.0/user/integral.user.getcommissionranks", requestOptions)
                .then(response => response.json())
                .then(result => {
                    this.commissiondataa = result.data;
                    this.commissiondataa.map((item) => {
                        if (item.rank == 1) {
                            item.url = '/images/rank1.svg'
                        }
                        if (item.rank == 2) {
                            item.url = '/images/rank2.svg'
                        }
                        if (item.rank == 3) {
                            item.url = '/images/rank3.svg'
                        }
                    })
                })
                .catch(error => {
                    //console.log('error', error)
                });
        },
        close() {
            this.inviteUserModel = false
        },
        getrate() {
            this.totalPrice = 0;
            this.totalrate.forEach((item) => {
                this.totalPrice = this.$np.plus(this.totalPrice, this.$store.getters.get_client_exchange_rate(item.currencyname, item.amount));
            })
        },

        bindQRCode() {
            const _self = this;
            var code = `${_self.$store.state.hex_config.DomanUrl}/invite?ref=${_self.$userinfo.invitationcode}`;


            let bb = setInterval(function () {
                if (document.getElementById('canvas')) {
                    const qrCode = new _self.QRCodeStyling({
                        width: 190,
                        height: 200,
                        type: "canvas",
                        data: code,
                        image: Qrlogo,
                        dotsOptions: {
                            color: "#000",
                        },
                        backgroundOptions: {
                            color: "#fff",
                        },
                    });
                    document.getElementById("canvas").innerHTML = null;
                    qrCode.append(document.getElementById("canvas"));

                    clearInterval(bb);
                }
            }, 100)
        },
        appleLogin() {
            var randstr = this.uuid();
            const options = {
                response_type: 'code', // 固定内容
                response_mode: 'form_post',
                state: randstr, // 随机字符串，此处仅做演示
                client_id: 'bitnasdaq.com.develop',
                redirect_uri:`${this.$baseUrl}/comapi/v1.0/com/apple.login`,
                scope: 'openid name email'
            }
            const url = new URL('https://appleid.apple.com/auth/authorize')
            const keys = Object.keys(options)
            keys.forEach(key => {
                url.searchParams.append(key, options[key])
            })
            var bl = false;
            const _self = this;
            const appleloginurl = url.toString();
            var iTop = (window.screen.height - 700) / 2;       //获得窗口的垂直位置;
            var iLeft = (window.screen.width - 1024) / 2;        //获得窗口的水平位置;
            var openWin = window.open(appleloginurl, "newWindow", "width=1024,height=700,top=" + iTop + ", left=" + iLeft + ",titlebar=no, menubar=no,scrollbars=yes,resizable=yes,status=yes,toolbar=no,location=yes");
            var winLoop = setInterval(function () {
                if (openWin.closed && !bl) {
                    clearInterval(winLoop);
                    bl = true;
                    _self.siginByThreadPlant(randstr);
                }
            }, 1000);
        },
        googleLogin() {
            var randstr = this.uuid();
            const options = {
                response_type: 'code', // 固定内容
                state: randstr, // 随机字符串，此处仅做演示
                include_granted_scopes: true,
                access_type: 'offline',
                client_id: '311638269948-vj4vooafhg3581iuen0kgtgaggdglbhu.apps.googleusercontent.com',
                redirect_uri:`${this.$baseUrl}/comapi/v1.0/com/google.login`,
                scope: 'openid profile email'
            }
            const url = new URL('https://accounts.google.com/o/oauth2/auth')
            const keys = Object.keys(options)
            keys.forEach(key => {
                url.searchParams.append(key, options[key])
            })
            const appleloginurl = url.toString();
            var bl = false;
            const _self = this;
            var iTop = (window.screen.height - 700) / 2;       //获得窗口的垂直位置;
            var iLeft = (window.screen.width - 1024) / 2;        //获得窗口的水平位置;
            var openWin = window.open(appleloginurl, "newWindow", "width=1024,height=700,top=" + iTop + ", left=" + iLeft + ",titlebar=no, menubar=no,scrollbars=yes,resizable=yes,status=yes,toolbar=no,location=yes");
            var winLoop = setInterval(function () {
                if (openWin.closed && !bl) {
                    clearInterval(winLoop);
                    bl = true;
                    _self.siginByThreadPlant(randstr);
                }
            }, 1000);
        },
        siginByThreadPlant(state) {
            const _self = this;
            const _sign = Object.assign({}, _self.signModel);
            _self.$store.dispatch('user_user_signin', { randstr: state }).then(({ data }) => {
                _self.verifyModel = data;
                _self.$store.commit('set_token', {
                    'token': data.token,
                    'expire': new Date().getTime() + 2 * 3600000
                });
                if (!data) {
                    throw data;
                }
                _sign.randstr = state;
                _sign.ticket = "666666";
                return true;
            }).then((data) => {
                if (data) {
                    _self.$router.push({
                        name: 'auth',
                        params: {
                            verifyModel: _self.verifyModel,
                            signModel: _sign,
                            returnurl: _self.returnurl
                        }
                    })
                }
            }).catch((res) => {
                _self.state.signin = false;
                _self.loading = false;
            })
        },
        async signIn(formName) {
            const _self = this;
            const _sign = Object.assign({}, _self.signModel);
            if (_self.state.signin) return;
            if (_self.loading) return;
            await this.$refs[formName].validate((valid) => {
                if (valid) {
                    _self.loading = true;
                    _self.state.signin = true;
                    _sign.password = crypto.md5String(_sign.password);
                    _self.$store.dispatch('user_user_signin_verify', _sign).then(({ data }) => {
                        _self.verifyModel = data;
                        if (!data) {
                            throw data;
                        }
                        if (data.isabnormalip) {
                            return Captcha.init().then((res) => {
                                if (res && res.ret === 0) {
                                    _sign.randstr = res.randstr;
                                    _sign.ticket = res.ticket;
                                    return true
                                } else if (res && res.ret === 2) {
                                    throw ''
                                }
                            })
                        } else {
                            return true
                        }
                    }).then((data) => {
                        if (data) {
                            _self.$router.push({
                                name: 'auth',
                                params: {
                                    verifyModel: _self.verifyModel,
                                    signModel: _sign,
                                    returnurl: _self.returnurl
                                }
                            })
                        }
                    }).catch((res) => {
                        _self.state.signin = false;
                        _self.loading = false;
                    })
                }
            })
        },
        onSignInSuccess(googleUser) {
            const profile = googleUser.getBasicProfile()
        },
        onSignInError(error) {
            //console.log(error)
        },
        uuid() {
            const s = [],
                hexDigits = "0123456789abcdefghijklmnopqrstuvwxyz";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4";
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
            s[8] = s[13] = s[18] = s[23] = "-";
            return s.join("");
        },
        getInviteRecord(pageIndex) {//获取邀请记录
            let paging;
            pageIndex ? paging = pageIndex : paging = 1;
            this.$store.dispatch('user_invitationrecord_pagedlist', {
                pagesize: 10,
                pageindex: paging,
                type: 1
            }).then(({ data }) => {
                if (data) {
                    this.total = data.totalitemcount;
                    this.invitedRecord = data;
                } else {
                    this.total = 0;
                    this.invitedRecord = [];
                }
                this.loading = false;
                this.total > 0 ? this.found = false : this.found = true;
            })
        },
        getlways() {//总汇率
            this.page.pageindex = 1;
            var postData = Object.assign(this.searchParam, this.page, { uid: this.$userinfo.uid + "", key: this.$userinfo.secretkey, pagesize: this.page.pagesize });
            this.$store.dispatch('user_assets_record_type_total_getlist', postData).then(({ data }) => {
                if (data && data.pagedata.length > 0) {
                    this.totalrate = data.pagedata;
                    this.getrate();
                }
            })
        },
    },
    mounted() {
        let _self = this;
        if (this.$userinfo.uid) {
            this.loggedIn = true;
        }
        import('qr-code-styling').then(({ default: QRCodeStyling }) => {
            _self.QRCodeStyling = QRCodeStyling;
        });
        this.commissionRanking()
        this.bindQRCode()
    },
}
</script>

<style lang=scss scoped>
.single-image {
    display: inline-block;
}

::-webkit-scrollbar {
    width: 9px;
    height: 60px;
}

/* Track */
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 transparent;
    border-radius: 40px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #D9D9D9;
    border-radius: 47px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #D9D9D9;
}

.currency-curve {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: end;
    align-items: center;

    canvas {
        width: 100%;
        height: 100%;

    }
}
</style>
