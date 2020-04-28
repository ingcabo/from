//handle input change and update state based on input name
export function handleInputChange(e, cb) {
  const { target } = e,
    { value, name } = target;
  this.setState(
    {
      [name]: value
    },
    () => {
      if (cb) {
        cb();
      }
    }
  );
}
