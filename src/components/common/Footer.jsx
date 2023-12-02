import React from "react";
import Logo from "../../assets/Logo/Logo-Small-Light.png";
import { Link } from "react-router-dom";
import { FooterLink1, FooterLink2 } from "../../data/footer-links";

function Footer() {
  return (
    <div className="min-h-[768px] bg-richblack-800 py-16">
      <div className="max-w-maxContent mx-auto sm:px-0 px-3">
        <div className="min-h-[538px] flex gap-10 flex-wrap px-4 sm:px-0">
          <div className="flex md:gap-20 gap-10 mx-auto flex-wrap">
            <div>
              <Link to={"/"}>
                <div className="flex gap-2 items-center font-semibold">
                  <img src={Logo} alt=""></img>
                  <p className="text-richblack-50 text-xl">
                    ED - Tech_StudyNotion
                  </p>
                </div>
              </Link>

              <p className="text-richblack-100 font-semibold my-5 w-fit">
                Company
              </p>

              <div className="space-y-2 text-richblack-400 text-sm">
                {FooterLink1[0].links.map((ele, index) => (
                  <p
                    key={index}
                    className="cursor-pointer hover:text-richblack-200 transition-all duration-200 w-fit"
                  >
                    <Link to={ele.link}>{ele.title}</Link>
                  </p>
                ))}
              </div>

              <div className="flex gap-3 mt-5 text-richblack-400">
                {FooterLink1[1].links.map((ele, index) => (
                  <a key={index} href={ele.link} target="blank">
                    {ele.logo}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-richblack-100 font-semibold w-fit mt-2 leading-5 font-inter my-5">
                Resources
              </p>

              <div className="space-y-2 text-richblack-400 text-sm">
                {FooterLink1[2].links.map((ele, index) => (
                  <p
                    key={index}
                    className="cursor-pointer hover:text-richblack-200 transition-all duration-200 w-fit"
                  >
                    <Link to={ele.link}>{ele.title}</Link>
                  </p>
                ))}
              </div>

              <p className="text-richblack-100 font-semibold w-fit leading-5 font-inter mt-5">
                Support
              </p>

              <p className="cursor-pointer text-richblack-400 hover:text-richblack-200 transition-all duration-200 w-fit mt-3">
                <Link to={"/help-center"}>Help Center</Link>
              </p>
            </div>

            <div>
              <p className="text-richblack-100 font-semibold w-fit mt-2 leading-5 font-inter my-5">
                Plans
              </p>

              <div className="space-y-2 text-richblack-400 text-sm">
                {FooterLink1[3].links.map((ele, index) => (
                  <p
                    key={index}
                    className="cursor-pointer hover:text-richblack-200 transition-all duration-200 w-fit"
                  >
                    <Link to={ele.link}>{ele.title}</Link>
                  </p>
                ))}
              </div>

              <p className="text-richblack-100 font-semibold w-fit leading-5 font-inter mt-10 my-5">
                Community
              </p>

              <div className="space-y-2 text-richblack-400 text-sm">
                {FooterLink1[4].links.map((ele, index) => (
                  <p
                    key={index}
                    className="cursor-pointer hover:text-richblack-200 transition-all duration-200 w-fit"
                  >
                    <Link to={ele.link}>{ele.title}</Link>
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:block w-[1px] bg-richblack-700" />

          <div className="flex mx-auto md:gap-20 gap-10 flex-wrap">
            <div>
              <p className="text-richblack-100 font-semibold w-fit mt-2 leading-5 font-inter my-5">
                Subjects
              </p>

              <div className="space-y-2 text-richblack-400 text-sm">
                {FooterLink2[0].links.map((subject) => (
                  <p
                    key={subject.title}
                    className="cursor-pointer text-richblack-400 hover:text-richblack-200 transition-all duration-200 w-fit"
                  >
                    <Link to={subject.link}>{subject.title}</Link>
                  </p>
                ))}
              </div>
            </div>

            <div>
              <p className="text-richblack-100 font-semibold w-fit mt-2 leading-5 font-inter my-5">
                Languages
              </p>

              <div className="space-y-2 text-richblack-400 text-sm">
                {FooterLink2[1].links.map((language) => (
                  <p
                    key={language.title}
                    className="cursor-pointer text-richblack-400 hover:text-richblack-200 transition-all duration-200 w-fit"
                  >
                    <Link to={language.link}>{language.title}</Link>
                  </p>
                ))}
              </div>
            </div>

            <div>
              <p className="text-richblack-100 font-semibold w-fit mt-2 leading-5 font-inter my-5">
                Career Building
              </p>

              <div className="space-y-2 text-richblack-400 text-sm">
                {FooterLink2[2].links.map((career) => (
                  <p
                    key={career.title}
                    className="cursor-pointer text-richblack-400 hover:text-richblack-200 transition-all duration-200 w-fit"
                  >
                    <Link to={career.link}>{career.title}</Link>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <hr className="my-10 text-richblack-700" />

        <div className="flex justify-between text-richblack-300 md:flex-row flex-col">
          <div className="flex gap-3 items-center mx-auto md:mx-0 text-sm sm:text-base">
            <Link to={"/privacy-policy"}>
              <p>Privacy Policy</p>
            </Link>
            <div className="w-[1px] h-[10px] sm:h-[15px] bg-richblack-300"></div>

            <Link to={"/cookie-policy"}>
              <p>Cookie Policy</p>
            </Link>
            <div className="w-[1px] h-[10px] sm:h-[15px] bg-richblack-300"></div>

            <Link to={"/terms"}>
              <p>Terms</p>
            </Link>
          </div>

          <div className="mx-auto md:mx-0 text-sm sm:text-base">
            <p>Made by Chirag Kumar © 2023 StudyNotion</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
