import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Pokecard, { CardInfo } from "../../ui/Pokecard";

const PokemonPage = ({ params }: { params?: { name: string } }) => {
  const [pokemonInfo, setPokemonInfo] = useState<CardInfo | null>(null);
  const BASE_URL = "https://pokeapi.co/api/v2";
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { pokemonName } = router.query;
      console.log(pokemonName);

      const data = await (
        await fetch(`${BASE_URL}/pokemon/${pokemonName}`)
      ).json();

      console.log(data.species.url);

      const speciesData = await (await fetch(data.species.url)).json();
      const evolutionChainData = await (
        await fetch(speciesData.evolution_chain.url)
      ).json();
      console.log(evolutionChainData);

      const name: string = data.name;
      const types: string[] = data.types.map((x: any) => x.type.name);
      const sprite: string = data.sprites.front_default;
      const moves: string[] = data.moves.map((x: any) => x.move.name);
      const abilities: string[] = data.abilities.map(
        (x: any) => x.ability.name
      );

      setPokemonInfo({ name, types, sprite, moves, abilities });
    })();
  }, []);

  return !pokemonInfo ? (
    <div>Loading...</div>
  ) : (
    <Pokecard cardInfo={pokemonInfo} />
  );
};

export default PokemonPage;
