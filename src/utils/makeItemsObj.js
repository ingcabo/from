// turn items array to object by name of item

export function makeItemsObj(items) {
  const obj = {};
  items.forEach(item => (obj[item.name] = item));
  return obj;
}
