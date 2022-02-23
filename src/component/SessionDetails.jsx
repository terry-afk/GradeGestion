import React, {useEffect, useState} from "react";
import { Table, Typography } from "antd";
import {useParams} from "react-router-dom";
import {db} from "../config/firebase";
import {getDoc, doc} from "firebase/firestore";

const { Title } = Typography

const SessionDetails = () => {

  const { id } = useParams()

  const [data, setData] = useState([])
  const [session, setSession] = useState("")

  useEffect(() => {
    async function fetchData() {
      const docSnap = await getDoc(doc(db, "Sessions", id))
      if(docSnap.exists()) {
        let tempData = []
        docSnap.data().participant.forEach((item, _) => {
          let tmpObject = {
            name: item.last + " " + item.first,
            khion: item.khion,
            ippon_kumite: item.ippon_kumite,
            kata: item.kata,
            note: item.note,
            ceinture: item.ceinture
          }
          tempData.push(tmpObject)
        })
        setSession(docSnap.data().date.day.toDate().toLocaleDateString())
        setData(tempData)
      }
    }
    fetchData().then(() => {})
  }, [id])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Khion',
      dataIndex: 'khion',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.khion - b.khion,
    },
    {
      title: 'Khion Ippon Kumite',
      dataIndex: 'ippon_kumite',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.ippon_kumite - b.ippon_kumite,
    },
    {
      title: 'Kata',
      dataIndex: 'kata',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.kata - b.kata,
    },
    {
      title: 'Note',
      dataIndex: 'note',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.note - b.note,
    },
    {
      title: "Ceinture obtenue",
      dataIndex: 'ceinture',
    }
  ]

  return (
    <>
      <Title level={2} className={"heading"}>{session}</Title>
      <Table pagination={false} columns={columns} dataSource={data}/>
    </>
  )
}

export default SessionDetails