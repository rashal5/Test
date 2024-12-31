import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="border-t border-stone-900 pb-20">
      <h2 className="my-10 text-center text-3xl f5">Get in Touch</h2>
      <div className="text-center tracking-tighter">
        <p className="my-4 p4">
          Looking for creative solutions and expert services? Let's collaborate! 
          Reach out today to turn your ideas into reality through freelance work 
          that delivers quality, on time.
        </p>
        <div className="flex items-center justify-center gap-4 text-3xl m-2">
          <a
            href="https://www.linkedin.com/in/rashal5"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-white bgp hover:text-gray-400 transition-colors"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/rashal5"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-white bgp hover:text-gray-400 transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/_rashal"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white bgp hover:text-gray-400 transition-colors"
          >
            <FaInstagram />
          </a>
          <a
            href="mailto:muhammedrashalm@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
            className="text-white bgp hover:text-gray-400 transition-colors"
          >
            <FaEnvelope />
          </a>
        </div>
        <p className="my-4 p6">muhammedrashalm@gmail.com</p>
      </div>
    </div>
  );
};

export default Contact;
