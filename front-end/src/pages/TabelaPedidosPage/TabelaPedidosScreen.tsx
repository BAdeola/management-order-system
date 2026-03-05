import { AnimatePresence } from "motion/react"
import TabelaPedidos from "../../features/TabelaPedidos/TabelaPedidos"
import MenuLayout from "../../layout/MenuLayout/MenuLayout"
import type { Order } from "../../features/TabelaPedidos/interfaces";

const mockOrders: Order[] = [
  { 
    id: 1, 
    vendorName: "Ambev", 
    date: "05/03/2026", 
    status: "Concluído", 
    createdBy: "Brayan" 
  },
  { 
    id: 2, 
    vendorName: "Nestlé", 
    date: "04/03/2026", 
    status: "Pendente", 
    createdBy: "Dener" 
  },
];

const TabelaPedidosScreen = () => {
    return (
        <AnimatePresence>
            <MenuLayout>
                <TabelaPedidos orders={mockOrders} />
            </MenuLayout>
        </AnimatePresence >
    )
}

export default TabelaPedidosScreen
