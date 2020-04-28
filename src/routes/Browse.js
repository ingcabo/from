import React from "react";
import PropTypes from "prop-types";
import { getCurrentFolderFromState } from "../utils";

import CustomSearchKitComponent from "../components/CustomSearchKitComponent";
import DisplayMedia from "../components/Browse/DisplayMedia";
import DisplayMediaDetails from "../components/Browse/DisplayMediaDetails";
import MainSearch from "../components/MainSearch";
import SideBar from "../components/Browse/SideBar";
import Sort from "../components/Sort";
import DisplaySetDetails from "../components/Browse/DisplaySetDetails";

const variables = {
  items: {
    sidebar: true,
    ShowDetails: DisplayMediaDetails,
    placeholder: "Buscar Medios"
  },
  sets: {
    sidebar: false,
    ShowDetails: DisplaySetDetails,
    placeholder: "Buscar Mediasets"
  }
};

class Browse extends CustomSearchKitComponent {
  state = {};

  //check if item in hits is currently checked
  checkIfItemChecked = hit => {
    const selectedItem = this.state.selectedItem || {};
    return selectedItem.name === hit.name;
  };

  //select item
  selcetitem = hit => {
    const { selectedItem = {} } = this.state;
    if (selectedItem.name === hit.name) {
      this.setState({ selectedItem: undefined });
    } else {
      this.setState({ selectedItem: hit });
    }
  };

  render() {
    const { selectedItem } = this.state,
      { type = "items" } = this.props,
      { sidebar, ShowDetails, placeholder } = variables[type],
      currentFolder = getCurrentFolderFromState(this.searchkit.state.folder);
    return (
      <div className="route">
        <div className="flex-container flex-start">
          <MainSearch placeholder={placeholder} />
          <Sort />
        </div>
        <div className="flex-container flex-start search-results">
          {sidebar && <SideBar currentFolder={currentFolder} />}
          <DisplayMedia
            check={this.checkIfItemChecked}
            onClick={this.selcetitem}
            type={type}
          />
          {selectedItem && (
            <ShowDetails
              hit={selectedItem}
              key={selectedItem.name}
              selcetitem={this.selcetitem}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Browse;

Browse.propTypes = {
  type: PropTypes.string
};
