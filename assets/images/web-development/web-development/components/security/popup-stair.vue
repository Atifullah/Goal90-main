<template>
    <div class='popup'>
        <div class="mask"></div>
        <div class='mask-content'>

            <div class="delete" v-if="popname == 'deleteApi' || popname == 'deleteapi'">
                <div class="head px-2">
                    <span>{{ $t('deal.delete') }}API</span>
                    <span class="close pointer" @click='close()'>
                        <img src="/images/ud-cross.svg" alt="">
                    </span>
                </div>
                <div class='info unity'>
                    <div class='input-field'>
                        <div class="icon"></div>
                        <p class='dlt'>
                            {{ $t('deal.isdeleteApi') }},“{{ showName }}”API
                        </p>
                        <p class="pb-3">
                            {{ $t('deal.deleteNotFind') }}
                        </p>

                    </div>
                </div>
                <div class="px-2">
                    <a-button class='primary-btn fw-5' v-hex-loading="loading" block
                            @click="deleteApis">{{ $t('deal.deletion') }}
                        </a-button>
                </div>
            </div>
            <!--删除-->
            <div class="checkedkey" v-if="popname == 'checkedKey' || popname == 'checkedkey'"><!--查看-->
                <div class="head px-2">
                    <span>{{$t('security.cc30')}}</span>
                    <span class="close pointer" @click="close">
                        <img src="/images/ud-cross.svg" alt="">
                    </span>
                </div>
                <div class="py-4 px-2">
                    <p class="title clearfix pb-2">
                        <span class="left">{{$t('security.cc30')}}</span>
                    </p>
                    <a-input readOnly :value="secretkey" />

                </div>
                <div class="px-2">
                <a-button class='primary-btn fw-5' block v-hex-loading="loading" @click="close">{{ $t('formMenu.determine') }}
                </a-button>
            </div>
            </div><!--查看-->
            <div class="apiset ipaddress" v-if="popname == 'editIp' || popname == 'editip'">
                <div class="head px-2">
                    <span>IP{{ $t('deal.whiteList') }}</span>
                    <span class="close pointer" @click="close">
                        <img src="/images/ud-cross.svg" alt="">
                    </span>
                </div>
                <div class="px-2 py-4">
                    <p class="title clearfix mb-4">
                        <span class="left">{{ $t('deal.deleteTip') }}</span>
                    </p>
                    <a-input class="input" v-model="ipaddress" :placeholder="$t('deal.case')" @keyup.enter="editIp"
                        type="text" />
                </div>
                <div class="px-2">
                <a-button class='primary-btn fw-5' block v-hex-loading="loading" @click="editIp">{{ $t('formMenu.determine') }}
                </a-button>
                </div>
            </div><!--编辑api-->
        </div>
    </div>
</template>
<script>

