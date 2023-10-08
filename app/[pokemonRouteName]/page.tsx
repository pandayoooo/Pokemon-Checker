import {
  getPokemon,
  getPokemonChineseName,
  getPokemonName,
} from "@/lib/pokeapi";
import { PokemonImage } from "@/components/pokemon-image";
import { PokemonStat } from "@/components/pokemon-stat";
import { PokemonEv } from "@/components/pokemon-ev";
import { PokemonType } from "@/components/pokemon-type";
import {
  PokemonMoveButton,
  PokemonMoveShow,
} from "@/components/move/pokemon-move-show";
import Link from "next/link";
// localhost:3000/pikachu

function getTwoID(id: number) {
  let previousid: number;
  let nextid: number;
  if (id === 1) {
    previousid = globalThis.app.maxid;
  } else {
    previousid = id - 1;
  }
  if (id === globalThis.app.maxid) {
    nextid = 1;
  } else {
    nextid = id + 1;
  }
  return [previousid, nextid];
}
export default async function PokemonPage({
  params,
}: {
  params: { pokemonRouteName: string };
}) {
  const { pokemonRouteName } = params; // pikachu
  const pokemonObject = await getPokemon(pokemonRouteName); // get the API data for pikachu
  const pokemonid = pokemonObject.id;
  const pokemonname = pokemonObject.name;
  const [previousid, nextid] = getTwoID(pokemonid);
  const pokemonpreviousname = await getPokemonName(previousid);
  const pokemonnextname = await getPokemonName(nextid);
  const pokemonchinesename = await getPokemonChineseName(
    pokemonObject.species.url
  );
// mr-auto my-auto inline-flex flex-row
  return (
    <>
      <div
        id="pokemonRouteName"
        className="grid grid-cols-3 mt-2 text-xl"
      >
        <Link
          href={"/" + pokemonpreviousname}
          className="text-left flex flex-row my-auto mr-auto"
          key={pokemonpreviousname}
        >
          <div className="my-auto">←</div>
          <div className="my-auto">{pokemonpreviousname}</div>
        </Link>
        <Link
          href={"https://wiki.52poke.com/wiki/" + pokemonname}
          target="_blank"
          className="text-3xl font-semibold text-center mx-auto"
          key={pokemonname}
        >
          {pokemonchinesename}
          <br></br>
          {pokemonname.charAt(0).toUpperCase() + pokemonname.slice(1)}
        </Link>
        <Link
          href={"/" + pokemonnextname}
          className="text-right flex flex-row-reverse my-auto ml-auto"
          key={pokemonnextname}
        >
          <div className="my-auto">→</div>
          <div className="my-auto">{pokemonnextname}</div>
        </Link>
      </div>

      <div
        id="pokesplash"
        className="relative items-center justify-center w-[400px] h-[400px] mx-auto"
      >
        <PokemonImage
          image={pokemonObject.sprites.other["official-artwork"].front_default}
          name={pokemonname}
        />
      </div>
      <div
        id="poketype"
        className="flex justify-center content-center text-2xl mx-auto h-fit"
      >
        <PokemonType pokemonObject={pokemonObject} />
      </div>
      <div className="border mx-5 mt-4  border-gray-400"></div>

      <div className="flex text-2xl">
        <div
          id="pokestatlist"
          className="inline-flex w-1/2  mx-auto text-center justify-top flex-col border-r px-2"
        >
          <div className="mt-4">
            <PokemonStat pokemonObject={pokemonObject} />
          </div>

          <div
            id="pokeevlist"
            className="text-center justify-center border-t mt-4"
          >
            <div className="mt-4">
              <PokemonEv pokemonObject={pokemonObject} />
            </div>
          </div>
        </div>

        <div
          id="pokemovelist"
          className="inline-flex  w-1/2 text-center justify-top flex-col mx-2"
        >
          <form
            id="pokemovebutton"
            className="mt-4 mb-2 text-2xl justify-center"
          >
            <PokemonMoveButton />
          </form>
          <div id="pokemoves" className="mt-1">
            <div className="">
              <PokemonMoveShow pokemonObject={pokemonObject} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
