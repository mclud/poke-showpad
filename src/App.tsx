import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemonsAsync,
  importPokemons,
  selectApi,
} from "./features/API/apiSlice";
import { useEffect } from "react";
import { Routes } from "react-router";
import { Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchPage from "./pages/SearchPage/SearchPage";
import { importFavsStorage } from "./features/favs/favsSlice";
import Favs from "./pages/Favorites/Favs";
import { Home } from "./pages/Home/Home";
import DetailPage from "./pages/DetailPage/DetailPage";
import TestJest from "./components/TestJest/TestJest";
import Collection from "./pages/Collection/Collection";
import { importCollectionStorage } from "./features/collection/collectionSlice";

function App() {
  let dispatch = useDispatch();
  let api = useSelector(selectApi);

  //FETCH pokemons - Exec 1 time at landing
  useEffect(() => {
    if (api.pokemons.results.length === 0) dispatch(importPokemons());
    dispatch(importFavsStorage());
    dispatch(importCollectionStorage());
    setTimeout(() => {
      if (api.pokemons.count < 2) {
        dispatch(getPokemonsAsync());
      }
    }, 1000);
  }, [api.pokemons.results]);

  return (
    <Router>
      <div id="app">
        <Header />
        <Row className="main-row">
          <Col
            md={{ span: 10, offset: 1 }}
            sm={{ span: 12, offset: 0 }}
            className="main-col-content"
          >
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/pokemon/:id" element={<DetailPage />}></Route>
              <Route path="/search" element={<SearchPage />}></Route>
              <Route path="/favs" element={<Favs />}></Route>
              <Route path="/collection" element={<Collection />}></Route>
              {/* <Route
                path="/test"
                element={
                  <TestJest
                    shouldRemember={false}
                    onUsernameChange={function (username: string): void {
                      throw new Error("Function not implemented.");
                    }}
                    onPasswordChange={function (password: string): void {
                      throw new Error("Function not implemented.");
                    }}
                    onRememberChange={function (remember: boolean): void {
                      throw new Error("Function not implemented.");
                    }}
                    onSubmit={function (
                      username: string,
                      password: string
                    ): void {
                      throw new Error("Function not implemented.");
                    }}
                  />
                }
              ></Route> */}
            </Routes>
          </Col>
        </Row>
      </div>
    </Router>
  );
}

export default App;
