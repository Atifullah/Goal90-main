<template>
    <div class="usdt-steps">
        <div class="cancel-order" v-if="orderdata?.orderstatus == 2 ||
            orderdata?.orderstatus == 3 ||
            orderdata?.orderstatus == 1
            ">
            <a-card class="cancel-order-card">
                <a-row :gutter="16" class="px-2 pb-4 pt-4">
                    <p class="mb-4 pb-2 cancel-order-text fw-5 pl-2">
                        {{ $t("leftss.ls1") }}
                    </p>
                    <a-col :lg="6">
                        <p class="mb-2 amount-txt">{{ $t("leftss.ls2") }}</p>
                        <p class="mb-2 price-txt fw-5" :class="orderdata.direction == -1
                            ? 'red-active'
                            : 'success-active'
                            ">
                            {{ orderdata.legaltype }}
                            {{
                                (orderdata.amount * orderdata.price).toFixed(2)
                            }}
                        </p>
                    </a-col>
                    <a-col :lg="1">
                        <a-divider type="vertical" class="p2p-divider-vertical ml-0" />
                    </a-col>
                    <a-col :lg="6" class="pl-4">
                        <p class="mb-2 amount-txt">{{ $t("leftss.ls3") }}</p>
                        <p class="mb-2 price-txt fw-5">
                            {{ orderdata.legaltype }} {{ orderdata.price }}
                        </p>
                    </a-col>
                    <a-col :lg="1">
                        <a-divider type="vertical" class="p2p-divider-vertical ml-0" />
                    </a-col>
                    <a-col :lg="7" class="pl-4">
                        <p class="mb-2 amount-txt">{{ $t("leftss.ls4") }}</p>
                        <p class="mb-2 price-txt fw-5">
                            {{ orderdata.amount }} {{ orderdata.currencyname }}
                        </p>
                    </a-col>
                </a-row>
            </a-card>
            <a-row class="">
                <a-col :lg="24" class="pr-4">
                    <p class="cancel-order-text fw-5 mb-4 pt-4">
                        {{ $t("leftss.ls5") }}
                    </p>
                    <a-card class="gray-cancel-card" :bordered="false">
                        <p class="mb-0 cancel-txt fw-5">
                            {{ $t("leftss.ls6") }}
                        </p>
                    </a-card>
                    <div class="payment-method-card">
                        <div class="card-info mt-4 left-tab-card">
                            <p v-if="orderdata?.orderstatus == 1" class="mt-3 mb-0" style="color: black; font-weight: 600">
                                {{ $t("leftss.ls32") }}
                            </p>
                            <a-row class="py-4 col-alignment" v-if="orderdata?.orderstatus == 1">
                                <a-col :lg="17" :xl="12">
                                    <div class="positive-txt-box">
                                        <a-row :gutter="16">
                                            <a-col :lg="11" :xl="12">
                                                <a-button class="mr-1 fw-5" :class="orderdata.starleve > 1
                                                    ? 'thumbs-up-btn'
                                                    : 'thumbs-neutral-btn'
                                                    " block @click=" userevaluate('Positive', 5)">
                                                    <img :src="orderdata.starleve >
                                                        1
                                                        ? '/images/thumbs-up-active.svg'
                                                        : '/images/thumbs-up.svg'
                                                        " class="mr-2 mb-1" />
                                                    {{
                                                        $t("leftss.ls7")
                                                    }}</a-button>
                                            </a-col>
                                            <a-col :lg="13" :xl="12" align="end">
                                                <a-button class="fw-5" block :class="orderdata.starleve == 1
                                                    ? 'thumbs-down-btn'
                                                    : 'thumbs-neutral-btn'
                                                    " @click="userevaluate('Negative', 1)">
                                                    <img :src="orderdata.starleve == 1 ? '/images/thumbs-down-active.svg' : '/images/thumbs-down.svg'"
                                                        class="mr-2" />
                                                    {{ $t("leftss.ls8") }}
                                                </a-button>
                                            </a-col>
                                        </a-row>
                                    </div>
                                </a-col>
                                <a-col :lg="7" :xl="12">
                                    <span class="earn-blance fw-5 pointer" @click="
                                        $router.push('/p2p/p2p-account')
                                        ">{{ $t("leftss.ls10") }}</span>
                                </a-col>
                            </a-row>
                        </div>
                    </div>
                    <p v-if="orderdata?.orderstatus == 2 ||
                        orderdata?.orderstatus == 3
                        " class="question-txt fw-5 pt-2 pointer" @click="appealModel = true">
                        {{ $t("leftss.ls11") }}
                    </p>
                </a-col>
            </a-row>
            <a-row class="my-4 faqs-mt">
                <a-col :lg="24" class="pr-4">
                    <Faqs :channelid="85" :subtitle="'order-detail_faqs'" />
                </a-col>
            </a-row>
        </div>
        <div v-else>
            <a-steps :current="current" label-placement="vertical" class="mt-4">
                <a-step v-for="(item, index) in steps" :key="index" :title="item.title">
                    <span slot="icon">
                        <img :src="current >= index
                            ? '/images/dot-active.svg'
                            : '/images/dot-p2p.svg'
                            " class="pointer" />
                    </span>
                </a-step>
            </a-steps>
            <div class="steps-content pt-4 mt-3">
                <a-card class="gray-card-order" :bordered="false" v-if="banner">
                    <a-row :gutter="16">
                        <a-col :lg="22">
                            <p class="mb-0">{{ $t("leftss.ls12") }}</p>
                        </a-col>
                        <a-col :lg="2" align="end">
                            <img src="/images/ud-cross.svg" height="7px" class="pointer" @click="banner = false" />
                        </a-col>
                    </a-row>
                </a-card>
                <a-divider class="p2p-divider" />
                <a-row :gutter="16" class="px-2 pb-4">
                    <p class="mb-4 pb-1 info-heading fw-5">
                        {{ $t("leftss.ls13") }}
                    </p>
                    <a-col :lg="6">
                        <p class="mb-2 pb-1 amount-txt">
                            {{ $t("leftss.ls14") }}
                        </p>
                        <p class="mb-2 price-txt fw-5 success-active">
                            {{ orderdata.legaltype }}
                            {{
                                (orderdata.amount * orderdata.price).toFixed(2)
                            }}
                        </p>
                    </a-col>
                    <a-col :lg="1">
                        <a-divider type="vertical" class="p2p-divider-vertical ml-0" />
                    </a-col>
                    <a-col :lg="6" class="pl-4">
                        <p class="mb-2 pb-1 amount-txt">
                            {{ $t("leftss.ls15") }}
                        </p>
                        <p class="mb-2 price-txt fw-5">
                            {{ orderdata.legaltype }} {{ orderdata.price }}
                        </p>
                    </a-col>
                    <a-col :lg="1">
                        <a-divider type="vertical" class="p2p-divider-vertical ml-0" />
                    </a-col>
                    <a-col :lg="7" class="pl-4">
                        <p class="mb-2 pb-1 amount-txt">
                            {{ $t("leftss.ls16") }}
                        </p>
                        <p class="mb-2 price-txt fw-5">
                            {{ orderdata.amount }} {{ orderdata.currencyname }}
                        </p>
                    </a-col>
                </a-row>
                <a-row :gutter="16" class="px-2 pb-4 pt-2">
                    <a-col :lg="24">
                        <p class="mb-2 account-txt fw-5">
                            {{ $t("leftss.ls17") }}
                            <img src="/images/gray-circel-icon.svg" />
                        </p>
                        <p class="mb-0 account-desc fw-5">
                            <img src="/images/orange-circel-icon.svg" class="mr-1" />
                            {{ $t("leftss.ls18") }}
                        </p>
                    </a-col>
                </a-row>

                <a-row :gutter="16" class="px-2 pb-4">
                    <a-col :lg="24">
                        <a-row class="col-alignment mt-2" v-show="orderdata.payconfiglist.length > 0">
                            <a-col :lg="12">
                                <p class="all-payment-method fw-5 mb-2">
                                    {{ $t("leftss.ls19") }}
                                </p>
                            </a-col>
                        </a-row>
                        <a-card class="card-info" v-show="orderdata.payconfiglist.length > 0">
                            <a-row :gutter="16">
                                <a-col :lg="14" :xl="6" class="pr-0">
                                    <a-radio-group v-model="activeTab" class="payment-method-radiobtn">
                                        <a-radio v-for="(
                                                item, index
                                            ) in orderdata.payconfiglist" :value="index" :key="index">{{ item.name }}
                                        </a-radio>
                                    </a-radio-group>
                                </a-col>
                                <a-col :lg="24" :xl="18" class="left-tab-card">
                                    <div class="">
                                        <a-row class="px-2 pt-4">
                                            <a-col :lg="24" v-for="(list, key) in orderdata
                                                .payconfiglist[activeTab]
                                                ?.fields" :key="key" class="pb-4">
                                                <span class="enterprises-txt">{{
                                                    list.fieldname
                                                }}</span>
                                                <a-popover v-if="list.fieldcontenttype ==
                                                        'qr_code'
                                                        " trigger="hover" placement="bottom"
                                                    overlay-class-name="qrcode-popover">
                                                    <template slot="content">
                                                        <div>
                                                            <img :src="list.fieldvalue
                                                                " height="200" width="auto" />
                                                        </div>
                                                    </template>
                                                    <img :src="list.fieldvalue" height="30" width="auto" />
                                                </a-popover>
                                                <p v-else class="recieve-txt fw-5 mb-0">
                                                    <span :id="`keycopy${key}`">{{
                                                        list.fieldvalue
                                                        ? list.fieldvalue
                                                        : "--"
                                                    }}
                                                    </span>
                                                    <AppClipboard :target="`#keycopy${key}`" element-class="link-url1" />
                                                </p>
                                            </a-col>
                                        </a-row>
                                    </div>
                                </a-col>
                            </a-row>
                        </a-card>
                        <div v-if="orderdata.orderstatus == 5 ||
                            orderdata.orderstatus == 1
                            ">
                            <p class="mt-4 mb-0 all-payment-method fw-5">
                                {{ orderdata?.orderstatus == 5 ? $t("newkeys.nk2") : $t("leftss.ls32") }}
                            </p>
                            <a-row class="py-4 col-alignment">
                                <a-col :lg="17" :xl="12">
                                    <div class="positive-txt-box">
                                        <a-button class="mr-1 fw-5" :class="feedBackData.starLeve > 1
                                            ? 'thumbs-up-btn'
                                            : 'thumbs-neutral-btn'
                                            " block @click="userevaluate('Positive', 5)">
                                            <img :src="feedBackData.starLeve > 1
                                                ? '/images/thumbs-up-active.svg'
                                                : '/images/thumbs-up.svg'
                                                " class="mr-2 mb-1" />
                                            {{ $t("leftss.ls7") }}</a-button>
                                        <a-button class="fw-5" block :class="feedBackData.starLeve == 1
                                            ? 'thumbs-down-btn'
                                            : 'thumbs-neutral-btn'
                                            " @click="userevaluate('Negative', 1)">
                                            <img :src="feedBackData.starLeve == 1
                                                ? '/images/thumbs-down-active.svg'
                                                : '/images/thumbs-down.svg'
                                                " class="mr-2" />
                                            {{ $t("leftss.ls8") }}</a-button>
                                    </div>
                                </a-col>
                                <a-col :lg="7" :xl="12">
                                    <span class="earn-blance fw-5 pointer" @click="
                                        $router.push('/p2p/p2p-account')
                                        ">{{ $t("leftss.ls10") }}</span>
                                </a-col>
                            </a-row>
                            <a-row>
                                <a-col :lg="16" :xl="16">
                                    <a-textarea v-model="feedBackData.evaluateContent" :placeholder="$t('c2c.your_reviews')"
                                        :auto-size="{ maxRows: 4 }" />
                                </a-col>
                                <a-col :lg="16" align="end">
                                    <a-button size="small" class="primary-btn my-2" @click="submitFeedback"
                                        :loading="submittingReview" :disabled="submittingReview">{{ $t("feedback.fdb3")
                                        }}</a-button>
                                </a-col>
                            </a-row>
                        </div>
                        <p v-if="orderdata.orderstatus == 2">
                            {{ $t("leftss.ls22") }}
                        </p>
                        <p v-if="orderdata.orderstatus == 3">
                            {{ $t("leftss.ls23") }}
                        </p>

                        <template v-if="orderdata.direction == 1"> <!-- for buyer -->
                            <a-row>
                                <a-col :lg="24" v-if="orderdata.orderstatus == 0">
                                    <p class="amount-txt fw-5 pt-2 pb-3">
                                        {{ $t("leftss.ls24") }}
                                    </p>
                                    <a-button class="primary-btn fw-5 mr-2 mb-3" @click="p2pPaymentConfirmation = true">
                                        {{ $t("leftss.ls25") }}
                                    </a-button>
                                    <a-button class="cancel-outline-btn px-4" v-if="orderdata.userid == $userinfo.uid"
                                        @click=" changeusercancel(orderdata, 'deleteAddress')">
                                        {{ $t("leftss.ls26") }}
                                    </a-button>
                                </a-col>

                                <a-col :lg="24" v-if="orderdata.orderstatus == 4">
                                    <span v-show="!timerLoading">
                                        <p class="active mt-3 amount-txt fw-5 mb-0" v-if="paytime != '-- -- --'">
                                            {{ $t("leftss.ls27") }}
                                            (<span> {{ paytime.split(" ")[1] }} </span>:
                                            <span>{{ paytime.split(" ")[2] }}</span>)
                                        </p>
                                        <a-button v-else class="outline-btn fw-5 mr-2 mb-3 mt-3"
                                            @click="appealModel = true">
                                            <template v-if="appeal.content">
                                                {{ $t("leftss.ls33") }}
                                            </template>
                                            <template v-else>
                                                {{ $t("leftss.ls28") }}
                                            </template>
                                        </a-button>
                                    </span>
                                    <a-button class="cancel-outline-btn fw-5 px-4 mt-3" v-if="orderdata.userid == $userinfo.uid"
                                        @click="changeusercancel(orderdata, 'deleteAddress')">
                                        {{ $t("leftss.ls26") }}
                                    </a-button>
                                </a-col>

                            </a-row>
                            <template v-if="orderdata.orderstatus == 6">
                                <a-row class="mt-3">
                                    <a-col :lg="24">
                                        <a-card class="gray-card-order">
                                            <h2>Appeal</h2>
                                            <a-col :lg="2">
                                                <p class="pt-2 pb-2 mb-0 amount-txt fw-6">
                                                    {{ $t("c2c.appeal_status") }}:
                                                </p>
                                            </a-col>
                                            <a-col :lg="20">
                                                <p class="mb-0 yellow-active pt-2 pb-2" v-if="appeal.status == 0">
                                                    {{ $t("manage.processing") }}
                                                </p>
                                                <p class="mb-0 yellow-active pt-2 pb-2" v-if="appeal.status == 1">
                                                    {{ $t("person.processed_ticket") }}
                                                </p>
                                                <p class="mb-0 red-active pt-2 pb-2" v-if="appeal.status == 2">
                                                    {{ $t("person.cancelled") }}
                                                </p>
                                                <p class="mb-0 grey-active pt-2 pb-2" v-if="appeal.status == 3">
                                                    {{ $t("person.unsolved") }}
                                                </p>
                                                <p class="mb-0 success-active pt-2 pb-2" v-if="appeal.status == 4">
                                                    {{ $t("tableskeys.lss3") }}
                                                </p>
                                            </a-col>

                                            <p class="pt-2 pb-2 mb-0 amount-txt fw-6">
                                                {{ $t("tableskeys.tt3") }}:
                                            </p>
                                            <p>
                                                {{ appeal.content }}
                                            </p>
                                            <a-row>
                                                <a-col :lg="6" v-for="(image, index) in appeal.images" :key="index">
                                                    <img :src="image" alt="" srcset="" height="120" />
                                                </a-col>
                                            </a-row>
                                        </a-card>
                                    </a-col>
                                </a-row>
                                <a-row class="mt-3">
                                    <a-col :lg="5" v-if="$userinfo.uid == orderdata.complainantuserid">
                                        <a-button class="outline-btn fw-5 px-4 mr-2" @click="cancelAppeal"
                                            :loading="usercancelloading">{{ $t("leftss.ls29") }}</a-button>
                                    </a-col>
                                    <a-col :lg="7">
                                        <a-button class="outline-btn fw-5 px-4" @click="togglePopoverAndOpenChat">
                                            {{ $t("leftss.ls30") }}</a-button>
                                    </a-col>
                                </a-row>
                            </template>
                        </template>

                        <template v-else> <!-- for seller -->
                            <a-row class=" mt-3">
                                <template v-if="orderdata.orderstatus == 6">

                                    <a-col :lg="24">
                                        <a-card class="gray-card-order">
                                            <h2>Appeal</h2>
                                            <a-col :lg="2">
                                                <p class="pt-2 pb-2 mb-0 amount-txt fw-6">
                                                    {{ $t("c2c.appeal_status") }}:
                                                </p>
                                            </a-col>
                                            <a-col :lg="20">
                                                <p class="mb-0 yellow-active pt-2 pb-2" v-if="appeal.status == 0">
                                                    {{ $t("manage.processing") }}
                                                </p>
                                                <p class="mb-0 yellow-active pt-2 pb-2" v-if="appeal.status == 1">
                                                    {{ $t("person.processed_ticket") }}
                                                </p>
                                                <p class="mb-0 red-active pt-2 pb-2" v-if="appeal.status == 2">
                                                    {{ $t("person.cancelled") }}
                                                </p>
                                                <p class="mb-0 grey-active pt-2 pb-2" v-if="appeal.status == 3">
                                                    {{ $t("person.unsolved") }}
                                                </p>
                                                <p class="mb-0 success-active pt-2 pb-2" v-if="appeal.status == 4">
                                                    {{ $t("tableskeys.lss3") }}
                                                </p>
                                            </a-col>

                                            <p class="pt-2 pb-2 mb-0 amount-txt fw-6">
                                                {{ $t("tableskeys.tt3") }}:
                                            </p>
                                            <p>
                                                {{ appeal.content }}
                                            </p>
                                            <a-row>
                                                <a-col :lg="6" v-for="(image, index) in appeal.images" :key="index">
                                                    <img :src="image" alt="" srcset="" height="120" />
                                                </a-col>
                                            </a-row>
                                        </a-card>

                                    </a-col>

                                </template>
                                <template v-if="appeal.replycontent">
                                    <a-col :lg="6">
                                        <p class="pt-3 pb-3 mb-0 amount-txt">
                                            {{ $t("tableskeys.appeal_comment") }}
                                        </p>
                                    </a-col>

                                    <a-col :lg="24">
                                        <p class="mb-0">
                                            {{ appeal.replycontent }}
                                        </p>
                                    </a-col>
                                </template>

                                <!-- //0:processing, 1:processed, 2:cancelled, 3:unsolved, 4:completed -->
                                <a-col :lg="24" v-if="orderdata.orderstatus == 4">
                                    <p class="pt-3 pb-3 amount-txt">
                                        {{ `${this.$t("newkeys.nk1")}(${orderdata.nikename})` }}
                                    </p>

                                </a-col>
                                <a-col :lg="24" v-if="orderdata.orderstatus == 4">
                                    <a-button class="outline-btn fw-5 px-4 mr-2 mt-2" @click="appealModel = true">
                                        <template v-if="appeal.content">
                                            {{ $t("leftss.ls33") }}
                                        </template>
                                        <template v-else>
                                            {{ $t("leftss.ls28") }}
                                        </template>
                                    </a-button>
                                    <a-button class="outline-btn fw-5 mr-2 mb-3" @click="PaymentRecievedTip = true">{{
                                        $t("leftss.ls31") }}</a-button>
                                </a-col>

                                <a-col :lg="24" v-if="orderdata.orderstatus == 6">
                                    <a-button v-if="$userinfo.uid ==
                                        orderdata.complainantuserid
                                        " class="outline-btn fw-5 px-4 mr-2" @click="cancelAppeal"
                                        :loading="usercancelloading">{{ $t("leftss.ls29") }} </a-button>



                                    <a-button class="outline-btn fw-5 px-4 mt-3" @click="togglePopoverAndOpenChat">
                                        {{ $t("leftss.ls30") }}</a-button>
                                </a-col>
                            </a-row>
                        </template>
                    </a-col>
                </a-row>
            </div>
        </div>
        <SubmitAppeal :submitAppealModel="submitAppealModel" :close="close" :orderdata="orderdata"
            @getorderdetail="getorderdetail" :prevAppeal="appeal" />
        <Appeal v-if="appealModel" :appealModel="appealModel" :close="close" @openSubmitAppeal="openSubmitAppeal"
            :orderdata="orderdata" />
        <CancelOrder :cancelOrderModel="usercancelstate" v-if="usercancelstate" :close="closeCancelState"
            :confirmCancel="usercancel" ref="popname" :loading="usercancelloading" />
        <PaymentConfirmation :p2pPaymentConfirmation="p2pPaymentConfirmation" :close="close"
            :paymentMethod="orderdata.payconfiglist[activeTab]" :id="orderdata.id" @getorderdetail="getorderdetail"
            :orderdata="orderdata" />

        <VerificationModal :verificationModel="sellSecurityVerification" @onClose="sellSecurityVerification = false"
            :confirmAuth="paymentRecieved" :loading="affirmloading" />

        <!-- <VerificationMethod v-if="sellSecurityVerification" :verificationModel="sellSecurityVerification" :close="close"
            @confirmPaymentMethod="paymentRecieved" :loading="affirmloading" /> -->

        <ConfirmationRelease :confirmationRelease="confirmationRelease" :close="close" />

        <SuccessModal :successModel="successModel" :show="showSuccessModal" @onOk="closeSuccessModal" />
        <PaymentRecievedTipModal :show="PaymentRecievedTip" v-if="PaymentRecievedTip" :close="closePaymentRecievedTip"
            :confirm="confirmPaymentRecievedTip" />
    </div>
