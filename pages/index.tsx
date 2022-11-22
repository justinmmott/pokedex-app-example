import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Pokecard, { CardInfo } from "../ui/Pokecard";

export default function Home() {
  const BASE_URL = "https://pokeapi.co/api/v2";
  const NUM_POKEMON = 151;

  const [pokemonInfo, setPokemonInfo] = useState<CardInfo[]>([]);

  useEffect(() => {
    (async () => {
      const curr: CardInfo[] = [];
      for (let i = 1; i < NUM_POKEMON + 1; i++) {
        const data = await (await fetch(`${BASE_URL}/pokemon/${i}`)).json();

        const name: string = data.name;
        const types: string[] = data.types.map((x: any) => x.type.name);
        const sprite: string = data.sprites.front_default;
        curr.push({
          name,
          types,
          sprite,
        });
      }

      setPokemonInfo(curr);
    })();
  }, []);

  return pokemonInfo.length === 0 ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-wrap">
      {pokemonInfo.map((x) => (
        <Pokecard cardInfo={x} key={x.name} />
      ))}
    </div>
  );
}
