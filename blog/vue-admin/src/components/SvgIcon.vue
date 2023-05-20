<template>
    <svg :style="{width:size+'px',htight:size+'px'}" :class="className" v-on="$listeners"  aria-hidden="true">
        <title v-if="title">{{ title }}</title>
        <use :xlink:href="iconPath"  />
    </svg>
</template>

<script>
export default {
    name: 'SvgIcon',

    props: {
        name: {
            type: String,
            required: true
        },

        title: {
            type: String,
            default: null
        },
        size:{
            type: [String,Number],
            default: 16
        }
    },

    computed: {
        iconPath() {
            try {
                let icon = require(`@/assets/icons/${this.name}.svg`)
                if (Object.prototype.hasOwnProperty.call(icon, 'default')) {
                    icon = icon.default
                }
                return icon.url
            } catch (error) {
                return require('@/assets/icons/menu.svg').default.url
            }
        },
        className() {
            return 'svg-icon svg-icon--' + this.name
        }
    }
}
</script>

<style>
  .svg-icon {
    fill: currentColor;
    height: 20px;
    width: 20px;
  }
</style>
