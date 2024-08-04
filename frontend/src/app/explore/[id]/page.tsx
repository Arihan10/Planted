"use client";

import styles from "@/styles/pages/Plant.module.scss";
import PlantDetail from "@/components/plants/PlantDetail";
import Chat from "@/components/plants/Chat";
import Stats from "@/components/plants/Stats";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useData } from "@/contexts/States";
import axios from "axios";
import { parseResponse } from "@/utils/helper";

export default function Plant() {
  const { id } = useParams();
  const { setLoadingModal, setCurrentPage, addAlert, user } = useData();

  const [currentPlant, setCurrentPlant] = useState({});

  const getCurrentPlant = async () => {
    setLoadingModal(true);
    // TODO: call api
    axios
      .post(process.env.NEXT_PUBLIC_SERVER_URL + "/getPlant", {
        id: id,
      })
      .then((res) => {
        const response = parseResponse([res.data])[0];
        setCurrentPlant(response);
        console.log(response);
        addAlert({
          type: "success",
          message: "Plant recieved successfully",
          time: 3000,
        });
        setLoadingModal(false);
      })
      .catch((err) => {
        console.log(err);
        addAlert({ type: "error", message: "Failed to add plant", time: 3000 });
        setLoadingModal(false);
      });
  };

  useEffect(() => {
    // get the plant from the server
    getCurrentPlant();
  }, []);

  // Update page title
  useEffect(() => {
    setCurrentPage("");
    document.title = "Planted | Plant";
  }, []);

  return (
    <main id={styles.dashboard} className="background">
      <PlantDetail
        {...currentPlant}
        id={id}
        setCurrentPlant={setCurrentPlant}
      />
      <Chat id={id} imgURL={currentPlant.imgURL} />
      <Stats
        plant={currentPlant}
        names={[
          "colVibrancy",
          "LAI",
          "wilting",
          "spotting",
          "symmetry",
          "growthPat",
          "pests",
          "flowering",
        ]}
      />
    </main>
  );
}
