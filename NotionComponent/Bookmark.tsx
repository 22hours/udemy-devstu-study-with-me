import { global_types } from "@types";
import React from "react";
import style from "./Bookmark.module.scss";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props extends global_types.BookmarkItem {}

// COMPONENT

const Bookmark = (props: Props) => {
  return <a href={props.bookmark.url}>{props.bookmark.url}</a>;
};

export default Bookmark;
