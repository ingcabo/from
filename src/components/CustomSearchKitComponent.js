import { SearchkitComponent, ResetSearchAccessor } from "searchkit";

class CustomSearchKitComponent extends SearchkitComponent {
  constructor(props) {
    super(props);
    this.resetAccessor = new ResetSearchAccessor({
      query: false,
      filter: true,
      pagination: false
    });
  }
  componentDidMount() {
    super.componentDidMount();
    this.searchkit.reloadSearch();
  }
  componentWillUnmount() {
    super.componentWillUnmount();
    this.resetAccessor.searchkit = this.searchkit;
    this.resetAccessor.performReset();
    this.searchkit.performSearch();
  }
}

export default CustomSearchKitComponent;
