import { CardInterface } from "../../components/Card/Card";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { PokeResults } from "../../components/List/List";

const initialState: PokeResults = {
  page: 1,
  results: [],
  count: 0,
  type: "favorites"
}

export const favsSlice = createSlice({
  name: "favs",
  initialState,
  reducers: {
    addFav: (state, action) => {
      if (
        state.results.filter((poke:CardInterface) => poke.id === action.payload.id)
          .length === 0
      ) {
        state.results = [...state.results, action.payload];
        state.count = state.results.length;
        localStorage.setItem("fav-pokemons", JSON.stringify(state.results));
      }
    },
    removeFav: (state, action) => {
      state.results = state.results.filter(
        (poke) => poke.id !== action.payload.id
      );
      state.count = state.results.length;
      localStorage.setItem("fav-pokemons", JSON.stringify(state.results));
    },
    updateFavs: (state, action) => {
      state.results.map((p:CardInterface) => {
        if (action.payload.id === p.id && p.bg !== action.payload.bg) {
          p.bg = action.payload.bg
        }
      });
      localStorage.setItem("fav-pokemons", JSON.stringify(state.results));
    },
    importFavsStorage: (state) => {
      let pokemons = localStorage.getItem("fav-pokemons");
      if (pokemons) {
        state.results = JSON.parse(pokemons);
        state.count = pokemons.length;
      } 
    },
    updatePageFavs: (state, action) => {
      state.page = action.payload.page;
    },
  },
});

//create slice

//export actions
export const { addFav, removeFav, importFavsStorage, updateFavs, updatePageFavs } = favsSlice.actions;

//selector
export const selectFavs = (state: RootState) => state.favs;

export default favsSlice.reducer;
