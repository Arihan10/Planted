import styles from "@/styles/components/plants/Stats.module.scss";

const dict = {
  colVibrancy: "Color Vibrancy",
  LAI: "Leaf Area Index",
  wilting: "Wilting",
  spotting: "Spotting",
  symmetry: "Symmetry",
  growthPat: "Growth Pattern",
  pests: "Pests",
  flowering: "Flowering",
};
export default function Stats({ plant, names }: any) {
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
      {names.map((name: any, index: any) => {
        return (
          <div className={`${styles.stat} shadow`} key={index}>
            <div className={styles.name}>{dict[name]}</div>
            <div className={styles.container}>
              <div className={styles.strength}>Strength: {plant[name]}%</div>
              <div
                className={`${styles.goodbad} ${
                  getStrength(plant[name]) == "bad"
                    ? styles.red
                    : getStrength(plant[name]) == "normal"
                    ? styles.blue
                    : styles.green
                }`}
              >
                {getStrength(plant[name])}
              </div>
            </div>
            {plant[name + "Advice"] && getStrength(plant[name]) != "good" ? (
              <div className={styles.detail}>{plant[name + "Advice"]}</div>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
}
