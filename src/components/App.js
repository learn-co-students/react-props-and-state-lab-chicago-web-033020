import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
    this.setState({
      filters: {
        // ...this.state.filters, 
        type: event.target.value
      }
    })
  }

  onAdoptPet = (petId) => {
    let allPets = this.state.pets.map(aPet => {
      if (aPet.id === petId){
        return {...aPet, isAdopted: true}
      } else {
        return aPet
      }
    })
  
    this.setState({ pets: allPets })

  }

  onFindPetsClick = () => {
    let petURL = '/api/pets'

    if (this.state.filters.type !== 'all'){
      petURL += `?type=${this.state.filters.type}`
    } 
    fetch(petURL)
    .then(resp => resp.json())
    .then(pets => this.setState({pets: pets})) 
  }
  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
              onChangeType={this.onChangeType}
              onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser 
              onAdoptPet={this.onAdoptPet}
              pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
