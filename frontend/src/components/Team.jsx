import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Team.css';
import { motion } from "framer-motion";
import founderImg from '/assets/founder-removebg-preview.png'
import founderImg2 from '/assets/omkar.png'
import founderImg3 from '/assets/rohan.png'


const Team = () => {
  return (
    <div className="mt-40 py-10">
      <motion.h3 className="text-5xl font-extrabold text-center mb-12" whileInView={{ opacity: 1, y: [50, 0] }}>Meet Our 
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECCA3] to-[#00c3ff] "> Team</span> </motion.h3>
      <div className="cards py-10  flex flex-col gap-16">
        
          <div className="card red relative shadow-2xl">
          <img src={founderImg} className="absolute bottom-30 w-40 drop-shadow-[0_5px_10px_rgba(0,0,0,0.45)] transition-transform duration-500 hover:scale-105 hover:drop-shadow-[0_8px_25px_rgba(0,0,0,0.45)] mask-image [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,0))]"/>
          <div className=' relative top-12'>
              <h4 className="text-xl font-bold text-gray-800">Shubham Dhobale</h4>
              <p className="text-gray-600 mb-4">Founder & Lead Developer</p>
              <div className="flex justify-center gap-4">
                <a href="https://www.linkedin.com/in/shubham-dhobale-114083255/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={24} className="text-[#0077B5] hover:text-[#005582]" />
                </a>
                <a href="https://github.com/shubhamdhobale" target="_blank" rel="noopener noreferrer">
                  <FaGithub size={24} className="text-black hover:text-gray-700" />
                </a>
                <a href="https://www.instagram.com/_shubham.dhobale?igsh=NWhmbzJvbm92enU5" target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={24} className="text-black hover:text-gray-700" />
                </a>
          </div>
              </div>
          </div>


          <div className="card blue relative shadow-2xl w-64 h-60">
          <img src={founderImg2} className="absolute bottom-30 w-48 drop-shadow-[0_5px_10px_rgba(0,0,0,0.45)] transition-transform duration-500 hover:scale-105 hover:drop-shadow-[0_8px_25px_rgba(0,0,0,0.45)] rounded-full mask-image [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,0))]"/>
          <div className=' relative top-12'>
              <h4 className="text-xl font-bold text-gray-800">Omkar Bhagat</h4>
              <p className="text-gray-600 mb-4">Manager</p>
              <div className="flex justify-center gap-4">
                <a href="https://www.linkedin.com/in/omkar-bhagat-91b61a289/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={24} className="text-[#0077B5] hover:text-[#005582]" />
                </a>
                <a href="" target="_blank" rel="noopener noreferrer">
                  <FaGithub size={24} className="text-black hover:text-gray-700" />
                </a>
                <a href="https://www.instagram.com/omkarbhagat_89?igsh=amZxNmdiZTdqOTFm" target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={24} className="text-black hover:text-gray-700" />
                </a>
              </div>
          </div>
            
          </div>


          <div className="card green relative shadow-2xl w-64 h-60">
          <img src={founderImg3} className="absolute bottom-30 w-44 drop-shadow-[0_5px_10px_rgba(0,0,0,0.45)] transition-transform duration-500 hover:scale-105 hover:drop-shadow-[0_8px_25px_rgba(0,0,0,0.45)] mask-image [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,0))]"/>
          <div className=' relative top-12'>
              <h4 className="text-xl font-bold text-gray-800">Rohan Khaire</h4>
              <p className="text-gray-600 mb-4">Marketing</p>
              <div className="flex justify-center gap-4">
                <a href="https://www.linkedin.com/in/rohan-khaire-1621362a5/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={24} className="text-[#0077B5] hover:text-[#005582]" />
                </a>
                <a href="" target="_blank" rel="noopener noreferrer">
                  <FaGithub size={24} className="text-black hover:text-gray-700" />
                </a>
                <a href="https://www.instagram.com/rohann_khaire?igsh=eG04Y2t2N2ExeXFm" target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={24} className="text-black hover:text-gray-700" />
                </a>
              </div>
          </div>
          </div>
      </div>
    </div>
  )
}

export default Team