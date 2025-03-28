import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Team.css';
import { motion } from "framer-motion";


const Team = () => {
  return (
    <div className="mt-40 py-10">
      <motion.h3 className="text-5xl font-extrabold text-center mb-12" whileInView={{ opacity: 1, y: [50, 0] }}>Meet Our 
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECCA3] to-[#00c3ff] "> Team</span> </motion.h3>
      <div className="cards">
          <div className="card red">
          <img src="https://avatars.githubusercontent.com/u/97725662?v=4" className="rounded-full w-20 mb-4"/>
              <h4 className="text-xl font-bold text-gray-800">Shubham Dhobale</h4>
              <p className="text-gray-600 mb-4">Founder & CEO</p>
              <div className="flex justify-center gap-4">
                <a href="https://www.linkedin.com/in/shubham-dhobale-114083255/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={24} className="text-[#0077B5] hover:text-[#005582]" />
                </a>
                <a href="https://github.com/shubhamdhobale" target="_blank" rel="noopener noreferrer">
                  <FaGithub size={24} className="text-black hover:text-gray-700" />
                </a>
              </div>
          </div>
          <div className="card blue">
          <img src="https://avatars.githubusercontent.com/u/97725662?v=4" className="rounded-full w-20 mb-4"/>
              <h4 className="text-xl font-bold text-gray-800">xyz</h4>
              <p className="text-gray-600 mb-4">Lead Developer</p>
              <div className="flex justify-center gap-4">
                <a href="" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={24} className="text-[#0077B5] hover:text-[#005582]" />
                </a>
                <a href="" target="_blank" rel="noopener noreferrer">
                  <FaGithub size={24} className="text-black hover:text-gray-700" />
                </a>
              </div>
          </div>
          <div className="card green">
          <img src="https://avatars.githubusercontent.com/u/97725662?v=4" className="rounded-full w-20 mb-4"/>
              <h4 className="text-xl font-bold text-gray-800">xyz</h4>
              <p className="text-gray-600 mb-4">Lead Developer</p>
              <div className="flex justify-center gap-4">
                <a href="" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={24} className="text-[#0077B5] hover:text-[#005582]" />
                </a>
                <a href="" target="_blank" rel="noopener noreferrer">
                  <FaGithub size={24} className="text-black hover:text-gray-700" />
                </a>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Team