import { withInstall } from '../../assets/utils/install';
import Button from './src/button.vue';
import ButtonGroup from './src/button-group.vue';

export const jButton = withInstall(Button); // 增加类型
export const jButtonGroup = withInstall(ButtonGroup);
export default jButton;
