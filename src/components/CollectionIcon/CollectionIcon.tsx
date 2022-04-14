import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import favImgOff from "../../images/favicon-off.png";
import collectionImg from "../../images/collection.png";
import "./CollectionIcon.css";
import {
  addCollection,
  removeCollection,
  selectCollection,
} from "../../features/collection/collectionSlice";
import { CardInterface } from "../Card/Card";

export const CollectionIcon = (props: CardInterface) => {
  const dispatch = useDispatch();
  const collection = useSelector(selectCollection);
  let [pokemonCollection, setPokemonCollection] = useState<Boolean>(false);

  //checking if poke is in collection
  useEffect(() => {
    let pokeFromCollec = collection.results.filter(
      (poke) => poke.id === props.id
    );
    if (pokeFromCollec.length > 0) {
      setPokemonCollection(true);
    } else setPokemonCollection(false);
  }, [props, collection]);

  return (
    <div className="collection-icon" data-fav={pokemonCollection}>
      {pokemonCollection ? (
        <img
          src={collectionImg}
          alt="collection on"
          onClick={() =>
            dispatch(
              removeCollection({
                name: props.name,
                id: props.id,
                url: props.url,
                bg: "",
              })
            )
          }
        />
      ) : (
        <img
          src={favImgOff}
          alt="collection off"
          onClick={() =>
            dispatch(
              addCollection({
                name: props.name,
                id: props.id,
                url: props.url,
                bg: "",
              })
            )
          }
        />
      )}
    </div>
  );
};
