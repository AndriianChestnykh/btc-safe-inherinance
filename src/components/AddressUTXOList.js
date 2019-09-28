import React from 'react';
import UTXO from './UTXO';
import axios from 'axios';
import config from '../config';
import PropTypes from 'prop-types';
import bs58check from 'bs58check';

class AddressUTXOList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      utxos: []
    };
  }

  componentDidMount() {
    this.updateUTXOList(this.props.address);
  }

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   console.log(nextState.utxos.length, this.state.utxos.length);
  //   if (nextProps.address !== this.props.address || nextState.utxos.length !== this.state.utxos.length) {
  //     this.updateUTXOList(this.props.address);
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  updateUTXOList(address){
    if (!this.validateAddress(this.props.address).isValid) return;
    const uri = `${config.apiURIs.address}/${address}`;
    axios.get(uri)
      .then(response => {
        this.setState({ utxos: response.data.data[address].utxo })
      })
      .catch(error => alert('Blockchain API request error: ' + error));
  }

  validateAddress(address) {
    let message;
    let isValid = false;
    try{
      isValid = bs58check.decode(this.props.address).length === 21;
      message = isValid ? '': 'Wrong address length';
    } catch (e){
      message = 'Error decoding base58check: ' + e.message;
    }
    return {
      isValid,
      message
    }
  }

  render(){
    const utxos = this.state.utxos;
    // console.log(this.props.address, utxos);
    const validateAddressResult = this.validateAddress(this.props.address);

    const addressHeader = validateAddressResult.isValid
      ? <h4>{this.props.address}</h4>
      : <h4>Address is not valid: {validateAddressResult.message}</h4>;

    const utxosJSX = utxos && utxos.length
      ? this.state.utxos.map((utxo, index) => (<UTXO key={index} index={index} utxo={utxo}/>))
      : <div>Empty...</div>

    return (<div>
      {addressHeader}
      {utxosJSX}
    </div>)
  }
}

AddressUTXOList.propTypes = {
  address: PropTypes.string
};

export default AddressUTXOList;