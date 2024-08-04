"use client";

import { useState, useEffect } from "react";
import { useData } from "@/contexts/States";
import styles from "@/styles/pages/AddNew.module.scss";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF", "PNG", "JPEG"];

const PINATA_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmM2EwNTVhYS1hYmQ2LTRlZDYtOTU5Yy1iMGJkZmVjMDViMTMiLCJlbWFpbCI6ImxobHJhaG1hbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZmNkZDQ3ZjA0Y2M5MGY1YjhhMDEiLCJzY29wZWRLZXlTZWNyZXQiOiIwM2E4ZmM0NDNkYzJiMjNlNjVmOGU4MTllZTlkZTMyNjBjNmI3M2ZmNGFiYjBhM2M2MzAxNDBiZWUyYTY2ZWIxIiwiaWF0IjoxNzIyMDk2NjYwfQ.cQPYfszcpi57cvjHcjl3afVY8Lr3RNS4TvZpSGUVA9Q';
const PINATA_GATEWAY = 'https://aquamarine-rainy-kangaroo-939.mypinata.cloud';

export default function AddPlant() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [ipfsLink, setIpfsLink] = useState("");

  const { setLoadingModal } = useData();

  async function pinFileToIPFS(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${PINATA_JWT}`,
        },
        body: formData,
      });

      const result = await response.json();
      return result.IpfsHash;
    } catch (error) {
      console.error('Error in pinFileToIPFS:', error);
      throw error;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingModal(true);
    if (!image || !name) {
      setLoadingModal(false);
      alert("Please provide both an image and a name.");
      return;
    }

    try {
      const ipfsHash = await pinFileToIPFS(image);
      const ipfsLink = `${PINATA_GATEWAY}/ipfs/${ipfsHash}`;
      setIpfsLink(ipfsLink);
      console.log("Image uploaded to IPFS:", ipfsLink);
      alert(`Image uploaded successfully. IPFS Link: ${ipfsLink}`);
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
      alert("Error uploading image to IPFS");
    } finally {
      setLoadingModal(false);
    }
  };

  // Update page title
  useEffect(() => {
    document.title = "Planted | Add Plant";
  }, []);

  const handleChange = (file) => {
    setImage(file);
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