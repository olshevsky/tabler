<template>
    <div class="uk-form">
        <i class="uk-icon-filter"></i>
        <div v-for="field in filtersFields" v-bind:key="field.key">
            <span>{{ field.title }}</span>
            <select @input="updateFilters({
                key: field.key,
                operator: $event.target.value
            })">
                <option v-for="operator in operators"
                        :key="operator"
                        :value="operator">
                    {{ operator }}
                </option>
            </select>
            <input @input="updateFilters({key: field.key, value: $event.target.value})"/>
            <a @click="resetFilter(field.key)">
                <i class="uk-icon-close"></i>
            </a>
        </div>
        <div>
            <button @click="applyFilters()" class="uk-button uk-button-primary" type="button"><i class="uk-icon-filter"></i></button>
            <button @click="resetFilters()" class="uk-button uk-button-primary" type="button"><i class="uk-icon-trash"></i></button>
        </div>
    </div>
</template>

<script>
    export default{
        name: "v-filters",
        props: {
            fields: {
                type: Array,
                default: () =>{
                    return {}
                }
            },
            operators: {
                type: Object,
                default: () => {
                    return {
                        '=': '=',
                        '!=': '!=',
                        '>': '>',
                        '<': '<',
                        '>=': '>=',
                        '<=': '<=',
                    }
                }
            }
        },
        data: function () {
            return {
                defaultOperator: '=',
                rawFilters: {},
                age: 0
            }
        },
        computed: {
            filtersFields: {
                get: function(){
                    return this.fields.filter(field => {
                        return field.filterable
                    })
                }
            },
        },
        methods: {
            applyFilters: function(){
                console.log('applyFilters')
                let rawFilters = JSON.parse(JSON.stringify(this.rawFilters))
                let filters = []
                for(let i in rawFilters){
                    if(rawFilters[i]['operator'] && rawFilters[i]['value'])
                        filters.push(rawFilters[i])
                }
                this.$emit('filter', filters)
            },
            // TODO rewrite this
            updateFilters: function(data){
                // update
                if(this.rawFilters[data.key]){
                    if(data.operator && Object.keys(this.operators).indexOf(data.operator) >= 0){
                        this.rawFilters[data.key]['operator'] = data.operator
                    }
                    else if(data.value){
                        this.rawFilters[data.key].value = data.value
                    }
                }
                // insert
                else{
                    this.rawFilters[data.key] = data
                    if(!this.rawFilters[data.key].operator)
                        this.rawFilters[data.key].operator = this.defaultOperator;
                }
            },
            resetFilters: function () {
                console.log('resetFilters')
                this.rawFilters = {}
                this.$emit('filter', null)
            },
            resetFilter: function (key) {
                console.log('resetFilter')
                if(this.rawFilters[key])
                    delete this.rawFilters[key]
            }
        }
    }

    //            let filters = [
    //                    {
    //                        key: 'date',
    //                        operator: '>=',
    //                        value: '13.08.1999',
    //                        format: 'dd.mm.yyyy'
    //                    },
    //                    {
    //                        key: 'user',
    //                        operator: '=',
    //                        value: 'use2'
    //                    },
    //                    {
    //                        key: 'orderno',
    //                        operator: '>=',
    //                        value: '3123'
    //                    },
    //                ]

    //            filters: function () {
    //                return this.fields.filter(f => {
    //                    console.log(f)
    //                    return f.filterable
    //                })
    //            }
</script>

<style lang="scss">
    $primary-blue-color: #00a8e6;
    .filters{
        color: $primary-blue-color;
    }
</style>