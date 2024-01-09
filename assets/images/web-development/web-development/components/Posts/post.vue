<template>
    <h1>Bitnasdaq Posts Page</h1>
</template>
<script>
import { mapGetters } from "vuex";

export default ({
    data() {
        return {
        }

    },
    computed: {
        ...mapGetters("article", [
            "getSubItems",
            "subItemPagination",
        ]),
        subItems() {
            return this.getSubItems;
        },
    },
})
</script>
