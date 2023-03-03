<script lang="ts" setup>
  import { computed } from 'vue';
  import { createNamespace } from '../../../assets/utils/components';
  import { ButtonProps } from './button';
  import jIcon from '../../icon';

  const props = defineProps(ButtonProps);
  const style = computed(() => {
    // 若传了颜色color属性则以其为准
    if (props.color) {
      if (props.plain)
        return {
          '--j-button-bg-color': 'var(--j-color-white)',
          '--j-button-text-color': props.color,
          '--j-button-border-color': props.color,
        };
      if (props.text)
        return {
          '--j-button-text-color': props.color,
        };
      return {
        '--j-button-bg-color': props.color,
        '--j-button-text-color': 'var(--j-color-white)',
        '--j-button-border-color': props.color,
      };
    }
    return {};
  });

  const { createBEM } = createNamespace('button');

  // defineOptions({
  //   name: 'jButton',
  // });
</script>

<template>
  <button
    :class="[
      createBEM(),
      type && createBEM(`--${type}`),
      size && createBEM(`--${size}`),
      plain && 'is-plain',
      round && 'is-round',
      circle && 'is-circle',
      disabled && 'is-disabled',
      text && 'is-text',
      bg && 'is-bg',
      iconPosition && `icon-${iconPosition}`,
    ]"
    :style="{ color: textColor, ...style }"
    :disabled="disabled"
  >
  <jIcon v-if="!!icon" :name="icon" class="icon" />
  <jIcon v-if="loading" name="loading" class="icon is-loading" />
    <div v-if="!circle" :class="[createBEM('content')]">
      <slot />
    </div>
  </button>
</template>

<style lang="scss">
  @import './button.scss';
</style>
