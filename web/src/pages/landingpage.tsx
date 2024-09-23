import { useNavigate } from "react-router-dom"
import revaliLogo from "/revali-logo (1).png"
import revaliBird from "/RevaliBird.png"
import { Mail, X } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { toast } from "sonner";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import HamburgerMenu from 'react-hamburger-menu';


import '../index.css'
import pitch from '../assets/pitch.jpg'
import bancodealimentos from '../assets/bancodealimentos.jpeg'
import sponsors from '../assets/sponsors.jpg'
import ODS2 from '../assets/ods-2.png'
import ODS12 from '../assets/ods-12.jpg'
import seloProex from '../assets/seloProexBranco.png'
import backgroundBird from '../assets/fundoRevali.png'
import { useState } from "react";



export function Landingpage() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();


    function handleLogin() {
        navigate('/login')
        toast.info('Página de login apenas para o banco de alimentos')
    }

    return (
        <div className="h-screen max-h-screen overflow-y-auto bg-[#FCFCE4] scroll-smooth">
            <header id="home" className="flex justify-between items-center bg-green-dark text-white py-10 px-14">
                <img src={revaliLogo} alt="Logo" className="w-44 mt-[-20px]" />

                <div className="absolute top-[26px] right-0 mt-6 mr-6 sm:hidden">
                    <HamburgerMenu
                        isOpen={isOpen}
                        menuClicked={() => setIsOpen(!isOpen)}
                        width={24}
                        height={20}
                        strokeWidth={2}
                        color='white'
                        borderRadius={0}
                        animationDuration={0.5}
                    />
                </div>
                
                {/* Menu Desktop */}
                <div className={`flex flex-row gap-1 md:gap-10 font-raleway-regular sm:flex ${isOpen ? 'block' : 'hidden'} sm:block`}>
                    <a href="#home"
                        className="font-ltrenovate-bold cursor-pointer relative inline-block hover:after:w-full after:transition-width after:duration-300 after:ease-out after:absolute after:left-1/2 after:bottom-0 after:-translate-x-1/2 after:w-0 after:h-px after:bg-white">PÁGINA INICIAL</a>
                    <span className="border-l border-white h-6"></span>
                    <a href="#about"
                        className="font-ltrenovate-bold cursor-pointer relative inline-block hover:after:w-full after:transition-width after:duration-300 after:ease-out after:absolute after:left-1/2 after:bottom-0 after:-translate-x-1/2 after:w-0 after:h-px after:bg-white">SOBRE NÓS</a>
                    <span className="border-l border-white h-6"></span>
                    <a href="#contacts"
                        className="font-ltrenovate-bold cursor-pointer relative inline-block hover:after:w-full after:transition-width after:duration-300 after:ease-out after:absolute after:left-1/2 after:bottom-0 after:-translate-x-1/2 after:w-0 after:h-px after:bg-white">CONTATO</a>
                </div>
                <button
                    onClick={handleLogin}
                    className={`bg-green-regular font-ltrenovate-bold text-green-dark py-2 pt-3 px-8 rounded-tl-3xl rounded-bl-sm rounded-br-3xl rounded-tr-sm transform transition-transform duration-300 hover:scale-105 ${isOpen ? 'block' : 'hidden'} sm:block`}
                >
                    FAZER LOGIN
                </button>

                {/* Menu Mobile */}
                <div className={`fixed inset-0 bg-green-dark text-white flex flex-col items-center justify-center space-y-4 ${isOpen ? 'block' : 'hidden'} sm:hidden`}>
                    <a href="#home" className="text-xl font-ltrenovate-bold" onClick={() => setIsOpen(false)}>PÁGINA INICIAL</a>
                    <a href="#about" className="text-xl font-ltrenovate-bold" onClick={() => setIsOpen(false)}>SOBRE NÓS</a>
                    <a href="#contacts" className="text-xl font-ltrenovate-bold" onClick={() => setIsOpen(false)}>CONTATO</a>
                    <button
                        onClick={handleLogin}
                        className="bg-green-regular font-ltrenovate-bold text-green-dark py-2 px-4 rounded-lg transform transition-transform duration-300 hover:scale-105"
                    >
                        FAZER LOGIN
                    </button>
                    <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4">
                        <X size={24} color='white' />
                    </button>
                </div>
            </header>

            <section className="container mx-auto flex flex-col lg:flex-row items-center justify-between py-16 px-6">

                <div className="flex-1">
                    <h2 className="text-4xl font-raleway-bold text-green-medium mb-4">Revali: Uma equipe com fome de justiça</h2>
                    <p className="font-raleway-semibold text-green-dark mb-6">
                        Na Revali, estamos comprometidos
                        em contribuir de forma direta com
                        os Objetivos de Desenvolvimento
                        Sustentável (ODS) da ONU, que
                        visam promover um mundo mais
                        justo, sustentável e próspero para
                        todos. Nosso foco está em dois ODS
                        fundamentais para garantir a
                        segurança alimentar e combater o
                        desperdício de alimentos.
                    </p>
                </div>

                <div className="flex-1 flex justify-center">
                    <img src={revaliBird} alt="Bird Illustration" className="w-2/3 max-w-sm" />
                </div>
            </section>

            <section id="about" className="py-16">
                <div className="max-w-8xl mx-auto">
                    <span className="text-3xl bg-green-regular font-ltrenovate-bold text-green-dark py-2 pt-3 px-8 rounded-tl-3xl rounded-bl-sm rounded-br-3xl rounded-tr-sm">SOBRE NÓS</span>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-green-dark p-8 shadow-lg">

                        {/* Carrossel de Imagens */}
                        <div className="w-full flex justify-center lg:col-span-1">
                            <Swiper
                                modules={[Pagination, Navigation, Autoplay]}
                                spaceBetween={50}
                                slidesPerView={1}
                                pagination={{ clickable: true }}
                                navigation
                                autoplay={{ delay: 3000, disableOnInteraction: false }}
                                className="mySwiper"
                            >
                                <SwiperSlide>
                                    <img src={sponsors} alt="woman with vegetables" className="w-full h-auto 2xl:h-96 object-cover" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={bancodealimentos} alt="woman with vegetables" className="w-full h-auto 2xl:h-96 object-cover" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={pitch} alt="woman with vegetables" className="w-full h-auto 2xl:h-96 object-cover" />
                                </SwiperSlide>
                            </Swiper>
                        </div>

                        {/* Texto descritivo */}
                        <div className="w-full text-center lg:text-left lg:col-span-2 px-12 2xl:px-36">
                            <p className="font-raleway-regular text-2xl 2xl:text- text-green-light leading-8">
                                A Revali é uma <span className="font-raleway-semibold">plataforma que conecta produtores rurais ao Banco de Alimentos do município </span>
                                facilitando a doação de alimentos nutritivos e de qualidade para famílias em situação de vulnerabilidade.
                                Nosso objetivo é garantir que os excedentes da produção rural sejam destinados a quem
                                mais precisa, <span className="font-raleway-semibold">promovendo dignidade e combatendo o desperdício.</span> <br /><br />
                                Sempre que um agricultor faz uma doação, a plataforma retribui sua
                                generosidade com pontos que podem ser trocados por produtos, tudo
                                isso dentro do aplicativo. Esses produtos são disponibilizados por
                                empresas parceiras que apoiam a causa, oferecendo utensílios e insumos
                                agrícolas que incentivam ainda mais as doações. <br /> <br />
                                A Revali nasceu durante o Hackathon da ProEx (Pro-Reitoria de Extensão)
                                da PUC Minas, com a missão de combater o desperdício de alimentos e
                                garantir refeições nutritivas a quem mais precisa.
                                <span className="font-raleway-semibold">Alinhados aos Objetivos
                                    de Desenvolvimento Sustentável 2 e 12, seguimos evoluindo e
                                    incorporando novas funcionalidades para unir tecnologia, inovação e
                                    solidariedade em prol de um futuro mais justo para todos.</span> <br /><br />
                                <span className="font-raleway-semibold">Revali - Conectando Generosidade à Segurança Alimentar</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center">
                        <h2 className="inline-block text-3xl bg-green-dark font-ltrenovate-bold text-green-regular py-2 pt-3 px-8 rounded-tl-[60px] rounded-bl-lg rounded-br-[60px] rounded-tr-lg text-center mb-8">
                            OBJETIVOS DE DESENVOLVIMENTO SUSTENTÁVEL
                        </h2>
                    </div>

                    <div className="flex flex-col gap-12">
                        <div className="flex gap-10 flex-col md:flex-row">
                            <div className="flex-shrink-0">
                                <img src={ODS2} alt="ODS 2" className="size-60 mx-auto lg:size-[300px]" />
                            </div>
                            <div className="container mx-auto flex flex-col lg:flex-row justify-center gap-8 bg-green-dark text-cream p-8 shadow-lg lg:rounded-tr-[500px] lg:rounded-br-[500px] rounded-2xl h-[400px] lg:h-[300px]">
                                <div className="flex-1 text-left ml-10">
                                    <h3 className="text-xl xl:text-3xl font-raleway-bold text-green-regular mb-2">ODS 2 - Fome Zero e Agricultura Sustentável</h3>
                                    <p className="text-cream text-white lg:text-xl max-w-[80%] xl:text-2xl">
                                        Nosso objetivo é ajudar a erradicar a fome, garantindo que os
                                        alimentos de qualidade produzidos pelos agricultores cheguem
                                        às famílias em situação de vulnerabilidade. Através de doações
                                        incentivadas e recompensadas, conectamos quem produz a quem
                                        precisa, promovendo a nutrição e a dignidade.
                                    </p>
                                </div>
                            </div>
                        </div>


                        <div className="flex gap-10 flex-col md:flex-row">
                            <div className="container mx-auto flex flex-col lg:flex-row justify-center gap-8 bg-green-dark text-cream p-8 shadow-lg lg:rounded-tl-[500px] lg:rounded-bl-[500px] rounded-2xl h-[400px] lg:h-[300px]">
                                <div className="flex-1 text-left ml-12">
                                    <h3 className="text-xl xl:text-3xl font-raleway-bold text-green-regular mb-2">ODS 12 - Consumo e Produção Responsáveis</h3>
                                    <p className="text-cream text-white lg:text-xl max-w-[80%] xl:text-2xl">
                                        Trabalhamos para reduzir o desperdício de alimentos,
                                        promovendo um ciclo sustentável de doações. Ao garantir que os
                                        alimentos não sejam perdidos, contribuímos para um uso mais
                                        consciente dos recursos naturais e fortalecemos uma cultura de
                                        solidariedade e responsabilidade social entre os produtores.
                                    </p>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <img src={ODS12} alt="ODS 2" className="size-60 mx-auto lg:size-[300px]" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                className="py-16 px-4"
                style={{
                    backgroundImage: `url(${backgroundBird})`,
                    backgroundSize: 'cover', // A imagem cobre a seção
                    backgroundPosition: 'center', // A imagem é centralizada
                    backgroundRepeat: 'no-repeat', // A imagem não repete
                }}
            >
                <div className="container mx-auto text-center mb-12">
                    <h2 className="inline-block bg-green-dark text-green-regular font-ltrenovate-bold text-2xl py-2 pt-3 px-8 rounded-tl-[60px] rounded-bl-lg rounded-br-[60px] rounded-tr-lg">
                        JUNTE-SE À REVALI E FAÇA A DIFERENÇA
                    </h2>
                </div>

                <div className="container mx-auto flex flex-col lg:flex-row justify-center gap-8">
                    <div className="bg-green-dark text-green-light p-8 rounded-tl-[50px] rounded-br-[50px] rounded-lg shadow-md flex-1 min-h-[500px]">
                        <h3 className="text-3xl font-bold mb-4">O IMPACTO DA SUA DOAÇÃO</h3>
                        <p className="font-raleway-medium text-2xl">
                            Trabalhamos para reduzir o desperdício de alimentos, promovendo um ciclo sustentável de doações. Ao garantir que os alimentos não sejam perdidos, contribuímos para um uso mais consciente dos recursos naturais e fortalecemos uma cultura de solidariedade e responsabilidade social entre os produtores.
                        </p>
                    </div>

                    <div className="bg-green-light text-green-dark p-8 rounded-tl-[50px] rounded-br-[50px] rounded-lg shadow-md flex-1 min-h-[500px]">
                        <h3 className="text-3xl font-bold mb-4">INCENTIVO AOS PRODUTORES</h3>
                        <p className="font-raleway-medium text-2xl">
                            Além de ajudar quem mais precisa, suas doações incentivam os agricultores, que acumulam pontos a cada contribuição, podendo trocá-los por produtos essenciais. Isso fortalece a agricultura local e cria um ciclo de solidariedade sustentável.
                        </p>
                    </div>

                    <div className="bg-green-dark text-green-light p-8 rounded-tl-[50px] rounded-br-[50px] shadow-md flex-1 min-h-[500px]">
                        <h3 className="text-3xl font-bold mb-4">ENTRE EM CONTATO</h3>
                        <p className="font-raleway-medium text-2xl mb-6">
                            Estamos à disposição para esclarecer qualquer dúvida. Fale com o <span className="font-raleway-bold">Grupo Revali</span> e saiba mais sobre como sua doação faz a diferença!
                        </p>
                        <button
                            className="bg-green-regular text-green-dark font-ltrenovate-bold pt-3 py-2 px-4 rounded-tl-2xl rounded-br-2xl transform transition-transform duration-300 hover:scale-105"
                            onClick={() => window.location.href = 'mailto:aplicativo.revali@gmail.com?subject=Assunto'}
                        >
                            FALE CONOSCO
                        </button>
                    </div>
                </div>
            </section>

            <footer id="contacts" className="bg-[#1f3d33] text-white py-6">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">

                    <div className="mb-4 md:mb-0">
                        <img src={seloProex} alt="selo PROEX" className="w-24" />
                    </div>

                    <div className="mb-4 md:mb-0">
                        <p className="font-raleway-medium">Copyright © 2024 | Todos os direitos reservados.</p>
                    </div>

                    <div className="flex flex-col items-start">
                        <div className="flex flex-col items-center md:items-start mb-6 gap-1">
                            <p className="flex items-center font-raleway-semibold">
                                <Mail className="mr-2" size={16} /> aplicativo.revali@gmail.com
                            </p>
                        </div>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/aplicativo.revali" target="blank" className="text-white hover:text-gray-300">
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