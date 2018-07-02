<template>
  <div id="app">
    <tabler :tableClass="'uk-table uk-table-hover'" :fields="fields" :json="json" :page="1" :per-page="10" @clicked="onButtonClick"></tabler>
  </div>
</template>

<script>

import Tabler from './components/tabler.vue'
import VueResource from 'vue-resource'

export default {
  name: 'app',
  data: function() {
    return {
        fields: [
            {key: 'date', type: 'date', format: 'dd.mm.yyyy', title: 'Date'},
            {key: 'user', type: 'string', title: 'User'},
            {key: 'orderno', type: 'number', title: 'Order no', sortable: true, styles: {"max-width": "max-width: 100px"}},
            {key: 'href', type: 'download', title: 'Download'},
        ],
        json: [
          {date: '12.08.1999', user: 'admin', orderno: '1234', href: 'dasd'},
          {date: '13.08.1999', user: 'user', orderno: '3123'},
          {date: '14.08.1999', user: 'admin', orderno: '415'},
          {date: '15.08.1999', user: 'user', orderno: '412412'}
        ]
    }
  },
  methods: {
      onButtonClick: function (field) {
          console.log(field)
      }
  },
  components: {
    'tabler': Tabler
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
