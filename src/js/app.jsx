import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.Component {
  // your Javascript goes here
constructor(props){
  super(props)
  this.state = {
    balance: '',
    rate: '',
    term: 15,
    period: '',
    payment:'',
    period:''
  }
  this.handleBalance = this.handleBalance.bind(this);
  this.handleRate = this.handleRate.bind(this);
  this.handleTerm = this.handleTerm.bind(this);
  this.Calculate = this.Calculate.bind(this);
}
handleTerm(event){
  this.setState({term:event.target.value});
}

handleBalance(event){
  this.setState({ balance: event.target.value });
}

handleRate(event) {
  this.setState({ rate: event.target.value });
}

handleSubmit(event) {
  this.setState({ payment: event.target.value });
}

Calculate(event){
  let principle =parseFloat(this.state.balance);
  let apr = parseFloat(this.state.rate);
  let mpr = apr/100/12;
  let term = this.state.term;
  let nPayments = term*12;
  let monthlyPayment='';
  
  let top = mpr * Math.pow(1+mpr,nPayments);
  let bottom = Math.pow(1+mpr, nPayments) -1;
  let total = top/bottom;
  monthlyPayment = principle*total;

  console.log(monthlyPayment);
  monthlyPayment = monthlyPayment.toFixed(2);


  this.setState({
    payment:'$'+ monthlyPayment + " is your monthly payment",

  })


  console.log(monthlyPayment);
  event.preventDefault()

}

  render() {
    console.log('RENDERED');
    console.log(this.state.balance, this.state.rate, this.state.term, this.state.payment);
    return (
      <div className='container'>
        <div className='page-header text-center'>
          <h3>Mortgage Calculator</h3>
        </div>
        <div className='container'>
          <form className='well'>
            <div className='form-group row'>
              <label className='col-md-2 col-form-label' style={{color: "black"}}>Loan Balance</label>
            <div className='col-md-4'>
              <input value={this.state.balance} onChange={this.handleBalance} className='form-control' placeholder='0' name='balance' type='number'></input>
            </div>
            </div>
            <div className='form-group row'>
              <label className='col-md-2 col-form-label' style={{color: "black"}}>Interest Rate(%)</label>
            <div className='col-md-4'>
              <input value={this.state.rate} onChange={this.handleRate} className='form-control' placeholder='0' name='rate' type='number' step='0.01'></input>
            </div>
            </div>
            <div className='form-group row'>
              <label className='col-md-2 col-form-label' style={{color: "black"}}>Loan Term (years)</label>
            <div className='col-md-4'>
              <select value={this.state.term} onChange={this.handleTerm}className='form-control' name='term'>
                <option value='15'>15</option>
                <option value='30'>30</option>
              </select>
            </div>
            </div>
            <div className='form-group row'>
              <div className='col-md-1 col-md-offset-2'>
                <button onClick={this.Calculate}className='btn btn-primary' type='submit' name='submit'>Calculate</button>
              </div>
            </div>
            <div className='row'>
              <label className='col-md-2 col-form-label' style={{color: "black"}}>Mortgage Payment</label>
              <h3 name='output' id='output'>{this.state.payment}</h3>
          </div>             
          </form>
        </div>        
      </div>
    );
  }
}

// export default App;