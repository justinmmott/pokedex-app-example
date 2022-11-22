import Link from "next/link";
import Image from "next/image";

export type CardInfo = {
  name: string;
  types: string[];
  sprite: string;
  moves?: string[];
  abilities?: string[];
};

const Pokecard = ({ cardInfo }: { cardInfo: CardInfo }) => {
  return (
    <Link href={`/pokemon/${cardInfo.name}`} className="flex shadow-lg p-2">
      <Image
        src={cardInfo.sprite}
        alt={"pokemon sprite"}
        width={75}
        height={75}
      />
      <div className="flex flex-col">
        <div>
          {cardInfo.name.charAt(0).toUpperCase() + cardInfo.name.slice(1)}
        </div>
        <div className="flex gap-2">
          {cardInfo.types.map((x) => (
            <div>{x.charAt(0).toUpperCase() + x.slice(1)}</div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default Pokecard;
