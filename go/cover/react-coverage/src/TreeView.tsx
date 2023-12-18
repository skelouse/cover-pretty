import { FC, useState } from "react";
import { Tree } from "antd";
import { DataNode } from "antd/es/tree";
import TreeContent from "./TreeContent";
import "./TreeView.css"
const { DirectoryTree } = Tree;

type CoverageItem = {
  Idx: number;
  Name: string;
  Body: string;
  Coverage: number;
  IsDir: boolean;
  Indent: number;
};

export type CoverageFile = CoverageItem & {
  IsDir: false;
};

type CoverageDir = CoverageItem & {
  IsDir: true;
  Files: { [filename: string]: CoverageFile };
};

export interface TreeViewData {
  Header: string;
  Files: { [filename: string]: CoverageFile | CoverageDir };
  RawFiles: CoverageFile[];
  Set: boolean;
}

type Props = {
  data: TreeViewData;
};

const TreeView: FC<Props> = ({ data }) => {
  const [selectedFile, setSelectedFile] = useState<CoverageFile | null>(null);

  const findFile = (
    path: string[],
    files: { [filename: string]: CoverageFile | CoverageDir }
  ): CoverageFile | null => {
    const [first, ...rest] = path;
    const file = files[first];
    if (file) {
      if (file.IsDir && rest.length > 0) {
        return findFile(rest, file.Files);
      } else if (!file.IsDir && rest.length === 0) {
        return file as CoverageFile;
      }
    }
    return null;
  };

  const transformToTreeData = (files: {
    [filename: string]: CoverageFile | CoverageDir;
  }): DataNode[] => {
    return Object.keys(files).map((key) => {
      const file = files[key];
      const title = file.IsDir
        ? file.Name
        : `${file.Name} (${file.Coverage.toFixed(1)}%)`;
      if (file.IsDir) {
        return {
          title: title,
          key: file.Name,
          children: transformToTreeData(file.Files),
        };
      }
      return {
        title: title,
        key: file.Name,
        isLeaf: true,
      };
    });
  };

  const treeData = transformToTreeData(data.Files);

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    const path = info.node.key.split("/");
    const file = findFile(path, data.Files);
    setSelectedFile(file);
  };

  return (
    <div className="tree-view-container">
      <h2>{data.Header + (selectedFile ? selectedFile.Name : "")}</h2>
      <div className="tree-content-container">
        <div className="tree-container">
          <DirectoryTree
            onSelect={onSelect}
            treeData={treeData}
            defaultExpandAll
            style={{color: "#a5a4a4"}}
          />
        </div>
        {selectedFile && (
          <div className="content-container">
            <TreeContent selectedFile={selectedFile} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeView;
