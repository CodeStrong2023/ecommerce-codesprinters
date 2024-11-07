import { MenuOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
const items = [
  {
    label: <a href="/">Inicio</a>,
    key: "0",
  },
  {
    label: <a href="/products/">Productos</a>,
    key: "1",
  },
  {
    label: <a href="/login">Iniciar Sesión</a>,
    key: "2",
  },
  {
    label: <a href="/register">Registrarse</a>,
    key: "3",
  },
  {
    type: "divider",
  },
  {
    label: <a href="/cart">Carrito</a>,
    key: "4",
  },
];
const MenuList = () => (
  <Dropdown
    menu={{
      items,
    }}
    trigger={["click"]}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        <MenuOutlined />
      </Space>
    </a>
  </Dropdown>
);
export default MenuList;
