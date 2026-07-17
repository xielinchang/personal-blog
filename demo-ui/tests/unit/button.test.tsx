import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import Button from '../../examples/components/button/src/button.vue';

describe('Button.vue', () => {
  it('Button组件是否创建成功', () => {
    const wrapper = mount(() => <Button>button</Button>);
    expect(wrapper.text()).toContain('button');
  });

  it('Button组件primary类型是否能正常显示', () => {
    const wrapper = mount(() => <Button type="primary">primary</Button>);
    expect(wrapper.classes()).toContain('j-button--primary');
  });

  it('Button组件error类型是否能正常显示', () => {
    const wrapper = mount(() => <Button type="error">error</Button>);
    expect(wrapper.classes()).toContain('j-button--error');
  });
});
