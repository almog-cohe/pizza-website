import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";



export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <SectionHeaders subHeader={"OUR STORY"} mainHeader={"About us"} />
        <div className="max-w-md mx-auto mt-4 text-gray-500 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
            voluptatibus. Corporis alias tempora, mollitia voluptate itaque
            sapiente? Dignissimos numquam corporis illo vitae reiciendis, vero
            optio, quam itaque maiores officiis officia.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
            temporibus iusto. Cumque error cum hic earum dicta autem voluptates
            id!
          </p>
        </div>
      </section>
      <section className="text-center my-8">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={"Contact us"}
        />
        <div className="my-8">
          <a className="text-4xl text-gray-600 underline" href="tel:050-5050505">
            050-5050505
          </a>
        </div>
      </section>
    </>
  );
}
