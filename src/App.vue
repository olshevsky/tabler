<template>
  <div id="app">
    <div class="wrapp">
      <tabler :tableClass="'uk-table uk-table-hover'" :fields="fields" :json="json" :page="1" :per-page="5" @clicked="onButtonClick" :show-filters="true"></tabler>
    </div>
  </div>
</template>

<script>

import Tabler from './components/tabler.vue'
//import VueResource from 'vue-resource'

//var json = []
//for(let i = 0; i < 100; i++){
//  json.push({ch: { value: i, checked: false }, date: '12.08.1999', user: 'admin1', orderno: '1234', href: 'dasd'})
//}

export default {
  name: 'app',
  data: function() {
    return {
        fields: [
            {
                key: 'ch',
                type: 'checkbox',
                title: 'Актывный',
                sortable: true,
                thClass: 'uk-text-center',
                tdClass: 'uk-text-center',
                checked: false
            },
            {
                key: 'date',
                type: 'date',
                title: 'Дата',
                sortable: true,
                format: 'dd.mm.yyyy',
                filterable: true
            },
            {
                key: 'user',
                type: 'string',
                title: 'Пользователь',
                sortable: true,
                filterable: true
            },
            {
                key: 'orderno',
                type: 'number',
                title: 'Номер заказа',
                sortable: true,
                filterable: true,
                styles: {"max-width": "max-width: 100px"}
            },
            {
                key: 'href',
                type: 'download',
                title: 'Скачать',
                thClass: 'uk-text-center',
                tdClass: 'uk-text-center'
            },
        ],
        json: [
            {ch: { value: '1', checked: true }, date: '12.08.1999', user: 'admin1', orderno: '1234', href: 'dasd'},
            {ch: '2', date: '13.08.1999', user: 'use2', orderno: '3123'},
            {ch: '3', date: '14.08.2002', user: 'admin3', orderno: '415'},
            {ch: '4', date: '12.08.1999', user: 'admin4', orderno: '1234', href: 'dasd'},
            {ch: '5', date: '13.08.1999', user: 'user', orderno: '3123'},
            {ch: '6', date: '14.08.1970', user: 'admin', orderno: '415'},
            {ch: '7', date: '15.08.1999', user: 'user', orderno: '412412'},
            {ch: '8', date: '12.08.2000', user: 'admin', orderno: '1234', href: 'dasd'},
            {ch: '9', date: '13.08.1999', user: 'user', orderno: '3123'},
            {ch: '10', date: '14.08.1998', user: 'admin', orderno: '415'},
            {ch: '11', date: '15.08.1999', user: 'user', orderno: '412412'},
            {ch: '12', date: '15.08.2015', user: 'user', orderno: '412412'},
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
  .wrapp{
    width: 800px;
    padding-top: 50px;
    margin: 0 auto;
  }
  .fleft{
    float: left;
  }
  .fclear{
    clear: both;
  }
</style>
