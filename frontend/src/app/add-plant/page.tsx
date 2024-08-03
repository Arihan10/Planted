"use client";

import { useState, useEffect } from "react";
import { useData } from "@/contexts/States";
import styles from "@/styles/pages/AddNew.module.scss";

import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF", "PNG", "JPEG"];

export default function AddPlant() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const { setLoadingModal } = useData();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoadingModal(true);
    if (!image || !name) {
      setLoadingModal(false);
      return;
    }
    console.log(name, image);
    // TODO: upload the plant
    setLoadingModal(false);
  };

  // Update page title
  useEffect(() => {
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
