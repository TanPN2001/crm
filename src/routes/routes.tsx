
import OrderList from "../components/Content/Orders/OrderLists/OrderLists";
import ProductsList from "../components/Content/Products/ProductsList/ProductsList";
import CreateProduct from "../components/Create/CreateProduct/CreateProduct";
import CreateOrder from "../components/Create/CreateOrder/CreateOrder";
import Login from "../page/Login/Login";
import Register from "../page/Register/Register";

const privateRoutes = [
    {path: '/order', component: OrderList},
    {path: '/order/create', component: CreateOrder},
    {path: '/product', component: ProductsList},
    {path: '/product/create', component: CreateProduct},
]

const publicRoutes = [
    {path: '/login', component: Login},
    {path: 'register', component: Register}
]

export {publicRoutes, privateRoutes}