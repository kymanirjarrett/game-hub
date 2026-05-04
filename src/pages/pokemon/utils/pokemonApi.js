export async function fetchRandomPokemon() {
  const id = Math.floor(Math.random() * 151) + 1;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch Pokémon #${id}: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other["official-artwork"].front_default,
  };
}
