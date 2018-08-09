<template>
    <div>
        <div class="uk-form">
            <div v-for="filter in filters" v-bind:key="filter.key">
                {{filter.title}}
                <a><i class="uk-icon-filter"></i></a>&nbsp;
                <select>
                    <option v-for="operator in operators"
                            :key="operator"
                            :value="operator">
                        {{operator}}
                    </option>
                </select>
                <input/>
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
                    '<': '<',
                    '>': '>',
//                    '%LIKE%': '%LIKE%',
//                    'NULL': 'NULL',
                }
            }
        },
        computed: {
            filters: function () {
                return this.fields.filter(f => {
                    return f.filterable
                })
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