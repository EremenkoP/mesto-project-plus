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

export const USER_ERR_NAME = 'Имя пользователя должно быть от 2 до 30 символов';
export const USER_ERR_ABOUT = 'Описание должно быть от 2 до 200 символов';
export const USER_ERR_EMAIL_EMPTY = 'E-mail должен быть введен';
export const USER_ERR_EMAIL = 'Не корректно задан e-mail';
export const USER_ERR_AVATAR = 'URL аватара указано не корректно';
export const USER_ERR_PASSWORD_EMPTY = 'Пароль должен быть введен';
export const USER_ERR_PASSWORD_LEN = 'Длина пароля должна быть не меньше 6 символов';
