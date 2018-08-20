<template>
    <a :href="field.value" download>
        <i class="uk-icon-download"></i>
    </a>
</template>

<script>
    export default{
        name: "v-download",
        props: {
            field: {type: Object, default: ()=>{ return {}}}
        }
    }
</script>