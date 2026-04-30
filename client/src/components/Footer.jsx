import { assets, footerLinks } from "../assets/assets";

const Footer = () => {

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-primary/10">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">

        {/* Left section */}
        <div>
          <img
            className="w-34 md:w-32"
            src={assets.logo}
            alt="logo"
          />
          <p className="max-w-[410px] mt-6">
            We deliver fresh groceries
            and snacks straight to your door. Trusted by thousands,
            we aim to make your shooping experience simple and 
            affordable.
          </p>
        </div>

        {/* Right sections */}
        <div className="flex flex-wrap w-full md:w-[45%] justify-between gap-5">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-gray-800 mb-3">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.url}
                    className="hover:underline
                    transition">{link.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom */}
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
           Copyright {new Date().getFullYear()} © GreatStack.dev All Right
           Reserved.
      </p>
    </div>
  );
};

export default Footer;
