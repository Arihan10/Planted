"use client";

import styles from "@/styles/pages/Plants.module.scss";
import { useEffect, useState } from "react";
import { useData } from "@/contexts/States";
import axios from "axios";
import { parseResponse } from "@/utils/helper";

import Link from "next/link";

export default function Explore() {
  const [plants, setPlants] = useState([]);

  const { logout, user, setLoadingModal, addAlert, setCurrentPage } = useData();

  const getPlants = async () => {
    setLoadingModal(true);
    // TODO: call api
    axios
      .get(process.env.NEXT_PUBLIC_SERVER_URL)
      .then((res) => {
        console.log("hey", res.data);
        const response = parseResponse(res.data);
        console.log(response);
        let not_my_plants = response.filter(
          (plant) => plant.walletID != user.walletId
        );
        setPlants(not_my_plants);
        addAlert({
          type: "success",
          message: "Plant added successfully",
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
    getPlants();
  }, []);

  // Update page title
  useEffect(() => {
    setCurrentPage("Explore");
    document.title = "Planted | Explore";
  }, []);

  return (
    <main id={styles.plants} className="background">
      <div className={styles.wrapper}>
        {plants.map((plant: any) => {
          return (
            <div key={plant.id} className={`${styles.plant} shadow`}>
              <div className={styles.imageWrapper}>
                <img src={plant.imgURL} alt={plant.name} />
                <Link href={`/explore/${plant.id}`} className={styles.link}>
                  See Plant
                </Link>
              </div>
              <div className={styles.detailWrapper}>
                <div className={styles.nameAndType}>
                  <div className={styles.text}>
                    Name: <mark>{plant.name}</mark>
                  </div>
                  <div className={styles.text}>
                    Type: <mark>{plant.type}</mark>
                  </div>
                </div>
                <div className={styles.price}>{plant.price}</div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
