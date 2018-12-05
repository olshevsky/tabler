<template>
    <div class="uk-form">
        <input v-model="checked" :class="checkboxClass" type="checkbox"/>
    </div>
</template>

<script>
    export default{
        name: "v-checkbox",
        props: {
            field: {type: Object, default: ()=>{ return {}}}
        },
        computed: {
            checkboxClass: function () {
                return (this.$props.field.class) ? this.$props.field.class : 'uk-checkbox'
            },
            checked: {
                get: function () {
                    return (this.$props.field && this.$props.field.checked) ? true : false
                },
                set: function (value) {
                    let data = this.$props.field ? JSON.parse(JSON.stringify(this.$props.field)) : {}
                        data.checked = value
                    this.$emit('checked', data)
                }
            }
        }
    }
</script>