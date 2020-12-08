import { AUTH, CHATS, CHAT } from '../actions/types';

const INITIAL_STATE = {
  loadingChat: false,
  loadingChats: false,
  hasMoreChats: false,
  chats: [],
  chat: { id: undefined, messages: [] },
  chatParticipants: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHATS.INIT_CHATS:
      return INITIAL_STATE;
    case CHATS.LOAD_CHATS_SUCCESS:
      return {
        ...state,
        chats: action.payload,
        loadingChats: false,
      };

    case CHAT.INIT_LOAD_CHAT:
      return {
        ...state,
        loadingChat: true,
      };

    case CHAT.LOAD_CHAT_SUCCESS:
      return {
        ...state,
        chat: action.payload,
        loadingChat: false,
      };

    case CHAT.LOAD_CHAT_USERS_SUCCESS:
      return {
        ...state,
        chatParticipants: action.payload,
      };

    case AUTH.LOGOUT:
      return INITIAL_STATE;

    default:
      return state;
  }
};
