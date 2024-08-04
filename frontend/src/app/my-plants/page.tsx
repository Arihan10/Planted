"use client";

import styles from "@/styles/pages/Plants.module.scss";
import { useEffect, useState } from "react";
import { useData } from "@/contexts/States";

import Link from "next/link";

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
export default function MyPlants() {
  const [plants, setPlants] = useState([]);

  const { logout, user, setLoadingModal } = useData();

  const getPlants = async () => {
    setLoadingModal(true);
    let my_plants = tmpPlants.filter(
      (plant) => plant.walletId == user.walletId
    );
    // TODO: get the plants from the blockchain
    setPlants(my_plants);
    setLoadingModal(false);
  };

  useEffect(() => {
    getPlants();
  }, []);

  // Update page title
  useEffect(() => {
    document.title = "Planted | My Plants";
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
        {plants.length == 0 && (
          <div style={{ color: "#f0f0f0" }}>
            There are no plants on your account
          </div>
        )}
      </div>
    </main>
  );
}
