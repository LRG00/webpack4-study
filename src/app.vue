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
import { login } from '@/api/login'
  export default {
    data() {
      return {
        login,
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
    mounted() {
      login().then(res => {
        console.log(res)
      })
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