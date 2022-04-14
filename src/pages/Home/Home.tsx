import { useSelector } from "react-redux";
import List from "../../components/List/List";
import { selectApi } from "../../features/API/apiSlice";
import "./Home.css";
import PokeBall from "../../images/favicon.png";

export const Home = () => {
  let api = useSelector(selectApi);

  return (
    <div>
      <section className="home">
        {api.pokemons.results.length === 0 && api.status !== "error" && (
          <div className="poke-loader">
            <img src={PokeBall} alt="loader" />
            <p>Loading Pokémons...</p>
          </div>
        )}
        {api.status === "error" && (
          <div className="error">
            Something went wrong with Pokémons!! They're all gone...
          </div>
        )}
        <List {...api.pokemons} type="pokemons" />
      </section>
    </div>
  );
};
