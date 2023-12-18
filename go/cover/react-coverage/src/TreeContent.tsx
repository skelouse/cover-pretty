import { FC } from "react";
import { CoverageFile } from "./TreeView";
import "./TreeContent.css";

type Props = {
  selectedFile: CoverageFile;
};

const TreeContent: FC<Props> = ({ selectedFile }) => {
  const formatContent = (content: string) => {
    return content
      .replace(/\\u003c/g, "<")
      .replace(/\\u003e/g, ">")
      .replace(/\\u0026/g, "&")
      .replace(/\n/g, "<br>");
  };

  return (
    <>
      <pre
        className="file-content"
        dangerouslySetInnerHTML={{ __html: formatContent(selectedFile.Body) }}
      ></pre>
    </>
  );
};
export default TreeContent;
