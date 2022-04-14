import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import List from "../../components/List/List";
import {
  selectApi,
  setActualSearch,
} from "../../features/API/apiSlice";
import "./SearchPage.css";

export const SearchTest = () => {
  let [urlParams] = useSearchParams();
  const dispatch = useDispatch();
  let api = useSelector(selectApi);

  /**
   * [extract the query, make the API call via redux and set the state of current search]
   * @return {void}
   */
  const dispatchQuery = () => {
    let searchFor = urlParams.get("q")?.toString();
    if (searchFor) {
      dispatch(setActualSearch(searchFor));
    }
  };

  //every time there is a new query, we make the call.
  useEffect(dispatchQuery, [urlParams, dispatch]);

  return (
    <div>
      <div className="last-search">
        You're looking for : "{api.actual_search}"
      </div>
      <List {...api.search} type="search" />
    </div>
  );
};

export default SearchTest;
