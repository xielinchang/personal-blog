import { withInstallFunction } from '../../assets/utils/install';
import message from './src';

export const jMessage = withInstallFunction(message, '$IMssage'); // 增加类型

export default jMessage;
