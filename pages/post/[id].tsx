import { global_types } from "@types";
import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import { getBlocks, getPage, getPagesFromDatabase } from "../../lib/notion";
import Block from "../../NotionComponent/Block";
import style from "./Post.module.scss";

// ANTD

// COMPS

// STATICS

// TYPES

type Props = {
  blocks: global_types.Block[];
};

// COMPONENT

const Post = (props: Props) => {
  console.log(props);
  // const [state, setState] = useState<global_types.Block[]>([]);

  // useEffect(() => {
  //   const localData = localStorage.getItem("blocks");
  //   if (localData) {
  //     setState(JSON.parse(localData));
  //   }
  // }, []);

  // useEffect(() => {
  //   if (props.blocks) {
  //     localStorage.setItem("blocks", JSON.stringify(props.blocks));
  //   }
  // }, [props.blocks]);

  return (
    <div>
      <MainLayout>
        {props.blocks.map((it, idx) => (
          <Block key={it.id} block={it} />
        ))}
      </MainLayout>
    </div>
  );
};

export const getStaticPaths = async () => {
  const databaseId = process.env.NOTION_DATABASE;
  const pages = await getPagesFromDatabase(databaseId);
  return {
    paths: pages.map((page) => ({ params: { id: page.id } })),
    fallback: true,
  };
};

export const getStaticProps = async (ctx) => {
  const { id } = ctx.params;
  const page = await getPage(id);
  const blocks = await getBlocks(id);

  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );
  const blocksWithChildren = blocks.map((block) => {
    if (block.has_children && !block[block.type].children) {
      block[block.type]["children"] = childBlocks.find(
        (x) => x.id === block.id
      )?.children;
    }
    return block;
  });

  const ChildBlockhasChildren = blocksWithChildren
    .filter((block) => block.has_children)
    .reduce((acc, block) => {
      const ChildBlockWithChildren = block[block.type].children.filter(
        (child_block) => child_block.has_children
      );
      return acc.concat(ChildBlockWithChildren);
    }, []);

  const ChildBlockWithChildren = await Promise.all(
    ChildBlockhasChildren.map(async (block) => {
      return {
        id: block.id,
        children: await getBlocks(block.id),
      };
    })
  );

  const blocksWithDoubleDepthChildren = blocksWithChildren.map((block) => {
    if (block.has_children) {
      const block_children = block[block.type].children.map((child_block) => {
        if (child_block.has_children) {
          child_block[child_block.type]["children"] =
            ChildBlockWithChildren.find(
              (x) => x.id === child_block.id
            ).children;
        }
        return child_block;
      });

      block[block.type].children = block_children;
    }
    return block;
  });

  return {
    props: {
      blocks: blocksWithDoubleDepthChildren,
    },
    revalidate: 1,
  };
};

export default Post;
