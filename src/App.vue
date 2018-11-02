<template>
  <div id="app">
    <div class="wrapp">
      <tabler :fields="fields" :json="json" :page="1" :per-page="10" @clicked="onButtonClick" :search-by="'admin1'"></tabler>
    </div>
  </div>
</template>

<script>

import Tabler from './components/tabler.vue'
//import VueResource from 'vue-resource'

//let json = []
//for(let i = 100; i < 200; i++){
////  json.push({ch: { value: i, checked: false }, date: '12.08.1999', user: 'admin'+i, orderno: i, href: 'dasd'})
//    json[i] = {ch: { value: i, checked: false }, date: '12.08.1999', user: 'admin'+i, orderno: ''+i, href: 'dasd'}
//}

//let json = {
//    "fafas": {ch: { value: 1, checked: false }, date: '12.08.1999', user: 'admin', orderno: '121', href: 'dasd'}
//}
//let json = []

//window.json = json

export default {
  name: 'app',
  data: function() {
    return {
        fields: [
            {
                key: 'ch',
                type: 'checkbox',
                title: 'Активный',
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
                filterable: false,
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
                filterable: false,
//                styles: {"max-width": "max-width: 100px"}
            },
            {
                key: 'href',
                type: 'download',
                title: 'Скачать',
                thClass: 'uk-text-center',
                tdClass: 'uk-text-center'
            },
        ],
//        json: json
        json: [
            {trClass: 'huj', ch: { value: '1', checked: true }, date: '12.08.1999', user: 'admin1', orderno: '1234', href: 'dasd'},
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
  .huj{
    background-color: #00a8e6;
  }
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
