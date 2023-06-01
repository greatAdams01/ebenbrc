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

<nav className="bg-opacity-0 border-b w-full md:static md:border-none font-jost py-4 ">
            <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <a className='text-[20px] font-bold text-white' href="../">
                       Edenbrc.io
                    </a>
                    <div className="md:hidden">
                        <button className="text-slate-50 hover:text-slate-50"
                            onClick={() => setState(!state)}
                        >
                            {
                                state ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
                <div className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
                    <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                        {/* {
                            navigation.map((item, idx) => {
                                return (
                                    <li key={idx} className="text-slate-50 hover:text-orange-500">
                                        <a href={item.path} className="block">
                                            {item.title}
                                        </a>
                                    </li>
                                )
                            })
                        } */}
                            <li  className="text-slate-50 hover:text-blue-500">
                                        <a href="../" className="block">
                                           Home
                                        </a>
                                    </li>
                            {/* <li  className="text-slate-50 hover:text-orange-500">
                                        <a href="../#airdrop" className="block">
                                           Airdrop
                                        </a>
                                    </li>
                            <li  className="text-slate-50 hover:text-orange-500">
                                        <a href="../#tokenomics" className="block">
                                           Tokenomics
                                        </a>
                                    </li>
                            <li  className="text-slate-50 hover:text-orange-500" style={{color:'gray', pointerEvents:'none'}}>
                                        <a href="../earn" className="block">
                                           Earn
                                        </a>
                                    </li>
                            <li  className="text-slate-50 hover:text-orange-500" style={{color:'gray', pointerEvents:'none'}}>
                                        <a href="../shicod" className="block">
                                           Shicod
                                        </a>
                                    </li> */}
                        <span className='hidden w-px h-6 bg-gray-300 md:block'></span>
                        <div className='space-y-3 items-center gap-x-6 md:flex md:space-y-0'>

                            <li>
                                <a href="#0" onClick={connect} className="block py-3 px-4 font-medium text-center text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 active:shadow-none rounded-full shadow md:inline">
                                    {account ? shortenAddress(account) : 'Connect Wallet'}
                                </a>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>



    </div>
  )
}

export default Navbar