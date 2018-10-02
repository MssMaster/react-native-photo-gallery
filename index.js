import {
  Dimensions,
  FlatList,
  View,
  Image
} from "react-native";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Pagination, Slide } from "./src";
import renderIfWithView from "../../utils/RenderIfComponent/RenderIfWithEmptyView";

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
  }

  componentDidMount() {
    if (this.props.initialIndex) {
      setTimeout(() => {
        this.goTo(this.props.initialIndex);
      }, 100);
    }
  }

  onScrollEnd(e) {
    const contentOffset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    if (pageNum !== this.state.index) {
      this.setState({ index: pageNum });
    }
  }

  getItemLayout(data, index) {
    return {
      length: Dimensions.get("window").width - 30,
      offset: (Dimensions.get("window").width - 30) * index,
      index
    };
  }

  goTo(index) {
    this.setState({ index });
    this.swiper.scrollToIndex({ index });
  }

  render() {
    const backgroundColor = this.props.backgroundColor || "#FFF";
    const data = this.props.data || [];
    return (
      <View
        orientation={this.state.orientation}
        style={{ ...styles.container, backgroundColor }}
      >
        {!data.length && (
          <Image
            style={{
              width: Dimensions.get("window").width - 100,
              height: Dimensions.get("window").height * 0.5,
            }}
            resizeMode={"center"}
            source={require("../../assets/icon.png")}
          />
        )}

        <FlatList
          data={data}
          horizontal
          initialNumToRender={this.props.initialNumToRender || 4}
          ref={ref => (this.swiper = ref)}
          pagingEnabled
          style={{
            width: Dimensions.get("window").width - 30,
            height: Dimensions.get("window").height * 0.5
          }}
          onMomentumScrollEnd={this.onScrollEnd.bind(this)}
          getItemLayout={this.getItemLayout.bind(this)}
          renderItem={img => (
            <Slide {...img} pinchToZoom={this.props.pinchToZoom} data={data} />
          )}
          keyExtractor={item => item.id}
        />
        <Pagination
          index={this.state.index}
          data={data}
          style={{ height: Dimensions.get("window").height * 0.1 }}
          initialPaginationSize={this.props.initialPaginationSize || 10}
          goTo={this.goTo.bind(this)}
          backgroundColor={backgroundColor}
        />
      </View>
    );
  }
}

Gallery.propTypes = {
  backgroundColor: PropTypes.string,
  pinchToZoom: PropTypes.bool,
  data: PropTypes.arrayOf((propValue, key) => {
    if (!propValue[key].id || !propValue[key].url) {
      return new Error(
        'Data prop is invalid. It must be an object containing "id" and "image" keys.'
      );
    }
  })
};

const styles = {
  container: {
    height: Dimensions.get("window").height * 0.6,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20
  },
  loader: {
    position: "absolute",
    top: Dimensions.get("window").height * 0.6 / 2 - 10,
    left: Dimensions.get("window").width / 2 - 10
  },
  swiper: {
    flexWrap: "wrap"
  }
};
