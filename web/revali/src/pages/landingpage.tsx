import { useNavigate } from "react-router-dom"
import revaliLogo from "../../public/revali-logo (1).png"
import revaliBird from "../../public/RevaliBird.png"
import { Phone, Mail } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

import '../index.css'


export function Landingpage() {
    const navigate = useNavigate();

    function handleLogin() {
        navigate('/login')
    }

    return (
        <div className="h-screen max-h-screen overflow-y-auto bg-[#FCFCE4] scroll-smooth">
            <header id="home" className="flex justify-between items-center bg-green-dark text-white py-10 px-5">
                <img src={revaliLogo} alt="Logo" className="w-44 mt-[-20px]" />
                <div className="flex flex-row gap-10 md:gap-20 font-raleway-regular">
                    <a href="#home" className="cursor-pointer relative inline-block hover:after:w-full after:transition-width after:duration-300 after:ease-out after:absolute after:left-1/2 after:bottom-0 after:-translate-x-1/2 after:w-0 after:h-px after:bg-white">Home</a>
                    <a href="#about" className="cursor-pointer relative inline-block hover:after:w-full after:transition-width after:duration-300 after:ease-out after:absolute after:left-1/2 after:bottom-0 after:-translate-x-1/2 after:w-0 after:h-px after:bg-white">Sobre</a>
                    <a href="#contacts" className="cursor-pointer relative inline-block hover:after:w-full after:transition-width after:duration-300 after:ease-out after:absolute after:left-1/2 after:bottom-0 after:-translate-x-1/2 after:w-0 after:h-px after:bg-white">Contatos</a>
                </div>
                <button onClick={handleLogin} className="border border-green-medium py-1 px-6 rounded-[100px] hover:bg-green-medium transform transition-transform duration-300 hover:scale-105">Entrar</button>
            </header>


            <section className="container mx-auto flex flex-col lg:flex-row items-center justify-between py-16 px-6">

                <div className="flex-1">
                    <h2 className="text-4xl font-raleway-bold text-green-medium mb-4">Providing Industry Leading Solutions for</h2>
                    <p className="font-raleway-semibold text-green-dark mb-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Habitant cras morbi hendrerit nunc vel sapien.
                        In habitasse at diam suspendisse non vitae fermentum, pharetra arcu. Viverra a morbi ut donec in. Ac
                        diam, at sed cras nisi.
                    </p>
                </div>

                <div className="flex-1 flex justify-center">
                    <img src={revaliBird} alt="Bird Illustration" className="w-2/3 max-w-sm" />
                </div>
            </section>


            <section id="about" className="py-16">
                <div className="max-w-8xl mx-auto px-6">
                    <div className="bg-green-medium p-8 shadow-lg flex flex-row items-center rounded-[500px]">

                        <div className="flex px-16 py-32 rounded-tl-[500px] rounded-bl-[500px] bg-[#FAF9E2] text-left">
                            <h3 className="text-3xl font-raleway-bold text-green-dark mb-4">
                                <span className="block">About</span>
                                <span className="block">Company</span>
                            </h3>
                        </div>

                        <div className="w-[1000px] text-center lg:text-left">
                            <p className="font-raleway-semibold text-green-dark leading-8 ml-1 lg:ml-28">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget duis mi nunc bibendum. Tellus elementum nec lorem
                                eget dictumst. Risus in gravida eu, enim lorem. Sed consequat ut suspendisse eros. Nunc nunc accumsan, viverra
                                enim. Mi.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget duis mi nunc bibendum. Tellus elementum nec lorem
                                eget dictumst. Risus in gravida eu, enim lorem. Sed consequat ut suspendisse eros. Nunc nunc accumsan, viverra
                                enim. Mi.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget duis mi nunc bibendum. Tellus elementum nec lorem
                                eget dictumst. Risus in gravida eu, enim lorem. Sed consequat ut suspendisse eros. Nunc nunc accumsan, viverra
                                enim. Mi.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-raleway-bold text-center mb-12">Our Services</h2>
                    <div className="flex flex-col gap-12">

                        <div className="flex flex-col lg:flex-row items-center bg-green-dark text-cream p-8 shadow-lg rounded-tr-[500px] rounded-br-[500px] min-h-[400px]">
                            <div className="flex-1 text-left">
                                <h3 className="text-xl font-raleway-bold text-green-regular mb-2">Non-IT enterprises</h3>
                                <p className="text-cream text-white max-w-[50%]">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat bibendum sit felis, sollicitudin et. Nulla aliquet integer hac ac morbi.
                                </p>
                            </div>
                        </div>


                        <div className="flex flex-col lg:flex-row items-center bg-green-dark text-cream text-white p-8 shadow-lg rounded-tl-[500px] rounded-bl-[500px] min-h-[400px]">
                            <div className="flex-1 text-right">
                                <h3 className="text-xl font-raleway-bold text-green-regular mb-2">Software product companies</h3>
                                <p className="text-cream text-white max-w-[50%] ml-auto">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit viverra porta tortor, elementum ultrices. Blandit quam nec aliquam.
                                </p>
                            </div>
                        </div>




                        <div className="flex flex-col lg:flex-row items-center bg-green-dark text-cream text-white p-8 shadow-lg rounded-tr-[500px] rounded-br-[500px] min-h-[400px]">
                            <div className="flex-1 text-left">
                                <h3 className="text-xl font-raleway-bold text-green-regular mb-2">Non-IT enterprises</h3>
                                <p className="text-cream text-white max-w-[50%]">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit viverra porta tortor, elementum ultrices. Blandit quam nec aliquam.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <footer id="contacts" className="bg-[#1f3d33] text-white py-6">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">
                    
                    <div className="mb-4 md:mb-0">
                        <h4 className="text-2xl font-ltrenovate-bold">REVALI</h4>
                    </div>

                    <div className="mb-4 md:mb-0">
                        <p className="font-raleway-medium">Revali, © All Rights Reserved</p>
                    </div>

                    <div className="flex flex-col items-start">
                        <div className="flex flex-col items-center md:items-start mb-6 gap-1">
                            <p className="flex items-center font-raleway-semibold">
                                <Phone className="mr-2" size={16} /> (00) 00000-0000
                            </p>
                            <p className="flex items-center font-raleway-semibold">
                                <Mail className="mr-2" size={16} /> example@email.com
                            </p>
                        </div>
                        <div className="flex space-x-4">
                            <a href="#" className="text-white hover:text-gray-300">
                                <FaFacebook size={16} />
                            </a>
                            <a href="https://www.instagram.com/revali.app?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="blank" className="text-white hover:text-gray-300">
                                <FaInstagram size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
}