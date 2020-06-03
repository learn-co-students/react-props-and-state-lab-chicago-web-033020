import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  render() {
  const aPet = this.props.pets.map(pet => {
    return <Pet pet={pet} key={pet.id} onAdoptPet={this.props.onAdoptPet}/>
  })
  return <div className="ui cards">{aPet}</div>
  }
}

export default PetBrowser
