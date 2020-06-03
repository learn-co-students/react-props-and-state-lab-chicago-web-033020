import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all",
      },
    };
  }

  handleChangeType = (event) => {
    // console.log(event.target.value)
    const petType = event.target.value;
    this.setState({
      filters: {
        type: petType,
      },
    });
  };

  handleFetchPets = () => {
    // console.log("hi")
    let endpoint = "/api/pets";
    if (this.state.filters.type !== "all") {
      endpoint += `?type=${this.state.filters.type}`;
    }
    // console.log(endpoint)
    fetch(endpoint)
      .then((resp) => resp.json())
      .then((pets) =>
        this.setState({
          pets: pets
        })
      );
  };

  handleAdoptPet = (adoptedPetId) => {
    // find id of pet that just got adopted
    // update adopted pet's isAdopted key
    // call setState with the new array of pets
    const updatedPets = this.state.pets.map(pet => {
      if (pet.id === adoptedPetId) {
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
                onChangeType={this.handleChangeType}
                onFindPetsClick={this.handleFetchPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.handleAdoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
