import './SSCNFT.css';
import React, { Component } from 'react';
import { Divider, Grid, Input, Label } from 'semantic-ui-react'
 
class SSCNFT extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      solPrice: 0,
      shdwPrice: 0,
      enterShdwPrice: 0,
      nftFloor: 100,
      shdwLeft: 10000,
      solanartFloor: 0,
      SSCNFTAddress: '',
      bonusRedeemed: false,
     };
  }

  async componentDidMount () {
    await fetch('https://api.coinbase.com/v2/prices/SOL-USD/buy')
    .then(resp => resp.json())
    .then(solPrice => {
      this.setState({
        solPrice: Number(solPrice.data.amount)
      })
    })
    await fetch('https://api.coingecko.com/api/v3/simple/price?ids=genesysgo-shadow,usd-coin&vs_currencies=usd')
    .then(resp => resp.json())
    .then(shdwPrice => {
      this.setState({
        shdwPrice: Number(shdwPrice["genesysgo-shadow"].usd),
        enterShdwPrice: Number(shdwPrice["genesysgo-shadow"].usd)
      })
    })
    try{
      await fetch('https://qzlsklfacc.medianetwork.cloud/get_nft?collection=shadowysupercoder&page=0&limit=30&order=price-ASC&fits=any&trait=&search=&min=0&max=0&listed=true&ownedby=&attrib_count=&bid=all')
      .then(resp => resp.json())
      .then(floorPrice => {

        this.setState({
          nftFloor: floorPrice["items"][0].price,
          solanartFloor: floorPrice["items"][0].price
        })
      })
    } catch (error) {
      console.log('couldnt fetch solanart floor', error)
    }    
  }

  
  render() {
    let fetchSolPrice = () => {
      fetch('https://api.coinbase.com/v2/prices/SOL-USD/buy')
        .then(resp => resp.json())
        .then(solPrice => {
          let newSolPrice = Number(solPrice.data.amount);
          this.setState({
            solPrice: newSolPrice
          })
        })
      
    }
    let updateSOLFloor = (e) => {
      this.setState({
        nftFloor: e.target.value
      })
    }
    let updateSHDWPrice = (e) => {
      this.setState({
        enterShdwPrice: e.target.value
      })
    }
    let nftData = {
        "id": "99d5983c-b660-4c43-9386-dd866b6c776d",
        "jsonrpc": "2.0",
        "method": "getSignaturesForAddress",    
        "params": [
            "3pBRoo6HSD5mwbt875r4kc7kgdQybhoJxtnCHxWuFiyP",
            {"limit": 100}
        ]
    }
    let nftSignature = {
        "id": "99d5983c-b660-4c43-9386-dd866b6c776d",
        "jsonrpc": "2.0",
        "method": "getTransaction",    
        "params": [
            "3wP5R8Rnyc45WH67nDyonGmxDsPoxyp9hxLyXQSegdHePfENr4rnUcHmdShRNKYPMaiF6kDtq4MvgtYXW3CSHkmS",
        ]
    }
    let updateSSCNFTAddress = (e) => {
      let tokensWithdrawn = 0;
      let redeemed = false;
      nftData['params'] = [e.target.value, {"limit": 100}]

      fetch('https://api.mainnet-beta.solana.com', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nftData)
      })
      .then(resp => resp.json())
      .then(nftData => {
        if(nftData.result) {
          let transactions = nftData.result
          for (const transaction of transactions) {
            let currSignature = transaction.signature;
            nftSignature['params'] = [currSignature]

            fetch('https://api.mainnet-beta.solana.com', {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(nftSignature)
            })
            .then(resp => resp.json())
            .then(nftTransactionData => {
              if(nftTransactionData.result.meta.postTokenBalances[0] && tokensWithdrawn === 0) {
                if(nftTransactionData.result.meta.postTokenBalances[0].mint === "SHDWyBxihqiCj6YekG2GUr7wqKLeLAMK1gHZck9pL6y"){
                  
                  
                  
                  let allMessages = nftTransactionData.result.meta.logMessages

                  console.log(nftTransactionData.result)
                  for (const message of allMessages) {
                    if (message.includes('reward without bonus')) {
                      tokensWithdrawn += Number(message.split('bonus ')[1]) / 1000000000;
                    }
                    if (message.includes('stake_data.bonus_redeemed')) {
                      if (message.split('stake_data.bonus_redeemed ')[1] === 'false'){
                        redeemed = false
                      } else {
                        redeemed = true
                      }

                    }
                  }
                  this.setState({
                    shdwLeft: 10000 - tokensWithdrawn,
                    bonusRedeemed: redeemed
                  })

                }
              }
            })
          }
        }
      })
      
    }
    let priceBasedOnFloor = this.state.nftFloor * this.state.solPrice / 10000
    let floorBasedOnPrice = this.state.enterShdwPrice * 10000 / this.state.solPrice
    return (
      <div className="NFTstyle">
        <h1 className="premiums">SSC NFT Calculator</h1>
        <Divider clearing />
        <div>
          <p>Current SOL-USD price: ${this.state.solPrice}</p>
          
          <p>Current SHDW-USD price: ${this.state.shdwPrice}</p>
          <p>Current Solanart Floor price: {this.state.solanartFloor} SOL</p>
        </div>
       
        <Divider clearing />
        <Grid divided='vertically' mobile={1}>
          <Grid.Row columns={2} >
            <Grid.Column>
              <h2>Calculate Token Price Based on NFT Floor</h2>
              <p>$SHDW price based on current floor of {this.state.nftFloor} SOL and 10,000 tokens: <b className="largeText">${priceBasedOnFloor.toFixed(2)}</b></p>
              <p>Enter floor price</p>
              <Input labelPosition='right' type='number' placeholder={this.state.nftFloor} >
                <input onChange={(e)=>{updateSOLFloor(e)}}/>
                <Label>SOL</Label>
              </Input>
            </Grid.Column>
            <Grid.Column>
              <h2>Calculate NFT Floor Based on Token Price</h2>
              <p>Floor Price Based on current $SHDW price of ${this.state.shdwPrice} and 10,000 tokens: <br/><b className="largeText">{floorBasedOnPrice.toFixed(2)} SOL</b></p>
              <p>Enter $SHDW Price To See Floor Value</p>

              <Input labelPosition='right' type='number' placeholder={this.state.shdwPrice} >
                  <input onChange={(e)=>{updateSHDWPrice(e)}}/>
                <Label>USD</Label>
              </Input>
            </Grid.Column>
          </Grid.Row>

          <Divider clearing />

          <Grid.Row columns={3}>
            <Grid.Column>
              {/* place holder */}
            </Grid.Column>
            <Grid.Column>
              <h2>Enter SSC NFT address to Check How Many $SHDW tokens are left</h2>
              <Input type='text' placeholder={this.state.SSCNFTAddress} >
                  <input onChange={(e)=>{updateSSCNFTAddress(e)}}/>
                {/* <Label>USD</Label> */}
              </Input>
              <h3>Bonus redeemed: {this.state.bonusRedeemed ? 'Yea, Its Gone' : 'Not Yet!'}</h3>
            </Grid.Column>
            <Grid.Column>
              {/* place holder */}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              {/* place holder */}
            </Grid.Column>
            <Grid.Column>
              <h3>NFT SOL Price Based on remaining Tokens: {this.state.shdwLeft * this.state.shdwPrice / this.state.solPrice}</h3>
              {this.state.bonusRedeemed ? 
                <h3></h3>
                :
                <h3>NFT SOL Price Based on remaining Tokens plus 3,000 bonus tokens: {(this.state.shdwLeft + 3000) * this.state.shdwPrice / this.state.solPrice}</h3> 
              }
            </Grid.Column>
            <Grid.Column>
              {/* place holder */}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <h2>Tokens Left</h2>
              <h3>{this.state.shdwLeft} $SHDW</h3>
            </Grid.Column>
            <Grid.Column>
              <h2>Balance Harvested</h2>
              <h3>{10000 - this.state.shdwLeft} $SHDW</h3>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        Donations/Tips ❤️: <br/>
        Solana Wallet: kyled.sol <br/>
        Solana Wallet: 9pyTgvzHkz9iDtZLG1ziwyGdbUHaJ1c6xjbmA7DgpcLe <br/><br/><br/>
      </div>
    );
  }
}

export default  SSCNFT;