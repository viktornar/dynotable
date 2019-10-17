import React, { PureComponent } from "react";
import { debounce } from "lodash";
import axios from "axios";

const CATS_API =
  "https://raw.githubusercontent.com/viktornar/dynotable/master/data/cats.json";

export default function withCatsFetcher(WrappedComponent, withDebounce) {
  return class CatsFetcher extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isFetching: false,
        error: null,
        cats: []
      };

      this.fetchCats = this.fetchCats.bind(this);
      this.loadWithDebounce = this.loadWithDebounce.bind(this);
    }

    componentDidMount() {
      this.fetchCats();
    }

    fetchCats() {
      this.setState({ isFetching: true });
      axios
        .get(CATS_API)
        .then(({ data: { cats } }) => {
          if (withDebounce) {
            this.loadWithDebounce(cats, 0, 100);
            this.setState({ isFetching: false });
          } else {
            this.setState({ cats, isFetching: false });
          }
        })
        .catch(error => {
          this.setState({ error, isFetching: false });
        });
    }

    loadWithDebounce(cats, start, end) {
      this.setState(
        { cats: [...this.state.cats, ...cats.slice(start, end)] },
        () => {
          debounce(() => {
            this.loadWithDebounce(cats, end, end + 100);
          }, 500)();
        }
      );
    }

    render() {
      const { isFetching, cats, error } = this.state;
      return (
        <WrappedComponent
          isFetching={isFetching}
          data={cats}
          error={error}
          {...this.props}
        />
      );
    }
  };
}
