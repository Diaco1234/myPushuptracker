import { Menu } from "antd";

export const menu = (handleDataFetching, dropdownCategories, selectedItem) => {
  return (
    <Menu>
      {dropdownCategories.map((item) => (
        selectedItem.key !== item.key && (
          <Menu.Item
            onClick={(e) => handleDataFetching(e.key, item.value)}
            key={item.key}
          >
            {item.content}
          </Menu.Item>
        )
      ))}
    </Menu>
  );
};
