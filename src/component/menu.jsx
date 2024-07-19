import React, { useState } from "react";
import { Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { createUseStyles } from "react-jss";
import { menu } from "./items";

const dropdownCategories = [
  { key: 0, content: "Today", value: "Today" },
  { key: 1, content: "Yesterday", value: "Yesterday" },
  { key: 2, content: "Last 7 days", value: "Last_7_days" },
  { key: 3, content: "Last 14 days", value: "Last_14_days" },
  { key: 4, content: "Last 30 days", value: "Last_30_days" },
  { key: 5, content: "Last 90 days", value: "Last_90_days" },
];

const useStyles = createUseStyles(() => ({
  container: {
    position: "absolute",
    right: 10,
    "& button": {
      color: "black",
      border: "1.5px solid #EDEEF1",
      width: 150,
      borderRadius: "15px",
    }
  }
}));

const DropdownSelector = ({ fetchCustomData }) => {
  const classes = useStyles();
  const [activeTimeFrame, setActiveTimeFrame] = useState(0);

  const handleDataFetching = (key, value) => {
    setActiveTimeFrame(key);
    fetchCustomData(value);
  };

  return (
    <div className={classes.container}>
      <Dropdown
        overlay={menu(handleDataFetching, dropdownCategories, dropdownCategories[activeTimeFrame])}
      >
        <Button>
          {dropdownCategories[activeTimeFrame].content} <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default DropdownSelector;
