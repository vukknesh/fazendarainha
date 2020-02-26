import React, { useState } from "react";
import { Layout, Menu, Icon, Dropdown, Modal } from "antd";
import logo from "../assets/logo.png";
import { logout } from "../actions/auth";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const Dashboard = ({ logout, auth, children }) => {
  const [theme, setTheme] = useState("light");
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

      <Menu.Item key="2" onClick={() => logout()}>
        Deslogar
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout style={{ height: "100vh" }}>
      <Modal
        title="Categorias"
        centered
        visible={modal2Visible}
        onOk={() => setModal2Visible(false)}
        onCancel={() => setModal2Visible(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
      <Header
        style={{
          display: "flex",
          background: theme === "light" && "#a9f3e4",
          justifyContent: "space-between"
        }}
      >
        <div style={{ color: "white" }}>
          <img
            style={{ width: "50px", height: "auto" }}
            src={theme === "dark" ? logo : logo}
          />
        </div>

        <Dropdown
          overlay={menu}
          onVisibleChange={handleVisibleChange}
          visible={menuVisible}
        >
          <a className="ant-dropdown-link" style={{ color: "black" }} href="#">
            {auth.user?.first_name} <Icon type="down" />
          </a>
        </Dropdown>
        {/* <div style={{ color: "white" }}>Logo</div>
        <div style={{ color: "white" }}>
          <div onClick={() => efetuarLogout()}>Logout</div>
        </div> */}
      </Header>
      <Layout>
        <Sider style={{ background: theme === "light" && "#a9f3e4" }}>
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="vertical"
            theme="light"
          >
            <Menu.Item key="4">
              <Link to="/add-aulas">
                <Icon type="plus" />
                <Icon type="minus" />
                Gasto/Ganho
              </Link>
            </Menu.Item>

            <Menu.Item key="1">
              <Link to="/cadastrar-comprador">
                <Icon type="arrow-right" />
                Comprador
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/cadastrar-vendedor">
                <Icon type="arrow-left" />
                Vendedor
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <a href="#" onClick={() => setModal2Visible(true)}>
                <Icon type="unordered-list" />
                Categorias
              </a>
            </Menu.Item>

            <Menu.Item key="3">
              <Link to="/gerenciar-aulas">
                <Icon type="dollar" />
                Gerenciar Custos
              </Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to="/gerenciar-alunos">
                <Icon type="area-chart" />
                Overview
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
