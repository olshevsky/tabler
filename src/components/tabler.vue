<template>
    <div>
        <div v-if="propFilters">
            <v-filters :fields="fields" @filter="onFilter"></v-filters>
        </div>
        <div class="search">
            <div class="right">
                <a v-on:click="clearSearch()">
                    <i class="uk-icon-trash"></i>
                </a>
            </div>
            <div class="left">
                <form class="uk-search">
                    <input v-model="searchBy"
                           class="uk-search-field"
                           type="search"
                           :placeholder="trans.searchBy"/>
                </form>
            </div>
            <div class="fclear"></div>
        </div>
        <table :class="tableClass">
            <caption v-if="caption">
                {{caption}}
            </caption>
            <thead>
                <tr>
                    <th v-for="field in fields"
                        :key="field.key"
                        :class="(field.thClass) ? field.thClass : ''">
                            <div v-if="field.sortable">
                                <a v-if="sortBy == field.key"
                                   @click="sort(field.key)">
                                    {{field.title}}
                                    <i :class="{ 'uk-icon-sort-amount-asc': (!sortOrderDesc), 'uk-icon-sort-amount-desc': (sortOrderDesc) }"></i>
                                </a>
                                <a v-else
                                   @click="sort(field.key)">{{field.title}}
                                    <i class="uk-icon-sort"></i>
                                </a>
                            </div>
                            <span v-else class="column-title">
                                {{field.title}}
                            </span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="paginatedRows" v-for="(row, index) in paginatedRows" :key="index" >
                    <td v-for="field in row"
                        :key="field.key"
                        :class="(field.tdClass) ? field.tdClass : ''">
                            <v-button v-if="field.type === 'button'" @clicked="onButtonClick" :field="field"></v-button>
                            <v-checkbox v-else-if="field.type === 'checkbox'" @checked="onChecked" :field="field"></v-checkbox>
                            <v-download v-else-if="field.type === 'download'" :field="field"></v-download>
                            <div v-else v-html="renderField(field)"></div>
                    </td>
                </tr>
                <tr v-else="">
                    <td>no data</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td v-for="field in fields" :key="field.key" :class="(field.tdClass) ? field.tdClass : ''">
                        <div class="uk-form" v-if="field.type === 'checkbox'">
                            <input class="uk-checkbox" type="checkbox" :checked="isChecked(field.key)" @click="mark(field.key, isChecked(field.key))"/>
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>
        <div>
            <div class="uk-form">
                {{ trans.perPage }}:
                <select v-bind="perPageOptions" v-model="displayOnPage">
                    <option v-for="option in perPageOptions"
                            :key="option"
                            :selected="option == displayOnPage ? 'selected' : ''"
                            :value="option">
                        {{option}}
                    </option>
                </select>
                &nbsp; | &nbsp; {{trans.results}}: {{rows.length}} &nbsp; | &nbsp;  {{ currentPage }} {{trans.page}} {{trans.from}} {{ totalPages }} | Перейти на страницу: <input v-model.number="currentPage" type="number">
            </div>
        </div>
        <ul class="uk-pagination">
            <li>
                <a @click="firstPage()">
                    <i class="uk-icon-angle-double-left"></i>
                </a>
            </li>
            <li>
                <a @click="prevPage()">
                    <i class="uk-icon-angle-left"></i>
                </a>
            </li>
            <li v-for="n in pagination" :key="n" :class="{ 'uk-active': (n == currentPage) }">
                <span v-if="n == currentPage" @click="toPage(n)">{{n}}</span>
                <a v-else @click="toPage(n)">{{n}}</a>
            </li>
            <li>
                <a @click="nextPage()">
                    <i class="uk-icon-angle-right"></i>
                </a>
            </li>
            <li>
                <a @click="lastPage()">
                    <i class="uk-icon-angle-double-right"></i>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>

    import Button from './button.vue'
    import Checkbox from './checkbox.vue'
    import Download from './download.vue'
    import Filters from './filters.vue';
    import Fields from '../lib/fields.js'
    // import {_} from 'underscore';

    export default{
        name: "tabler",
        components: {
            'v-button': Button,
            'v-checkbox': Checkbox,
            'v-download': Download,
            'v-filters': Filters
        },
        props: {
            url: { type: String},
            json: { type: Array, default: () => {return null}},
            fields: { type: Array, default: () => {return []}},
            perPage: { type: Number, default: 3},
            page: { type: Number, default: 1},
            tableClass: { type: String, default: 'uk-table uk-table-hover'},
            caption: { type: String, default: null},
            showFilters: { type: Boolean, default: false},
            trans: { type: Object, default: () => {
                return {
                    noImage: 'Нет картинки',
                    noAudio: 'Нет аудио',
                    perPage: 'На страницу',
                    page: 'Страница',
                    from: 'из',
                    results: 'Результатов',
                    searchBy: 'Поиск',
                    filters: 'Фильтры'
                }
            }}
        },
        data: function () {
            return {
                currentPage: this.page,
                searchBy: null,
                sortBy: null,
                sortOrderDesc: false,
                displayOnPage: this.perPage,
                perPageOptions: [5, 10, 15, 25, 50, 100],
                propFilters: this.showFilters,
                filters: null,
                data: this.parseData(this.json)
            }
        },
        created: function () {
            if(!this.json && this.url)
                this.fetchData()
        },
        methods: {
            mark: function (key, to) {
                to = !to
                for(let i in this.paginatedRows){
                    let index = parseInt(this.paginatedRows[i][key].rowIndex)
                    this.data[index][key].checked = to;
                }
                let onPage = []
                for(let i in this.paginatedRows){
                    if(this.paginatedRows[i][key].checked)
                        onPage.push(this.paginatedRows[i][key].value)
                }

                let total = []
                for(let i in this.rows){
                    if(this.rows[i][key].checked)
                        total.push(this.rows[i][key].value)
                }

                this.$emit('checked', {
                    'field': null,
                    'checkedValue': null,
                    'checkedValuesOnPage': onPage,
                    'checkedValuesTotal': total
                })
            },
            isChecked: function(key){
                for(let i in this.paginatedRows){
                    if(this.paginatedRows[i][key].checked === true)
                        return true
                }
                return false
            },
            parseData: function(rawData){
                let data = []
                for(let i in rawData){
                    let row = {}
                    for(let j in this.fields){
                        row[this.fields[j].key] = JSON.parse(JSON.stringify(this.fields[j]))
                        if(typeof rawData[i][this.fields[j].key] === 'string'){
                            row[this.fields[j].key].value = rawData[i][this.fields[j].key]
                        }
                        else if(rawData[i][this.fields[j].key]){
                            let values = JSON.parse(JSON.stringify(rawData[i][this.fields[j].key]))
                            Object.assign(row[this.fields[j].key], values)
                        }
                        row[this.fields[j].key].rowIndex = i
                    }
                    data[i] = row
                }

                return data
            },
            onButtonClick: function (field) {
                this.$emit('clicked', field)
            },
            onChecked: function(field){
                let key = field.key
                let rowIndex = field.rowIndex
                this.data[rowIndex][key].checked = field.checked

                let onPage = []
                for(let i in this.paginatedRows){
                    if(this.paginatedRows[i][key].checked)
                        onPage.push(this.paginatedRows[i][key].value)
                }

                let total = []
                for(let i in this.rows){
                    if(this.rows[i][key].checked)
                        total.push(this.rows[i][key].value)
                }

                this.$emit('checked', {
                    'field': field,
                    'checkedValue': field.value,
                    'checkedValuesOnPage': onPage,
                    'checkedValuesTotal': total
                })
            },
            onFilter: function(filters){
                this.currentPage = 1
                this.filters = filters
            },
            fetchData: function () {
                this.$http.get(this.url).then(function(response){
                    if(response.ok){
                        this.data = this.parseData(response.body)
                    }
                })
            },
            nextPage: function () {
                if (this.currentPage < this.totalPages)
                    this.currentPage++
            },
            prevPage: function () {
                if (this.currentPage > 1)
                    this.currentPage--
            },
            firstPage: function () {
                this.currentPage = 1
            },
            lastPage: function () {
                this.currentPage = this.totalPages
            },
            toPage: function (page) {
                if(page > 0 && page <= this.totalPages)
                    this.currentPage = page
            },
            clearSearch: function () {
                this.searchBy = null
            },
            sort(by){
                if(by === this.sortBy ){
                    this.sortOrderDesc = !this.sortOrderDesc
                }
                else{
                    this.sortBy = by
                    this.sortOrderDesc = false
                }
            },
            renderField(field){
                switch (field.type){
                    case 'img':
                        return this.renderImg(field)
                    case 'audio':
                        return this.renderAudio(field)
                    case 'url':
                        return '<a href="'+field+'">'+field.value+'</a>'
                    default:
                        return field.value
                }
            },
            renderImg(field){
                let width = (field.width) ? field.width : "auto"
                let height = (field.height) ? field.height : "auto"
                let fontSize = (height !== "auto") ? height : 50
                let alt = ''
                if(!field.alt)
                    alt = (field.value) ? field.value.slice(field.value.lastIndexOf('/')+1) : this.trans.noImage
                if(!field.value)
                    return '<div class="img-wrapp"><i class="uk-icon-file-picture-o" style="font-size: '+fontSize+'px"></i></div>'
                else
                    return '<div class="img-wrapp"><img src="'+field.value+'" width="'+width+'" height="'+height+'" alt="'+alt+'"/></div>'
            },
            renderAudio(field){
                if(field.value)
                    return '<audio preload="auto" controls="controls"><source src="'+field.value+'" type="audio/mpeg">Your browser does not support the audio tag.</audio>'
                else
                    return this.trans.noAudio
            },
            mySort(data, index, desc) {
                let arr = JSON.parse(JSON.stringify(data)).sort(Fields.sort(index))
                return (desc) ? arr : arr.reverse()
            },
        },
        computed: {
            rows: function () {
                let rows
                if (this.searchBy) {
                    rows = this.data.filter(Fields.search(this.fields, this.searchBy))
                }
                else{
                    rows = this.data
                }

//                let start = performance.now()
//                let filters = {
//                    'date': {
//                        key: 'date',
//                        operator: '>=',
//                        value: '13.08.1999',
//                        format: 'dd.mm.yyyy'
//                    },
//                    'user': {
//                        key: 'user',
//                        operator: '=',
//                        value: 'use2'
//                    },
//                    'orderno': {
//                        key: 'orderno',
//                        operator: '>=',
//                        value: '3123'
//                    }
//                 }

                if(this.filters){
                    rows = rows.filter(Fields.filter(this.filters))
                }

                if (this.sortBy) {
                    rows = this.mySort(rows, this.sortBy, this.sortOrderDesc)
                }

                return rows
            },
            paginatedRows: function () {
                let startIndex = (this.currentPage - 1) * this.displayOnPage
                return (this.rows && this.rows.length > 0) ? this.rows.slice(startIndex, startIndex + this.displayOnPage) : []
            },
            totalPages: function () {
                return (this.rows) ? Math.ceil(this.rows.length / this.displayOnPage) : 1
            },
            pagination: function() {
                let startIndex = this.currentPage - 3
                    startIndex = (startIndex < 1) ? 1 : startIndex
                let endIndex = this.currentPage + 3
                    endIndex = (endIndex > this.totalPages) ? this.totalPages : endIndex
                const range = (start, end) => ( Array.from(Array(end - start + 1).keys()).map(i => i + start))
                let result = range(startIndex, endIndex)

                return result
            }
        },
        watch: {
            'currentPage': function () {
                if (this.currentPage > this.totalPages)
                    this.currentPage = this.totalPages
                if (this.currentPage < 1)
                    this.currentPage = 1
            },
            searchBy: function(){
                this.currentPage = 1
            },
            'sortBy': function () {
                this.sortOrderDesc = false
            },
            'displayOnPage': function(){
                this.currentPage = 1
            }
        }
    }
</script>

<style lang="scss">

    @import '../uikit/css/uikit.almost-flat.css';
    @import '../uikit/css/components/form-advanced.css';
    @import '../uikit/css/components/search.almost-flat.min.css';

    .search .left,
    .search .right{
        float: right;
    }
    .search .right i {
        margin-top: 6px;
        font-size: 16px;
    }
    .search .right a {
        z-index: 99;
    }
    .fclear{
        clear: both;
    }
    audio{
        height: 30px;
        min-width: 180px;
    }
    .uk-table th{
        font-size: .9em;
    }
    .uk-table td{
        vertical-align: middle;
    }
    .uk-table tfoot td{
        border: none;
    }
    img{
        max-width: 250px;
    }
    img:hover{
        transform: scale(3);
    }
    .img-wrapp{
        width: 100%;
        text-align: center;
    }
    .img-wrapp i{
        color: #8a8a8a;
    }
    .column-title{
        color: #07D;
    }
</style>