import { withInstall } from '../../assets/utils/install';

import counter from './src/counter.vue';

export const jCounter = withInstall(counter); // 增加类型

export default jCounter;
