import { global_types } from "@types";
import React from "react";
import withChildrenBlock from "../hoc/withChildrenBlock";
import NotionText from "./NotionText";
import style from "./Paragraph.module.scss";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props
  extends global_types.ParagraphItem,
    global_types.BlockItemBase {}

// COMPONENT

const Paragraph = (props: Props) => {
  return (
    <>
      {props.paragraph.text.map((it, idx) => (
        <NotionText key={props.id + "-" + idx} {...it} />
      ))}
      <div>{props.childComponent && props.childComponent}</div>
    </>
  );
};

export default withChildrenBlock(Paragraph);
