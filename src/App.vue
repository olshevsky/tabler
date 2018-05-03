<template>
  <div id="app">
    <div class="fleft">
      <v-tabler :url="'http://localhost/vue/json.php'" :fields="fields"></v-tabler>
    </div>
    <div class="fleft">
      <v-tabler :json="json" :fields="fields" :page="2" :per-page="5"></v-tabler>
    </div>
    <div class="fleft"></div>
  </div>
</template>

<script>

import Tabler from './components/Tabler.vue'
import VueResource from 'vue-resource'

export default {
  name: 'app',
  data: function() {
    return {
        fields: [
            {key: 'date', type: 'string', title: 'Date'},
            {key: 'user', type: 'string', title: 'User'},
            {key: 'orderno', type: 'string', title: 'Order no'}
        ],
        json: [
          {date: '12.08.1999', user: 'admin', orderno: '1234'},
          {date: '13.08.1999', user: 'user', orderno: '3123'},
          {date: '14.08.1999', user: 'admin', orderno: '415'},
          {date: '15.08.1999', user: 'user', orderno: '412412'},
          {date: '16.08.1999', user: 'admin', orderno: '42342'},
          {date: '17.08.1999', user: 'user', orderno: '42'},
          {date: '18.08.1999', user: 'admin', orderno: '431'},
          {date: '12.08.1999', user: 'admin', orderno: '1234'},
          {date: '13.08.1999', user: 'user', orderno: '3123'},
          {date: '14.08.1999', user: 'admin', orderno: '415'},
          {date: '15.08.1999', user: 'user', orderno: '412412'},
          {date: '16.08.1999', user: 'admin', orderno: '42342'},
          {date: '17.08.1999', user: 'user', orderno: '42'},
          {date: '18.08.1999', user: 'admin', orderno: '431'},
        ]
    }
  },
  components: {
    'v-tabler': Tabler
  }
}
</script>

<style>
  .fleft{
    float: left;
  }
  .fclear{
    clear: both;
  }
</style>
