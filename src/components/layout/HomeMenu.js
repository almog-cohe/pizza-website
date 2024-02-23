"use client";

import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";

function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items")
      .then((res) => res.json())
      .then((menuItems) => {
        setBestSellers(menuItems.slice(-3));
      });
  }, []);

  return (
    <section>
      <div className="absolute left-0 right-0">
        <div className="absolute left-0 -top-[70px] text-left -z-10">
          <Image
            src={"/sallad1.png"}
            width={109}
            height={189}
            alt={"sallad"}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
        <div className="absolute -top-[100px] right-0 -z-10">
          <Image
            src={"/sallad2.png"}
            width={107}
            height={195}
            alt={"sallad"}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
      </div>
      <div className="text-center mb-4">
        <SectionHeaders
          subHeader={"CHECK OUT"}
          mainHeader={"Out Best Sellers"}
        />
      </div>
      <div className="sm:grid sm:grid-cols-3 gap-4">
        {bestSellers?.length > 0 &&
          bestSellers.map((item, index) => (
            <MenuItem key={index + 1} {...item} />
          ))}
      </div>
    </section>
  );
}
export default HomeMenu;
