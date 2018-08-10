<template>
    <div>
        <div class="uk-form">
            <div v-for="filter in filters" v-bind:key="filter.key">
                {{filter.title}}
                <a>
                    <i class="uk-icon-filter"></i>
                </a>&nbsp;
                <select>
                    <option v-for="operator in operators"
                            :key="operator"
                            :value="operator">
                        {{operator}}
                    </option>
                </select>
                <input/>
            </div>
            <div>
                <button class="uk-button uk-button-primary" type="button"><i class="uk-icon-filter" @click="filter()"></i></button>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name: "v-filters",
        props: {
            fields: {type: Array, default: ()=>{ return {}}}
        },
        data: function () {
            return {
                operators: {
                    '=': '=',
                    '!=': '!=',
                    '>': '>',
                    '<': '<',
                    '>=': '>=',
                    '<=': '<=',
                },
                filterss: []
            }
        },
        computed: {
            filters: function () {
                return this.fields.filter(f => {
                    return f.filterable
                })
            }
        },
        methods: {
            filter: function(){
                console.log('filter' +
                    '')
                this.$emit('filter', {})
            }
        },
        mounted: function () {

        },
        watch: {

        }
    }
</script>

<style lang="scss">

</style>