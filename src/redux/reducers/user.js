  import AsyncStorage from "@react-native-community/async-storage";

   var initialState =  {
      isLoggedIn: false,
      user: null,
      isFirstTime: true
   }

  AsyncStorage.getItem('isLoggedIn').then(val => initialState.isLoggedIn = val);
  AsyncStorage.getItem('isFirstTime').then(val => initialState.isFirstTime = val);
  AsyncStorage.getItem('user').then(val => initialState.user = JSON.parse(val));
   
  export default function user(state = initialState, action) {
    switch (action.type) {
      case 'LOGIN': {
      return Object.assign(
        {},
        state,
        {
          isLoggedIn: true,
          user: action.user,
        }
      )
      }
      case 'LOGOUT': {
        return {
          isLoggedIn : false,
          user: null,
        }
      }
 
      case 'GET_USER' : {
        return {
          ...state
        }
      }

      case 'CHECK_FIRST_TIME': {
        return {
          ...state
        }
      }

      case 'CHANGE_FIRST_TIME_STATUS': {
        return {
          ...state,
          isFirstTime: !state.isFirstTime
        }
      }

      default:
        return state
    }
  }