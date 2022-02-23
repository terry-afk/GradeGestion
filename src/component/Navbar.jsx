import React from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";
import {HomeOutlined, TeamOutlined} from "@ant-design/icons";

const {Item} = Menu

const Navbar = () => {
  return (
    <div className={"nav-container"}>
      <Menu theme={"dark"}>
        <Item icon={<HomeOutlined />}>
          <Link to={"/"}>Home</Link>
        </Item>
        <Item icon={<TeamOutlined />}>
          <Link to={"/session"}>Session</Link>
        </Item>
      </Menu>
    </div>
  )
}

export default Navbar