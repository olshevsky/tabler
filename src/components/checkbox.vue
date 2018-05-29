<template>
    <div class="uk-form">
        <input v-if="isChecked" checked :class="checkboxClass" type="checkbox" @click="checked"/>
        <input v-else :class="checkboxClass" type="checkbox" @click="checked" />
    </div>
</template>

<script>
    export default{
        name: "v-checkbox",
        props: {
            field: {type: Object, default: ()=>{ return {}}}
        },
        computed: {
            isChecked: function () {
                return (this.$props.field && this.$props.field.value === 'checked') ? true : false
            },
            checkboxClass: function () {
                return (this.$props.field.class) ? this.$props.field.class : 'uk-checkbox'
            }
        },
        methods: {
            checked: function () {
                let data = this.$props.field ? JSON.parse(JSON.stringify(this.$props.field)) : {}
                this.$emit('checked', data)
            }
        }
    }
</script>