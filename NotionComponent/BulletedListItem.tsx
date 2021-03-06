import { global_types } from "@types";
import React from "react";
import style from "./BulletedListItem.module.scss";
import NotionText from "./NotionText";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props extends global_types.BulletedListItem {}

// COMPONENT

const BulletedListItem = (props: Props) => {
  return (
    <ul>
      {props.bulleted_list_item.text.map((it, idx) => (
        <li key={props.id + "bullet" + idx}>
          <NotionText {...it} />
        </li>
      ))}
    </ul>
  );
};

export default BulletedListItem;
