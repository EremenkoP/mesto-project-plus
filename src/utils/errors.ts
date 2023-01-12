export const NOT_FOUND = {
  code: 404,
  message: {
    getUser: 'Пользователь по указанному _id не найден.',
    updateUserInfo: 'Переданы некорректные данные при обновлении профиля.',
    cardDelete: 'Карточка с указанным _id не найдена.',
    actionLikeCard: 'Передан несуществующий _id карточки. ',
  },
};
export const INTERNAL_SERVER_ERROR = {
  code: 500,
  message: 'На сервере произошла ошибка.',
};
export const BAD_REQUEST = {
  code: 400,
  message: {
    userCreate: 'Переданы некорректные данные при создании пользователя.',
    cardCreate: 'Переданы некорректные данные при создании карточки.',
    userUpdate: 'Переданы некорректные данные при обновлении профиля',
    avatarUpdate: 'Переданы некорректные данные при обновлении аватара.',
    actionLikeCard: 'Переданы некорректные данные для постановки/снятии лайка.',
  },
};
export const CREATED = {
  code: 201,
  message: 'Пользователь создан.',
};

export const DONE = {
  code: 200,
  message: 'Запрос выполнен.',
};
