export const SessionExpiredParams = 'expired';
export const SessionExpiredPath = '/logout';
export const SessionExpiredFullUrl = [SessionExpiredPath, `${SessionExpiredParams}=true`].join('?');
