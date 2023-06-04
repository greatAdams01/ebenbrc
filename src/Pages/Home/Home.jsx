import { React, useEffect, useState } from "react";
import { message } from 'antd';
import { TextInput, Label, } from "flowbite-react";
import CountDown from "../../Components/CountDown";
import { shortenAddress } from "../../shortAddress";
import { supabase } from "../../supabase";

const Home = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [amount, setAmount] = useState(0)
  const [token, setToken] = useState(0)
  const [state, setState] = useState(false)
  const [account, setAcount] = useState('')
  const [sales, setSales] = useState([])
  const [acutalFunds, setActualFunds] = useState(0)
  const [myEden, setEden] = useState(0)
  const [fundraisers, setRaisers] = useState([])
  const [loading, setLoading] = useState(false)
  const targetDate = new Date('2023-06-08T00:00:00');

  const connect = async () => {

    try {
        let accounts = await window.unisat.requestAccounts();
        setAcount(accounts[0])
        if (accounts[0]) {
          const eden = sales.reduce((acc, currentValue) => {
            if (accounts[0] === currentValue.address) {
              return acc + parseFloat(currentValue.eden_amount)
            }
            return acc
          }, 0)
          setEden(eden)
          console.log(eden)
        }
      } catch (e) {
        console.log('connect failed');
      }
}

  const sendBTC = async (e) => {
    e.preventDefault()
    const address = 'tb1p53laztzs62hec8rftcfl4r4t56g88q34pfhp6978hntqzgvf5wds3d98t7'
    try {
      if (!account.length) {
        messageApi.open({
          type: 'error',
          content: "Connect wallet!!",
        });
        return
      }
      await window.unisat.switchNetwork('testnet')
      const satoshi = amount * 100000000;
      console.log(satoshi)
      const data = await window.unisat.sendBitcoin(address, satoshi)
      console.log(data)
      if (!data?.name) {
        // Save user address, eden_Token, btc_amount and sat
        const payload = {
          address: account,
          amount_btc: amount,
          tx_id: data,
          eden_amount: `${token}`,
          sat_amount: `${satoshi}`
        }
        let res = await supabase.from('token_sales').upsert(payload)

        if (res.status) {
          fetchSales()
        }

        console.log(res)

      }
    } catch (error) {
      console.log(error)
    }
  }

  function toSatoshi() {
    // Convert the amount to a number.
    const edenValue = 1 / 0.00000045;
    const eden = amount * edenValue;
    setToken(eden)
    return 
  }

  const fetchSales = async () => {
    setLoading(true)
    try {
      let { data, error } = await supabase
      .from('token_sales')
      .select('*')
      
      setSales(data)
      setLoading(false)
      // Add all the amount_btc
      const actualAmount = data.reduce((acc, currentValue) => acc + parseFloat(currentValue.amount_btc), 0)
      setActualFunds(actualAmount)
      const funders = []
      data.forEach((sale) => {
        if (!funders.includes(sale.address) ) {
          funders.push(sale.address)
        }
      })
      console.log(funders)
      setRaisers(funders)
      
    } catch (error) {
      console.error(error)
    }
  }


  useEffect(() => {
    fetchSales()
  }, [])

  useEffect(() => {
    toSatoshi()
  }, [amount])

  return (
    <div>
      {contextHolder}
      <nav className="bg-opacity-0 text-center border-b w-full md:static md:border-none font-jost py-4 ">
        <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <a className='text-[20px] font-bold text-white' href="../">
                Eden
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
              <li  className="text-slate-50 hover:text-green-500">
                <a href="../" className="block">
                    Home
                </a>
              </li>
              <span className='hidden w-px h-6 bg-gray-300 md:block'></span>
              <div className='space-y-3 items-center gap-x-6 md:flex md:space-y-0'>

              {
                account && (
                  <>
                    <li className=" py-3 px-4 font-medium text-white bg-green-600 hover:bg-green-500 active:bg-green-700 active:shadow-none rounded-full shadow md:inline">
                  <p className="">
                      Eden:{myEden}
                  </p>
              </li>
                  </>
                )
              }
              <li>
                  <button onClick={connect} className="block py-3 px-4 font-medium text-center text-white bg-green-600 hover:bg-green-500 active:bg-green-700 active:shadow-none rounded-full shadow md:inline">
                      {account ? shortenAddress(account) : 'Connect Wallet'}
                  </button>
              </li>
                </div>
            </ul>
          </div>
        </div>
      </nav>

      <section className="lg:w-[60%] m-auto py-20 px-5 font-semibold">
        <div className="lg:flex lg:space-x-10 text-white">
        <img className="rounded-2xl h-[300px]" src="./eden.jpg" alt="" />
        <div>
          <h1 className="font-bold pt-4 text-[25px]">Eden</h1>
          <p className="py-5">
          Eden is a groundbreaking platform that leverages Bitcoin's blockchain and utilizes the BRC 20 token standard. Eden is set to revolutionize the world of decentralized Trading by introducing a first-of-its-kind orderbook DEX on Bitcoin and an NFT marketplace for trading and showcasing NFTs.
          </p>
          <div className="flex space-x-3">
            <a href="https://twitter.com/edenbrc?t=VmEqiwXeBpvny0TwLLIEiA&s=09" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
          </svg>
            </a>

            <a href="https://t.me/edenbrc" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-telegram" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
          </svg>
            </a>
          </div>
        </div>
        </div>
      </section>
      {/* Claim */}
      <section className="  pb-20 text-green">

        <div className="bg-white p-6 lg:w-2/3 mx-5 lg:h-[500px] items-center  lg:mx-auto rounded-2xl border border-green-300">
          <CountDown targetDate={targetDate} />
          <div className="bg-white items-center rounded-2xl">
              <form className="flex flex-col gap-4 lg:w-[500px] lg:mx-auto">
                  <div>
                    <div className="mb-2 block text-left">
                      <Label
                        htmlFor="amount"
                        value="Buy Amount(BTC)"
                        className="text-green-600"
                      />
                    </div>
                    <TextInput
                      id="amount"
                      placeholder="Buy Amount"
                      required
                      onChange={(e) => setAmount(e.target.value)}
                      value={amount}
                      type="number"
                    />
                  </div>
                  <div>
                    <div className="mb-2 block text-left">
                      <Label
                        htmlFor="price"
                        value="Received token(EDEN)"
                        className="text-green-600"
                      />
                    </div>
                    <TextInput
                      id="price"
                      placeholder="EdEN token"
                      value={token}
                      disabled
                      type="number"
                    />
                  </div>
                  <button className="bg-green-600 hover:bg-green-500 py-2 rounded-lg border-0 text-white" onClick={sendBTC}>
                  Buy Token
                  </button>
                </form>
          </div>
        </div>
      </section>

      <section className=" w-[900px] mx-auto px-5">
        <p className="w-[150px] text-center py-2 rounded-full mx-auto text-white font-bold text-[20px] ">Public Sale Info</p>
        <div className="grid g lg:grid-cols-2 gap-2 mx-auto mt-5 mb-10">

          <div className="bg-white rounded-2xl py-5">
            <div className="token">
            <p >Token:</p>
            <p>Eden</p>
            </div>

          <div className="token">
          <p >1 Eden =</p>
            <p>0.00000045 BTC</p>
          </div>

          <div className="token">
            <p >Total supply:</p>
            <p>50,000,000</p>
          </div>

          <div className="token">
            <p >Total fundraising amount:</p>
            <p>22BTC</p>
          </div>


          <div className="token">
            <p >5%  =</p>
            <p>Ecosystem incentives</p>
          </div>

          <div className="token">
            <p >2%  =</p>
            <p>Team</p>
          </div>

          <div className="token">
            <p >3%  =</p>
            <p>strategic partnership</p>
          </div>

          </div>            

          <div className="bg-white rounded-2xl py-5">
            <div className="token flex-wrap">
              <p >Actual fundraising amount:</p>
              <p>{acutalFunds}</p>
            </div> 


          <div className="token">
            <p >Number of fundraisers:</p>
            <p>{fundraisers.length}</p>
          </div> 

          <div className="token">
            <p >IDO price:</p>
            <p>$0.012</p>
          </div>

          <div className="token">
            <p >Softcap =</p>
            <p>10 btc</p>
          </div>

          <div className="token">
            <p >Hardcap =</p>
            <p>22 btc</p>
          </div>

          <div className="token">
            <p >90%  =</p>
            <p>IDO allocation first come, first serve</p>
          </div>

          </div>
        </div>
      </section>

      <section className=" px-2 pb-20">
        <div className="lg:flex justify-center lg:space-x-10">

        <div className="bg-white lg:w-[400px] rounded-2xl p-5 h-[400px]">
        <h1 className="pb-2 font-bold">Eden will feature:</h1>
          <p>
          1. Orderbook DEX: Experience seamless and transparent trading with Eden's orderbook DEX. Enjoy fast, efficient, and secure transactions while benefiting from the liquidity and robustness of Bitcoin's network.
          </p>
          <p className="pt-5">
          2. NFT Marketplace: Discover, create, buy, and sell unique digital assets on Eden's dedicated NFT marketplace. Showcase your own NFT creations or explore a diverse collection of digital art, collectibles, and more.
          </p>
        </div>

        <img className="w-[400px] rounded-2xl h-[400px] mt-5 lg:mt-0" src="./tokenomics.jpg" alt="" />
        </div>
      </section>


      <footer className="flex space-x-10 pb-10 justify-center text-white">
            <a href="https://twitter.com/edenbrc?t=VmEqiwXeBpvny0TwLLIEiA&s=09" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
            </svg>
            </a>

              <a href="https://t.me/edenbrc" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-telegram" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
            </svg>
            </a>
      </footer>
    </div>
  );
};

export default Home;
