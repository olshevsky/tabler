<template>
    <div class="search">
        <div class="right uk-float-right">
            <a @click="clearSearch">
                <i class="uk-icon-trash"></i>
            </a>
        </div>
        <div class="uk-float-right">
            <form class="uk-search">
                <input v-model="by"
                       class="uk-search-field"
                       type="search"
                       :placeholder="trans.searchBy"/>
            </form>
        </div>
        <div class="uk-clearfix"></div>
    </div>
</template>

<script>
    export default{
        name: 'v-search',
        props: {
            trans: {
                type: Object
            }
        },
        data: function () {
          return {
              by: null
          }
        },
        methods: {
            clearSearch: function () {
                this.by = null
                this.$emit('clearSearch')
            }
        },
        watch: {
            by: function () {
                this.$emit('change', this.by)
            }
        }
    }
</script>

<style>
    @import '../uikit/css/components/search.almost-flat.min.css';

    .search .right i {
        margin-top: 6px;
        font-size: 16px;
    }
    .search .right a {
        z-index: 99;
    }
</style>