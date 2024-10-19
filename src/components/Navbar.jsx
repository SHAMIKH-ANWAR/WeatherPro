// Navbar.js
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Navbar = ({  setSearchQuery }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            setSearchQuery(inputValue); 
            navigate("/weather")
        }
    };

    return (
        <nav className="nav flex justify-between items-center w-full min-h-16  p-4 overflow-hidden gap-3">
            
            <div className="part1 flex items-center gap-4">
                <h2 className="text-xl hidden md:block text-white">Get Started</h2>
                <h2 className="text-xl text-white" ><Link to="/">Home</Link></h2>
            </div>

           
            <div className="part2 flex gap-4 items-center flex-grow lg:flex-grow-0">
                <input 
                    className="w-48 sm:w-56 md:w-72 h-10 border-2 rounded-lg placeholder:pl-4" 
                    type="search" 
                    placeholder="Search for weather updates" 
                    value={inputValue} // Controlled input
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <FaSearch className="cursor-pointer text-white text-lg" />

                
                <div className="hidden lg:flex gap-6">
                    <h3 className="text-xl text-white">Check your favourite cities</h3>
                    <h3 className="text-xl text-white">Menu</h3>
                    <h3 className="text-xl text-white">About us</h3>
                </div>
            </div>

            
            <GiHamburgerMenu
                className="cursor-pointer text-white w-10 h-10 lg:hidden"
                onClick={toggleSidebar}
            />

            <div
                className={`fixed top-0 right-0 w-64 h-full bg-slate-700 z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
                    isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                
                {isSidebarOpen && (
                    <MdCancel
                        className="cursor-pointer text-white text-3xl absolute top-4 right-4"
                        onClick={toggleSidebar}
                    />
                )}

                <div className="p-6 flex flex-col gap-6 text-white mt-12">
                    <h3 className="text-xl cursor-pointer">Check your favourite cities</h3>
                    <h3 className="text-xl cursor-pointer">Menu</h3>
                    <h3 className="text-xl cursor-pointer">About us</h3>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
