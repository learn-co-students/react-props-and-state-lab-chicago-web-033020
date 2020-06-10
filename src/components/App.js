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

  onFindPetsClick = () => {
    let url = '/api/pets'
    let route = ''
    this.state.filters.type === 'all' ? route = '' : route = `?type=${this.state.filters.type}`
    fetch(`/api/pets${route}`)
      .then(res => res.json())
      .then(data => this.setState({
        pets: data
      }))
  }

  onAdoptPet = (adoptedPetId) => {
    const updatedPets = this.state.pets.map(pet => {
      if (pet.id === adoptedPetId){
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
  }

  onChangeType=(e)=>{
    this.setState({
      filters: {
        type: e.target.value
      }
    })
    console.log(this.state)
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


// 1.  The app's initial state is already defined. App has two children: the
//     `<Filters />` and `<PetBrowser />` components.

// 2. App should pass a **callback** prop, `onChangeType`, to `<Filters />`. This
//    callback needs to update `<App />`'s `state.filters.type`

// 3. `<Filters />` needs a **callback** prop, `onFindPetsClick`. When the
//    `<Filters />` component calls `onFindPetsClick`, `<App />` should fetch a
//    list of pets using `fetch()`.

//   - Assuming your app is up and running, you can make a fetch to this exact URL:
//     `/api/pets` with an **optional query parameter** to get your data.
//   - Use `App`'s state.filters to control/update this parameter
//   - If the `type` is `'all'`, send a request to `/api/pets`
//   - If the `type` is `'cat'`, send a request to `/api/pets?type=cat`. Do the
//     same thing for `dog` and `micropig`.
//   - The pet data received will include information on individual pets and their
//     adoption status.
