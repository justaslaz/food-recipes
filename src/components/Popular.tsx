import Link from 'next/link';
import mockupPhoto from '../../public/plate-food.jpg';
import Image from 'next/image';

// TODO data should come from DB
const MOCKUP_POPULAR = [
  { name: 'Chicken Salad', href: '/', imageUrl: mockupPhoto },
  { name: 'Chicken Salad2', href: '/', imageUrl: mockupPhoto },
  { name: 'Chicken Salad3', href: '/', imageUrl: mockupPhoto },
  { name: 'Chicken Salad4', href: '/', imageUrl: mockupPhoto },
  { name: 'Chicken Salad5', href: '/', imageUrl: mockupPhoto },
  { name: 'Chicken Salad6', href: '/', imageUrl: mockupPhoto },
  { name: 'Chicken Salad7', href: '/', imageUrl: mockupPhoto },
  { name: 'Chicken Salad8', href: '/', imageUrl: mockupPhoto },
  { name: 'Chicken Salad9', href: '/', imageUrl: mockupPhoto },
];

export default function Popular() {
  return (
    <section className="mx-auto max-w-7xl bg-transparent px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-5xl">
          Populiariausi receptai
        </h2>
        <p className="mt-6 text-lg leading-8 text-stone-600">
          Rinkitės iš mūsų vartotojų labiausiai pamėgtų ir dažniausiai gaminamų
          patiekalų!
        </p>

        <div className="mt-14 flex max-w-lg flex-wrap place-content-center place-items-center gap-8 px-4 lg:max-w-4xl lg:gap-x-14 lg:gap-y-10">
          {MOCKUP_POPULAR.map((meal, i) => (
            // TODO add href
            <Link
              key={meal.name}
              href={meal.href}
              className="overflow-hidden rounded-3xl shadow-md transition-shadow hover:shadow-2xl"
            >
              <Image
                src={meal.imageUrl}
                alt={meal.name}
                className={`h-24 w-24 object-cover transition-transform hover:scale-110 ${
                  i % 2 === 0 && 'h-32 w-32'
                }`}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
