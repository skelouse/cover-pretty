import React from "react";
import TreeView, { TreeViewData } from "./TreeView";
import "./App.css";
import { ConfigProvider, theme } from "antd";

const { darkAlgorithm } = theme;

const App: React.FC = () => {
  const data: TreeViewData =
    (window as any).myInjectedData ?? require("./sampledata").default;

  return (
    <div className="App">
      <ConfigProvider
        theme={{
          algorithm: darkAlgorithm,
        }}
      >
        <TreeView data={data} />
      </ConfigProvider>
    </div>
  );
};

export default App;
