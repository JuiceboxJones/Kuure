import React from 'react';
import STORE from './STORE';
import './Sales.css';
import DataMap from './DataMap';

class Sales extends React.Component {
  state = {
    total_views: null,
    total_sales: null,
    total_commissions: null
  };

  componentDidMount() {
    this.handleDataTotals();
  }

  handleDataTotals = () => {
    let vTot = [];
    let sTot = [];
    let cTot = [];
    STORE.Posts.forEach(post => {
      return (
        (vTot = [...vTot, post.views]),
        (sTot = [...sTot, post.sales]),
        (cTot = [...cTot, post.commissions])
      );
    });
    this.setState({
      total_views: vTot.reduce((a, b) => a + b, 0).toLocaleString('en'),
      total_sales: '$' + sTot.reduce((a, b) => a + b, 0).toLocaleString('en'),
      total_commissions:
        '$' + cTot.reduce((a, b) => a + b, 0).toLocaleString('en')
    });
  };

  render() {
    return (
      <div className="sales-mn-ctr">
        <div className="sales-data">
          <DataMap />
        </div>
        <hr />
        <section className="sales-totals">
          <div className="view-total">
            <p className="sales-values">{this.state.total_views}</p>
            <p className="sales-text">Total Views</p>
          </div>
          <div className="sale-total">
            <p className="sales-values">{this.state.total_sales}</p>
            <p className="sales-text">Total Sales</p>
          </div>
          <div className="commission-totals">
            <p className="sales-values">{this.state.total_commissions}</p>
            <p className="sales-text">Commissions</p>
          </div>
        </section>
      </div>
    );
  }
}

export default Sales;
