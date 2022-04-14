import { Link } from "react-router-dom";
import "./Card.css";
import { FavIcon } from "../FavIcon/FavIcon";
import { CollectionIcon } from "../CollectionIcon/CollectionIcon";
import defaultBg from "../../images/style_pokemon_bg.png";

//typing card props
export interface CardInterface {
  id: number;
  name: string;
  url: string;
  bg: string;
}

function Card(props: CardInterface) {
  //PULLING DATA FROM PROPS
  let { id, name, bg } = { ...props };

  return (
    <li className="pokemon-card" key={id} data-title={name}>
      <div className="pokemon-container">
        <Link to={"/pokemon/" + id}>
          <div className="card-bgs">
            <img src={defaultBg} className="front-card" alt="frontcard" />
            {bg !== "" && (
              <img src={bg} alt="pokemon" className="front-card-extra" />
            )}
          </div>
          <div className="pokemon-card-content">
            <div className="pokemon-card-id">#{id}</div>
            <div className="pokemon-card-title">{name}</div>
          </div>
        </Link>
        <div className="pokemon-container-details">
          <FavIcon {...props} />
          <CollectionIcon {...props} />
        </div>
      </div>
    </li>
  );
}

export default Card;
