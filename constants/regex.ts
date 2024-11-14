// eslint-disable-next-line no-useless-escape
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()\-_+={}[\]|\\;:"<>,.\/?])[A-Za-z\d~`!@#$%^&*()\-_+={}[\]|\\;:"<>,.\/?]{8,}$/;

export const USERNAME_REGEX = /^(([A-z0-9_](?!\\)){3,255})$/;

// eslint-disable-next-line no-useless-escape
export const NAME_REGEX = /^[A-Za-z0-9_ ~`!@#$%^&*()\-_=+\[\]{}|;:'",<.>\/?]+$/;
