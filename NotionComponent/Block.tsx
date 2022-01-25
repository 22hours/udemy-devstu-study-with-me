import { global_types } from "@types";
import dynamic from "next/dynamic";
import Bookmark from "./Bookmark";
import BulletedListItem from "./BulletedListItem";
import Callout from "./Callout";
import ColumnList from "./ColumnList";
import Heading from "./Heading";
import NotionImage from "./NotionImage";
import NumberedListItem from "./NumberedListItem";
import Paragraph from "./Paragraph";

interface BlockProps {
  block: global_types.Block;
}

const Code = dynamic(() => import("./Code"), { ssr: false });

const Block = ({ block }: BlockProps) => {
  const { id, type } = block;
  const idBase = `${id}-${type}`;

  switch (block.type) {
    case "paragraph":
      return <Paragraph {...block} />;
    case "heading_1":
    case "heading_2":
    case "heading_3":
      return <Heading {...(block as global_types.HeadingItem)} />;
    case "code":
      return <Code {...(block as global_types.CodeItem)} />;
    case "column_list":
      return <ColumnList {...(block as global_types.ColumnListItem)} />;
    case "bookmark":
      return <Bookmark {...(block as global_types.BookmarkItem)} />;
    case "bulleted_list_item":
      return <BulletedListItem {...(block as global_types.BulletedListItem)} />;
    case "numbered_list_item":
      return <NumberedListItem {...(block as global_types.NumberedItemList)} />;
    case "callout":
      return <Callout {...(block as global_types.CalloutItem)} />;
    case "image":
      return <NotionImage {...(block as global_types.ImageItem)} />;
    default: {
      console.log(`
      `);
      return (
        <div>
          {block.id} {block.type}
        </div>
      );
    }
  }

  // switch (type) {

  //   case "bulleted_list_item":
  //   case "numbered_list_item":
  //     return <li>{value.text}</li>;
  //   case "to_do":
  //     return (
  //       <div>
  //         <label htmlFor={id}>
  //           <input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
  //           {value.text}
  //         </label>
  //       </div>
  //     );

  //   case "child_page":
  //     return <p>{value.title}</p>;
  //   case "image":
  //     const src =
  //       value.type === "external" ? value.external.url : value.file.url;
  //     const caption = value.caption ? value.caption[0].plain_text : "";
  //     return (
  //       <figure>
  //         <img src={src} alt={caption} />
  //         {caption && <figcaption>{caption}</figcaption>}
  //       </figure>
  //     );
  //   default:
  //     return `❌ Unsupported block (${
  //       type === "unsupported" ? "unsupported by Notion API" : type
  //     })`;
  // }
};
export default Block;
