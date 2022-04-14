import axios from "axios";

//get ALL Pokemons
export const getPokemons = async () => {
  return await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0`
  );
};

//get pokemon BY ID
export const getPokemonById = async (id: number) => {
  return await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
};

//get pokemon DETAILS BY ID
export const getPokeDetailsByName = async (name: string) => {
  return await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
};
