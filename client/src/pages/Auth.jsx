import React, { useEffect, useState } from "react";
import InputBox from "../components/InputBox";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../store/userSlice";

const Auth = () => {
  const [signup, setSignup] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    profilePic: "",
  });
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });

  const [openPopup, setOpenPopup] = useState(true);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setSignup((prev) => ({ ...prev, [name]: value }));
  };
  const handleSignIn = (e) => {
    const { value, name } = e.target;
    setSignIn((prev) => ({ ...prev, [name]: value }));
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setSignup((prev) => ({ ...prev, profilePic: base64 }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/signup`, signup);
      toast.success(response.data.message);
      setOpenPopup(false);
      setSignup({
        username: "",
        name: "",
        email: "",
        password: "",
        profilePic: "",
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/signin`, signIn);
      localStorage.setItem("userInfo", JSON.stringify(response.data.userInfo));
      toast.success(response.data.message);
      setSignIn({
        email: "",
        password: "",
      });
      if (response.data) {
        dispatch(setUserInfo(response.data.userInfo));
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (!user?.name) {
      navigate("/auth");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <section className="bg-[#242D34] min-h-screen min-w-screen flex items-center justify-center">
      <div className=" bg-[#000] w-[700px] max-w-[97%] h-max p-10 rounded-xl shadow-lg">
        {openPopup ? (
          <div>
            <div className="flex items-center justify-center mb-6">
              <img
                className="w-12 h-12 rounded-full object-contain"
                src="data:image/png;base64,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"
                alt="logo"
              />
            </div>
            <h1 className="text-gray-200 text-wider text-center py-3 text-3xl font-bold">
              Create Your Account
            </h1>

            <form className="mt-10" onSubmit={handleSignup} autoComplete="off">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-center w-48 h-48 rounded-full mx-auto border border-white">
                  <label
                    htmlFor="profile_pic"
                    className=" h-48 w-48 rounded-full flex items-center justify-center"
                  >
                    {signup?.profilePic ? (
                      <img
                        src={`${signup?.profilePic}`}
                        alt={setSignup?.name}
                        className="h-full w-full object-cover rounded-full"
                      />
                    ) : (
                      <p className="text-white">Select Your Profile</p>
                    )}
                  </label>
                  <input
                    type="file"
                    id="profile_pic"
                    className="hidden"
                    onChange={handleImage}
                  />
                </div>

                <InputBox
                  label="Username"
                  type="text"
                  name={"username"}
                  value={signup.username}
                  onChange={handleChange}
                  placeholder="Enter Username"
                />
                <InputBox
                  label="Name"
                  type="text"
                  name={"name"}
                  value={signup.name}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                />
                <InputBox
                  label="Email"
                  type="email"
                  name={"email"}
                  value={signup.email}
                  onChange={handleChange}
                  placeholder="Enter Email Address"
                />
                <InputBox
                  label="Password"
                  type="password"
                  name={"password"}
                  value={signup.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                />
              </div>
              <button className="w-full p-3 text-center mt-14 rounded-full text-xl font-bold text-white bg-[#1D9BF0] hover:bg-[#0e89db]">
                Register
              </button>
              <p className="text-center mt-8 text-white text-normal">
                {" "}
                Already have an account?
                <span
                  className="pl-2 hover:text-[#1D9BF0] cursor-pointer"
                  onClick={() => setOpenPopup(false)}
                >
                  Sign In
                </span>
              </p>
            </form>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-center mb-6">
              <img
                className="w-12 h-12 rounded-full object-contain"
                src="data:image/png;base64,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"
                alt="logo"
              />
            </div>
            <h1 className="text-gray-200 text-wider text-center py-3 text-3xl font-bold">
              Login to your account
            </h1>

            <form className="mt-10" onSubmit={handleSignin} autoComplete="off">
              <div className="flex flex-col gap-6">
                <InputBox
                  label="Email"
                  type="email"
                  name={"email"}
                  value={signIn.email}
                  onChange={handleSignIn}
                  placeholder="Enter Email Address"
                />
                <InputBox
                  label="Password"
                  type="password"
                  name={"password"}
                  value={signIn.password}
                  onChange={handleSignIn}
                  placeholder="Enter Password"
                />
              </div>
              <button className="w-full p-3 text-center mt-14 rounded-full text-xl font-bold text-white bg-[#1D9BF0] hover:bg-[#0e89db]">
                Sign In
              </button>
              <p className="text-center mt-8 text-white text-normal">
                {" "}
                Don't have an account?
                <span
                  className="pl-2 hover:text-[#1D9BF0] cursor-pointer"
                  onClick={() => setOpenPopup(true)}
                >
                  Create an account
                </span>
              </p>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default Auth;
