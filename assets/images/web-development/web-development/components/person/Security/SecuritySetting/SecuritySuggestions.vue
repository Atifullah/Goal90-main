<template>
    <a-card class="mt-3" :bordered="false">
        <a-row>
            <a-col :lg="21">
                <p class="suggest-user-id fw-5">{{$t('google.safetySuggest')}}</p>
                <p class="scurity-desc fw-4 mb-1">{{$t('google.reveal')}}</p>
                <p class="scurity-desc fw-4 mb-1">{{$t('google.fishing')}}</p>
                <p class="scurity-desc fw-4 mb-1">{{$t('google.install')}}</p>
                <p class="scurity-desc fw-4 mb-1">{{$t('google.call')}}</p>
                <p class="scurity-desc fw-4 mb-1">{{$t('google.revealInfo')}}</p>
                <p class="scurity-desc fw-4 mb-1">{{$t('google.transfer')}}</p>
            </a-col>
        </a-row>
    </a-card>
</template>
<script>
export default{

}
</script>
