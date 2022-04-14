import { KeyboardEvent, useState } from "react";
import "./Searchbar.css";
import searchico from "../../images/search.png";
import { useNavigate } from "react-router";
import { lookForPokemon, updateSearchPage } from "../../features/API/apiSlice";
import { useDispatch } from "react-redux";

function Searchbar() {
  const dispatch = useDispatch();
  let [inputVal, setInputVal] = useState<String>("");
  let nav = useNavigate();

  const handleSearch = () => {
    if (inputVal.length) nav(`/search?q=${inputVal}`);
  };
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    dispatch(lookForPokemon({ search: inputVal }));
    dispatch(updateSearchPage({ page: 1 }));
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="searchbar">
      <div className="searchbar-container">
        <input
          type="text"
          placeholder="Search for a pokémon"
          onChange={(e) => setInputVal(e.target.value.toString().toLowerCase())}
          onKeyUp={(e) => handleKeyPress(e)}
        />
        <img
          className="search-ico"
          src={searchico}
          onClick={() => handleSearch()}
          alt="searchicon"
        />
      </div>
    </div>
  );
}

export default Searchbar;
