import React, { Component } from "react";
import { Drawer, Divider, Tree } from "antd";

function genChild(parentKey, key, data, index) {
  if (typeof data === "object") {
    const ret = {
      title: key,
      key: `${parentKey}#${key}`,
      children: [],
    };

    Object.entries(data).forEach(([k, v], i) => {
      ret.children.push(genChild(ret.key, k, v, i));
    });

    return ret;
  }

  return {
    title: key,
    key: `${parentKey}#${key}`,
    children: [
      {
        title: data,
        key: `${parentKey}#${key}#${index}`,
        children: [],
      },
    ],
  };
}

function genSegment(data) {
  const segmentId = data.get(`${data.type}.1`) || "";
  const ret = {
    title: data.type,
    key: `${data.type}#${segmentId}`,
    children: [],
  };

  Object.entries(data.data).forEach(([k, v], i) => {
    ret.children.push(genChild(ret.key, k, v, i));
  });

  return ret;
}

function genTree(data) {
  const ret = [];

  data?.message.getSegments().forEach((segment) => {
    ret.push(genSegment(segment));
  });

  return ret;
}

export class HL7ParseView extends Component {
  render() {
    const { data, visible, close } = this.props;

    if (!data) return;

    const treeData = genTree(data);

    return (
      <Drawer
        width={300}
        placement="right"
        onClose={close}
        closable={false}
        open={visible}
      >
        <div className="text-center mt-3">
          <h3 className="mt-2 mb-0">HL7 PARSE</h3>
        </div>
        <Divider dashed />
        <Tree defaultExpandAll showLine treeData={treeData} />
      </Drawer>
    );
  }
}

export default HL7ParseView;
