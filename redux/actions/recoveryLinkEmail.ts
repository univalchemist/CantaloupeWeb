export const SET_RECOVERY_LINK_EMAIL = 'SET_RECOVERY_LINK_EMAIL';

export function setRecoveryLinkEmail(email: string) {
  return {
    type: SET_RECOVERY_LINK_EMAIL,
    payload: email,
  };
}
