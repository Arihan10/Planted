"use client";

import { useState, useEffect } from "react";
import { useData } from "@/contexts/States";
import styles from "@/styles/pages/AddNew.module.scss";
import axios from "axios";
import { pinFileToIPFS } from "@/utils/helper";

import { FileUploader } from "react-drag-drop-files";

const PINATA_GATEWAY = "https://aquamarine-rainy-kangaroo-939.mypinata.cloud";
const fileTypes = ["JPG", "PNG", "GIF", "PNG", "JPEG"];

export default function AddPlant() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const { setLoadingModal, setCurrentPage, user, addAlert } = useData();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoadingModal(true);

    if (!image || !name) {
      setLoadingModal(false);
      return;
    }

    let ipfsLink = "";
    // upload file
    try {
      const ipfsHash = await pinFileToIPFS(image);
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

    // TODO: upload the plant
    axios
      .post(process.env.NEXT_PUBLIC_SERVER_URL + "/plant", {
        imgURL: ipfsLink,
        name: name,
        walletID: user.walletId,
        seed: user.seed,
      })
      .then((res) => {
        console.log(res.data);
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

  // Update page title
  useEffect(() => {
    setCurrentPage("Add a plant");
    document.title = "Planted | Add Plant";
  }, []);

  const handleChange = (file: any) => {
    // set the image
    setImage(file);
    // get the url
    const reader = new FileReader();
    reader.onload = () => {
      setImageURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <main id={styles.addNew} className="background">
      <form onSubmit={handleSubmit} className={`${styles.form} shadow`}>
        <div className={styles.title}>Add a new Plant</div>
        <div className={styles.imageWrapper}>
          {imageURL && <img src={imageURL} alt="Plant" />}
        </div>
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
