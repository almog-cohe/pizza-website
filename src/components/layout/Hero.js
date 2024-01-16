import Image from "next/image";
import Right from "../icons/Right";

function Hero() {
  return (
    <section className="hero mt-4">
      <div className="py-12">
        <h1 className="text-4xl font-semibold">
          Everything
          <br />
          is better
          <br />
          with a <span className="text-primary">Pizza</span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam rem
          culpa corrupti, dolorum quidem excepturi quia.
        </p>
        <div className="flex gap-4 text-sm">
          <button className="flex justify-center items-center gap-2 bg-primary text-white px-4 py-2 rounded-full">
            ORDER NOW
            <Right />
          </button>
          <button className="items-center justify-center rounded-lg flex gap-2 py-2 text-gray-600 font-semibold">
            Learn more
            <Right />
          </button>
        </div>
      </div>
      <div className="relative">
        <Image
          src={"/pizza.png"}
          alt={"pizza"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          // sizes="100vw"
          priority={true}
          style={{
            objectFit: "contain",
          }}
        />
      </div>
    </section>
  );
}
export default Hero;
