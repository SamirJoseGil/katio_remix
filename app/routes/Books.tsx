import NavBar from "../components/Navbar"
import Footer from "../components/Footer"

export default function books() {
    return (
        <div className="h-screen items-center justify-center bg-teal-100">
            <NavBar />
            <h1 className="">books!</h1>
            <div className="Navbar">

            </div>
            <button className="btn btn-primary"><a href="/">Inicio</a></button>
            <Footer />
        </div>
    )
}