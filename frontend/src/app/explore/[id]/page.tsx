"use client";

import styles from "@/styles/pages/Plant.module.scss";
import PlantDetail from "@/components/plants/PlantDetail";
import Chat from "@/components/plants/Chat";
import Stats from "@/components/plants/Stats";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useData } from "@/contexts/States";

const currentPlantTmp = {
  name: "Plumi",
  type: "Something",
  price: "$10",
  image: "/images/01.png",
};

export default function Plant() {
  const { id } = useParams();
  const { setLoadingModal } = useData();

  const [currentPlant, setCurrentPlant] = useState({});

  const getCurrentPlant = async () => {
    setLoadingModal(true);
    // TODO: call api
    setCurrentPlant(currentPlantTmp);
    setLoadingModal(false);
  };

  useEffect(() => {
    // get the plant from the server
    getCurrentPlant();
  }, []);

  // Update page title
  useEffect(() => {
    document.title = "Planted | Plant";
  }, []);

  return (
    <main id={styles.dashboard} className="background">
      <PlantDetail {...currentPlant} />
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
