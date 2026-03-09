import { AnimatePresence } from "motion/react"
import MenuLayout from "../../layout/MenuLayout/MenuLayout"
import { DashboardFeature } from "../../features/dashboard/DashboardFeature";


const TabelaPedidosScreen = () => {
    return (
        <AnimatePresence>
            <MenuLayout>
                <DashboardFeature />
            </MenuLayout>
        </AnimatePresence >
    )
}

export default TabelaPedidosScreen
