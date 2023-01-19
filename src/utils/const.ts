export const regexUrl = /^(https?|ftp|file):\/\/[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]/;
export const regexEmail = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

export const DEFAULT_PORT = 3000;
export const DEFAULT_DB_URL = 'mongodb://127.0.0.1:27017/mestodb';

export const DEFAULT_USER_NAME = 'Жак-Ив Кусто';
export const DEFAULT_USER_ABOUT = 'Исследователь';
export const DEFAULT_USER_AVATAR = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png';

export const TOKEN_LIFE = '7d';
export const TOKEN_PASSWORD = 'super-strong-secret';

export const VALIDATION_ERROR = 'ValidationError';
export const CAST_ERROR = 'CastError';
