"use client";

import styles from "@/styles/pages/Plants.module.scss";
import { useEffect, useState } from "react";
import { useData } from "@/contexts/States";
import axios from "axios";
import { parseResponse } from "@/utils/helper";

import Link from "next/link";

export default function MyPlants() {
  const [plants, setPlants] = useState([]);

  const { logout, user, setLoadingModal, setCurrentPage, addAlert } = useData();

  const getPlants = async () => {
    setLoadingModal(true);
    // TODO: call api
    axios
      .get(process.env.NEXT_PUBLIC_SERVER_URL)
      .then((res) => {
        console.log(res.data);
        const response = parseResponse(res.data);
        let not_my_plants = response.filter(
          (plant) => plant.walletID == user.walletId
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
    setCurrentPage("My plants");
    document.title = "Planted | My Plants";
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
        {plants.length == 0 && (
          <div style={{ color: "#f0f0f0" }}>
            There are no plants on your account
          </div>
        )}
      </div>
    </main>
  );
}
