import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const pokemonAbilityUrl = "https://pokeapi.co/api/v2/ability";
  const [searchAbilityInput, setSearchAbilityInput] = useState("");
  const [searchResult, setSearchResult] = useState({});

  const handleSearchAbilityChange = (event) => {
    const value = event.target.value;
    setSearchAbilityInput(value);
  };

  const searchAbility = () => {
    axios
      .get(`${pokemonAbilityUrl}/${searchAbilityInput}`)
      .then((response) => {
        setSearchResult(response.data);
      })
      .catch((error) => {
        console.error(error);
        setSearchResult({});
      });
  };

  const getPokemonList = () => {
    if (searchResult && searchResult.pokemon) return searchResult.pokemon;
    return [];
  };

  const getPokemonName = (pokemonObj) => {
    return pokemonObj ? pokemonObj.pokemon.name : "";
  };

  const getEffectEntriesList = () => {
    if (searchResult && searchResult.effect_entries)
      return searchResult.effect_entries;
    return [];
  };

  const getFlavorTextList = () => {
    const array =
      searchResult && searchResult.flavor_text_entries
        ? searchResult.flavor_text_entries
        : [];
    const filteredArray = array.filter(
      (flavorText) => flavorText.language.name === "en"
    );

    return filteredArray;
  };

  return (
    <div className="App">
      <h4>Pokemon App</h4>
      <input
        className="input"
        placeholder="please input the ability of pokemon that you desire"
        onChange={(event) => handleSearchAbilityChange(event)}
      />
      <button type="button" className="button" onClick={searchAbility}>
        Search Ability!
      </button>

      <hr />

      <h4>Search Results</h4>
      <div>
        <h5>Pokemon List</h5>
        {getPokemonList().map((pokemonObj, index) => {
          return <p key={index}>Pokemon Name : {getPokemonName(pokemonObj)}</p>;
        })}
      </div>

      <div>
        <h5>Effect Entries List</h5>
        {getEffectEntriesList().map((effect, index) => {
          return <p key={index}>Short Effect : {effect.short_effect}</p>;
        })}
      </div>

      <div>
        <h5>Flavor Text List</h5>
        {getFlavorTextList().map((flavorText, index) => {
          return <p key={index}>{flavorText.flavor_text}</p>;
        })}
      </div>
    </div>
  );
};

export default App;
