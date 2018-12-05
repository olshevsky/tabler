<template>
    <div>
        <label class="label">
            <slot></slot>
        </label>
        <a @click="click">
            <span v-if="propState" class="uk-icon-toggle-on uk-icon-small toogle"></span>
            <span v-else class="uk-icon-toggle-off uk-icon-small toogle"></span>
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
    .toogle, .label{
        color: #07D;
    }
    .label{
        font-size: 13px;
        font-weight: bold;
    }
</style>