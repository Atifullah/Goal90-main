<template>
  <div class="chat-footer">
    <a-card class="chat-footer-card" :bordered="false">
      <a-row :gutter="16" class="footer-row">
        <a-col :lg="20">
          <a-input :placeholder="$t('placeholders.plh26')">
    </a-input
        ></a-col>
        <a-col :lg="4" align="end">
          <a-row :gutter="16">
            <a-col :lg="10" align="center" class="py-2">
              <a-upload
                list-type="picture"
                action="//jsonplaceholder.typicode.com/posts/"
                :preview-file="previewFile"
              >
                <img src="/images/upload.svg" /> </a-upload
            ></a-col>
            <a-col :lg="14" align="center"
              ><img src="/images/send-chat.svg" class="send-icon"
            /></a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
export default {
  methods: {
    previewFile(file) {
      // Your process logic. Here we just mock to the same file
      return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
        method: 'POST',
        body: file,
      })
        .then((res) => res.json())
        .then(({ thumbnail }) => thumbnail)
    },
  },
}
</script>

<style></style>
