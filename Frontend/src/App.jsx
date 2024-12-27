import React from 'react'
import { ethers } from 'ethers'
import Homepage from './pages/Homepage';
import Background from './components/Background';
import Footer from './components/Footer';
// import ABI from '../../ignition/deployments/chain-31337/artifacts/DonationModule#Donation.json'
// import address from '../../ignition/deployments/chain-31337/deployed_addresses.json'

const App = () => {
  return(
    <div>
      <Background>
      <Homepage/>
      </Background>
      <Footer/>
    </div>
  )
}


export default App