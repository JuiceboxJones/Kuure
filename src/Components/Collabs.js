import React from 'react';
import STORE from './STORE';
import './Collab.css';

class Collabs extends React.Component {
  displayItems = () => {
    return STORE.Items.map((item, index) => {
      return (
        <li key={index}>
          <img src={item.img} alt="CBD item" />
          <p className="item-title">{item.name}</p>
          <p className="item-desc">{item.desc}</p>
          <button type="button" className="req-btn">
            Request
          </button>
        </li>
      );
    });
  };

  render() {
    return (
      <div className="collabs-mn-ctr">
        <div className="collabs-hdr">
          <p className="collabs-title">Collabs</p>
          <p className="collabs-subtitle">Available Products</p>
        </div>
        <div className="collabs-subctr">
          <ul>{this.displayItems()}</ul>
        </div>
      </div>
    );
  }
}

export default Collabs;
