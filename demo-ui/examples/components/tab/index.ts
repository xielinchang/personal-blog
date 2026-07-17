import { withInstall } from '../../assets/utils/install';
import Tab from './src/TabBar.vue';
import TabItem from './src/TabItem.vue';

export const JTab = withInstall(Tab); // 增加类型
export const JTabItem = withInstall(TabItem);
export default { JTab, JTabItem };
