import styles from "@/styles/components/plants/Stats.module.scss";

export default function Stats({ stats }: any) {
  const getStrength = (strength: any) => {
    if (strength < 50) {
      return "bad";
    } else if (strength < 70) {
      return "normal";
    } else {
      return "good";
    }
  };
  return (
    <div className={styles.stats}>
      {stats.map((stat: any, index: any) => {
        return (
          <div className={`${styles.stat} shadow`} key={index}>
            <div className={styles.name}>{stat.name}</div>
            <div className={styles.container}>
              <div className={styles.strength}>Strength: {stat.strength}%</div>
              <div
                className={`${styles.goodbad} ${
                  getStrength(stat.strength) == "bad"
                    ? styles.red
                    : getStrength(stat.strength) == "normal"
                    ? styles.blue
                    : styles.green
                }`}
              >
                {getStrength(stat.strength)}
              </div>
            </div>
            {stat.advice && getStrength(stat.strength) != "good" ? (
              <div className={styles.detail}>{stat.advice}</div>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
}
