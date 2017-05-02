import {render} from 'react-dom';
import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import { Router, Route, Link, hashHistory } from 'react-router';

class PokemonDetails extends Component{
  render(){
    const {id} = this.state;
    let content;
    return <div className="pokemon--details">
            <div className="pokemon--details--sprite">
              <img src={`/public/sprites/${id}.png`} />
            </div>
            <p>
              Name: {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </p>
          </div>
  }
}

//The Pokemon component will show an individual pokemon monster
// It shows an image of the pokemon and
// shows the name of it as well.
class Pokemon extends Component{
  render(){
    const {pokemon,id} = this.props;
    return <div className="pokemon--species">
            <div className="pokemon--species--container">
              <div className="pokemon--species--name"><ul><li><Link to={`/pokemon/${id}`}>{`${id}. ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`}</Link></li></ul></div>
              <div className="pokemon--species--sprite">
                <img src={`/public/sprites/${id}.png`} />
              </div>
            </div>
          </div>;
    }
}


//The PokemonList component shows nothing when it mounts for the first time.
//But right before it mounts on to the DOM, it makes an
//API call to fetch the first 151 pokemon from the api and
//then displays them using the Pokemon Component

class PokemonList extends Component{
  constructor(props){
    super(props);
    this.state = {
      species : [],
      fetched : false,
      loading : false,
    };
  }
  componentWillMount(){
    this.setState({
      loading : true
    });
    fetch('http://pokeapi.co/api/v2/pokemon').then(res=>res.json())
    .then(response=>{
      this.setState({
        species : response.results,
        loading : true,
        fetched : true
      });
    });
  }

  render(){
    const {fetched, loading, species} = this.state;
    let content ;
    if(fetched){
      content = <div className="pokemon--species--list">{species.map((pokemon,index)=><Pokemon key={pokemon.name} id={index+1} pokemon={pokemon}/>)}</div>;
    }else if(loading && !fetched){
        content = <p className="pokemon--loading"> Loading ...</p>;
    }
    else{
      content = <div/>;
    }
    return  <div>
      {content}
    </div>;
  }
}


//This is the root component
class PokeApp extends Component{
  render(){
    return <div className="pokeapp">
      <h1> Complete I-VI gen. PokeDex! (Including Mega)</h1>
      <PokemonList/>
    </div>;
  }
}

render((
  <Router history={hashHistory}>
    <Route path="/" component={PokeApp}>
      <Route path={`/pokemon/${id}`} component={PokemonDetails} />
    </Route>
  </Router>
),document.getElementById('app'))
