import * as jButton from './button';
import * as jIcon from './icon';
import * as jQueryPage from './queryPage'; // 存有bug
import * as jMessage from './message';
import * as jCard from './card';
import * as jSelect from './select';
import * as jTooltip from './tooltip';
import * as jDialog from './dialog';
import * as jBackTop from './backTop';
import * as jCounter from './counter';
// 按需引入
export {
  jButton,
  jIcon,
  jMessage,
  jQueryPage,
  jCard,
  jSelect,
  jTooltip,
  jDialog,
  jBackTop,
  jCounter,
};
const components = [
  jButton,
  jIcon,
  jQueryPage,
  jMessage,
  jCard,
  jSelect,
  jTooltip,
  jDialog,
  jBackTop,
  jCounter,
];
const JoydDemo = {
  components,
  install(App: any) {
    console.log(jCounter);
    console.log('joyd-demo for vitepress ^.^');
    components.forEach((item) => {
      console.log(item);

      App.component(item.default.name, item.default);
    });
    App.config.globalProperties.$jMessage = jMessage;
  },
};

export default JoydDemo;
