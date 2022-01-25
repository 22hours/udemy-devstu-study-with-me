declare module "@types" {
  export namespace global_types {
    interface DatabaseProperties {
      Name: {
        id: string;
        title: {
          annotations: {
            [Key: string]: string;
          };
          plain_text: string;
        }[];
      };
      [other: string]: any;
    }

    interface Database {
      db: {
        results: {
          archived: boolean;
          cover: {
            expiry_time: string;
            url: string;
          };
          created_time: string;
          object: "page";
          id: string;
          last_edited_time: string;
          url: string;
          properties: DatabaseProperties;
        }[];
      };
      [Key: string]: any;
    }
    interface Page {
      id: string;
      last_edited_time: string;
      cover: string;
      url: string;
      created_time: string;
      pageTitle: string;
      pageAnnotations: any;
      study_lecture: string;
      study_topic_list: string[];
    }

    type PageList = Page[];

    interface Block {
      archived: boolean;
      created_time: string;
      has_children: boolean;
      id: string;
      last_edited_time: string;
      object: string;
      type: string;
      [key: string]: any;
    }

    interface BlockWithChildren extends Block {
      has_children: true;
      children: Object;
    }

    interface BlockWithoutChildren extends Block {
      has_children: false;
    }

    interface TextItemBase {
      plain_text: string;
      annotations: {
        bold: boolean;
        code: boolean;
        color: string;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        [option: string]: string | boolean;
      };
      text: {
        content: string;
        link: string;
      };
    }

    interface ParagraphItem extends Block {
      paragraph: {
        text: TextItemBase[];
        children?: Block[];
      };
    }

    interface HeadingBase extends Block {
      type: "heading_1" | "heading_2" | "heading_3";
    }

    interface HeadingOneItem extends HeadingBase {
      heading_1: {
        text: TextItemBase[];
        children?: Block[];
      };
    }
    interface HeadingTwoItem extends HeadingBase {
      heading_2: {
        text: TextItemBase[];
        children?: Block[];
      };
    }
    interface HeadingThreeItem extends HeadingBase {
      heading_3: {
        text: TextItemBase[];
        children?: Block[];
      };
    }
    type HeadingItem = HeadingOneItem | HeadingTwoItem | HeadingThreeItem;

    interface CodeItem extends Block {
      code: {
        caption: any[];
        language: string;
        text: TextItemBase[];
      };
    }

    interface ColumnItem extends Block {
      column: {
        children: Block[];
      };
    }

    interface ColumnListItem extends Block {
      column_list: {
        children: ColumnItem[];
      };
    }

    interface BookmarkItem extends Block {
      bookmark: {
        caption: any[];
        url: string;
      };
    }

    interface CalloutItem extends Block {
      callout: {
        icon: {
          type: string;
          [other: string]: string;
        };
        text: TextItemBase[];
      };
    }

    interface ImageItem extends Block {
      image: {
        caption: any[];
        file: {
          expiry_time: string;
          url: string;
        };
        type: string;
      };
    }

    interface BulletedListItem extends Block {
      bulleted_list_item: {
        text: TextItemBase[];
      };
    }

    interface NumberedItemList extends Block {
      numbered_list_item: {
        text: TextItemBase[];
      };
    }

    interface BlockItemBase {
      id: string;
      childComponent?: ReactNode;
    }
  }
}
