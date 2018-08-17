<template>
    <div class="uk-form">
        <div>
            <div  v-for="field in filtersFields" v-bind:key="field.key" class="filter-box" style="float: left; width: 235px; margin-right: 15px;">
                <div style="text-align: center; margin-bottom: 5px; color: #07D; font-size: 13px">
                    <strong>{{ field.title }}</strong>
                </div>
                <div>
                    <select @input="updateFilters({
                key: field.key,
                operator: $event.target.value
            })" ref="operators" style="margin-right: 5px;" class="uk-form-small">
                        <option v-for="operator in operators"
                                :key="operator"
                                :value="operator">
                            {{ operator }}
                        </option>
                    </select>
                    <div class="uk-form-icon">
                        <i class="uk-icon-filter "></i>
                        <input @input="updateFilters({key: field.key, value: $event.target.value})" ref="inputs" type="text" class="uk-form-small">
                    </div>
                </div>
            </div>
            <div class="fclear"></div>
        </div>
        <div class="filter-buttons" style="margin-top: 10px">
            <button @click="resetFilters()" class="uk-button uk-button-primary uk-button-small" type="button">
                <span>{{ trans.reset }}&nbsp;</span>
                <i class="uk-icon-trash"></i>
            </button>
            <button @click="applyFilters()" class="uk-button uk-button-primary uk-button-small" type="button">
                <span>{{ trans.apply }}&nbsp;</span>
                <i class="uk-icon-filter"></i>
            </button>
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
            trans: {
                type: Object
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
                        this.rawFilters[data.key].operator = this.defaultOperator

                }
            },
            resetFilters: function () {
                this.rawFilters = {}
                this.$refs.inputs.forEach( (input) => {
                    input.value = ''
                })
                this.$refs.operators.forEach( (operator) => {
                    operator.value = this.defaultOperator
                })
                this.$emit('filter', null)
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
    .fclear{
        clear: both;
    }
    .filter-buttons button{
        margin-right: 5px;
    }
</style>