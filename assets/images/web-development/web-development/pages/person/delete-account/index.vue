<template>
    <div id="delete-account">
        <DeleteAccount />
    </div>
</template>

<script>
import DeleteAccount from "@/components/person/Security/SecuritySetting/DeleteAccount.vue";

export default {
    components: {
        DeleteAccount,
    },
};
</script>

<style lang="scss">
#delete-account {
.ant-tabs-nav-wrap {
    padding: 24px 0px 0 0px;
}
.notice-txt {
    font-size: 15px;
}
.ant-tabs-nav .ant-tabs-tab:first-child {
    margin-left: 2px !important;
}
.ant-tabs-nav .ant-tabs-tab:last-child {
    margin-right: 2px !important;
}
}
</style>
