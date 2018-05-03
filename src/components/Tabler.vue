<template>
    <div>
        <table>
            <thead>
            <tr>
                <th v-for="field in fields">{{field.title | capitalize}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="row in paginatedRows">
                <td v-for="field in fields">{{row[field.key]}}</td>
            </tr>
            </tbody>
        </table>

        <br>
        <p>{{currentPage}} page from {{totalPages}}</p>
        <button v-on:click="firstPage()"> &lt; &lt; </button>
        <button v-on:click="prevPage()"> &lt; </button>
        <input v-model="currentPage"/>
        <button v-on:click="nextPage()"> &gt; </button>
        <button v-on:click="lastPage()"> &gt; &gt; </button>


        <br>
        <p>Search by:</p>
        <input v-on:keyup="search()" v-model="searchBy"/>

    </div>
</template>

<script>

//    let VueResource = require('vue-resource')

    module.exports = {
        props: {
            json: { type: Array },
            url: { type: String },
            perPage: { type: Number, default: 3 },
            page: { type: Number, default: 1 },
            fields: { type: Array }
        },
        created: function(){
            if(!this.json && this.url){
                this.rawData = this.fetchData()
            }
            else
                this.rawData = this.json
        },
        methods: {
            fetchData: function(){
                console.log('fetching data')
                return []
            },
            nextPage: function () {
                if(this.currentPage < this.totalPages)
                    this.currentPage++
            },
            prevPage: function () {
                if(this.currentPage > 1)
                    this.currentPage--
            },
            firstPage: function(){
              this.currentPage = 1
            },
            lastPage: function () {
              this.currentPage = this.totalPages
            },
            search: function () {
                console.log(this.searchBy)
            }
        },
        data: function () {
            return {
                currentPage: this.page,
                searchBy: null,
                rawData: []
            }
        },
        computed: {
            rows: function () {
                if(this.searchBy){
                    return this.rawData.filter(row => {
                        for(let id in this.fields) {
                            if(row[this.fields[id].key].toLowerCase().indexOf(this.searchBy) > 0){
                                console.log('found')
                                console.log(id)
                            }
                            //let a = row[this.fields[id].key].toLowerCase().includes(this.searchBy.toLowerCase())
                        }

                        //post.title.toLowerCase().includes(this.search.toLowerCase())
//                        console.log(this.fields)
                        return row
                    })
                }
                else{
                    return this.rawData
                }
            },
            paginatedRows: function () {
                let startIndex = (this.currentPage - 1) * this.perPage
                return this.rows.slice(startIndex, startIndex + this.perPage)
            },
            totalPages: function () {
                return Math.ceil(this.rows.length / this.perPage)
            }
        },
        watch: {
            'currentPage': function () {
              if(this.currentPage > this.totalPages)
                  this.currentPage = this.totalPages

              if(this.currentPage < 1)
                  this.currentPage = 1
            }
        },
        filters: {
            capitalize: function (val) {
                if(val)
                    return val.toString().charAt(0).toUpperCase() + val.slice(1)
                return ''
            }
        }
    }
</script>

<style>

</style>