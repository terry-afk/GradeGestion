import React, {useEffect, useState} from "react";
import {BackTop, Button, Col, Collapse, Row, Statistic} from "antd";
import {Link} from "react-router-dom";
import {SettingOutlined} from "@ant-design/icons";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../config/firebase";

const { Panel } = Collapse
const Session = ({simplified}) => {

  const style = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  };

  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "Sessions"))
      let tempData = []
      querySnapshot.forEach((doc) => {
        tempData.push(doc)
      })
      setData(tempData)
    }
    fetchData().then(() => {})
  })

  return (
    <>
      {!simplified && (
        <div className={"new-session"}>
          <Button type="secondary" href={"/create"}>Start new sessions</Button>
        </div>
      )}
      <Row>
        <Col span={24}>
          <Collapse accordion expandIconPosition={"right"}>
            {
              data.map((session) => (
                <Panel header={session.data().date.day.toDate().toLocaleDateString()} extra={<Link to={`/session/${session.id}`}><SettingOutlined /></Link>}>
                  <Row>
                    <Col span={6}><Statistic title={"Date"} value={session.data().date.day.toDate().toLocaleDateString()}/></Col>
                    <Col span={6}><Statistic title={"Nombre d'inscrit"} value={session.data().participant.length}/></Col>
                    <Col span={6}><Statistic title={"Réussite"} value={"60%"}/></Col>
                    <Col span={6}><Statistic title={"Ouvert"} value={session.data().open ? "Oui" : "Non"}/></Col>
                  </Row>
                </Panel>
              ))
            }
          </Collapse>
        </Col>
      </Row>
      <BackTop>
        <div style={style}>UP</div>
      </BackTop>
    </>
  )
}

export default Session