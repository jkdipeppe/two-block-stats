// import './BtcSpotPrices.css';
// import React, { Component } from 'react';
// import { Grid, Divider } from 'semantic-ui-react'
// const googleTrends = require('google-trends-api');
// // import puppeteer from 'puppeteer';

//  // npm install crypto
//  let crypto = require('crypto');
//  // npm install request
//  let request = require('request');
//   // Set these in your ENVironment, or enter them here with the actual string
//   var apiKey = '3qen9svietl';
//   var apiSecret = 'VWVZdEQMPRkRIgWkjWBK+YECOTrpjZYQDiv5/sxmNzjOTSY/GLWgVPYHSop6Q24lGbazRjO5b8LhGyHiQFrgAQ==';

// class BtcSpotPrices extends Component {

//   constructor(props) {
//     super(props);
//     this.state = { 
//       binancePrice: 0,
//       coinbaseProPrice: 0,
//       bitfinexPrice: 0,
//       okexPrice: 0,
//       krakenPrice: 0,
//       marketCap: '1,000,600,654,049',
//       currentSupply: '18,536,987',
//       Volume: '23,450',
//       priceChange: 15.6,
//       deribitRate: 2.5,
//       ftxRate: 1.4,
//       okexRate: 1.8,
//       binanceRate: 1.96,
//       apeFloorPrice: 0,
//       apeAveragePrice: 0,
//       totalApesForSale: 0
//      };
//   }

//   async componentDidMount () {
//     //coinbase
//     const coinbaseRequest = await fetch('https://api.pro.coinbase.com/products/BTC-USD/book');
//     const coinbaseBid = await this.getCoinbaseBestBid();
//     //kraken
//     let krakenData 
//     await fetch('https://api.kraken.com/0/public/Ticker?pair=xbtusd')
//     .then(resp => resp.json())
//     .then((myData) => {
//       krakenData = myData.result.XXBTZUSD.a[0].slice(0, -3)
//     })
//     // binance
//     let binanceData
//     await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT')
//     .then(resp => resp.json())
//     .then((myData) => {
//       binanceData = myData.price.slice(0, -6)
//     })
//     console.log(binanceData)

  

    
//     // googleTrends.interestOverTime({keyword: 'Valentines Day'})
//     // .then((res) => {
//     //   console.log('this is res', res);
//     // })
//     // .catch((err) => {
//     //   console.log('got the error', err);
//     //   console.log('error message', err.message);
//     //   console.log('request body',  err.requestBody);
//     // });

//     // FundingRates
//     // const bitmexfundingArray = await fetch('https://www.bitmex.com/api/v1/funding?symbol=xbt&startTime=2021-03-12');
//     // const recentBitmexFunding = bitmexfundingArray[-1].fundingRate
//     // console.log(recentBitmexFunding)
//     // let deribitfundingArray
//     // fetch('https://deribit.com/api/v2/public/get_funding_rate_value?end_timestamp=1607348925000&instrument_name=BTC-PERPETUAL&start_timestamp=1569974400000')
//     // .then(resp => {console.log(resp)})
//     // console.log(deribitfundingArray);
//     // };
//     // const stockTweetSentiment = await this.getStockTweetBTCSentiment();
//     // console.log('stock tweeet sentiment', stockTweetSentiment);
//     this.setState({
//       coinbaseProPrice: coinbaseBid.price,
//       krakenPrice: krakenData,
//       binancePrice: binanceData
//     })
//   }

//   // async getStockTweetBTCSentiment() {
//   //   let btcPage;
//   //   try{
//   //     const puppeteer = require('puppeteer');

//   //       const browser = await puppeteer.launch();
//   //       const page = await browser.newPage();
//   //       btcPage = await page.goto('http://stocktwits.com/symbol/btc.x');
//   //       await browser.close();
//   //       return btcPage;


//   //   } catch (err) {
//   //     console.log(err)
//   //   }
//   // }

//    async getCoinbaseBestBid() {
//     const CoinbasePro = require('coinbase-pro');
//     const publicClient = new CoinbasePro.PublicClient();
//     let coinbaseData = {}
//     await yourFunction();
//     async function yourFunction() {
//       try {
//         const products = await publicClient.getProductTicker('BTC-USD');
//         coinbaseData = products
//       } catch (error) {
//         /* ... */
//       }
//     }
//     return coinbaseData
//     // var Client = require('coinbase').Client;
//     // var client = new Client({'apiKey': 'API KEY',
//     //                         'apiSecret': 'API SECRET'});

