//a utility for just returning an array of two functions to use for an axios interception in case of 401 response

export function interceptAxiosResponse(logout) {
  return [
    response => {
      return response;
    },
    error => {
      if (error.response && error.response.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  ];
}
