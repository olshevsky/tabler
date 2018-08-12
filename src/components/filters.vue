<template>
    <div class="uk-form">
        <i class="uk-icon-filter"></i>
        <div v-for="filter in filters" v-bind:key="filter.key">
            {{filter.title}}
            <select @input="updateFilters({key: filter.key, operator: $event.target.value})">
                <option v-for="operator in operators"
                        :key="operator"
                        :value="operator">
                    {{operator}}
                </option>
            </select>
            <input @input="updateFilters({key: filter.key, value: $event.target.value})"/>
        </div>
        <div>
            <button @click="filter()" class="uk-button uk-button-primary" type="button"><i class="uk-icon-filter"></i></button>
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
                        '': '',
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
                f: {}
            }
        },
        computed: {
            filters: {
                get: function(){
                    return this.fields.filter(field => {
                        return field.filterable
                    })
                }
            },


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
        },
        methods: {
            filter: function(){
                console.log('filter')
                let filters = JSON.parse(JSON.stringify(this.f))
                this.$emit('filter', filters)
            },
            updateFilters: function(data){
                if(this.f[data.key]){
                    if(data.operator){
                        this.f[data.key]['operator'] = data.operator
                    }
                    else if(data.value){
                        this.f[data.key].value = data.value
                    }
                }
                else{
                    this.f[data.key] = data
                }
            }
        }
    }
</script>

<style lang="scss">

</style>