//     // client.getBuyPrice({'currencyPair': 'BTC-USD'}, (err, resp, data) => {
//     //   console.log(resp);
//     //   console.log(data);
//     // });
//     // return response;
//     // console.log('response', response)
//     // //get unix time in seconds
//     // let timestamp = Math.floor(Date.now() / 1000);

//     // // set the parameter for the request message
//     // var req = {
//     //     method: 'GET',
//     //     path: 'products/BTC-USD/book',
//     //     body: '',
//     // };

//     // var message = timestamp + req.method + req.path + req.body;
//     // console.log(message);

//     // //create a hexedecimal encoded SHA256 signature of the message
//     // var signature = crypto.createHmac("sha256", apiSecret).update(message).digest("hex");

//     // //create the request options object
//     // var options = {
//     //     baseUrl: 'https://api.coinbase.com/',
//     //     url: req.path,
//     //     method: req.method,
//     //     headers: {
//     //         'CB-ACCESS-SIGN': signature,
//     //         'CB-ACCESS-TIMESTAMP': timestamp,
//     //         'CB-ACCESS-KEY': apiKey,
//     //         'CB-VERSION': '2015-07-22',
//     //         'CB-ACCESS-CONTROL-ALLOW-ORIGIN': '*',
//     //         'ACCESS-CONTROL-ALLOW_ORIGIN': '*'
//     //     }
//     // };

//     // request(options,function(err, response){
//     //     if (err) console.log(err);
//     //     console.log(response);
//     // });
//   }

//   render() {
//     let coinbaseBinance = this.state.coinbaseProPrice - this.state.binancePrice
//     let coinbaseKraken = this.state.coinbaseProPrice - this.state.krakenPrice
//     let averagePremium = ((coinbaseBinance + coinbaseKraken) / 2).toFixed(2)
//     // let averageFunding = 2.3

//     let trendsHtml = '<script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/2431_RC04/embed_loader.js"></script> <script type="text/javascript"> trends.embed.renderExploreWidget("TIMESERIES", {"comparisonItem":[{"keyword":"bitcoin","geo":"US","time":"today 12-m"}],"category":0,"property":""}, {"exploreQuery":"q=bitcoin&geo=US&date=today 12-m","guestPath":"https://trends.google.com:443/trends/embed/"}); </script>'

//     return (
//       <div className="BtcSpotPrices">
//         <Divider clearing />
//         <Grid columns={5} divided>
//           <Grid.Row>
//             <Grid.Column></Grid.Column>
//             <Grid.Column className="spotPrices">
//                 Binance: ${this.state.binancePrice}
//             </Grid.Column>
//             <Grid.Column className="spotPrices">
//                 Coinbase Pro: ${this.state.coinbaseProPrice}
//             </Grid.Column>
//             <Grid.Column className="spotPrices">
//                 Kraken: ${this.state.krakenPrice}
//             </Grid.Column>
//             <Grid.Column></Grid.Column>
//           </Grid.Row>
//         </Grid>
//         <Grid columns={4}>
//           <Grid.Row>
//             <Grid.Column>
//               Market Cap: {this.state.marketCap}
//             </Grid.Column>
//             <Grid.Column>
//               Current Supply: {this.state.currentSupply} / Total Supply: 21,000,000
//             </Grid.Column>
//             <Grid.Column>
//               24Hr Volume: {this.state.Volume}
//             </Grid.Column>
//             <Grid.Column>
//               24Hr Price Change: {this.state.priceChange}%
//             </Grid.Column>
//           </Grid.Row>
//         </Grid>
//         <Divider clearing />
//         <div>
//           <h2 className="premiums">Bitcoin Premiums</h2>
//           <h3 className="average-premium">Average Premium: {averagePremium}</h3>
//           <p>
//             Coinbase/Binance: {coinbaseBinance.toFixed(2)}<span className="premium-spacing"> | </span>Coinbase/Kraken: {coinbaseKraken.toFixed(2)}
//           </p>
//         </div>
//         <Divider clearing />
//         <div>
//           <h2 className="premiums">Bitcoin Funding Rate</h2>
//           {/* <h3 className="average-premium">Average Rate: {averageFunding}</h3> */}
//           <p>
//             Deribit: {this.state.deribitRate}<span className="premium-spacing"> | </span>FTX: {this.state.ftxRate}<span className="premium-spacing"> | </span>OKEx: {this.state.okexRate}<span className="premium-spacing"> | </span>Bianance: {this.state.binanceRate}
//           </p>
//         </div>
//       </div>
//     );
//   }
// }

// export default  BtcSpotPrices;