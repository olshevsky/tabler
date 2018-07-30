<template>
    <div>
        <div class="search">
            <div v-if="propFilters">
                <a><i class="uk-icon-filter"></i></a>
            </div>
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
                            <input class="uk-checkbox" type="checkbox" @click="mark(field.key)"/>
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
                &nbsp; | &nbsp; {{trans.results}}: {{rows.length}} &nbsp; | &nbsp;  {{ currentPage }} {{trans.page}} {{trans.from}} {{ totalPages }}
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
            <li v-for="n in this.totalPages"
                :key="n"
                :class="{ 'uk-active': (n == currentPage) }">
                    <span v-if="n == currentPage"
                          @click="toPage(n)">{{n}}
                    </span>
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

    export default{
        name: "tabler",
        components: {
            'v-button': Button,
            'v-checkbox': Checkbox,
            'v-download': Download
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
                    noImage: 'no image',
                    noAudio: 'no audio',
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
                data: this.parseData(this.json)
            }
        },
        created: function () {
            if(!this.json && this.url)
                this.fetchData()
        },
        methods: {
            mark: function (key) {
                for(let i in this.paginatedRows){
                    let index = parseInt(this.paginatedRows[i][key].rowIndex)
                    this.data[index][key].checked = true;
                    console.log(this.data[index][key].checked)
                }
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

//                let onPage = this.paginatedRows.filter(x => {
//                    if(x[key].checked)
//                        return true
//                    return false
//                })

//                let total = this.rows.filter(x => {
//                    if(x[key].checked)
//                        return true
//                    return false
//                })

                this.$emit('checked', {
                    'field': field,
                    'checkedValue': field.value,
                    'checkedValuesOnPage': onPage,
                    'checkedValuesTotal': total
                })
            },
            checkedFields: function(key){
//                let fields = this.data
                return key
            },
            fetchData: function () {
                this.$http.get(this.url).then(function(response){
                    if(response.ok)
                        this.data = this.parseData(response.body)
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
                let arr = JSON.parse(JSON.stringify(data))
                function compareNumber(a, b) {
                    return (desc) ? Number(b.value) - Number(a.value) : Number(a.value) - Number(b.value)
                }
                function compareString(a, b) {
                    return (desc) ? b.value.localeCompare(a.value) : a.value.localeCompare(b.value)
                }
                function compareDate(a, b) {
                    return (desc) ? strToDate(b.value, b.format) - strToDate(a.value, a.format) : strToDate(a.value, a.format) - strToDate(b.value, b.format)
                }
                function strToDate(val, format) {
                    let normalized = val.replace(/[^a-zA-Z0-9]/g, '-')
                    let normalizedFormat = format.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-')
                    let formatItems = normalizedFormat.split('-')
                    let dateItems = normalized.split('-')
                    let monthIndex  = formatItems.indexOf("mm")
                    let dayIndex    = formatItems.indexOf("dd")
                    let yearIndex   = formatItems.indexOf("yyyy")
                    let hourIndex     = formatItems.indexOf("hh")
                    let minutesIndex  = formatItems.indexOf("ii")
                    let secondsIndex  = formatItems.indexOf("ss")
                    let today = new Date()
                    let year  = yearIndex > -1  ? dateItems[yearIndex]    : today.getFullYear()
                    let month = monthIndex > -1 ? dateItems[monthIndex] - 1 : today.getMonth() - 1
                    let day   = dayIndex > -1   ? dateItems[dayIndex]     : today.getDate()
                    let hour    = hourIndex > -1      ? dateItems[hourIndex]    : today.getHours()
                    let minute  = minutesIndex > - 1   ? dateItems[minutesIndex] : today.getMinutes()
                    let second  = secondsIndex > -1   ? dateItems[secondsIndex] : today.getSeconds()
                    return new Date(year,month,day,hour,minute,second)
                }
                function compare(a, b){
                    if(a[index] && b[index]){
                        switch (a[index].type){
                            case 'number':
                                return compareNumber(a[index], b[index])
                            case 'string':
                                return compareString(a[index], b[index])
                            case 'date':
                                return compareDate(a[index], b[index])
                            default:
                                return 0
                        }
                    }
                }

                return arr.sort(compare)
            },
        },
        computed: {
//            data: function(){
//                return this.parseData(this.json)
//            },
            rows: function () {
                let rows
                if (this.searchBy) {
                    rows = this.data.filter(row => {
                        for (let id in this.fields) {
                            if(row[this.fields[id].key] &&
                               row[this.fields[id].key].value &&
                               row[this.fields[id].key].value.toString().toLowerCase().replace(/ /g, '').indexOf(this.searchBy.toString().toLowerCase().replace(/ /g, '')) > -1){
                                return row
                            }
                        }
                    })
                }
                else{
                    rows = this.data
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