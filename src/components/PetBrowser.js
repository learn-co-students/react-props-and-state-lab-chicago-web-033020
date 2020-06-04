import React from 'react'
import Pet from './Pet'

class PetBrowser extends React.Component {
  renderPets = () => {
    return this.props.pets.map(petObj=> {
      // console.log(petObj)
      return <Pet pet={petObj} key={petObj.id} onAdoptPet = {this.props.onAdoptPet}/>
    })
  }

  render() {
    // console.log(this.props)
    return <div className="ui cards">{this.renderPets()}</div>
  }
}

export default PetBrowser
