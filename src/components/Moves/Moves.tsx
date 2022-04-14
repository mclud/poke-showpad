import "./Moves.css";

export interface Move {
  move: {
    name: string;
  };
}

export interface MovesInterface {
  moves: Move[];
}
function Moves(props: MovesInterface) {
  return (
    <section id="moves">
      <h3>Moves:</h3>
      {props.moves.length > 0 ? (
        <div className="moves">
          {props.moves.map((move: Move, i: number) => {
            return (
              <div className="move" key={i}>
                <div className="move-name">{move.move.name}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>No moves</div>
      )}
    </section>
  );
}

export default Moves;
