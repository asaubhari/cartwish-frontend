import { useState, React } from "react";
import "./SignUp.css";
import user from "../../assets/user.webp";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signup } from "../../services/userServices";
import { useNavigate } from "react-router-dom";

const schema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name should be at least 3 characters" }),
    email: z.string().email({ message: "Please enter valid email" }),
    password: z
      .string()
      .min(5, { message: "Password should be at least 5 characters" }),
    confpassword: z.string(),
    deliveryAddress: z
      .string()
      .min(15, { message: "Address should be at least 15 characters" }),
  })
  .refine((data) => data.password === data.confpassword, {
    message: "Confirm Password does not match Password",
    path: ["confpassword"],
  });

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [formError, setFormError] = useState("");
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (formData) => {
    try {
      const { data } = await signup(formData, profilePic);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setFormError(err.response.data.message);
      }
    }
  };

  return (
    <section className="align_center form_page">
      <form
        className="authentication_form signup_form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>SignUp Form</h2>
        <div className="image_input_section">
          <div className="image_preview">
            <img
              src={profilePic ? URL.createObjectURL(profilePic) : user}
              id="file-ip-1-preview"
            />
          </div>
          <label htmlFor="file-ip-1" className="image_label">
            Upload Image
          </label>
          <input
            type="file"
            id="file-ip-1"
            className="image_input"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </div>

        <div className="form_inputs signup_form_input">
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="form_text_input"
              {...register("name")}
            />
            {errors.name && (
              <em className="form_error">{errors.name.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              className="form_text_input"
              {...register("email")}
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="form_text_input"
              {...register("password")}
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="confpassword">Confirm Password</label>
            <input
              type="password"
              id="confpassword"
              placeholder="Enter confirm password"
              className="form_text_input"
              {...register("confpassword")}
            />
            {errors.confpassword && (
              <em className="form_error">{errors.confpassword.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="address">Delivery Address</label>
            <input
              type="text"
              placeholder="Enter delivery Address"
              className="form_text_input"
              id="address"
              {...register("deliveryAddress")}
            />
            {errors.deliveryAddress && (
              <em className="form_error">{errors.deliveryAddress.message}</em>
            )}
          </div>
        </div>
        {formError && <em className="form_error">{formError}</em>}
        <button type="submit" className="search_button form_submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default SignUp;
