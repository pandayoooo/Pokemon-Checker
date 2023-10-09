"use client";
import Image from "next/image";

export function PokemonImage({ image, name }: { image: string; name: string }) {
  if (typeof image !== "string") {
    image = "/images/pokeball.png";
  }
  return (
    <>
      <Image
        src={image}
        alt={"Picture of " + name}
        priority
        fill
        className="brightness-0 mx-auto my-auto"
        onLoadingComplete={(image) => {
          {
            image.classList.remove("brightness-0");
            image.classList.add("animate-whosthatpokemon");
          }
        }}
      />
    </>
  );
}
