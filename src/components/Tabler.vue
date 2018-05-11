<template>
    <div>
        <table>
            <thead>
            <tr>
                <th v-for="field in fields">
                    <a href="#" v-on:click="sort(field.key)">{{field.title | capitalize}}</a>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="row in paginatedRows">
                <td v-for="field in fields">{{row[field.key]}}</td>
            </tr>
            </tbody>
        </table>

        <br>
        <br>
        <br>

        <p>{{currentPage}} page from {{totalPages}}</p>
        <button v-on:click="firstPage()"> &lt; &lt;</button>
        <button v-on:click="prevPage()"> &lt;</button>
        <input v-model="currentPage"/>
        <button v-on:click="nextPage()"> &gt;</button>
        <button v-on:click="lastPage()"> &gt; &gt;</button>

        <br>
        <br>
        <br>

        <p>Search by:</p>
        <input v-model="searchBy"/>
        <a href="#" v-on:click="clearSearch()">x</a>
    </div>
</template>

<script>
    function quickSort(items, key, left, right) {
        let index
        if (items.length > 1) {
            left = typeof left != "number" ? 0 : left
            right = typeof right != "number" ? items.length - 1 : right
            index = partition(items, left, right);
            if (left < index - 1)
                quickSort(items, key, left, index - 1)
            if (index < right)
                quickSort(items, key, index, right)
        }

        return items

        function swap(items, firstIndex, secondIndex){
            let temp = items[firstIndex]
            items[firstIndex] = items[secondIndex]
            items[secondIndex] = temp
        }

        function partition(items, left, right) {

            let pivot   = items[Math.floor((right + left) / 2)][key],
                i       = left,
                j       = right

            while (i <= j) {
                while (compare(items[i][key], pivot) === -1) {
                    i++
                }
                while (compare(items[j][key], pivot) === 1) {
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
        function compare(left, right){

//            console.log(left)

            if(left < right){
                return -1
            }
            else if(left > right){
                return 1
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
        name: "v-tabler",
        props: {
            json: {type: Array},
            url: {type: String},
            perPage: {type: Number, default: 3},
            page: {type: Number, default: 1},
            fields: {type: Array}
        },
        created: function () {
            if (!this.json && this.url) {
                this.rawData = this.fetchData()
            }
            else
                this.rawData = this.json
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
            clearSearch: function () {
                this.searchBy = null
            },
            sort(by){
                if(by === this.sortBy ){
                    this.sortOrder = (this.sortOrder === 'ASC') ? 'DESC' : 'ASC'
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
                let rows = []
                if (this.searchBy) {
                    this.currentPage = 1
                    rows = this.rawData.filter(row => {
                        for (let id in this.fields) {
                            if (row[this.fields[id].key].toLowerCase().indexOf(this.searchBy) > -1) {
                                return row
                            }
                        }
                    })
                }
                else{
                    rows = this.rawData
                }

                if(this.sortBy){
                    rows = quickSort(rows, this.sortBy)
                    if(this.sortOrder === 'DESC'){
                        rows = rows.reverse()
                    }
                }

                return (rows) ? rows : this.rawData
            },
            paginatedRows: function () {
                let startIndex = (this.currentPage - 1) * this.perPage
                return this.rows.slice(startIndex, startIndex + this.perPage)
            },
            totalPages: function () {
                return Math.ceil(this.rows.length / this.perPage) || 1
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
                console.log('order change')
            }
        },
        filters: {
            capitalize: function (val) {
                if (val)
                    return val.toString().charAt(0).toUpperCase() + val.slice(1)
                return ''
            }
        }
    }
</script>

<style>

</style>