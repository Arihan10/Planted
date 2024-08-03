"use client";

import { useData } from "@/contexts/States";
import styles from "@/styles/components/plants/PlantDetail.module.scss";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF", "PNG", "JPEG"];

export default function PlantDetail({
  image,
  name,
  type,
  price,
  walletId,
}: any) {
  const { user, setLoadingModal } = useData();
  const isMine = () => {
    return walletId == user.walletId;
  };

  const handleChange = (file: any) => {
    setLoadingModal(true);
    console.log(file);
    // TODO: upload the file
    setLoadingModal(false);
  };

  const onClickBuy = () => {
    setLoadingModal(true);
    console.log("buy");
    // TODO: buy the plant
    setLoadingModal(false);
  };

  return (
    <div className={styles.plantDetail}>
      <div className={`${styles.imageWrapper} shadow`}>
        <img src={image} alt={name} />
      </div>
      {!isMine() ? (
        <div className={`${styles.uploadWrapper} shadow`}>
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          />
        </div>
      ) : (
        ""
      )}
      <div className={`${styles.detailWrapper} shadow`}>
        <div className={styles.nameAndType}>
          <div className={styles.text}>
            Name: <mark>{name}</mark>
          </div>
          <div className={styles.text}>
            Type: <mark>{type}</mark>
          </div>
        </div>
        <div
          className={`${styles.priceAndBuy}  ${isMine() ? styles.center : ""}`}
        >
          <div className={styles.price}>{price}</div>
          {isMine() ? (
            ""
          ) : (
            <button onClick={onClickBuy} className={styles.buy}>
              Buy
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
