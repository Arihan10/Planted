"use client";

import React, { useState, useEffect } from "react";

export default function Background() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Check if we are running on the client
    setIsClient(true);

    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  if (!isClient) {
    // Return null or a fallback element if running on the server
    return null;
  }

  const gradientX = (mousePosition.x / window.innerWidth) * 100;
  const gradientY = (mousePosition.y / window.innerHeight) * 100;

  return (
    // <div className="h-[50rem] w-full bg-black bg-grid-white/[0.2] relative flex items-center justify-center">
    //   {/* Radial gradient for the container to give a faded look */}
    //   <div
    //     className="absolute pointer-events-none inset-0"
    //     style={{
    //       background: `radial-gradient(circle at ${gradientX}% ${gradientY}%, #56BD8F 0%, #000 100%)`,
    //     }}
    //   ></div>
    // </div>
    <div
      className="h-full w-full"
      style={{
        zIndex: -1,
        position: "fixed",
        background: `radial-gradient(circle at ${gradientX}% ${gradientY}%, #56BD8F 0%, #000 100%)`,
      }}
    >
      <div className="h-full w-full  bg-grid-white/[0.2] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
    </div>
  );
}
