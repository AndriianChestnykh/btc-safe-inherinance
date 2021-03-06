import React from 'react'
import AddressUTXOList from './AddressUTXOList'
import config from '../config'
import PropTypes from 'prop-types'
import { getHDChild, isValidMnemonic } from '../utils'

class Person extends React.Component {
  render () {
    const { person, owner, heir, updateMnemonic, blocks, statsTime, actions } = this.props
    const { [person]: { derivationPath, mnemonic } } = this.props
    const { [person]: { name }, network } = config
    const { address } = isValidMnemonic(mnemonic) ? getHDChild(mnemonic, derivationPath, network) : {}

    return (<div className='ui card'>
      <div className='content'>
        <div className='header'>{name}</div>
      </div>
      <div className='content'>
        <form>
          <label htmlFor='mnemonic' /><br />
          <textarea id='mnemonic' name='mnemonic' cols='30' rows='3' onChange={(e) => updateMnemonic(person, e.target.value)} defaultValue={mnemonic} />
        </form>
        <p style={{ color: 'red' }}>{!isValidMnemonic(mnemonic) ? 'Mnemonic is not valid! Please enter valid mnemonic' : ''}</p>
        <p>Derivation path: {derivationPath}</p>
      </div>
      <div className='content'>
        <AddressUTXOList address={address} actions={actions} blocks={blocks} statsTime={statsTime} owner={owner} heir={heir} />
      </div>
    </div>)
  }
}

Person.propTypes = {
  mnemonic: PropTypes.string,
  person: PropTypes.string.isRequired,
  updateMnemonic: PropTypes.func.isRequired,
  counterPartyAddress: PropTypes.string,
  signTx: PropTypes.func
}

export default Person
