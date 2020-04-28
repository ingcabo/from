export function parseQueryParameters(string) {
  string = string.replace("?", "");
  const parts = string.split("&"),
    params = {};

  parts.map(part => {
    const sides = part.split("=");
    if (sides[0]) {
      params[sides[0]] = sides[1];
    }
    return undefined;
  });

  return params;
}
