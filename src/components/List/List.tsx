import { useDispatch } from "react-redux";
import "./List.css";
import { updatePage, updateSearchPage } from "../../features/API/apiSlice";
import Card, { CardInterface } from "../Card/Card";
import { updatePageCollection } from "../../features/collection/collectionSlice";
import { updatePageFavs } from "../../features/favs/favsSlice";
import { Pagination } from "../Pagination/Pagination";

export interface PokeResults {
  page: number;
  count: number;
  results: CardInterface[];
  type: string;
}

export const pokeResultsInitialState = {
  page: 1,
  count: 0,
  results: [],
  type: "pokemons",
};

function List(props: PokeResults) {
  const dispatch = useDispatch();

  let provideUpdatePageFunc = (actionType: string) => {
    switch (props.type) {
      case "pokemons":
        if (actionType === "prev")
          dispatch(updatePage({ page: props.page - 1 }));
        else dispatch(updatePage({ page: props.page + 1 }));
        break;
      case "collection":
        if (actionType === "prev")
          dispatch(updatePageCollection({ page: props.page - 1 }));
        else dispatch(updatePageCollection({ page: props.page + 1 }));
        break;
      case "favorites":
        if (actionType === "prev")
          dispatch(updatePageFavs({ page: props.page - 1 }));
        else dispatch(updatePageFavs({ page: props.page + 1 }));
        break;
      case "search":
        if (actionType === "prev")
          dispatch(updateSearchPage({ page: props.page - 1 }));
        else dispatch(updateSearchPage({ page: props.page + 1 }));
        break;
      default:
        if (actionType === "prev")
          dispatch(updatePage({ page: props.page + 1 }));
        else dispatch(updatePage({ page: props.page + 1 }));
    }
  };

  let pokemons =
    props.page === 1
      ? props.results.slice(0, props.page * 20)
      : props.results.slice((props.page - 1) * 20, props.page * 20);

  return (
    <div className="pokemons-list-container" data-page={props.page}>
      <ul className="pokemons-list">
        {pokemons.map((pokemon: CardInterface) => (
          <Card key={pokemon.id} {...pokemon} />
        ))}
      </ul>
      <div className="loader" />
      {props.results.length > 20 ? (
        <Pagination {...props} updateFunc={provideUpdatePageFunc} />
      ) : null}
    </div>
  );
}

export default List;
