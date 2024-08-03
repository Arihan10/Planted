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
  },
  {
    image: "/images/01.png",
    name: "Plumi",
    type: "Something",
    price: "$10",
    id: 2,
  },
  {
    image: "/images/01.png",
    name: "Plumi",
    type: "Something",
    price: "$10",
    id: 3,
  },
  {
    image: "/images/01.png",
    name: "Plumi",
    type: "Something",
    price: "$10",
    id: 4,
  },
  {
    image: "/images/01.png",
    name: "Plumi",
    type: "Something",
    price: "$10",
    id: 5,
  },
];
export default function Explore() {
  const [plants, setPlants] = useState([]);

  const { logout, user } = useData();

  useEffect(() => {
    setPlants(tmpPlants);
  }, []);

  return (
    <main id={styles.plants} className="background">
      <div className={styles.wrapper}>
        {plants.map((plant: any) => {
          return (
            <div key={plant.id} className={styles.plant}>
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
