import React, { Component } from "react";
import { Drawer, Divider } from "antd";

export class HL7RawView extends Component {
  render() {
    const { data, visible, close } = this.props;
    return (
      <Drawer
        width={300}
        placement="right"
        onClose={close}
        closable={false}
        open={visible}
      >
        <div className="text-center mt-3">
          <h3 className="mt-2 mb-0">HL7 MESSAGE</h3>
        </div>
        <Divider dashed />
        <div className="">
          <h6 className="text-muted text-uppercase mb-3">ID</h6>
          <p>
            <span className="ml-3 text-dark">{data?.id}</span>
          </p>
        </div>
        <div className="">
          <h6 className="text-muted text-uppercase mb-3">PAYLOAD</h6>
          <p>
            <span className="ml-3 text-dark">{data?.payload}</span>
          </p>
        </div>
      </Drawer>
    );
  }
}

export default HL7RawView;
