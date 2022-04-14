import logo from "../../images/logo.png";
import "./Header.css";
import { Link } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";
import { Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectFavs } from "../../features/favs/favsSlice";
import favImg from "../../images/favicon.png";
import collectionImg from "../../images/collection.png";
import { selectCollection } from "../../features/collection/collectionSlice";

function Header() {
  let favs = useSelector(selectFavs);
  let collection = useSelector(selectCollection);

  return (
    <Container fluid className="header d-flex flex-column p-3">
      <div className="d-flex justify-space-between align-items-center row">
        <Col md={3} xs={12}>
          <div className="brand d-flex align-items-center justify-space-center">
            <Link to="/">
              <img className="logo" src={logo} alt="logoo" />
            </Link>
          </div>
        </Col>
        <Col md={7} xs={12}>
          <nav className="row">
            <Col md={7} xs={6}>
              <ul>
                <li>
                  <Link to="/favs">
                    <div>
                      <img src={favImg} alt="favorites img" />
                      <p>
                        Favoris
                        {favs.results.length > 0 &&
                          ` ( ${favs.results.length} )`}
                      </p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/collection">
                    <div>
                      <img src={collectionImg} alt="collection img" />{" "}
                      <p>
                        Collection
                        {collection.results.length > 0 &&
                          ` ( ${collection.results.length} )`}
                      </p>
                    </div>
                  </Link>
                </li>
              </ul>
            </Col>
            <Col md={5} xs={6} className="d-flex m-auto">
              <Searchbar />
            </Col>
          </nav>
        </Col>
        <Col md={2} xs={12}></Col>
      </div>
    </Container>
  );
}

export default Header;
