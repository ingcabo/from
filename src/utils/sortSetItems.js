// this is a sorting function that takes in the returned names array from ReactSortable and return a sorted items array.
// it should be bound to the component. it uses setState.

export function sortSetItems(names) {
  const itemsList = [...this.state.itemsList];
  itemsList.sort(function(a, b) {
    return names.indexOf(a.name) - names.indexOf(b.name);
  });
  this.setState({
    itemsList
  });
}
