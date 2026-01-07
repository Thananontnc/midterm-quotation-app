import "./item-manager-app.css"

import { useState, useRef } from "react";

import deleteLogo from '../assets/delete.svg';
import stationaryLogo from '../assets/ink_pen.svg';
import kitchenwareLogo from "../assets/flatware.svg";
import applianceLogo from "../assets/electrical_services.svg";

function ItemManager() {



  const [items, setItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const itemName = useRef(null);

  const [category, setCategory] = useState("Stationary");
  const [price, setPrice] = useState("");

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case "Stationary": return stationaryLogo;
      case "Kitchenware": return kitchenwareLogo;
      case "Appliance": return applianceLogo;
      default: return stationaryLogo;
    }
  };

  const addItem = () => {
    const name = itemName.current.value.trim();
    if (!name) {
      setErrorMsg("Item name must not be empty");
      return;
    }
    setErrorMsg("");

    if (!price) return;

    const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
    const newItem = {
      id: newId,
      name,
      category,
      price
    };

    setItems([...items, newItem]);

    itemName.current.value = "";
    setPrice("");
    setCategory("Stationary");
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <>
      <div id="h1">
        Item Management
      </div>
      <div id="data-area">
        <table id="item-table" className="item-table">
          <thead>
            <tr>
              <th id="col-item-id">ID</th>
              <th id="col-item-name">Name</th>
              <th id="col-item-category">Category</th>
              <th id="col-item-price">Price</th>
              <th id="col-item-action">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <img src={getCategoryIcon(item.category)} alt={item.category} />
                </td>
                <td>{item.price}</td>
                <td className="item-action">
                  <img
                    src={deleteLogo}
                    alt="Delete"
                    onClick={() => deleteItem(item.id)}
                    style={{ cursor: 'pointer' }}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td>
                <input
                  type="text"
                  ref={itemName}
                  id="input-name"
                />
              </td>
              <td>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  id="input-category"
                >
                  <option value="Stationary">Stationary</option>
                  <option value="Kitchenware">Kitchenware</option>
                  <option value="Appliance">Appliance</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  id="input-price"
                />
              </td>
              <td>
                <button onClick={addItem} id="btn-add">Add Item</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="error-message">
        {errorMsg}
      </div>
    </>
  );
}

export default ItemManager