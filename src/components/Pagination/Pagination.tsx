import { CardInterface } from "../Card/Card";
import nextImg from "../../images/arrow_right_btn1.png";
import prevImg from "../../images/arrow_left_btn2.png";

export interface PaginationInterface {
  page: number;
  count: number;
  results: CardInterface[];
  type: string;
  updateFunc: Function;
}

export const Pagination = (props: PaginationInterface) => {
  return (
    <div className="pagination">
      {props.page > 1 && (
        <div
          onClick={() => props.updateFunc("prev")}
          className="pagination-next"
        >
          <img src={prevImg} alt="previmg" />
        </div>
      )}
      <div className="pagination-actualpage">
        {props.page} / {Math.ceil(props.count / 20)}
      </div>
      {props.results.length > 20 && props.page < Math.ceil(props.count / 20) && (
        <div
          onClick={() => props.updateFunc("next")}
          className="pagination-next"
        >
          <img src={nextImg} alt="nextimg" />
        </div>
      )}
    </div>
  );
};