</template>

<script>
import AppClipboard from "~/components/App/AppClipboard.vue";

import VerificationModal from "~/components/App/VerificationModal.vue";
import PaymentRecievedTipModal from "@/components/p2p/Modals/paymentrecievedtip.vue";
import SuccessModal from "~/components/App/SuccessModal.vue";
import SubmitAppeal from "@/components/p2p/P2pAccount/BuyMethod/Modal/SubmitAppeal.vue";
import VerificationMethod from "@/components/person/PaymentMethod/PaymentModal/VerificationMethod";
import Appeal from "@/components/p2p/P2pAccount/BuyMethod/Modal/Appeal.vue";
import CancelOrder from "@/components/p2p/P2pAccount/BuyMethod/Modal/CancelOrder.vue";
import PaymentConfirmation from "@/components/p2p/Modals/PaymentConfirmation.vue";
import ConfirmationRelease from "@/components/p2p/Modals/ConfirmationRelease.vue";
import SellSecurityVerification from "@/components/p2p/Modals/SellSecurityVerification.vue";
import Faqs from "@/components/public/Faqs.vue";
import steps from "ant-design-vue/lib/steps";
export default {
    components: {
        PaymentConfirmation,
        ConfirmationRelease,
        PaymentRecievedTipModal,
        SellSecurityVerification,
        VerificationMethod,
        Appeal,
        CancelOrder,
        Faqs,
        SubmitAppeal,
        VerificationModal,
        SuccessModal,
        AppClipboard,
    },
    props: {
        orderdata: {
            type: Object,
        },
        getorderdetail: {
            type: Function,
        },
    },
    computed: {
        current() {
            let currentStatus;
            switch (this.orderdata.orderstatus) {
                // 0, order placed but not paid;
                // 1, transaction completed;
                // 2, user cancels transaction;
                // 3, system cancels transaction;
                // 4, buyer has paid and is waiting for confirmation from seller;
                // 5, transaction is completed and awaits evaluation;
                // 6, buyer has paid An appeal is required;
                // 7. After the appeal is completed, the system transfers currency to complete the transaction.
                case 1:
                    currentStatus = 4;
                    break;
                case 0:
                    currentStatus = 0;
                    break;
                case 4:
                    currentStatus = 1;
                    break;
                case 5:
                    currentStatus = 2;
                    break;
                default:
                    currentStatus = 0;
                    break;
            }
            return currentStatus;
        },
        steps() {
            if (this.orderdata.direction == 1) {
                return [
                    {
                        title: this.$t("tableskeys.lss1"),
                    },
                    {
                        title: this.$t("tableskeys.lss2"),
                    },
                    {
                        title: this.$t("tableskeys.lss3"),
                    },
                ];
            } else {
                return [
                    {
                        title: this.$t("tableskeys.lss4"),
                    },
                    {
                        title: this.$t("tableskeys.lss5"),
                    },
                    {
                        title: this.$t("tableskeys.lss3"),
                    },
                ];
            }
        },
    },
    data() {
        return {
            PaymentRecievedTip: false,
            cancelOrderModel: false,
            p2pPaymentConfirmation: false,
            confirmationRelease: false,
            sellSecurityVerification: false,
            userevaluatestate: false,
            viewAllMethod: false,
            affirmloading: false,
            tabPosition: "top",
            activeTab: 0,
            usercancelstate: false,
            submittingReview: false,
            usercancelloading: false,
            appealModel: false,
            submitAppealModel: false,
            timer: null,
            paytime: "-- -- --",
            timerLoading: true,
            banner: true,
            successModel: { heading: "", message: "" },
            showSuccessModal: false,
            appeal: {},
            //   chat states
            isElementVisible: true,
            onInitRan: false,
            kommunicateSettings: null,
            userInput: "", // Initialize visitorEmail data property
            visitormail: "",
            isEmailValid: true, // Initialize isEmailValid flag as true
            feedBackData: {
                starLeve: 5,
                evaluateContent: "",
                evaluationTag: "",
            },
        };
    },
    methods: {
        callback(val) { },
        close() {
            this.p2pPaymentConfirmation = false;
            this.confirmationRelease = false;
            this.sellSecurityVerification = false;
            this.appealModel = false;
            this.cancelOrderModel = false;
            this.submitAppealModel = false;
            this.viewAllMethod = false;
        },
        openSubmitAppeal() {
            this.close();
            this.submitAppealModel = true;
        },
        changeusercancel(item, m) {
            this.usercancelstate = true;
            //  this.$refs.popname.ShowPopup(item, m);
        },
        closeCancelState() {
            this.usercancelstate = false;
        },
        userevaluate(parame, starleve) {
            if (this.orderdata.orderstatus == 1) {
                return;
            }
            if (this.submittingReview) {
                return;
            }

            this.feedBackData.evaluationTag = parame;
            this.feedBackData.starLeve = starleve;
        },
        cancelAppeal() {
            if (this.usercancelloading) {
                return;
            }
            this.usercancelloading = true;
            this.$store
                .dispatch("trading_c2c_order_cancel_appeal", {
                    ordercompleteid: this.orderdata.id,
                })
                .then((res) => {
                    if (res.code == "200") {
                        this.changeAppealStatus()

                    } else {
                        this.usercancelloading = false;
                    }
                });
        },
        changeAppealStatus() {
            this.$store
                .dispatch("work_order_update", {
                    id: this.appeal.id,
                    status: 3,
                    typeName: this.appeal.typename,
                    content: this.appeal.content,
                    images: JSON.stringify(this.appeal.images),
                })
                .then((res) => {
                    if (res.code == "200") {
                        this.getorderdetail();
                        this.usercancelloading = false;
                        this.$store.commit("set_message", {
                            type: "ok",
                            text: this.$t("texts.txt11"),
                        });
                    } else {
                        this.usercancelloading = false;
                    }
                });
        },
        getAppeal() {
            this.$store
                .dispatch("get_work_order_get", {
                    orderId: this.orderdata.id,
                    pageIndex: 1,
                    pageSize: 2,
                })
                .then((res) => {
                    if (res.code == "200") {
                        const pagedata = res.data.pagedata
                            ? res.data.pagedata
                            : [];
                        const infos =
                            pagedata.length > 0 ? pagedata[0].infos : [];
                        this.appeal = infos.length > 0 ? infos[0] : {};
                        this.appeal.images = this.appeal?.images.split(",");
                    }
                });
        },
        usercancel(reason) {
            if (this.usercancelloading) {
                return;
            }
            this.usercancelloading = true;
            this.$store
                .dispatch("trading_c2c_order_cancel", {
                    ordercompleteid: this.orderdata.id,
                    complainantreason: reason,
                })
                .then((res) => {
                    //console.log(res)
                    if (res.code == "200") {
                        this.getorderdetail();
                        this.global_refresh_user_inprocessorders_count();
                        this.usercancelstate = false;
                        this.usercancelloading = false;
                        this.$store.commit("set_message", {
                            type: "ok",
                            text: this.$t("c2c.Successfully"),
                        });
                    } else {
                        this.usercancelloading = false;
                    }
                });
        },
        paymentRecieved(verifycode) {
            if (this.affirmloading) {
                return;
            }
            let postData = {};
            postData.googleVerifyCode = verifycode.googleVerifyCode;
            postData.payPassword = verifycode.paypassword;

            postData.ordercompleteid = this.orderdata.id;
            //console.log('postData: ', postData);

            this.affirmloading = true;
            this.$store
                .dispatch("trading_c2c_order_receivables", postData)
                .then((res) => {
                    if (res.code == "200") {
                        this.showSuccessModal = true;
                        this.successModel = {
                            heading: "Message",
                            message: this.$t("c2c.ConfirmedR"),
                        };
                        this.global_refresh_user_inprocessorders_count();
                        this.$store.commit("set_message", {
                            type: "ok",
                            text: this.$t("c2c.ConfirmedR"),
                        });
                        this.close();
                    }

                    this.affirmloading = false;
                });
        },
        setpaytime() {
            const _self = this;
            if (this.orderdata) {
                if (_self.timer) {
                    clearInterval(_self.timer);
                    _self.timer = null;
                    _self.timerLoading = false;
                }
                var leftSeconds =
                    _self.orderdata.orderstatus === 4
                        ? _self.orderdata.appealleftsecondtime
                        : _self.orderdata.payleftsecondtime;

                const expireTime = new Date(Date.now() + leftSeconds * 1000);
                _self.timer = setInterval(function () {
                    const currentTime = new Date();
                    const elapsedTime = expireTime - currentTime;
                    const hours = String(
                        Math.floor(elapsedTime / (1000 * 60 * 60))
                    ).padStart(2, "0");
                    const minutes = String(
                        Math.floor(
                            (elapsedTime % (1000 * 60 * 60)) / (1000 * 60)
                        )
                    ).padStart(2, "0");
                    const seconds = String(
                        Math.floor((elapsedTime % (1000 * 60)) / 1000)
                    ).padStart(2, "0");
                    if (
                        parseInt(hours) <= 0 &&
                        parseInt(minutes) <= 0 &&
                        parseInt(seconds) <= 0
                    ) {
                        clearInterval(_self.timer);
                        _self.timer = null;
                        _self.paytime = "-- -- --";
                        _self.timerLoading = false;
                        setTimeout(() => { }, 3000);
                    } else {
                        let val = `${hours} ${minutes} ${seconds}`;
                        _self.paytime = val;
                        _self.timerLoading = false;
                    }

                    // Use _self to access the Vue component's context
                }, 1000);
            }

            // this.$store.dispatch("com_test", {}).then((res) => {
            //   let from = new Date(moment.tz(res.data.utcnow, "Etc/GMT").local());
            //   const to = new Date(
            //     moment.tz(_self.orderdata.paytime, "Etc/GMT").add(30, "m").local()
            //   );
            //   if (_self.timer) {
            //     clearInterval(_self.timer);
            //     _self.timer = null;
            //     _self.timerLoading = false;
            //   }
            //   _self.timer = setInterval(() => {
            //     from = new Date(
            //       from.getTime() + (new Date().getTime() - from.getTime())
            //     );
            //     const intervaltime = moment.duration(to - from);
            //     if (intervaltime._milliseconds < 0) {
            //       clearInterval(_self.timer);
            //       _self.timer = null;
            //       _self.paytime = "-- -- --";
            //       _self.timerLoading = false;
            //       setTimeout(() => {}, 3000);
            //     } else {
            //       from;
            //       let val = `${intervaltime._data.hours} ${intervaltime._data.minutes} ${intervaltime._data.seconds}`;
            //       _self.paytime = val;
            //       _self.timerLoading = false;
            //     }
            //   }, 1000);
            // });
        },
        submitFeedback() {
            if (this.orderdata.orderstatus == 1) {
                return;
            }
            if (this.userevaluatestate) {
                return;
            }
            this.feedBackData.ordercompleteid = this.orderdata.id;
            this.userevaluatestate = true;
            this.submittingReview = true;

            this.$store
                .dispatch("trading_c2c_order_evaluate", this.feedBackData)
                .then((res) => {
                    this.submittingReview = false;
                    if (res.code == "200") {
                        this.userevaluatestate = false;
                        this.$store.commit("set_message", {
                            type: "ok",
                            text: this.$t("c2c.Comment"),
                        });
                        this.getorderdetail();
                        this.global_refresh_user_inprocessorders_count();
                    }
                })
                .catch((error) => {
                    this.submittingReview = false;
                });
        },
        closeSuccessModal() {
            this.getorderdetail();
            this.showSuccessModal = false;
        },
        // chat support function for chat
        togglePopover() {
            this.buttonclose = !this.buttonclose;
        },
        hidebutton() {
            this.isElementVisible = false;
        },
        openChat() {
            Kommunicate.displayKommunicateWidget(true);
            Kommunicate.openWidgetPreview();
        },
        togglePopoverAndOpenChat() {
            this.openChat();
            this.togglePopover();
            this.hidebutton();
        },
        closePaymentRecievedTip() {
            this.PaymentRecievedTip = false;
        },
        confirmPaymentRecievedTip() {
            this.PaymentRecievedTip = false;
            this.sellSecurityVerification = true;
        },
    },
    mounted() {
        if (this.orderdata.orderstatus == 4) {
            this.setpaytime();
        }

        this.getAppeal();
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
};
</script>

<style></style>
