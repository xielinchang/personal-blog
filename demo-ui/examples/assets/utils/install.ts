import type { AppContext, Plugin } from 'vue';

type SFCWithInstall<T> = T & Plugin;
export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null;
};

// 注册组件
export const withInstall = <T>(main: T) => {
  (main as SFCWithInstall<T>).install = (app): void => {
    const comp: Record<string, any> = main as Record<string, any>;
    app.component(comp.name, comp);
  };
  return main as SFCWithInstall<T>;
};

export const withInstallFunction = <T>(fn: T, name: string) => {
  (fn as SFCWithInstall<T>).install = (app: App) => {
    app.config.globalProperties[name] = fn;
  };

  return fn as SFCInstallWithContext<T>;
};
