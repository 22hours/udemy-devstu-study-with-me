import { global_types } from "@types";
import React from "react";
import style from "./Code.module.scss";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
// ANTD

// COMPS

// STATICS

// TYPES

interface Props extends global_types.CodeItem {}

// COMPONENT

const Code = (props: Props) => {
  const { code } = props;
  return (
    <SyntaxHighlighter language={code.language} style={docco}>
      {code.text.map((it) => it.plain_text).join("")}
    </SyntaxHighlighter>
  );
};

export default Code;
