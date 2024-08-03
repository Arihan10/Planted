"use client";

import { useState } from "react";
import { useData } from "@/contexts/States";
import styles from "@/styles/pages/AddNew.module.scss";

import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF", "PNG", "JPEG"];

export default function AddPlant() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(image, name);
  };

  const handleChange = (file: any) => {
    console.log(file);
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
      <form onSubmit={handleSubmit} className={styles.form}>
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
