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
  //  console.log('onChangeType', event.target.value)
   this.setState({
     filters: {
       type: event.target.value
     }
   })
 }

 onFindPetsClick = () => {
  let url = '/api/pets'
  if (this.state.filters.type !== 'all') {
    url = `/api/pets?type=${this.state.filters.type}`
    }
   fetch(url)
   .then(resp => resp.json())
   .then(jsonData => {
     this.setState({
        pets: jsonData
     })
   }) 
 }

 onAdoptPet = (adoptedPetID) => {
   const updatedPets = this.state.pets.map(pet => {
     if (pet.id === adoptedPetID) {
       return {
         ...pet,
         isAdopted: true
       }
     } else {
       return pet
     }
   })
   this.setState({
     pets: updatedPets
   })
   // find the id of the pet that got adopted
   // update the adopted pet's isAdopted key
   // call setState with new array of pets
  console.log('adopt this pet')
 }


  render() {
    console.log(this.state.pets)
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
