//filter unique items based on name property
// return items in toBeFilteredArray that are not in referanceArray

export function filterUniqeItems(toBeFilteredArray, referanceArray) {
  return toBeFilteredArray.filter(item => {
    return !referanceArray.some(newItem => {
      return newItem.name === item.name;
    });
  });
}
