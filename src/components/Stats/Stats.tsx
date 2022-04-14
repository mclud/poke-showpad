import "./Stats.css";

export interface Stat {
  name: string;
  value: number;
}
export interface StatsInterface {
  stats: Stat[];
}
export const Stats = (props: StatsInterface) => {
  return (
    <section id="stats">
      <h3>Stats:</h3>
      {props.stats.length > 0 ? (
        <div className="stats">
          {props.stats.map((stat: Stat, i: number) => {
            return (
              <div className="stat" key={i}>
                <div className="jauge">
                  <div
                    className="jauge-on"
                    style={{
                      height: stat.value > 99 ? "98%" : stat.value + "%",
                    }}
                  ></div>
                </div>
                <div className="stat-name">
                  {stat.name} ({stat.value})
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>No stats</div>
      )}
    </section>
  );
};
