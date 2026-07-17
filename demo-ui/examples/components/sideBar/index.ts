import { withInstall } from '../../assets/utils/install';
import SideBar from './src/sideBar.vue';
import SidebarItem from './src/SideBarItem.vue';

export const JSideBar = withInstall(SideBar); // 增加类型
export const JSidebarItem = withInstall(SidebarItem);
export default { JSideBar, JSidebarItem };
