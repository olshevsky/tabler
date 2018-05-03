<template>
    <div>
        <table>
            <thead>
            <tr>
                <th v-for="field in fields">{{field.title}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="row in visibleRows">
                <td v-for="field in fields">{{row[field.key]}}</td>
            </tr>
            </tbody>
        </table>
        <p>{{currentPage}} page from {{totalPages}}</p>
        <button v-on:click="prevPage()">-</button>
        <button v-on:click="nextPage()">+</button>
        <input v-on:keyup="search()" v-model="searchBy"/>

    </div>
</template>

<script>
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
                console.log('fetch data')
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
            search: function () {
                console.log(this.searchBy)
            },
            sort: function () {
                
            }
        },
        data: function () {
            return {
                currentPage: this.page,
                searchBy: null,
                sortBy: null,
                rawData: []
            }
        },
        computed: {
            rows: function () {
                if(this.searchBy){
                    return this.rawData.filter(row => {
                        //post.title.toLowerCase().includes(this.search.toLowerCase())
                        console.log(this.fields)
                        return row
                    })
                }
                else{
                    return this.rawData
                }
            },
            visibleRows: function () {
                let startIndex = (this.currentPage - 1) * this.perPage
                return this.rows.slice(startIndex, startIndex + this.perPage)
            },
            totalPages: function () {
                return Math.ceil(this.rows.length / this.perPage)
            }
        },
        watch: {
            'searchBy': function () {
                console.log('searchBy change')
                this.rows.filter(row => {

                    return row
                })
//                let tmp =  this.rows.map((row)=>{
//
//                    console.log(by)
//                    console.log(this.searchBy)
//                    return row
//                })
            }
        }
    }
</script>

<style>

</style>