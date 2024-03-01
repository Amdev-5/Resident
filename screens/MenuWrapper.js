import React, { useState } from "react";
import { Menu, IconButton, Divider } from "react-native-paper"; // Import necessary components

const MenuWrapper = (props) => {
  const [visible, setVisible] = useState(false);

  const closeMenu = () => setVisible(false);
  const openMenu = () => setVisible(true);
  const handleClick = () => {
    console.log("Hello");
    closeMenu(); // Close the menu after clicking
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<IconButton {...props} icon="dots-vertical" onPress={openMenu} />}
    >
      <Menu.Item onPress={handleClick} title="Accept" />
      <Divider style={{ height: 1, color: "black", width: "100%" }} />
      <Menu.Item onPress={() => {}} title="Reject" />
      <Divider style={{ height: 1, color: "black", width: "100%" }} />
      <Menu.Item onPress={() => {}} title="Edit" />
      <Divider style={{ height: 1, color: "black", width: "100%" }} />
      <Menu.Item onPress={() => {}} title="Call" />
    </Menu>
  );
};

export default MenuWrapper;
