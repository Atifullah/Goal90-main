<template>
  <div id="contact-us">
    <ContactUs />
  </div>
</template>

<script>
import ContactUs from "~/components/FooterModule/ContactUs.vue";

export default {
  components: {
    ContactUs,
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.$userinfo.uid) {
        vm.$router.push("/login?returnurl=" + to.fullPath);
      } else {
        next();
      }
    });
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/pages/footer/contact-us.scss";
</style>