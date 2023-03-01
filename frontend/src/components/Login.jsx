import React from "react";
// import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
// import jwt_decode from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

import { client } from "../client";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";

const Login = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        localStorage.setItem("user", JSON.stringify(res?.data));
        const { name, picture, sub } = res?.data;
        console.log(res?.data);
        console.log(res?.data.name);

        const doc = {
          _id: sub,
          _type: "user",
          userName: name,
          image: picture,
        };

        client.createIfNotExists(doc).then(() => {
          navigate("/", { replace: true });
          // console.log(doc);
        });
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <button
            type="button"
            className="bg-mainColor flex justify-center items-center p-3 rounded-lg"
            onClick={login}
          >
            <FcGoogle className="mr-4" /> Sign in with Google{" "}
          </button>
          <div className="shadow-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
