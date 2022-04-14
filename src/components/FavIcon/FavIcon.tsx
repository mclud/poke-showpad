import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFav, removeFav, selectFavs } from "../../features/favs/favsSlice";
import favImgOff from "../../images/favicon-off.png";
import favImg from "../../images/favicon.png";
import { CardInterface } from "../Card/Card";
import "./FavIcon.css";

export const FavIcon = (props: CardInterface) => {
  const dispatch = useDispatch();
  const favs = useSelector(selectFavs);
  let [pokeFav, setPokeFav] = useState<Boolean>(false);

  //checking if pokemon is in favorites
  useEffect(() => {
    let pokeFromFav = favs.results.filter((poke) => poke.id === props.id);
    if (pokeFromFav.length > 0) {
      setPokeFav(true);
    } else setPokeFav(false);
  }, [props, favs]);

  return (
    <div className="fav-icon" data-fav={pokeFav}>
      {pokeFav ? (
        <img
          src={favImg}
          alt="fav on"
          onClick={() =>
            dispatch(
              removeFav({
                name: props.name,
                id: props.id,
                url: props.url,
                bg: props.bg,
              })
            )
          }
        />
      ) : (
        <img
          src={favImgOff}
          alt="fav off"
          onClick={() =>
            dispatch(
              addFav({
                name: props.name,
                id: props.id,
                url: props.url,
                bg: props.bg,
              })
            )
          }
        />
      )}
    </div>
  );
};
