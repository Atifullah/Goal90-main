<template>
    <div id="payment-method">
      <PaymentMethod />
    </div>
  </template>
  
  <script>
  import PaymentMethod from "@/components/person/PaymentMethod/PaymentMethod.vue"
  export default {
    components:{
        PaymentMethod
    },
    mounted(){
      if (!this.$userinfo.uid) {
        this.$router.push('/login?returnurl=' + this.$route.path)
      }
    }

  }
  </script>
  
  <style></style>