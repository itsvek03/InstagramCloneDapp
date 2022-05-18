import React, { Component } from 'react'
import getWeb3 from './getWeb3'
import NavBar from './Navbar'
import Instagram from './contracts/Instagram.json'
import InstagramComponent from './InstagramComponents'
import Typography from '@mui/material/Typography'
import { create } from 'ipfs-http-client'
const client = create('https://ipfs.infura.io:5001/api/v0')

class App extends Component {
  state = {
    imageCount: 0,
    web3: null,
    accounts: null,
    contract: null,
    instagramInfo: null,
    images: [],
    appInfo: null,
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3()

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts()

      // Get the contract instance.
      const networkId = await web3.eth.net.getId()
      const deployedNetwork = Instagram.networks[networkId]
      if (deployedNetwork) {
        const instagramInfo = new web3.eth.Contract(
          Instagram.abi,
          deployedNetwork.address,
        )
        const appInfo = await instagramInfo.methods.appName().call()
        const imageCount = await instagramInfo.methods.imageCount().call()
        console.log('Image Count', imageCount)
        for (var index = 1; index <= imageCount; index++) {
          const images = await instagramInfo.methods.images(index).call()
          this.setState({ images: [...this.state.images, images] })
        }

        this.setState({ web3, accounts, instagramInfo, appInfo, imageCount })
        console.log(web3, accounts, instagramInfo, appInfo, imageCount)
      } else {
        alert('Your contract does not deployed to these network')
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      )
      console.error(error)
    }
  }

  // capture file
  captureFile = (event) => {
    event.preventDefault()
    const files = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(files)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer.from(reader.result) })
      console.log(this.state.buffer)
    }
  }

  uploadImage = async (description) => {
    try {
      const added = await client.add(this.state.buffer)
      console.log(added.path, 'dexs', description, this.state.accounts)
      this.setState({ web3: true })
      this.state.instagramInfo.methods
        .uploadImage(added.path, description)
        .send({ from: this.state.accounts[0] })
        .on('transactionHash', (hash) => {
          this.setState({ web3: false })
        })
    } catch (err) {
      console.log('Eroor ....', err.message)
    }
  }

  render() {
    return (
      <>
        <NavBar account={this.state.accounts} appName={this.state.appInfo} />
        {this.state.loading ? (
          <Typography variant="subtitle1" color="initial">
            Please Wait
          </Typography>
        ) : (
          <div>
            <div className="App">
              <div>Accounts is: {this.state.accounts}</div>
            </div>
            <InstagramComponent
              captureFile={this.captureFile}
              uploadImage={this.uploadImage}
              imageCount={this.state.imageCount}
              images={this.state.images}
            />
          </div>
        )}
      </>
    )
  }
}

export default App
