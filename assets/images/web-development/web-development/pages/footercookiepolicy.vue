<template>
    <section class="bg-white ant-layout" >
        <!-- <div class="main-body">
            <a-card >
        <p class="cardtop-text">Cookie Policy</p>
    </a-card>
    
    
         <div class="mt-2">
        <a-card>
        <p class="cardtop-text">Bitnasdaq Web Cookie Policy</p>
        <div class="ant-card-body" style="padding-left: 0px;">
        <p class="smalltext">Bitnasdaq </p>
        <p style="color: #718096;">Updated at:15 days 23 hours ago</p>
        </div>
    
    
    
        <h2 class="css-gfs0hc">Cookie Policy</h2>
        <p>Cookies are files that are placed on the computer, or device, by the website when you visit it. They are used to make the website more efficient and effective and enhance user experience. Cookies do not contain your personal data.</p>
        
         <h2 class="css-gfs0hc">Types of Cookies Used</h2>
         <p>We may use the following types of cookies on our website:</p>
         
         <ul>
        <li><h3>Essential Cookies:</h3></li>
         <p>These cookies are necessary for the proper functioning of our website. They enable you to navigate through our site and use its features. Without these cookies, certain services or features may not be available to you.</p>
        <li> <h3>Analytical/Performance Cookies: </h3></li>
         <p>These cookies collect anonymous information about how visitors use our website. They help us understand how our site is performing, identify areas for improvement, and optimize the user experience. We use this information solely for statistical purposes.</p>
         <li><h3>Functional Cookies: </h3></li>
         <p>These cookies enable our website to remember your preferences and provide enhanced functionality. They may be set by us or third-party service providers whose services we have added to our website.</p>
         <li><h3>Advertising/Targeting Cookies:</h3></li>
         <p>These cookies are used to deliver relevant advertisements to you based on your interests. They may also be used to limit the number of times you see an ad and measure the effectiveness of advertising campaigns.</p>
       
        </ul>
    
         <h2 class="css-gfs0hc">Cookies and Web Beacons</h2>
         <p>Like any other website, Bitnasdaq uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on the visitor’s browser type and/or other information.</p>
         <h2 class="css-gfs0hc">Third-Party Cookies </h2>
         <p>Bitnasdaq may allow third-party service providers to place cookies on our website to assist us with various aspects of our website operations. These third-party cookies are subject to the respective privacy policies of those providers. We recommend reviewing their privacy policies for more information on how they handle your personal data.</p>
         <h2 class="css-gfs0hc">Cookie Management</h2>
         <p>You have the option to accept or decline cookies when visiting our website. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer. Please note that disabling cookies may affect the functionality of our website and limit your access to certain features.</p>
         <h2 class="css-gfs0hc">Cookies & Account</h2> 
         <p>Bitnasdaq does not usually associate cookies with your account. However, in some cases, it is done to avoid or prevent unauthorized activities on the website. In such a case, we use this information as personal information applicable to the Privacy Policy we have stated.</p> 
         <h2 class="css-gfs0hc">Google DoubleClick DART Cookie</h2>
         <p>Google is one of the third-party vendors that are present on many websites. It also uses cookies, known as DART cookies, to serve ads to site visitors based on their search history and their activity on the Internet. However, visitors may choose to decline the use of DART cookies by visiting the <a href="https://policies.google.com/technologies/ads"> Google ad and content network Privacy Policy</a> </p>       
          <h2 class="css-gfs0hc">Consent</h2>
          <p>By continuing to use our website without changing your cookie settings, you consent to the use of cookies as described in this policy. You can withdraw your consent at any time by deleting the cookies stored on your device and adjusting your browser settings.</p>
          <h2 class="css-gfs0hc">Updates to this Policy</h2>
          <p>We may update this Cookie Policy from time to time to reflect changes in technology, legal requirements, or our practices. We encourage you to review this policy periodically for any updates. The updated version will be effective as of the date specified at the beginning of this policy.</p>
           <h2 class="css-gfs0hc">Contact Information</h2>
           <p>If you have any questions or concerns about our Cookie Policy, you can always contact us for more details. 
           Please note that this Cookie Policy should be read in conjunction with our Privacy Policy, which provides more detailed information about how we collect, use, and protect your personal data.
    </p>
    
        
    
    </a-card>
    </div>
    </div> -->
    <div >
                <a-card>
                    <p class="mb-0 user-heading">{{ subItem.title }}</p>
                    <!-- <p class="mb-0 last-update">{{ subItem.createtime }}</p> -->
                </a-card>
                <a-card :bordered="false" class="mt-3">
                    <div :bordered="false" class="mt-3" > <p class="user-desc fw-5 mb-4 pb-3" v-html="subItem.remark"></p></div>
                </a-card>
            </div>
    </section>
    
    </template>
    <script>
    import { mapGetters, mapActions } from 'vuex'
    import { webFooterArticle, cookiepolicy } from '~/plugins/constants'
    export default {
        computed: {
            ...mapGetters("article", ["getSubItem", "getSubItems"]),
            subItem() {
                return this.getSubItem;
            },
            subItems() {
                return this.getSubItems;
            },
        },
        methods: {
            ...mapActions('article', ['fetchChannelInfo']),
            fetchData() {
            this.fetchChannelInfo({ channelID: webFooterArticle, subTitle: cookiepolicy })
            }
        },
        mounted() {
            //console.log("hiiiii")
            this.fetchData()
        }
    }
    
    </script>
    

<style lang="scss" scoped>
   .css-gfs0hc{
        border-left: 3px solid orange !important;
        padding: 0px 0 8px 10px !important;
        border-bottom: 1px solid #f2f2f2;
        margin: 33px 0 12px 0 !important;
    }
    .main-body{
        margin-left: 80px;
        margin-right:80px;
        margin-top: 30px;
    }
    
    h2{
    font-family: Satoshi;
    font-size: 18px;
    font-weight: 800;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    
    margin-top:20px;
    margin-bottom: 10px;
    }
    
    h3{
        font-family: 'Satoshi';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    color: #081131;
    margin-left: 10px;
    margin-top: 15px;
    }
    p{
    font-family: 'Satoshi';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: rgba(8, 17, 49, 1);
    margin-bottom: 10px;
    }
    
    .cardtop-text{
        font-family: 'Satoshi';
    font-style: normal;
    font-weight: 700;
    font-size: 25px;
    line-height: 20px;
    color: #081131;
    padding: 0px;
    }
    .smalltext{
    font-family: 'Satoshi';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #081131;
    }
    ul li{
        padding-left: 0pt;
        list-style: none;
    }
</style>
