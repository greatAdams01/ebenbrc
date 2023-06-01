import { React, useEffect, useState } from "react";
import { TextInput, Label, Button, Checkbox } from "flowbite-react";
import {
  ascendex,
  bgimage,
  bitkan,
  camelot,
  lbank,
  mexc,
  star,
  tick,
} from "../../Assets";
import { Brandsmall } from "../../Components";
import { Accordion, Timeline, Tabs, Progress } from "flowbite-react";
import Brandbig from "../../Components/Brandbig/Brandbig";
import Marquee from "react-fast-marquee";

const Home = () => {
  const [amount, setAmount] = useState(0)
  const [token, setToken] = useState(0)

  const tokenConfig = {"p":"brc-20","op":"deploy","tick":"EBEN","max":"21000000","lim":"100000"}
  const sendBTC = () => {
    window.unisat.switchNetwork('testnet')
    const address = 'tb1pr8zs2cda3n76exgkc2n2pyjw9gf8mud3mrqxhycu6mlm6tz6n5rqqw6gg2'
    try {
      const data = window.unisat.sendBitcoin(address, token)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  function toSatoshi() {
    // Convert the amount to a number.
   const value = parseFloat(amount);
  
    // Multiply the amount by 100,000,000 to convert it to satoshi.
    const satoshi = value * 100000000;
    setToken(satoshi)
    return 
  }

  useEffect(() => {
    toSatoshi()
  }, [amount])

  return (
    <div>
      {/* Landing */}
      <Marquee>
     
{/* 
<h3 className="text-white font-bold  font-righteous">ShiCod Launching on May 19th 4pm UTC</h3>
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
<h3 className="text-white font-bold  font-righteous">ShiCod Launching on May 19th 4pm UTC</h3>
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
<h3 className="text-white font-bold  font-righteous">ShiCod Launching on May 19th 4pm UTC</h3> */}

  </Marquee>
      {/* <section className="lg:mt-12 lg:mx-24 mt-12 max-w-screen-xl pb-12 px-4 items-center justify-center lg:flex md:px-8 ">

        <div className="space-y-4 flex-1 sm:text-center lg:text-left">
          <h1 className="text-white font-bold text-6xl xl:text-8xl font-righteous">
            Meet The Feel
          </h1>

          <p className="text-gray-300 max-w-xl leading-relaxed sm:mx-auto lg:ml-0 ">
          A Lifestyle powered by SHIBAI & SHICOD, created by AI for our meme-tastic community.
          </p>

          <div className="flex flex-col gap-x-12 items-center lg:items-start">
            <Brandsmall imgUrl={star} brand="Zero FUD" />
            <Brandsmall imgUrl={star} brand="100% Community Owned" />
            <Brandsmall imgUrl={star} brand="Zero FUGAZI" />
          </div>
        </div>
        <div className="flex-1 text-center mt-7 lg:mt-0 lg:ml-3">
          <img
            src={bgimage}
            className=" mx-auto sm:w-6/12  lg:w-2/3 md:w-4/12"
            alt="aishiba"
          />
        </div>
      </section> */}

      {/* Claim */}
      <section className="h-[100vh] text-white">
        <div className="w-[50%]  mx-auto mt-6">
          <form className="flex flex-col gap-4">
              <div>
                <div className="mb-2 block text-left">
                  <Label
                    htmlFor="amount"
                    value="Buy Amount(BTC)"
                    className="text-white"
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
                    value="Received token"
                    className="text-white"
                  />
                </div>
                <TextInput
                  id="price"
                  placeholder="EBEN token"
                  value={token}
                  disabled
                  type="number"
                />
              </div>
              <Button onClick={sendBTC}>
                Buy Token
              </Button>
            </form>
        </div>
      </section>

      {/* Perks */}
      {/* <section className="lg:mt-12 lg:mx-24 mt-12 py-14 pb-12 px-4 md:px-8">
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
          <div className="relative max-w-xl mx-auto sm:text-center">
            <h2 className="text-slate-50 text-4xl font-semibold sm:text-6xl font-righteous">
              Perks
            </h2>
          </div>

          <div className="mt-16 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-4 font-jost">
            {plans.map((item, idx) => (
              <div
                key={idx}
                className="relative flex-1 flex items-stretch flex-col rounded-xl border border-orange-500 sm:mt-0 mt-10 bg-gradient-to-b from-blue-900 to-neutral-950"
              >
                <div className="p-8 space-y-4">
                  <h3 className="text-orange-500 font-righteous text-xl pb-4">
                    {item.name}
                  </h3>

                  <p className="text-slate-50">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/*Tokenomics*/}
      {/* <section
        className="lg:mt-12 lg:mx-24 mt-12 py-14 pb-12 px-4 md:px-8"
        id="tokenomics"
      >
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
          <div className="relative max-w-xl mx-auto sm:text-center">
            <h2 className="text-slate-50 text-4xl font-semibold sm:text-6xl font-righteous">
              Tokenomics
            </h2>
          </div>

          <div className="font-jost max-w-screen-xl mx-auto text-slate-50 m-12 p-4 lg:w-6/12 rounded-2xl border border-orange-500 bg-gradient-to-b from-blue-900 to-neutral-950">
            <p className="mt-2 text-slate-50">
              SHIBAI is the fundamental token within the AiShiba ecosystem. It
              possesses powerful deflationary attributes and offers users the
              opportunity to generate passive income via staking, thereby
              establishing enduring value for the token.
            </p>
            <br></br>

            <p className="mt-2 font-bold text-xl text-orange-500">
              Total Supply : 210,000,000,000,000,000 tokens<br></br>
              <br></br>
              Token Symbol : $SHIBAI<br></br>
              <br></br>
              Token Allocation :<br></br>
              90% distributed as airdrop to eligible wallets<br></br>
              10% DEX Liquidity and CEX Listing<br></br>
              <br></br>
            </p>

            <p className="mt-2 text-slate-50">
              Our tokenomics and airdrop eligibility criteria is fully explained
              in our
              <a
                href="https://aishiba.gitbook.io/aishiba-1/overview/our-mission"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:underline dark:text-orange-600"
              >
                whitepaper
              </a>
            </p>
          </div>
          <div className="font-jost max-w-screen-xl mx-auto text-slate-50 m-12 p-4 lg:w-6/12 rounded-2xl border border-orange-500 bg-gradient-to-b from-blue-900 to-neutral-950">
            <p className="mt-2 text-slate-50">
            SHICOD is the fundamental principle that directs the operations of AiShiba.
            </p>
            <br></br>

            <p className="mt-2 font-bold text-xl text-orange-500">
              Total Supply : 210,000,000 tokens<br></br>
              <br></br>
              Token Symbol : $SHICOD<br></br>
              <br></br>
              Initial Circulating Supply: 42,000,000 SHICOD
            </p>

            <p className="mt-2 text-slate-50">
              Our tokenomics and airdrop eligibility criteria is fully explained
              in our
              <a
                href="https://aishiba.gitbook.io/aishiba-1/overview/our-mission"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:underline dark:text-orange-600"
              >
                whitepaper
              </a>
            </p>
          </div>
        </div>
      </section> */}

      {/*Roadmap*/}
      {/* <section className="lg:mt-12 lg:mx-24 mt-12 py-14 pb-12 px-4 md:px-8">
        <div className="max-w-screen-xl mx-auto px-4 text-slate-50 md:px-8">
          <div className="relative max-w-xl mx-auto sm:text-center">
            <h2 className="text-slate-50 text-4xl font-semibold sm:text-6xl font-righteous">
              Roadmap
            </h2>
          </div>

          <Timeline className="m-4 xl:m-12 xl:p-12">
            <Timeline.Item className="text-left">
              <Timeline.Point />
              <Timeline.Content>
                <Timeline.Time className="text-slate-50 font-jost"></Timeline.Time>
                <Timeline.Title className="text-orange-500 font-righteous font-normal text-2xl xl:text-4xl p-1">
                  Phase 1: Pre-Launch
                </Timeline.Title>
                <Timeline.Body className="text-slate-50 font-jost">
                  <ul className="list-disc">
                    <li>
                      Conduct market research to determine the demand for a new
                      memecoin project.
                    </li>
                    <li>
                      Develop a comprehensive whitepaper that outlines the
                      project’s goals, features, and roadmap.
                    </li>
                    <li>
                      Build a team of developers, marketers, and community
                      managers to help execute the project.
                    </li>
                    <li>
                      Launch website and social media channels to start building
                      a community and generating buzz.
                    </li>
                  </ul>
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>

            <Timeline.Item className="text-left">
              <Timeline.Point />
              <Timeline.Content>
                <Timeline.Time className="text-slate-50 font-jost"></Timeline.Time>
                <Timeline.Title className="text-orange-500 font-righteous font-normal text-2xl xl:text-4xl p-1">
                  Phase 2: Token Creation and Distribution
                </Timeline.Title>
                <Timeline.Body className="text-slate-50 font-jost">
                  <ul className="list-disc">
                    <li>Launch the AiShiba OG NFT Collection.</li>
                    <li>
                      Launch the token on a decentralized exchange (DEX)
                      platform, such as Uniswap or Camelot Dex.
                    </li>
                    <li>
                      Set a total supply for the token and decide on an initial
                      distribution strategy for airdrops and work with auditors
                      to ensure the token’s code is secure and free from
                      vulnerabilities.
                    </li>
                  </ul>
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>

            <Timeline.Item className="text-left">
              <Timeline.Point />
              <Timeline.Content>
                <Timeline.Time className="text-slate-50 font-jost"></Timeline.Time>
                <Timeline.Title className="text-orange-500 font-righteous font-normal text-2xl xl:text-4xl p-1">
                  Phase 3: Initial Exchange Listing
                </Timeline.Title>
                <Timeline.Body className="text-slate-50 font-jost">
                  <ul className="list-disc">
                    <li>
                      Apply for AiShiba listing on major centralized exchanges
                      (CEX) such as Mexc, Binance, Coinbase, or Kraken.
                    </li>
                    <li>
                      Engage in marketing efforts to increase the token’s
                      visibility and attract investors.
                    </li>
                    <li>Coingecko and CoinMarket listings.</li>
                  </ul>
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>

            <Timeline.Item className="text-left">
              <Timeline.Point />
              <Timeline.Content>
                <Timeline.Time className="text-slate-50 font-jost"></Timeline.Time>
                <Timeline.Title className="text-orange-500 font-righteous font-normal text-2xl xl:text-4xl p-1">
                  Phase 4: Community Building and Growth
                </Timeline.Title>
                <Timeline.Body className="text-slate-50 font-jost">
                  <ul className="list-disc">
                    <li>
                      Launch a community forum and engage with Aishiba Arb token
                      holders to gather feedback and improve the project.
                    </li>
                    <li>
                      Host events and promotions to incentivize people to hold
                      and use the token, such as contests or giveaways.
                    </li>
                    <li>
                      Build partnerships with other projects and influencers to
                      expand Aishiba Arb’s reach.
                    </li>
                  </ul>
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>

            <Timeline.Item className="text-left">
              <Timeline.Point />
              <Timeline.Content>
                <Timeline.Time className="text-slate-50 font-jost"></Timeline.Time>
                <Timeline.Title className="text-orange-500 font-righteous font-normal text-2xl xl:text-4xl p-1">
                  Phase 5: Project Expansion
                </Timeline.Title>
                <Timeline.Body className="text-slate-50 font-jost">
                  <ul className="list-disc">
                    <li>
                      Launch additional features, such as staking or yield
                      farming, to provide additional benefits to Aishiba Arb
                      token holders.
                    </li>
                    <li>
                      Develop a mobile wallet or other tools to make it easier
                      for people to use and hold the token.
                    </li>
                    <li>
                      Explore opportunities to integrate Aishiba Arb into other
                      blockchain ecosystems, such as DeFi protocols or NFT
                      marketplaces.
                    </li>
                  </ul>
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>

            <Timeline.Item className="text-left">
              <Timeline.Point />
              <Timeline.Content>
                <Timeline.Time className="text-slate-50 font-jost"></Timeline.Time>
                <Timeline.Title className="text-orange-500 font-righteous font-normal text-2xl xl:text-4xl p-1">
                  Phase 6: Long-Term Sustainability
                </Timeline.Title>
                <Timeline.Body className="text-slate-50 font-jost">
                  <ul className="list-disc">
                    <li>
                      Continue to build and engage with the Aishiba Arb
                      community to ensure the project’s longevity.
                    </li>
                    <li>
                      Explore options for governance and decentralization to
                      make the project more community-driven and sustainable
                      over the long term.
                    </li>
                    <li>
                      Work with regulators and compliance experts to ensure that
                      Aishiba Arb remains compliant with applicable laws and
                      regulations.
                    </li>
                  </ul>
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        </div>
      </section> */}

      {/*F.A.Qs*/}
      {/* <section className="lg:mt-12 lg:mx-24 mt-12 py-14 pb-12 px-4 md:px-8">
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
          <div className="relative max-w-xl mx-auto sm:text-center">
            <h2 className="text-slate-50 text-4xl font-semibold sm:text-6xl font-righteous">
              F.A.Qs
            </h2>
          </div>

          <Accordion className="p-4 xl:p-12  my-12 xl:m-12 border-orange-500 bg-gradient-to-b from-blue-900 to-neutral-950">
            <Accordion.Panel>
              <Accordion.Title className="text-slate-50 focus:text-orange-500 hover:text-orange-500 font-jost">
                What is AiShiba?
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-slate-50 dark:text-orange-500 font-jost">
                  An AI protocol which is the product of a group of AI
                  algorithms who are passionate about Arbitrum and hope to
                  create a powerful series of products with AI+Web3+DeFi.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title className="text-slate-50 focus:text-orange-500 hover:text-orange-500 font-jost">
                How do I claim the $SHIBAI airdrop?
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-slate-50 dark:text-orange-500 font-jost">
                  1. Connect your wallet<br></br>
                  2. Check if you are eligible<br></br>
                  3. Claim your free tokens
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title className="text-slate-50 focus:text-orange-500 hover:text-orange-500 font-jost">
                What is SHIBAI tokenomics?
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-slate-50 dark:text-orange-500 font-jost">
                  Check our
                  <a
                    href="https://aishiba.gitbook.io/aishiba-1/overview/our-mission"
                    className="text-orange-500 hover:underline dark:text-orange-600"
                  >
                    Whitepaper
                  </a>
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title className="text-slate-50 focus:text-orange-500 hover:text-orange-500 font-jost">
                Will there be more NFTs in the future?
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-slate-50 dark:text-orange-500 font-jost">
                  A series of NFTs will be launched in the future for adopters,
                  AI peripheral product development, and more.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title className="text-slate-50 focus:text-orange-500 hover:text-orange-500 font-jost">
                Where can I trade $SHIBAI?
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-slate-50 dark:text-orange-500 font-jost">
                  SHIBAI already trading on MEXC, LBANK , CAMELOT DEX, BITKAN &
                  ASCENDEX. Stay tuned for more exchange listings.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
    
          </Accordion>
        </div>
      </section> */}

      {/*Exchanges*/}
      {/* <section className="lg:mt-12 lg:mx-24 mt-12 py-14 pb-12 px-4 md:px-8">
        <div className="max-w-screen-xl mx-auto px-4  md:px-8">
          <div className=" mx-auto text-center">
            <h2 className="text-slate-50 text-4xl sm:text-6xl font-righteous">
              Exchanges
            </h2>
          </div>
          <p className="leading-relaxed mt-2 text-[15px] text-slate-50">
            You can trade you $SHIBAI on these exchanges
          </p>

          <div className="flex flex-wrap gap-x-12 items-center justify-center m-4 ">
            <a
              href="https://app.camelot.exchange/?token2=0xfa296fca3c7dba4a92a42ec0b5e2138da3b29050"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Brandbig imgUrl={camelot} brand="" />
            </a>
            <a
              href="https://m.mexc.com/trade/spot-kline#SHIBAI_USDT"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Brandbig imgUrl={mexc} brand="" />
            </a>
            <a
              href="https://www.lbank.info/exchange/shibai/usdt/#alts"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Brandbig imgUrl={lbank} brand="" />
            </a>
            <a
              href="https://bitkan.com/trade/SHIBAI-USDT"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Brandbig imgUrl={bitkan} brand="" />
            </a>
            <a
              href="https://m.ascendex.com/en/cashtrade-spottrading/usd/shibai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Brandbig imgUrl={ascendex} brand="" />
            </a>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Home;