export default {
    name: "stairPopup",
    data() {
        return {
            showName: '',
            loading: false,
            ipaddress: "",
            popname: '',
            secretkey: '',
            deletes: '',
            editips: '',
            reg: {
                ip: new RegExp("^((25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))\\.){3}(25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))")
            },
        };
    },
    subscribe() {
        return {
            //deleteapi:删除api  checkedkey:查看key  editip:编辑ip
            //deleteapi:删除api  checkedkey:查看key  editip:编辑ip
            checkedKey(val) {
              
                if (!val) return;
                this.secretkey = '';
                this.$store.dispatch("user_user_api_secretkey_get", {
                    id: val.apiid.id,
                    verifycode: val.form.googleauthed
                }).then((res) => {
                    this.secretkey = res.data;
                    this.$pubsub.publish(this.$pubsub.resetValidate)
                })
            },
            deleteApi(val) {
                this.deletes = val;
                this.showName = this.deletes.apiid.name
            },
            editIp(val) {
                this.editips = val;
            }
        }
    },
    created() {
    },
    mounted() {
    },
    methods: {
        editIp() {
            this.loading = true;
            if (this.ipaddress) {
                const replaceIp = this.ipaddress.replace(/\，/g, ',').split(',');
                let inputIp = [];
                replaceIp.map((item) => {
                    if (item != '') {
                        inputIp.push(item);
                    }
                });
                if (inputIp.length > 3) {
                    this.$store.commit('set_message', {
                        type: 'error',
                        text: this.$t('deal.ipmore')
                    })
                    this.loading = false;
                    return;
                }
                let flag = true;
                inputIp.filter((item) => {
                    if (!this.reg.ip.test(item)) {
                        flag = false;
                    }
                })
                let iprepetition = Array.from(new Set(inputIp));
                if (iprepetition.length != inputIp.length) {
                    this.$store.commit('set_message', {
                        type: 'error',
                        text: this.$t('deal.iprepeat')
                    })
                    this.loading = false;
                    return;
                }
                if (!flag) {
                    this.$store.commit('set_message', {
                        type: 'error',
                        text: this.$t("deal.iperror")
                    })
                    this.loading = false;
                    return;
                }
                let userIp = '';
                inputIp.map((item) => {
                    if (item != '') {
                        userIp = userIp + item + ","
                    }
                })
                let postData = {
                    id: this.editips.apiid.id,
                    ipwhitelist: userIp.slice(0, userIp.length - 1),
                    verifycode: this.editips.googleauthed
                }
                this.$store.dispatch("user_user_address_edit", postData).then((res) => {
                    if (res.data) {
                        this.ipaddress = '';
                        this.$pubsub.publish(this.$pubsub.resetValidate)

                        this.$emit('closePopup');
                        this.$store.commit('set_message', {
                            type: 'ok',
                            text: res.msg
                        })
                    }
                    this.loading = false;
                })
            } else {
                this.close();
            }
        },
        deleteApis() {
            let postData = { id: this.deletes.apiid.id, verifycode: this.deletes.form.googleauthed };
            this.$store.dispatch("user_user_api_delete", postData).then((res) => {
                if (res.data) {
                    this.$emit('deleteapi', this.deletes.apiid.id);
                    this.ipaddress = '';
                    this.$pubsub.publish(this.$pubsub.resetValidate)
                    this.$emit('closePopup');
                }
            })
        },
        apipopup(val) {
            this.popname = val;
        },
        close() {
            this.ipaddress = '';
            this.loading = false;
            this.$emit('closePopup');
            this.$pubsub.publish(this.$pubsub.resetValidate)
        }
    }
};

</script>
<style lang='less' scoped>
@import '../../static/styles/auth';

.head {
    overflow: hidden;

    span {
        font-weight: 500;
        font-size: 22px;
        color: #000;
    }
}

.popup .mask-content {
    background: #FFFFFF;
    box-shadow: 0px 3px 24px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
}

.apiset {

    .title {
        margin-bottom: 0;

        .normal-tip_error {
            float: right;
        }
    }

    .title span {
        font-size: 12px;
    }

    .auth-content_group {
        margin-left: 20px;
    }

    .commitBtn {
        margin-left: 20px;
    }
}

.popup {
    .mask-content {
        .delete {
            .unity {
                margin-top: 30px;

                .icon {
                    width: 36px;
                    height: 36px;
                    margin: auto;
                    background: url('../../static/images/an_issue.png') no-repeat left center;
                }

                p {
                    text-align: center;
                    color:#999999;
                    font-size: 14px;
                    opacity: 0.5;
                }

                p.dlt {
                    margin: 10px 0;
                    color: #333333;
                    font-weight: 600;
                    opacity: 1;
                }

                .commitBtn {
                    width: 320px;
                    font-size: 14px;
                    margin: 20px auto;
                    display: block;
                }

            }
        }
    }
}

.checkedkey {
    .auth-content_group {
        margin: 30px 20px;
    }

    .commitBtn {
        width: 400px;
        background: linear-gradient(135deg, #0087e6, #0076e6);
        line-height: 40px;
        color: white;
        font-size: 14px;
        margin: 30px auto 0;
        display: block;
    }
}

.ipaddress {
    .auth-content_group {
        margin-top: 30px;

        .title.clearfix {
            .left {
                color: rgba(102, 102, 102, 1);
            }
        }
    }
}

.popup .mask-content .checkedkey .title {
    margin-bottom: 0;
}

.popup .mask-content .checkedkey .title span {
    font-size: 15px;
    font-weight: 500;
    color: #000;

}

.popup .mask-content .checkedkey .sek {
    line-height: 40px;
    padding: 0 10px;
    font-size: 14px;
    background: rgba(240, 240, 240, 1);
}
</style>
