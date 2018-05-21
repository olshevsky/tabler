<template>
    <div>
        <p>Search by:</p>
        <input v-model="searchBy"/>
        <a href="#" v-on:click="clearSearch()">x</a>

        <table :class="tableClass">
            <caption v-if="caption">{{caption}}</caption>
            <thead>
            <tr>
                <th v-for="field in fields">
                    <a v-if="sortBy == field.key" href="#" @click="sort(field.key)"> <i :class="{ 'uk-icon-long-arrow-up': (sortOrder === 'ASC'), 'uk-icon-long-arrow-down': (sortOrder === 'DESC') }"></i> {{field.title}}</a>
                    <a v-else @click="sort(field.key)"> <i class="uk-icon-arrows-v"></i> {{field.title}}</a>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="row in paginatedRows">
                <td v-for="field in fields">{{row[field.key]}}</td>
            </tr>
            </tbody>
        </table>
        <ul class="uk-pagination">
            <li>
                <a href="#" @click="firstPage()">
                    <i class="uk-icon-angle-double-left"></i>
                </a>
            </li>
            <li>
                <a href="#" @click="prevPage()">
                    <i class="uk-icon-angle-left"></i>
                </a>
            </li>
            <li v-for="n in this.totalPages" :class="{ 'uk-active': (n == currentPage) }">
                <a @click="toPage(n)">{{n}}</a>
            </li>
            <li>
                <a href="#" @click="nextPage()">
                    <i class="uk-icon-angle-right"></i>
                </a>
            </li>
            <li>
                <a href="#" @click="lastPage()">
                    <i class="uk-icon-angle-double-right"></i>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    function quickSort(items, order,key, left, right) {
        let index
        if (items.length > 1) {
            left = typeof left != "number" ? 0 : left
            right = typeof right != "number" ? items.length - 1 : right
            index = partition(items, left, right, order)
            if (left < index - 1)
                quickSort(items, key, order, left, index - 1)
            if (index < right)
                quickSort(items, key, order, index, right)
        }

        return items

        function swap(items, firstIndex, secondIndex){
            let temp = items[firstIndex]
            items[firstIndex] = items[secondIndex]
            items[secondIndex] = temp
        }

        function partition(items, left, right, order) {

            console.log('-------start---------')
            console.log(left)
            console.log(right)
            console.log('------end----------')

            let pivot   = items[Math.floor((right + left) / 2)][key],
                i       = left,
                j       = right

            while (i <= j) {
                while (compare(items[i][key], pivot, order) === -1) {
                    i++
                }
                while (compare(items[j][key], pivot, order) === 1) {
                    j--
                }
                if (i <= j) {
                    swap(items, i, j)
                    i++
                    j--
                }
            }

            return i
        }

        /*
            Return 0 if values on either side are equal
            Return 1 if value on the left is greater
            Return -1 if the value on the right is greater
        */
        function compare(left, right, order){

            left = Number(left)
            right = Number(right)

            if(left < right){
                return (order === 'ASC') ? -1 : 1
            }
            else if(left > right){
                return (order === 'ASC') ? 1 : -1
            }
            else{
                return 0
            }
//
//            switch (item1.type){
//                case 'date':
//                    break;
//                case 'number':
//                    break;
//                case 'string':
//
//                    break;
//            }
        }

//        function strToDate(val, format) {
//
//            var normalized = val.replace(/[^a-zA-Z0-9]/g, '-')
//            var normalizedFormat = format.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-')
//            var formatItems = normalizedFormat.split('-')
//            var dateItems = normalized.split('-')
//
//            var monthIndex  = formatItems.indexOf("mm")
//            var dayIndex    = formatItems.indexOf("dd")
//            var yearIndex   = formatItems.indexOf("yyyy")
//            var hourIndex     = formatItems.indexOf("hh")
//            var minutesIndex  = formatItems.indexOf("ii")
//            var secondsIndex  = formatItems.indexOf("ss")
//
//            var today = new Date()
//
//            var year  = yearIndex > -1  ? dateItems[yearIndex]    : today.getFullYear()
//            var month = monthIndex > -1 ? dateItems[monthIndex] - 1 : today.getMonth() - 1
//            var day   = dayIndex > -1   ? dateItems[dayIndex]     : today.getDate()
//
//            var hour    = hourIndex > -1      ? dateItems[hourIndex]    : today.getHours()
//            var minute  = minutesIndex > - 1   ? dateItems[minutesIndex] : today.getMinutes()
//            var second  = secondsIndex > -1   ? dateItems[secondsIndex] : today.getSeconds()
//
//            return new Date(year,month,day,hour,minute,second)
//        }
    }

    module.exports = {
        name: "tabler",
        props: {
            url: {type: String},
            json: {type: Array, default: () => {return []}},
            fields: {type: Array, default: () => {return []}},
            perPage: {type: Number, default: 3},
            page: {type: Number, default: 1},
            tableClass: {type: String, default: 'uk-table uk-table-striped'},
            caption: {type: String, default: null}
        },
        created: function () {
            if (!this.json && this.url) {
                this.rawData = this.fetchData()
            }
            else{
                this.rawData = this.json
            }
        },
        methods: {
            fetchData: function () {
                this.$http.get(this.url).then(response => {
                    console.log(response)
                }, response => {
                    console.log(response)
                })
                return []
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
                    this.sortOrder = (this.sortOrder === 'ASC') ? 'DESC' : 'ASC'
                    console.log('sort')
                    console.log(this.sortOrder)
                }
                else{
                    this.sortBy = by
                    this.sortOrder = 'ASC'
                }
            }
        },
        data: function () {
            return {
                currentPage: this.page,
                searchBy: null,
                sortBy: null,
                sortOrder: 'ASC',
                rawData: []
            }
        },
        computed: {
            rows: function () {
                let row = []
                if (this.searchBy) {
                    this.currentPage = 1
                    row = this.rawData.filter(row => {
                        for (let id in this.fields) {
                            if (row[this.fields[id].key] &&
                                row[this.fields[id].key].toLowerCase().indexOf(this.searchBy) > -1) {
                                return row
                            }
                        }
                    })
                }
                else{
                    row = this.rawData
                }

                if(this.sortBy){
                    row = quickSort(row, this.sortBy, this.sortOrder)
//                    if(this.sortOrder === 'DESC'){
//                        let tmp = row.reverse()
//                        row = row.reverse()
//                    }
                }

                return (row) ? row : this.rawData
            },
            paginatedRows: function () {
                let startIndex = (this.currentPage - 1) * this.perPage
                return (this.rows && this.rows.length > 0) ? this.rows.slice(startIndex, startIndex + this.perPage) : []
            },
            totalPages: function () {
                return (this.rows) ? Math.ceil(this.rows.length / this.perPage) : 1
            }
        },
        watch: {
            'currentPage': function () {
                if (this.currentPage > this.totalPages)
                    this.currentPage = this.totalPages
                if (this.currentPage < 1)
                    this.currentPage = 1
            },
            'sortBy': function () {
                this.sortOrder = 'ASC'
            }
        },
        /*
        filters: {
            capitalize: function (val) {
                if (val)
                    return val.toString().charAt(0).toUpperCase() + val.slice(1)
                return ''
            }
        }
        */
    }
</script>

<style>

</style>