<template>
    <div>
      <router-view/>
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