import React, { Component } from "react";
import {
  Platform,
  Image,
  ActivityIndicator,
  Dimensions,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableHighlight
} from "react-native";
import renderIfWithView from "../../../utils/RenderIfComponent/RenderIfWithEmptyView";
import { CustomNavigatorAction } from "../../../utils/NavigatorComponent/CustomNavigator";
const styles = {
  slideC: {
    width: Dimensions.get("window").width - 30,
    height: Dimensions.get("window").height * 0.5,
    alignItems: "center",
    justifyContent: "center"
  },
  zoomSlideC: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 128,
    alignItems: "center",
    justifyContent: "center"
  },
  scrollViewC: {
    alignItems: "center",
    top: Platform.OS === "android" ? -32 : 70,
    justifyContent: "center"
  },
  loader: {
    position: "absolute",
    top: Dimensions.get("window").height * 0.5 / 2 - 10,
    left: Dimensions.get("window").width / 2 - 10
  }
};

export class Slide extends Component {
  render() {
    const inside = {
      width: Dimensions.get("window").width - 50,
      height: Dimensions.get("window").height * 0.5 - 20
    };
    return (
      <View style={styles.slideC}>
        <TouchableHighlight
          style={{ flexWrap: "wrap", backgroundColor: "transparent" }}
          onPress={() =>
              CustomNavigatorAction.pushToFilterCategory(
                "productImageDetail",
                this.props.data
              )
            }
        >
          <Image
            source={{ uri: this.props.item.url }}
            style={inside}
            resizeMode="contain"
          />
        </TouchableHighlight>
      </View>
    );
  }
}
