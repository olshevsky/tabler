<template>
    <button :class="btnClass" type="button" @click="clicked">
        <i v-if="icon" :class="icon">&nbsp;</i>{{name}}
    </button>
</template>

<script>
    export default{
        name: "v-button",
        props: {
            field: {type: Object, default: ()=>{ return {}}}
        },
        computed: {
            btnClass: function () {
                return (this.$props.field.class) ? this.$props.field.class : 'uk-button'
            },
            icon: function () {
                return (this.$props.field.icon) ? this.$props.field.icon : null
            },
            name: function () {
                return (this.$props.field.name) ? this.$props.field.name : ''
            }
        },
        methods: {
            clicked: function () {
                let data = this.$props.field ? JSON.parse(JSON.stringify(this.$props.field)) : {}
                this.$emit('clicked', data)
            }
        }
    }
</script>