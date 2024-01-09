<template>
 
        <a-input :placeholder="placeholder" class="fw-5 app-input-number" type="number">
            <span slot="prefix" class="white">
                <span class="coin-txt">{{ prefix }}</span>
            </span>
            <span slot="suffix" class="white">
                <span class="pl-2">{{ suffix }}</span>
            </span>
        </a-input>
   
</template>

<script>
export default {
    props: {
        prefix: {
            type: String,
            default: ''
        },
        suffix: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: '' 
        }
    }
}
</script>
