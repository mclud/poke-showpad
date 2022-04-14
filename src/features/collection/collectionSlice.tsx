import { CardInterface } from "../../components/Card/Card";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { PokeResults } from "../../components/List/List";

const initialState: PokeResults = {
  page: 1,
  results: [],
  count: 0,
  type: "collection",
};

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    addCollection: (state, action) => {
      if (
        state.results.filter(
          (poke: CardInterface) => poke.id === action.payload.id
        ).length === 0
      ) {
        state.results = [...state.results, action.payload];
        state.count = state.results.length;
        localStorage.setItem(
          "collection-pokemons",
          JSON.stringify(state.results)
        );
      }
    },
    removeCollection: (state, action) => {
      state.results = state.results.filter(
        (poke: CardInterface) => poke.id !== action.payload.id
      );
      state.count = state.results.length;
      localStorage.setItem(
        "collection-pokemons",
        JSON.stringify(state.results)
      );
    },
    updateCollection: (state, action) => {
      state.results.map((p: CardInterface) => {
        if (action.payload.id === p.id && p.bg !== action.payload.bg) {
          p.bg = action.payload.bg;
        }
      });
      localStorage.setItem(
        "collection-pokemons",
        JSON.stringify(state.results)
      );
    },
    importCollectionStorage: (state) => {
      let pokemons = localStorage.getItem("collection-pokemons");
      if (pokemons) {
        state.results = JSON.parse(pokemons);
        state.count = pokemons.length;
      }
    },
    updatePageCollection: (state, action) => {
      state.page = action.payload.page;
    },
  },
});

//create slice

//export actions
export const {
  addCollection,
  removeCollection,
  importCollectionStorage,
  updateCollection,
  updatePageCollection,
} = collectionSlice.actions;

//selector
export const selectCollection = (state: RootState) => state.collection;

export default collectionSlice.reducer;
