import React, { PureComponent } from "react";
import axios from "axios";

const CATS_API =
  "https://raw.githubusercontent.com/viktornar/dynotable/master/data/cats.json";

export default function withCatsFetcher(WrappedComponent) {
  return class CatsFetcher extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isFetching: false,
        error: null,
        cats: []
      };

      this.fetchCats = this.fetchCats.bind(this);
    }

    componentDidMount() {
      this.fetchCats();
    }

    fetchCats() {
      this.setState({ isFetching: true });
      axios
        .get(CATS_API)
        .then(({ data: { cats } }) => {
          this.setState({ cats, isFetching: false });
        })
        .catch(error => {
          this.setState({ error, isFetching: false });
        });
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
