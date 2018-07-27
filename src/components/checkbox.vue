<template>
    <div class="uk-form">
        <input  v-model="checked" :class="checkboxClass" type="checkbox" @click="check"/>
    </div>
</template>

<script>
    export default{
        name: "v-checkbox",
        props: {
            field: {type: Object, default: ()=>{ return {}}}
        },
        data: function(){
            return {
                checked: (this.$props.field && this.$props.field.value === 'checked') ? true : false
            }
        },
        computed: {
            checkboxClass: function () {
                return (this.$props.field.class) ? this.$props.field.class : 'uk-checkbox'
            }
        },
        methods: {
            check: function () {
                let data = this.$props.field ? JSON.parse(JSON.stringify(this.$props.field)) : {}
                    data.checked = !this.checked;
                this.$emit('checked', data)
            }
        }
    }
</script>