import {render} from 'react-dom';
import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router';

class PokemonDetails extends Component{
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      pokemon: null,
      errors: null
    }
  }
  componentDidMount() {
    this.setState({
      loading: true
    });

    fetch(`http://pokeapi.co/api/v2/pokemon/${this.props.params.id}`)
      .then(res => res.json())
      .then(pokemon => this.setState({
        loading: false,
        pokemon: pokemon
      }))
      .catch(errors => this.setState({
        loading: false,
        errors: errors
      }))
  }
  render(){
    const {loading, pokemon, errors} = this.state;
    if (loading || !pokemon) {
      return (
        <p className="pokemon--loading"> Loading ...</p>
      )
    }
    const styles = {
      'textTransform': 'capitalize'
    }
    return (
      <div className="pokemon--details">
        <Link className="back--to--list" to="/pokemon">Back to the list</Link>
        <Link className="link--to--next" to={`/pokemon/${parseInt(this.props.params.id)+1}`}>Next</Link>
        <Link className="link--to--prev" to={`/pokemon/${parseInt(this.props.params.id)-1}`}>Prev</Link>
        <div className="pokemon--details--sprite">
          <img src={`/public/spriteshq/${this.props.params.id}.png`} />
        </div>
        <table style={styles}>
          <tbody><tr><td>Name</td><td>{pokemon.name}</td></tr></tbody>
          <tbody><tr><td>Type</td><td>{pokemon.types[0].type.name}</td></tr></tbody>
          <tbody><tr><td>Base experience</td><td>{pokemon.base_experience}</td></tr></tbody>
          <tbody><tr><td>Weight</td><td>{pokemon.weight/10}kg</td></tr></tbody>
          <tbody><tr><td>Height</td><td>{pokemon.height*10}cm</td></tr></tbody>
        </table>
      </div>
    )
  }
}

//The Pokemon component will show an individual pokemon monster
// It shows an image of the pokemon and
// shows the name of it as well.
class Pokemon extends Component{
  render(){
    const {pokemon,id} = this.props;
    const styles = {
      'textTransform': 'capitalize'
    }
    return (
      <div className="pokemon--species">
        <div className="pokemon--species--container">
          <Link to={`/pokemon/${id}`}>
            <div className="pokemon--species--name" style={styles}>{`${id}. ${pokemon.name}`}</div>
            <div className="pokemon--species--sprite">
              <img src={`/public/sprites/${id}.png`} />
            </div>
          </Link>
        </div>
      </div>
    )
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
  componentDidMount(){
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
      return <div className="pokemon--species--list">{species.map((pokemon,index)=><Pokemon key={pokemon.name} id={index+1} pokemon={pokemon}/>)}</div>;
    }else if(loading && !fetched){
        return <p className="pokemon--loading"> Loading ...</p>;
    }
    else{
      return <div/>;
    }
    return (
      <div>
        {content}
      </div>
    )
  }
}


//This is the root component
class PokeApp extends Component{
  render(){
    return (
      <div className="pokeapp">
        <h1> Complete I-VI gen. PokeDex! (Including Mega)</h1>
        {this.props.children}
      </div>
    )
  }
}

render((
  <Router history={hashHistory}>
    <Route path="/" component={PokeApp}>
      <IndexRoute component={PokemonList} />
      <Route path="/pokemon" component={PokemonList} />
      <Route path="/pokemon/:id" component={PokemonDetails}/>
    </Route>
  </Router>
),document.getElementById('app'))
