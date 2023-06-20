import Image from "next/image";
import Link from "next/link";

const MOCKUP_POPULAR = [
  {
    name: "Kiaušinių, pomidorų ir saulėgrąžų daigų salotos",
    id: "cli08brwk002a8zr76krs4tr0",
    imageUrl: "/salotos-kiausiniai-daigai.jpg",
  },
  {
    name: "Lašiša su žalumynais ir raugintais agurkais",
    id: "cli088zxo00268zr72avxd8ge",
    imageUrl: "/lasisa-zalumynai-raug-agurkai.jpg",
  },
  {
    name: "Avižų kruopų košė su cinamonu ir kokoso drožlėmis",
    id: "cli07c3xg00028zr7x2iyknk4",
    imageUrl: "/kose-avizos-moliugas.jpg",
  },
  {
    name: "Cukinijos ir spindulinių pupuolių troškinys",
    id: "cli08m9da002e8zr7xem0usmk",
    imageUrl: "/troskinys-cukinijos-spind-pupuoles.jpg",
  },
  {
    name: "Cukinijos lazanija su kalakutiena ir sūriu",
    id: "cli099hxb003c8zr7zzllg38e",
    imageUrl: "/cukinijos-lazanija.jpg",
  },
  {
    name: "Lęšių troškinys su pomidorais",
    id: "cli092x0500348zr7utrtbpd7",
    imageUrl: "/troskinys-lesiai-pomidorai.jpg",
  },
  {
    name: "Vištienos vėrinukai su pomidorais ir sojos padažu",
    id: "cli08opd5002i8zr7tcjs8w5y",
    imageUrl: "/vistiena-verinukai.jpg",
  },
  {
    name: "Baklažanų ir varškės suktinukai su kalendra",
    id: "cli09c7tb003g8zr7wizoq2g1",
    imageUrl: "/baklazanai-varske.jpg",
  },
  {
    name: "Avinžirniai su brokoliais",
    id: "cli0869x000228zr78q7lsa9q",
    imageUrl: "/avinzirniai-brokoliai.jpg",
  },
];

export default function Popular() {
  return (
    <section
      id="popular"
      className="mx-auto max-w-7xl scroll-mt-20 bg-transparent px-4 pb-32 sm:px-6 lg:px-8 lg:pb-40"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-5xl">
          Populiariausi receptai
        </h2>
        <p className="mt-6 text-lg leading-8 text-stone-600">
          Rinkitės iš mūsų vartotojų labiausiai pamėgtų ir dažniausiai gaminamų
          patiekalų!
        </p>

        <div className="mt-14 flex max-w-lg flex-wrap place-content-center place-items-center gap-4 px-2 sm:gap-8 lg:max-w-4xl lg:gap-x-14 lg:gap-y-10">
          {MOCKUP_POPULAR.map((meal, i) => (
            <Link
              key={meal.name}
              href={`/recipes/${meal.id}`}
              className="overflow-hidden rounded-3xl shadow-md transition-shadow duration-300 hover:shadow-2xl"
            >
              <Image
                src={meal.imageUrl}
                alt={meal.name}
                width={150}
                height={100}
                className={`h-16 w-16 sm:h-24 sm:w-24 object-cover transition-transform duration-300 hover:scale-110 ${
                  i % 2 === 0 ? "h-20 w-20 sm:h-32 sm:w-32" : ""
                }`}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
