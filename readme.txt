The app is created using React, JSX expressions and ES6, Babel syntax that are together converted by Webpack into ES5.

The app which all components are in index.js first creates a PokeApp component that is permanent. By using react-router we are further generating content through PokemonList or PokemonDetails components depending on the url without reloading the page. When it comes to PokemonDetails we are passing :id for each pokemon's details to be generated as if it's on a separate site, we're also using here higher resolution sprites available in /public/spriteshq/ directory. PokemonList generates every single pokemon available in Pokeapi.co/V2 by mapping each of the pokemon entry in pokeapi/v2 and assigning it to Pokemon component. We're using low resolution sprites here to minimize the load.

We are able to go to previous or next pokemon from our pokedex list while being in each pokemon's details page, by pressing a Link with a path to previous/next id and re-fetching details from pokeapi by using componentDidUpdate function that triggers componentDidMount with all the fetch logic.

Styles are built with media queries by assigning mobile styles and less content in a row if horizontal resolution is under 1100px as the default and then displaying more items horizontally, when the browser detects higher resolutions on desktop devices.

**!!**WARNING**!!** The Pokeapi.co has difficulties giving details of pokemons after 7th generation (pokemon id from 722 to 811), that is the MEGA species of pokemons even though it provides some resources for them, f.e. we can map them in PokemonList along with their names, but can't fetch those any information when trying to asking for more specifics as presented in PokemonDetails table. Even on the pokeapi.co website their own script doesn't output info about those pokemons. All non-MEGA species of pokemons (pokemon id from 1 to 721) are not affected and work properly.


**!!**WARNING**!!** When deploying from WIndows environment add "node ./" at the beginning of "start" value inside package.json, so that the complete value will look like this: "node ./node_modules/webpack-dev-server/bin/webpack-dev-server.js" instead of original "node_modules/webpack-dev-server/bin/webpack-dev-server.js". These changes are not necessary on Unix/Mac systems.
