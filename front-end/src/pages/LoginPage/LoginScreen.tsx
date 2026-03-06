import { AnimatePresence } from "motion/react"
import Login from "../../features/Login/Login"

const LoginScreen = () => {
    return (
        <AnimatePresence>
            <div className="min-h-screen w-full bg-(--bg-base) flex overflow-hidden">
                <Login />
            </div>
        </AnimatePresence>
    )
}

export default LoginScreen
