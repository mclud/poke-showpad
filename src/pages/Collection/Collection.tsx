// @flow

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "../../components/List/List";
import {
  importCollectionStorage,
  selectCollection,
} from "../../features/collection/collectionSlice";
import "./Collection.css";

export default function Collection() {
  const storedCollection = useSelector(selectCollection);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(importCollectionStorage());
  }, [storedCollection.count]);

  return (
    <div>
      <h4 className="collection-title m-1">
        My Pokemons ({storedCollection.results.length})
      </h4>
      <List {...storedCollection} type="collection" />
    </div>
  );
}
