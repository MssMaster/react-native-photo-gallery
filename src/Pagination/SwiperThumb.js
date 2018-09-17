import React, { Component } from "react";
import { TouchableOpacity, Image } from "react-native";
import { appColor } from "../../../../style/Styles";

class SwiperThumb extends Component {
  goToSlide() {
    this.props.navigate(this.props.index);
  }

  render() {
    return (
      <TouchableOpacity style={s.container} onPress={this.goToSlide.bind(this)}>
        <Image
          style={{
            ...s.thumb,
            opacity: this.props.active ? 1 : 0.6,
            borderColor: this.props.active
              ? appColor.colorPrimary
              : "lightgrey",
            borderWidth: 1
          }}
          source={ {
            uri:
              this.props.data[this.props.index].thumbnail ||
              this.props.data[this.props.index].url
          }}
        />
      </TouchableOpacity>
    );
  }
}

const s = {
  container: {
    width: 70,
    padding: 3,
    justifyContent: "center",
    alignItems: "center",
    height: 70
  },
  thumb: {
    width: 64,
    height: 64,
    margin: 5,
  }
};

export default SwiperThumb;
