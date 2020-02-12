import React, { useState } from "react";
import { Layout, Menu, Icon, Dropdown, Switch } from "antd";
import logobranca from "../assets/logobranca.png";
import logopreta from "../assets/logopreta.png";
import { logout } from "../actions/auth";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const Dashboard = ({ logout, auth, children }) => {
  const [theme, setTheme] = useState("dark");
  const [modal2Visible, setModal2Visible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [conteudo, setConteudo] = useState(1);
  const handleMenuClick = e => {
    if (e.key === "3") {
      setMenuVisible(false);
    }
  };

  const handleVisibleChange = flag => {
    setMenuVisible(flag);
  };

  let content;

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Config.</Menu.Item>
      <Menu.Item key="2">
        <Switch
          defaultChecked
          onChange={checked => {
            if (checked) return setTheme("dark");
            setTheme("light");
          }}
        />
      </Menu.Item>
      <Menu.Item key="3" onClick={() => logout()}>
        Deslogar
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout style={{ height: "100vh" }}>
      {/* <Modal
        title="Vertically centered modal dialog"
        centered
        visible={modal2Visible}
        onOk={() => setModal2Visible(false)}
        onCancel={() => setModal2Visible(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal> */}
      <Header
        style={{
          display: "flex",
          background: theme === "light" && "#ccc2b8",
          justifyContent: "space-between"
        }}
      >
        <div style={{ color: "white" }}>
          <img
            style={{ width: "50px", height: "auto" }}
            src={theme === "dark" ? logobranca : logopreta}
          />
        </div>

        <Dropdown
          overlay={menu}
          onVisibleChange={handleVisibleChange}
          visible={menuVisible}
        >
          <a
            className="ant-dropdown-link"
            style={theme === "light" ? { color: "black" } : { color: "white" }}
            href="#"
          >
            {auth.user?.first_name} <Icon type="down" />
          </a>
        </Dropdown>
        {/* <div style={{ color: "white" }}>Logo</div>
        <div style={{ color: "white" }}>
          <div onClick={() => efetuarLogout()}>Logout</div>
        </div> */}
      </Header>
      <Layout>
        <Sider style={{ background: theme === "light" && "#ccc2b8" }}>
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="vertical"
            theme={theme}
          >
            <Menu.Item key="1">
              <Link to="/cadastrar-aluno">
                <Icon type="user-add" />
                Cadastrar Aluno
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/gerenciar-alunos">
                <Icon type="user" />
                Gerenciar Alunos
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/gerenciar-aulas">
                <Icon type="calendar" />
                Gerenciar Aulas
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/add-aulas">
                <Icon type="calendar" />
                Add Aulas
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ width: "100%", margin: "3px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logout })(Dashboard);
