import React from 'react';
import * as utils from "../utils";

class Transaction extends React.Component {
  constructor(props){
    super(props);
    this.broadcast = this.broadcast.bind(this);
  }

  broadcast() {
    utils.broadcastTx(this.props.tx.raw);
    this.props.removeTx(this.props.tx.id);
    this.props.addIntermediate({ address: this.props.tx.address, redeem: this.props.tx.redeem });
  }

  render() {
    return (<div className="content" style={{ wordWrap: "break-word" }}>
      <h4>Txid: {this.props.tx.id}</h4>
      <p>{this.props.tx.raw}</p>
      <p><button onClick={this.broadcast}>Broadcast</button></p>
    </div>);
  }
}

export default Transaction;