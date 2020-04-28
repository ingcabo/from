import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { SearchkitComponent } from "searchkit";
import { sortSetItems, saveSetCall } from "../../utils";

import ItemsListDisplay from "../MediaSets/ItemsListDisplay";

class DisplaySetDetails extends SearchkitComponent {
  constructor(props) {
    super(props);
    this.state = { itemsList: this.props.hit.items }; // put items in state to edit it in case of changes sorting or removing items
  }

  removeItem = item => {
    const { itemsList } = this.state,
      index = itemsList.findIndex(
        stateItem => item.original_name === stateItem.original_name
      );
    this.setState({
      itemsList: [...itemsList.slice(0, index), ...itemsList.slice(index + 1)]
    });
  };

  save = () => {
    const { hit } = this.props,
      { name } = hit,
      { itemsList } = this.state;
    saveSetCall(name, itemsList).then(() => {
      this.searchkit.reloadSearch();
      this.props.selcetitem(hit);
    });
  };

  sort = sortSetItems.bind(this);

  render() {
    const { name } = this.props.hit,
      { itemsList } = this.state;
    return (
      <div className="card display-item-details action-view-section">
        <div className="card-body ">
          <div className="display-item-details__header flex-container space-between align-center">
            <h4>{name}</h4>
            <Link className="btn btn-primary " to={`/create-sets?set=${name}`}>
              Editar
            </Link>
          </div>
          <ItemsListDisplay
            itemsList={itemsList}
            toggleItem={this.removeItem}
            sort={this.sort}
          />
          <button className="btn btn-primary" onClick={this.save}>
            Guardar
          </button>
        </div>
      </div>
    );
  }
}
export default DisplaySetDetails;

DisplaySetDetails.propTypes = {
  hit: PropTypes.object,
  selcetitem: PropTypes.func
};
