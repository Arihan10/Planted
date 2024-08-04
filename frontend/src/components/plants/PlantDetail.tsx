"use client";

import { useData } from "@/contexts/States";
import styles from "@/styles/components/plants/PlantDetail.module.scss";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import { pinFileToIPFS } from "@/utils/helper";

const fileTypes = ["JPG", "PNG", "GIF", "PNG", "JPEG"];

const PINATA_GATEWAY = "https://aquamarine-rainy-kangaroo-939.mypinata.cloud";

export default function PlantDetail({
  imgURL,
  name,
  type,
  averageHealthScore,
  walletID,
  id,
  setCurrentPlant,
}: any) {
  const { user, setLoadingModal, addAlert } = useData();
  const isMine = () => {
    return walletID == user.walletId;
  };

  const handleChange = async (file: any) => {
    setLoadingModal(true);

    let ipfsLink = "";
    // upload file
    try {
      const ipfsHash = await pinFileToIPFS(file);
      ipfsLink = `${PINATA_GATEWAY}/ipfs/${ipfsHash}`;
    } catch (error) {}

    if (!ipfsLink) {
      addAlert({
        type: "error",
        message: "Failed to upload image",
        time: 3000,
      });
      setLoadingModal(false);
      return;
    }

    axios
      .put(process.env.NEXT_PUBLIC_SERVER_URL + "/plant", {
        id: id,
        imgURL: ipfsLink,
      })
      .then((res) => {
        setCurrentPlant(JSON.parse(res.data));
        addAlert({
          type: "success",
          message: "Plant chnaged successfully",
          time: 3000,
        });
        setLoadingModal(false);
      })
      .catch((err) => {
        console.log(err);
        addAlert({
          type: "error",
          message: "Failed to chnage the ",
          time: 3000,
        });
        setLoadingModal(false);
      });
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
        <img src={imgURL} alt={name} />
      </div>
      {isMine() ? (
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
          <div className={styles.price}>{averageHealthScore}</div>
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
