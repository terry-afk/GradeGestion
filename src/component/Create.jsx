import React from "react";
import {DatePicker, Input, Typography, TimePicker, Select, Form, Button, Space} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import { addDoc, collection } from "firebase/firestore";
import {db} from "../config/firebase";
import {Timestamp} from "firebase/firestore";

const { Title } = Typography
const { Option } = Select
const { RangePicker } = TimePicker
const { Item, List, ErrorList } = Form

const Create = () => {

  const children = [
    <Option key={"blanche"}>blanche</Option>,
    <Option key={"demi-jaune"}>demi-jaune</Option>,
    <Option key={"jaune"}>jaune</Option>,
    <Option key={"demi-orange"}>demi-orange</Option>,
    <Option key={"orange"}>orange</Option>,
    <Option key={"demi-verte"}>demi-verte</Option>,
    <Option key={"verte"}>verte</Option>,
    <Option key={"demi-bleue"}>demi-bleue</Option>,
    <Option key={"bleue"}>bleue</Option>,
  ]

  const onFinish = async (value) => {
    value.participant.forEach((item, _) => {
      item["khion"] = 0
      item["ippon_kumite"] = 0
      item["kata"] = 0
      item["note"] = item["khion"] + item["ippon_kumite"] + item["kata"]
    })
    const docData = {
      open: true,
      date: {
        day: Timestamp.fromDate(new Date(value.date.day)),
        hour: {
          start: Timestamp.fromDate(new Date(value.date.hours[0])),
          end: Timestamp.fromDate(new Date(value.date.hours[1]))
        }
      },
      ceintures: value.ceintures,
      participant: value.participant
    }
    await addDoc(collection(db, "Sessions"), docData)
  }

  return (
    <>
      <Title level={2} className={"heading"}>Create new session</Title>
      <Form onFinish={onFinish}>
        <List name={"date"}>
          {() => (
            <>
              <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Item name={"day"} rules={[{ required: true, message: "Date manquante"}]}>
                  <DatePicker/>
                </Item>
                <Item name={"hours"} rules={[{ required: true, message: "Horraire manquante"}]}>
                  <RangePicker/>
                </Item>
              </Space>
            </>
          )}
        </List>
        <Item name={"ceintures"} rules={[{ required: true, message: "Ceintures manquante"}]}>
          <Select mode="multiple" allowClear placeholder="Please select" style={{ width: '50%' }} rules={[{required: true}]}>
            {children}
          </Select>
        </Item>
        <List name={"participant"} rules={[{validator: async (_, participant) => {
            if (!participant || participant.length < 1) {
              return Promise.reject(new Error("Au moins 1 participants"));
            }
          }}]}>
          {(fields, { add, remove }, {errors}) => (
            <>
              {fields.map(({key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Item {...restField} name={[name, "first"]} rules={[{ required: true, message: "Prénom manquant"}]}>
                    <Input placeholder={"Prénom"}/>
                  </Item>
                  <Item {...restField} name={[name, "last"]} rules={[{ required: true, message: "Nom de famille manquant"}]}>
                    <Input placeholder={"Nom de famille"}/>
                  </Item>
                  <Item {...restField} name={[name, "ceinture"]} rules={[{ required: true, message: "Ceinture manquante"}]}>
                    <Select  placeholder="Ceinture" style={{ width: '100%' }}>
                      {children}
                    </Select>
                  </Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Item>
                <Button type={"dashed"} onClick={() => add()} block icon={<PlusOutlined />}>
                  Ajouter un participant
                </Button>
                <ErrorList errors={errors} />
              </Item>
            </>
          )}
        </List>
        <Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Item>
      </Form>
    </>
  )
}

export default Create