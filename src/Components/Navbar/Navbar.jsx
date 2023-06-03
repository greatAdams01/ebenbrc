import { useState, useEffect } from 'react'
import { Logo } from '../../Assets'
import { shortenAddress } from '../../shortAddress'



const Navbar = () => {
    const [account, setAcount] = useState('')

    useEffect(() => {
    // if (typeof window.unisat !== 'undefined') {
    //     console.log('UniSat Wallet is installed!');
    //     alert('UniSat Wallet is installed!')
    //     }
    }, [])

  const [state, setState] = useState(false)

  const navigation = [
    { title: "Home", path: "../" },
    { title: "Airdrop", path: "../#airdrop" },
    { title: "Tokenomics", path: "../#tokenomics" },
    { title: "Earn", path: "../earn" },
    { title: "ShiCod", path: "../shicod" },
]

const connect = async () => {

    try {
        if(account.length) {
            setAcount('')
            return
        }
        let accounts = await window.unisat.requestAccounts();
        setAcount(accounts[0])
      } catch (e) {
        console.log('connect failed');
      }
}


  return (
    <div>

    </div>
  )
}

export default Navbar