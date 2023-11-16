import Link from "next/link";
import { getPokemonAbilities } from "@/lib/pokeapi";

export default async function PokemonAbilityPage({
  params,
}: {
  params: { abilityRouteName: string };
}) {
  const { abilityRouteName } = params;
  let pokemonAbilityObject: any;
  try {
    pokemonAbilityObject = await getPokemonAbilities(abilityRouteName); // get the API data for pikachu
  } catch (error) {
    throw new Error("please enter a valid Ability name!");
  }
  //console.log(pokemonAbilityObject)
  const abilityname: string = pokemonAbilityObject.name;
  const abilitynameC: string = pokemonAbilityObject.names.find(
    (item: any) => item.language.name === "zh-Hant"
  ).name;
  const abilityeffect: string = pokemonAbilityObject.effect_entries.find(
    (item: any) => item.language.name === "en"
  ).effect;
  const abilityeffectC: string = pokemonAbilityObject.flavor_text_entries.find(
    (item: any) => item.language.name === "zh-Hant"
  ).flavor_text;
  return (
    <>
      <div className="font-bold text-center mx-auto text-2xl pc:text-3xl m-10">
        {abilityname}
        <br />
        {abilitynameC}
      </div>
      <div className="text-center mx-auto text-xl pc:text-xl mt-10">
        {abilityeffectC}
      </div>
      <div className="text-center mx-auto text-xl pc:text-xl mt-5 w-1/2">
        {abilityeffect}
      </div>
      <table className="border-2 text-center mx-auto text-xl pc:text-xl mt-5 w-fit">
        <caption>
        pokemons with this ability:</caption>
        <thead>
          <tr>
            <th className="border-2">Pokemon name</th>
            <th className="border-2">Hidden ability?</th>
          </tr>
        </thead>
        <tbody>
          {pokemonAbilityObject.pokemon.map(
            (pokemonAbility: any, index: number) => {
              return (
                <tr key={pokemonAbility.pokemon.name}>
                  <th className="border-2">
                    <Link href={`../pokemon/${pokemonAbility.pokemon.name}`}>
                      {pokemonAbility.pokemon.name}
                    </Link>
                  </th>
                  <th className="border-2">
                    {pokemonAbility.is_hidden ? "o" : "x"}
                  </th>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </>
  );
}
