import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getPokemonById, getPokeDetailsByName } from "../../features/API/Api";
import {
  selectApi,
  updatePokemon,
  updateSearch,
} from "../../features/API/apiSlice";
import "./DetailPage.css";
import { FavIcon } from "../../components/FavIcon/FavIcon";
import { CollectionIcon } from "../../components/CollectionIcon/CollectionIcon";
import leftArrow from "../../images/arrow_left_btn2.png";
import rightArrow from "../../images/arrow_right_btn1.png";
import backgroundPoke from "../../images/style_pokemon_bg.png";
import { Link } from "react-router-dom";
import { CardInterface } from "../../components/Card/Card";
import { selectFavs, updateFavs } from "../../features/favs/favsSlice";
import {
  selectCollection,
  updateCollection,
} from "../../features/collection/collectionSlice";
import Moves from "../../components/Moves/Moves";
import { Stat, Stats } from "../../components/Stats/Stats";

export interface Genre {
  id: number;
  name: string;
}

export interface StatGlobal {
  stat: Stat;
  base_stat: number;
}

export interface Ability {
  ability: {
    name: string;
  };
}

export interface PokeType {
  type: {
    name: string;
  };
}

export interface Move {
  move: {
    name: string;
  };
}

export interface PokemonState {
  id: number;
  name: string;
  stats: Stat[];
  weight: number;
  height: number;
  abilities: Ability[];
  types: PokeType[];
  sprites: {
    front_default: string;
    front_shiny: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  moves: Move[];
}

export interface PokemonNav {
  name: string;
  id: number;
}
export interface FlavorText {
  flavor_text: string;
  language: {
    name: string;
  };
}
export interface PokeSpecie {
  flavor_text_entries: FlavorText[];
  habitat: {
    name: string;
  };
}

export const PokeSpecieInitialState = {
  flavor_text_entries: [
    {
      flavor_text: "",
      language: {
        name: "",
      },
    },
  ],
  habitat: {
    name: "",
  },
};

export const pokemonInitialState = {
  id: 0,
  name: "",
  stats: [],
  height: 0,
  weight: 0,
  abilities: [],
  types: [],
  sprites: {
    front_default: "",
    front_shiny: "",
    other: {
      "official-artwork": {
        front_default: "",
      },
    },
  },
  moves: [
    {
      move: {
        name: "",
      },
    },
  ],
};

function DetailPage() {
  const dispatch = useDispatch();
  const api = useSelector(selectApi);
  const favs = useSelector(selectFavs);
  const collection = useSelector(selectCollection);
  const navigation = useNavigate();
  let params = useParams();

  let [loadingPokemon, setLoadingPokemon] = useState<boolean>(false);
  let [pokemon, setPokemon] = useState<PokemonState>(pokemonInitialState);
  let [pokeSpecie, setPokeSpecie] = useState<PokeSpecie>(
    PokeSpecieInitialState
  );
  let [stats, setStats] = useState<Stat[]>([{ value: 0, name: "" }]);
  let [nextPoke, setNextPoke] = useState<PokemonNav>({ name: "", id: 0 });
  let [prevPoke, setPrevPoke] = useState<PokemonNav>({ name: "", id: 0 });

  function getPokemons() {
    setLoadingPokemon(true);
    if (params.id) {
      getPokemonById(parseInt(params.id))
        //request ok
        .then((resp) => {
          //Setting poke state
          if (pokemon.name !== resp.data.name) {
            setPokemon({ ...resp.data });
          }
          let statsGlob = resp.data.stats.map((stat: StatGlobal) => {
            let base_stat = stat.base_stat;
            let name = stat.stat.name;
            return { value: base_stat, name: name };
          });
          setStats(statsGlob);

          getPokeDetailsByName(pokemon.name).then((resp) => {
            if (
              JSON.stringify(pokeSpecie.flavor_text_entries) !==
              JSON.stringify(resp.data.flavor_text_entries)
            )
              setPokeSpecie({ ...resp.data });
          });
          setLoadingPokemon(false);
        })
        //handle error
        .catch((err) => console.log(err));
    }
  }

  useEffect(getPokemons, [params, pokemon]);

  //Update pokeImg (list)
  useEffect(() => {
    if (
      api.pokemons.results.filter((poke: CardInterface) => {
        return poke.id === pokemon.id && poke.bg === "";
      }).length > 0
    ) {
      dispatch(
        updatePokemon({
          pokemons: api.pokemons.results,
          bg: sprites.other["official-artwork"].front_default,
          id,
        })
      );
    }
    if (
      favs.results.filter((poke: CardInterface) => {
        return (
          poke.id === pokemon.id &&
          poke.bg !== sprites.other["official-artwork"].front_default
        );
      }).length > 0
    ) {
      dispatch(
        updateFavs({
          pokemons: favs.results,
          bg: sprites.other["official-artwork"].front_default,
          id,
        })
      );
    }
    if (
      collection.results.filter((poke: CardInterface) => {
        return (
          poke.id === pokemon.id &&
          poke.bg !== sprites.other["official-artwork"].front_default
        );
      }).length > 0
    ) {
      dispatch(
        updateCollection({
          pokemons: collection.results,
          bg: sprites.other["official-artwork"].front_default,
          id,
        })
      );
    }
    if (
      api.search.results.filter((poke: CardInterface) => {
        return (
          poke.id === pokemon.id &&
          poke.bg !== sprites.other["official-artwork"].front_default
        );
      }).length > 0
    ) {
      dispatch(
        updateSearch({
          pokemons: collection.results,
          bg: sprites.other["official-artwork"].front_default,
          id,
        })
      );
    }
  }, [favs, collection, pokemon]);

  const { id, name, sprites, types, weight, height, moves } = { ...pokemon };

  const getNextPokemon = () => {
    let nextPoke = api.pokemons.results.filter((pokemon: PokemonState) => {
      if (id < api.pokemons.count) {
        return pokemon.id === id + 1;
      } else return null;
    });
    return nextPoke;
  };

  const getPrevPokemon = () => {
    let nextPoke = api.pokemons.results.filter((pokemon: PokemonState) => {
      if (id < api.pokemons.count) {
        return pokemon.id === id - 1;
      } else return null;
    });
    return nextPoke;
  };

  useEffect(() => {
    let nextPoke = getNextPokemon();
    if (nextPoke.length > 0) {
      setNextPoke(nextPoke[0]);
    }
    let prevPoke = getPrevPokemon();
    if (prevPoke.length > 0) {
      setPrevPoke(prevPoke[0]);
    }
  }, [pokemon]);

  return (
    <div className="pokemon-dp" data-id={params.id}>
      {/* {loadingPokemon && <div>LOADING....</div>} */}
      {pokemon && pokemon.abilities.length !== 0 ? (
        <div data-id={id}>
          <Row className="pokemon-row m-0">
            <Col md={12}>
              <div className="details">
                <section id="details">
                  <div className="details-header">
                    <div className="details-previous">
                      {prevPoke.name !== "" && pokemon.id !== 1 && (
                        <Link to={`/pokemon/${prevPoke.id}`}>
                          <div className="pokenav">
                            <img
                              src={leftArrow}
                              className="arrow left-arrow"
                              alt="leftarrow"
                            />
                            <div className="pokemon-previous-id">
                              {prevPoke.id}
                            </div>
                            <div className="pokemon-previous-name">
                              {prevPoke.name}
                            </div>
                          </div>
                        </Link>
                      )}
                    </div>
                    <div className="detail-actual">
                      <div className="pokemon-id">#{id}</div>
                      <div className="pokemon-name">{name}</div>
                    </div>
                    <div className="details-next">
                      {api.pokemons.count > id && (
                        <Link to={`/pokemon/${nextPoke.id}`}>
                          <div className="pokenav">
                            <div className="pokemon-previous-name">
                              {nextPoke.name}
                            </div>
                            <div className="pokemon-previous-id">
                              {nextPoke.id}
                            </div>
                            <img
                              src={rightArrow}
                              className="arrow right-arrow"
                              alt="rightarrow"
                            />
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="details-body">
                    <div className="details-left">
                      <h5>About</h5>
                      {pokeSpecie.flavor_text_entries !== undefined &&
                        pokeSpecie.flavor_text_entries.length > 0 && (
                          <p>{pokeSpecie.flavor_text_entries[0].flavor_text}</p>
                        )}
                      <h5>Abilities: </h5>
                      {pokemon.abilities !== undefined &&
                      pokemon.abilities.length > 0 ? (
                        <div className="abilities">
                          {pokemon.abilities.map(
                            (ability: Ability, i: number) => {
                              return (
                                <div className="ability" key={i}>
                                  {ability.ability.name}
                                </div>
                              );
                            }
                          )}
                        </div>
                      ) : (
                        <div>This pokemon has no ability</div>
                      )}
                    </div>
                    <div className="pokemon-bg">
                      <img
                        src={backgroundPoke}
                        className="pokemon-bg-default"
                        alt="bgdefaul"
                      />
                      <img
                        src={sprites.other["official-artwork"].front_default}
                        className="pokemon-bg-custom"
                        alt="shiny"
                      />
                    </div>
                    <div className="details-right">
                      <ul>
                        <li>
                          Type
                          <div className="li-content">
                            {types.map((type: PokeType, i: number) => {
                              return <div key={i + 1}>{type.type.name}</div>;
                            })}
                          </div>
                        </li>
                        <li>
                          Height
                          <div className="li-content">{height / 10} M</div>
                        </li>
                        <li>
                          Weight
                          <div className="li-content">{weight / 10} KG</div>
                        </li>
                        <li>
                          Habitat
                          <div className="li-content">
                            {pokeSpecie.habitat !== undefined &&
                              pokeSpecie.habitat !== null && (
                                <p>{pokeSpecie.habitat.name}</p>
                              )}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="details-bottom">
                    <div className="poke-fav">
                      <FavIcon
                        url={`https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`}
                        bg={""}
                        {...pokemon}
                      />{" "}
                      {favs.results.filter(
                        (poke: CardInterface) => poke.id === pokemon.id
                      ).length === 0
                        ? "Add to "
                        : "Remove from "}
                      favorites
                    </div>
                    <div className="poke-collection">
                      <CollectionIcon
                        url={`https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`}
                        bg={""}
                        {...pokemon}
                      />
                      {collection.results.filter(
                        (poke: CardInterface) => poke.id === pokemon.id
                      ).length === 0
                        ? "Add to "
                        : "Remove from "}
                      collection
                    </div>
                  </div>
                </section>

                <Stats stats={stats} />
                <Moves moves={moves} />
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <div>This pokémon seems to be AFK.. No data to consume!</div>
      )}
      <div className="backhome" onClick={() => navigation("/")}>
        Back to Pokédex
      </div>
    </div>
  );
}

export default DetailPage;
