import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  Pressable,
  Alert
} from "react-native";
import { Link ,useLinkProps} from "@react-navigation/native";
import moment from "moment";
import { Hoverable, Resizable } from "react-native-web-hooks";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import { dots } from "../assets";
import MenuList from "./menu";

const Card = (props) => {
  const {item, select_index, handleMenu, index, hideMenu , handlePress ,to, action , children } = props;
  // const {onPress  } = useLinkProps({to,action})
  let prop = props?.item?.snippet;

  let date = moment(prop?.publishedAt).format("MM/DD/YYYY");
  let thumbnail = prop?.thumbnails?.high?.url;

  const [isHover, setHover] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);

  return (
    <Pressable 
    //  onClick={onPress}
    key={Math.random()}
     onPress={handlePress}
     style={isHover ? [styles.hover_wraper] : [styles.wraper]}>
      <Hoverable
        onHoverIn={() => {
          setHover(true);
        }}
        onHoverOut={() => setHover(false)}
      >
        <View>
          <Image
            source={{ uri:thumbnail }}
            // source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            style={{
              width: 300,
              height: 150
            }}
          />

          <View style={{ flex: 1, marginTop: 10, marginBottom: 10 }}>
            <View style={[styles.row]}>
              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <Image
                  source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
                  style={{ width: 20, height: 20, alignSelf: "flex-start" }}
                />
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.nameStyle}
                >
                  {/* {item?.subtitle} */}
                  {prop?.title}
                </Text>
              </View>

              <Pressable
                onPress={select_index === index ? hideMenu : handleMenu}
                style={[styles.menuBox]}
              >
                {isHover ? (
                  <Image source={dots} style={{ width: 20, height: 20 }} />
                ) : null}
              </Pressable>
            </View>

            <View style={styles.marginHorizonal5}>
              {!isHover ? (
                <>
                   {/* <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{...styles.nameStyle ,marginTop:5 ,marginLeft:0}}
                >
                  {item?.description}
                </Text> */}
                  <View>
                  {/* <Text style={[styles.TextStyle,{marginTop:3}]}>{'20/2/22'}</Text> */}
                    <Text style={styles.TextStyle}>{date}</Text>
                  </View>
                </>
              ) : (
                <View>
                  <Pressable style={styles.btnStyle}>
                    <Text style={styles.btnText}>WATCH LATER</Text>
                  </Pressable>
                  <Pressable style={styles.btnStyle}>
                    <Text style={styles.btnText}>ADD TO QUEUE</Text>
                  </Pressable>
                </View>
              )}
            </View>
            <MenuList
              select_index={select_index}
              index={index}
              hideMenu={hideMenu}
            />
          </View>
        </View>
      </Hoverable>
    </Pressable>
  );
};
export default Card;

const styles = StyleSheet.create({
  wraper: {
    width: 300,
    height: 280,
    margin: 10,
    backgroundColor: "#FFFFFF",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.2)",
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: { height: 20, width: 20 },
    elevation: 2,
    marginHorizontal: 10
  },
  hover_wraper: {
    width: 300,
    height: 280,
    margin: 10,
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.2)",
    transform: [{ scale: 1.3 }],
    zIndex: 100,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: { height: 2, width: 2 },
    elevation: 2
    // marginHorizontal: 10
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5
  },
  nameStyle: {
    marginLeft: 5,
    fontSize: 12,
    fontWeight: "500"
  },
  marginHorizonal5: {
    marginHorizontal: 25,
    marginTop: 10
  },
  btnStyle: {
    padding: 7,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2"
  },
  btnText: {
    textAlign: "center",
    fontSize: 10,
    fontWeight: "500",
    color: "#676767"
  },
  menuBox: {
    alignSelf: "flex-start",
    marginLeft: 7,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30 / 2
  },

  iconStyle: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  TextStyle: {
    fontSize: 12,
    fontWeight: "500"
  }
});