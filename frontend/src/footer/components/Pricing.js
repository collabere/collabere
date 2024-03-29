import React, { Fragment, useEffect } from "react";
import HomeNavBar from "../../homepage/components/Navbar";
import { Card, Col, Row } from "antd";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Fragment>
      <HomeNavBar />
      <div
        style={{ background: "#9577cb", padding: "2rem", marginTop: "2rem" }}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Card title="Trial" bordered={true}>
              Validity: 1 month
              <h4 style={{ paddingTop: "2rem" }}>Free</h4>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Monthly" bordered={false}>
              Validity: 1 month
              <h4 style={{ paddingTop: "2rem" }}>Rs 350/-</h4>
            </Card>
          </Col>
        </Row>
        <Row gutter={24} style={{ paddingTop: "4rem" }}>
          <Col span={12}>
            <Card title="Quaterly" bordered={false}>
              Validity: 1 month
              <h4 style={{ paddingTop: "2rem" }}>Rs 1000/-</h4>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Semi-Annual" bordered={false}>
              Validity: 1 month
              <h4 style={{ paddingTop: "2rem" }}>Rs 1800/-</h4>
            </Card>
          </Col>
        </Row>
        <Row gutter={24} style={{ paddingTop: "4rem" }}>
          <Col span={12}>
            <Card title="Annual" bordered={false}>
              Validity: 1 month
              <h4 style={{ paddingTop: "2rem" }}>Rs 3150/-</h4>
            </Card>
          </Col>
        </Row>
      </div>
      ,
    </Fragment>
  );
}
