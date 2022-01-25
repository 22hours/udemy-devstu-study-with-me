import { global_types } from "@types";
import React from "react";
import NotionText from "./NotionText";
import style from "./NumberedListItem.module.scss";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props extends global_types.NumberedItemList {}

// COMPONENT

const NumberedListItem = (props: Props) => {
  return (
    <ol>
      {props.numbered_list_item.text.map((it, idx) => (
        <li key={props.id + "number" + idx}>
          <NotionText {...it} />
        </li>
      ))}
    </ol>
  );
};

export default NumberedListItem;
