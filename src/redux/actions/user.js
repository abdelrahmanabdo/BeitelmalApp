
export const loginUser = (user) => {
   return ({
      type: 'LOGIN',
      user : user,
   })
};

export const logoutUser = () => ({
   type: 'LOGOUT',
 });


export const getUser = () => ({
   type : 'GET_USER'
});

export const checkFirstTime = () => ({
  type: 'CHECK_FIRST_TIME'
});

export const changeFirstTimeStatus = () => ({
  type: 'CHANGE_FIRST_TIME_STATUS'
});