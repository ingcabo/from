import React from "react";
import { SearchkitManager, SearchkitProvider } from "searchkit";
import { LOCAL_STORAGE_KEY, interceptAxiosResponse } from "../utils";

function WrapWithSearchKitProvider({ Component, baseUrl, logout }) {
  const searchkit = new SearchkitManager(baseUrl, {
    useHistory: false,
    httpHeaders: {
      Authorization: localStorage.getItem(LOCAL_STORAGE_KEY)
    }
  });
  searchkit.transport.axios.interceptors.response.use(
    ...interceptAxiosResponse(logout)
  );
  return (
    <SearchkitProvider searchkit={searchkit}>
      <Component />
    </SearchkitProvider>
  );
}

export default WrapWithSearchKitProvider;
