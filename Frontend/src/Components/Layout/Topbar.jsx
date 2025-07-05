import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdPersonalVideo, MdEmail } from "react-icons/md";

const Topbar = () => {
  return (
    <div className="bg-kred text-white">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
            <div className="flex gap-2 lg:gap-3">
                <a href="https://www.linkedin.com/in/priyanshu-raj-96314525a/" className="hover:text-gray-300">
                <FaLinkedin className="h-5 w-5" />
                </a>

                <a href="https://github.com/Priyanshu354" className="hover:text-gray-300">
                <FaGithub className="h-5 w-5" />
                </a>

                {/* <a href="#" className="hover:text-gray-300">
                <MdPersonalVideo className="h-5 w-5" />
                </a> */}
            </div>

            <div className="hidden md:flex text-center text-sm translate-x-4">
                <span>Full Stack Developer & Competitive Programmer</span>
            </div>


            <div className="text-sm text-center">
                <a href="mailto:titpriyanshuraj@gmail.com" className="hover:text-gray-300 flex gap-3">
                    priyanshurajsde354@gmail.com
                </a>
            </div>
        </div>
    </div>
  );
};

export default Topbar;
