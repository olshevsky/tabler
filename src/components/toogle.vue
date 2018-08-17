<template>
    <div>
        <span>
            <slot></slot>
        </span>
        <a @click="click">
            <i v-if="propState" class="uk-icon-toggle-on toogle"></i>
            <i v-else class="uk-icon-toggle-off toogle"></i>
        </a>
    </div>
</template>

<script>
    export default{
        name: "v-toogle",
        props: {
            state: {type: Boolean, default: false}
        },
        data: function() {
            return {
                propState: this.state
            }
        },
        methods: {
            click: function(){
                this.propState = !this.propState;
                this.$emit('change', this.propState)
            }
        }
    }
</script>

<style>
    .toogle{
        color: #07D;
        font-size: 21px;
    }
</style>