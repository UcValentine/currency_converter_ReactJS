import React, { Component } from "react";

class HistoryRates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      rates: {}
    };
  }

  componentDidMount() {
    fetch("https://api.exchangeratesapi.io/2015-03-26")
      .then(res => res.json()) // Short typo for response.
      .then(
        result => {
          this.setState({
            isLoaded: true,
            rates: result.rates
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  prettyCurrency = (crr, action) => {
    if (action === 0) {
      crr = (crr * 102) / 100;
    } else if (action === 1) {
      crr = (crr * 98) / 100;
    } else {
      // Do nothing...
    }
    var fixedCrr = crr.toFixed(4).toString();
    while (fixedCrr.length < 8) {
      fixedCrr = "0" + fixedCrr;
    }
    return fixedCrr;
  };

  createTable = () => {
    const rates = this.state;
    let ratesArr = Object.keys(rates).map(i => rates[i])[2];
    let table = [];
    let children = [];
    let displayedCurrencies = ["SEK", "USD", "GBP", "SGD"];

    // The following loop is used to create inner structure (children) of the table.
    for (var key in ratesArr) {
      if (ratesArr.hasOwnProperty(key) && displayedCurrencies.includes(key)) {
        children.push(
          <tr>
            <td>{key}</td>
            <td>{this.prettyCurrency(ratesArr[key], 0)}</td>
            <td>{this.prettyCurrency(ratesArr[key], 1)}</td>
          </tr>
        );
      }
    }
    table.push(<tbody>{children}</tbody>);

    return table;
  };

  render() {
    const { error, isLoaded } = this.state;

    if (error) {
      return <div>Oops: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <main>
          <div className="App-body">
            <table className="currencyTable">
              <thead>
                <tr>
                  <th>&nbsp;</th>
                  <th>On March 26th, 2015</th>
                  <th>On June 13th, 2017</th>
                </tr>
              </thead>
              {this.createTable()}
            </table>
            <p>
              Made with Love by 
              <a href="https://github.com/UcValentine?tab=repositories" target="_blank"> 
                 Valentine Onah
              </a>
            </p>
          </div>
        </main>
      );
    }
  }
}

export default HistoryRates;