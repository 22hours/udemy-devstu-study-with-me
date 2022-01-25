import { global_types } from "@types";
import Image from "next/image";
import React from "react";
import style from "./NotionImage.module.scss";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props extends global_types.ImageItem {}

// COMPONENT

const NotionImage = (props: Props) => {
  return (
    <img
      className={style.img}
      alt={props.image.file.url}
      src={props.image.file.url}
    />
  );
};

export default NotionImage;
