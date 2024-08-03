import styles from "@/styles/pages/Plant.module.scss";
import PlantDetail from "@/components/plants/PlantDetail";
import Chat from "@/components/plants/Chat";
import Stats from "@/components/plants/Stats";

export default function Plant() {
  return (
    <main id={styles.dashboard} className="background">
      <PlantDetail
        image="/images/01.png"
        name="Plumi"
        type="Something"
        price="$10"
      />
      <Chat />
      <Stats
        stats={[
          {
            name: "Introduction to AI",
            strength: "40",
            advice: "a",
          },
          {
            name: "Introduction to AI",
            strength: "50",
            advice: "",
          },
          {
            name: "Introduction to AI",
            strength: "50",
            advice: "",
          },
          {
            name: "Introduction to AI",
            strength: "50",
            advice: "",
          },
        ]}
      />
    </main>
  );
}
