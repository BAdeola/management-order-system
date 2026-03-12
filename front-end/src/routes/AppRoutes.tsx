import { BrowserRouter, Route, Routes } from "react-router-dom"
import MenuLayout from "../layout/MenuLayout/MenuLayout"
import { DashboardFeature } from "../features/dashboard/DashboardFeature"
import LoginScreen from "../pages/LoginPage/LoginScreen"

const AppRoutes = () => {
    return (
        <BrowserRouter basename="/baffs/criar_pedidos">
            <Routes>
                <Route path="/" element={<LoginScreen />}/>

                <Route path="/menu" element={<MenuLayout />}>
                    <Route index element={<DashboardFeature />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
