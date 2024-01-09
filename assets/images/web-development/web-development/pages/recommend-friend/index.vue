<template>
  <div id="recommend-friend">
    <RecommendFriend />
  </div>
</template>

<script>
import RecommendFriend from '@/components/RecommendFriend/RecommendFriend'
export default {
components: {
    RecommendFriend,
}
}
</script>

<style lang="scss">
    @import '@/assets/scss/pages/recommend-friend/recommend-friend.scss';
</style>