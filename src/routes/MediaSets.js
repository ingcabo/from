import React from "react";
import axios from "axios";
import {
  handleInputChange,
  MEIDASETS_ACTIONS_URL,
  getCurrentFolderFromState,
  filterUniqeItems,
  parseQueryParameters,
  saveSetCall,
  sortSetItems
} from "../utils";

import CustomSearchKitComponent from "../components/CustomSearchKitComponent";
import DisplayMedia from "../components/Browse/DisplayMedia";
import ItemsListDisplay from "../components/MediaSets/ItemsListDisplay";
import MainSearch from "../components/MainSearch";
import Sort from "../components/Sort";
import SetActions from "../components/MediaSets/SetActions";
import SideBar from "../components/Browse/SideBar";

class MediaSets extends CustomSearchKitComponent {
  state = {
    selectedItems: [],
    itemsList: [],
    mode: "create"
  };

  componentDidMount() {
    super.componentDidMount();
    const { set } = parseQueryParameters(this.props.location.search);

    if (set) {
      this.selectSet(set);
    }
  }

  //check if item in hits is currently checked
  checkIfItemChecked = hit => {
    return (
      this.state.itemsList.filter(inplaceHit => inplaceHit.name === hit.name)
        .length > 0
    );
  };

  //bind handleInputChange util
  handleInputChange = handleInputChange.bind(this);

  // create or update a media set
  saveSet = () => {
    const { setName, itemsList } = this.state;

    if (setName && itemsList.length > 0) {
      this.setState(
        {
          loading: true,
          createSetError: false
        },
        () => {
          saveSetCall(setName, itemsList)
            .then(() => {
              this.setState({
                selectedItems: [],
                itemsList: [],
                loading: false,
                setName: ""
              });
              this.props.history.replace({
                search: ""
              });
            })
            .catch(err => {
              this.setState({
                createSetError: err.response.data.message,
                loading: false
              });
            });
        }
      );
    } else {
      this.setState({
        createSetError: !setName
          ? "Por favor ingresar el nombre"
          : itemsList.length === 0
          ? "Por favor ingresar algún medio"
          : false
      });
    }
  };

  //select media set from search results and load its items
  selectSet = async name => {
    const setResp = await axios.post(`${MEIDASETS_ACTIONS_URL}show`, {
        name
      }),
      set = setResp.data.name._source,
      items = set.items,
      uniqeItems = filterUniqeItems(this.state.selectedItems, items);
    this.setState({
      setName: name,
      itemsList: [...items, ...uniqeItems]
    });
  };

  //sort set items
  sortItems = sortSetItems.bind(this);

  // toggle item selction to make a set
  toggleItem = (hit, add, id) => {
    // we use two list to keep track of selected items in case of media set change after selction
    // selectedItems === newSelectedItems: is the selcted new items to be added to the current selected media set
    //itemsList === newItemsList: contains both new selcted items and Media set items
    // all operation should be done on itemsList.
    // selectedItems is just there to keep track in case of set change.
    const newSelectedItems = [...this.state.selectedItems],
      newItemsList = [...this.state.itemsList],
      { width, height, name, original_name } = hit;
      var ver = id;

    if (add) {
      const item = {
        width,
        height,
        name,
        original_name, 
        ver
      };
      newSelectedItems.push(item);
      newItemsList.push(item);
    } else {
      newSelectedItems.splice(
        newSelectedItems.findIndex(inplaceHit => inplaceHit.name === name),
        1
      );
      newItemsList.splice(
        newItemsList.findIndex(inplaceHit => inplaceHit.name === name),
        1
      );
    }
    this.setState({
      selectedItems: newSelectedItems,
      itemsList: newItemsList,
      createSetError: false
    });
  };

  render() {
    const { createSetError, loading, setName, itemsList } = this.state,
      currentFolder = getCurrentFolderFromState(this.searchkit.state.folder);
    return (
      <div className="route">
        <div className="flex-container flex-start">
          <MainSearch />
          <Sort />
        </div>
        <div className="flex-container flex-start search-results">
          <SideBar currentFolder={currentFolder} />
          <DisplayMedia
            check={this.checkIfItemChecked}
            onClick={this.toggleItem}
          />
          <div className="card action-view-section make-set-section">
            <div className="card-body">
              <h4>Medios seleccionados:</h4>
              <ItemsListDisplay
                itemsList={itemsList}
                toggleItem={this.toggleItem}
                sort={this.sortItems}
              />
              <SetActions
                createSetError={createSetError}
                inputChange={this.handleInputChange}
                loading={loading}
                saveSet={this.saveSet}
                setName={setName}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MediaSets;
