<template name="component-name">
  <div>
  <div class="icons-list">
    <a-icon type="home" />
    <a-icon type="setting" theme="filled" />
    <a-icon type="smile" theme="outlined" />
    <a-icon type="sync" spin />
    <a-icon type="loading" />
  </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!'); 
      }
    }
  }
</script>
<style>
</style>