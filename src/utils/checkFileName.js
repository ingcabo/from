export function checkFileName(name) {
  const dots = name.match(/\./gi),
    dashes = name.match(/-/gi);

  // allow only one dot for the extension and only one dash in the name
  var ok_dots = true
  if(dots && dots.length > 2){
    ok_dots = false
  }
  var ok_dashes = true
  if(dashes && dashes.length > 2){
    ok_dashes = false
  }

  return ok_dots && ok_dashes;
}
