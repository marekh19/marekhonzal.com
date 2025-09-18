import pkg from '../../../package.json' with { type: 'json' }

export const getAppVersion = () => pkg.version
