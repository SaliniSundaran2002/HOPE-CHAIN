import React from 'react'
import {ethers} from 'ethers'

const ConnectMetamask = () => { async function connectMetamask() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log(signer.address);
    alert(`${signer.address} is successfully logged in!`);
    
    
  }
return (

<div>
<button 
    onClick={connectMetamask} 
    className="text-white py-2 px-6 rounded-lg shadow-md bg-blue-600"
>
    Connect to Metamask
</button>
</div>

  )
}

export default ConnectMetamask