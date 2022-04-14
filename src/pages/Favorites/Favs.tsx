// @flow

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "../../components/List/List";
import { importFavsStorage, selectFavs } from "../../features/favs/favsSlice";
import "./Favs.css";

export default function Favs() {
  const storedFavs = useSelector(selectFavs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(importFavsStorage());
  }, [storedFavs.count]);

  return (
    <div>
      <h4 className="fav-title m-1">
        Favorites Pokemons ({storedFavs.results.length})
      </h4>
      <List {...storedFavs} type="favorites" />
    </div>
  );
}
