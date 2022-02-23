import React from "react";
import {Col, Row, Statistic, Typography} from "antd";
import {Link} from "react-router-dom";
import {Session} from "./index";

const { Title } = Typography

const Homepage = () => {
  return (
    <>
      <Title level={2} className={"heading"}>Global Session stats</Title>
      <Row>
        <Col span={8}><Statistic title={"Total session"} value={10}/></Col>
        <Col span={8}><Statistic title={"Total inscriptions"} value={25}/></Col>
      </Row>
      <div className={"home-heading-container"}>
        <Title level={2} className={"home-title"}>Last sessions</Title>
        <Title level={3} className={"show-more"}><Link to={"/session"}>Show More</Link></Title>
      </div>
      <Session simplified/>
    </>
  )
}

export default Homepage