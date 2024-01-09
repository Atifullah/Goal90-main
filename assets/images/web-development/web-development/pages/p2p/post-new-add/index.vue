<template>
  <div id="post-new-add">
    <PostNewAdd />
  </div>
</template>

<script>
import PostNewAdd from '@/components/p2p/PostNewAdd/PostNewAdd.vue'
export default {
  components: {
    'PostNewAdd': PostNewAdd,
  },
  mounted() {
    if (!this.$userinfo.uid) {
      // this.$router.push('/login?returnurl=' + this.$route.path)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/p2p/post-new-add.scss';
</style> 
