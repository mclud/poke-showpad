import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getPokemons } from "./Api";
import {
  PokeResults,
  pokeResultsInitialState,
} from "../../components/List/List";
import { CardInterface } from "../../components/Card/Card";

export interface ApiState {
  pokemons: PokeResults;
  search: PokeResults;
  status: string;
  actual_search: string;
  page: number;
}

const initialState = {
  pokemons: pokeResultsInitialState,
  search: pokeResultsInitialState,
  status: "waiting",
  actual_search: "",
  page: 1,
};

export const getPokemonsAsync = createAsyncThunk(
  "api/getPokemons",
  async () => {
    try {
      const response = await getPokemons();
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    } catch (error) {
      console.log("API CALL ERROR:", error);
    }
  }
);

export const ApiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    setStatus: (state) => {
      state.status = "ok";
    },
    setActualSearch: (state, action) => {
      state.actual_search = action.payload;
    },
    updatePokemon: (state, action) => {
      state.pokemons.results.map((p: CardInterface) => {
        if (action.payload.id === p.id && p.bg !== action.payload.bg) {
          p.bg = action.payload.bg;
        }
      });
      localStorage.setItem(
        "showpad-pokemons",
        JSON.stringify(state.pokemons.results)
      );
    },
    updateSearch: (state, action) => {
      state.search.results.map((p: CardInterface) => {
        if (action.payload.id === p.id && p.bg !== action.payload.bg) {
          p.bg = action.payload.bg;
        }
      });
    },
    updatePage: (state, action) => {
      state.pokemons.page = action.payload.page;
    },
    importPokemons: (state) => {
      let pokemons = localStorage.getItem("showpad-pokemons");
      if (pokemons) {
        state.pokemons.results = JSON.parse(pokemons);
        state.pokemons.count = state.pokemons.results.length;
        state.status = "filled";
      }
    },
    lookForPokemon: (state, action) => {
      let pokemonsFound = state.pokemons.results.filter(
        (poke: CardInterface) => {
          return (
            poke.name.includes(action.payload.search) ||
            poke.id === action.payload.search
          );
        }
      );
      state.actual_search = action.payload.search;
      state.search.results = pokemonsFound;
      state.search.count = state.search.results.length;
    },
    updateSearchPage: (state, action) => {
      state.search.page = action.payload.page;
    },
  },
  extraReducers: (builder) => {
    builder
      //Get pokemons
      .addCase(getPokemonsAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getPokemonsAsync.fulfilled, (state, action) => {
        let localPokemons = localStorage.getItem("showpad-pokemons");
        if (localPokemons && JSON.parse(localPokemons)) {
          state.pokemons.results = JSON.parse(localPokemons);
          state.pokemons.count = state.pokemons.results.length;
          state.status = "filled";
        } else {
          try {
            //normalize id
            let pokemons = action.payload.results.map(
              (p: CardInterface, i: number) => {
                let id = i + 1;
                p.id = id;
                p.bg = "";
                return p;
              }
            );
            state.pokemons.results = pokemons;
            state.pokemons.count = action.payload.count;
            state.status = "filled";
            localStorage.setItem(
              "showpad-pokemons",
              JSON.stringify(state.pokemons.results)
            );
          } catch (error) {
            console.log(
              "Something went wrong with API RESULTS FROM CALL getPokemonAsync"
            );
            state.status = "error";
          }
        }
      });
  },
});

//export actions
export const {
  setStatus,
  setActualSearch,
  updatePokemon,
  updatePage,
  importPokemons,
  lookForPokemon,
  updateSearchPage,
  updateSearch,
} = ApiSlice.actions;

//selector
export const selectApi = (state: RootState) => state.api;

export default ApiSlice.reducer;
