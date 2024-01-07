import store from 'store2';
import config from 'config';

export const getSession = (): any => store.get(config.api.sessionKEY) || null;

export const clearSession = () => store.remove(config.api.sessionKEY)!;

export const setSession = (user: any) => store.set(config.api.sessionKEY, user);
