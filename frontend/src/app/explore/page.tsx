"use client";

import styles from "@/styles/pages/Plants.module.scss";
import { useEffect, useState } from "react";
import { useData } from "@/contexts/States";

import Link from "next/link";
import { time } from "console";

const tmpPlants = [
  {
    image: "/images/01.png",
    name: "Plumi",
    type: "Something",
    price: "$10",
    id: 1,
    walletId: "0x123",
  },
  {
    image: "/images/01.png",
    name: "Plumi",
    type: "Something",
    price: "$10",
    id: 2,
    walletId: "0x123",
  },
  {
    image: "/images/01.png",
    name: "Plumi",
    type: "Something",
    price: "$10",
    id: 3,
    walletId: "0x123",
  },
  {
    image: "/images/01.png",
    name: "Plumi",
    type: "Something",
    price: "$10",
    id: 4,
    walletId: "0x123",
  },
  {
    image: "/images/01.png",
    name: "Plumi",
    type: "Something",
    price: "$10",
    id: 5,
    walletId: "0x123",
  },
];
export default function Explore() {
  const [plants, setPlants] = useState([]);

  const { logout, user, setLoadingModal, addAlert } = useData();

  const getPlants = async () => {
    setLoadingModal(true);
    let not_my_plants = tmpPlants.filter(
      (plant) => plant.walletId != user.walletId
    );
    setPlants(not_my_plants);
    // TODO: call api
    setLoadingModal(false);
    addAlert({
      message: "Plants loaded successfully",
      type: "success",
      time: 3000,
    });
  };

  useEffect(() => {
    getPlants();
  }, []);

  // Update page title
  useEffect(() => {
    document.title = "Planted | Explore";
  }, []);

  return (
    <main id={styles.plants} className="background">
      <div className={styles.wrapper}>
        {plants.map((plant: any) => {
          return (
            <div key={plant.id} className={`${styles.plant} shadow`}>
              <div className={styles.imageWrapper}>
                <img src={plant.image} alt={plant.name} />
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
