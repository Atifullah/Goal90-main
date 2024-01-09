<template>
    <div class="account-card mt-3">
        <a-row :gutter="16" class="card-account">
            <a-col :lg="8" v-for="(list, key) in getAccountList" :key="key">
                <a-card :bordered="false" class="merchant-account-card text-center">
                    <img :src="list.img" class="mb-3" />
                    <p class="p2p-heading fw-5 mb-1">{{ list.title }}</p>
                    <span class="account-desc fw-4">
                        {{ list.desc }}
                    </span>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            getAccountList: [
                {
                    img: "/images/advanced-management.svg",
                    title: this.$t("tableskeys.msg18"),
                    desc: this.$t("tableskeys.msg21"),
                },
                {
                    img: "/images/verified-badges.svg",
                    title: this.$t("tableskeys.msg19"),
                    desc: this.$t("tableskeys.newly_granted_portals"),
                },
                {
                    img: "/images/customer-supports.svg",
                    title: this.$t("tableskeys.msg20"),
                    desc: this.$t("tableskeys.support_team"),
                },
            ],
        };
    },
};
</script>
