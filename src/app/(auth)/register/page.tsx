"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupInput } from "@/features/auth/lib/validation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input/input";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupInput) => {
    setError("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Something went wrong");
        return;
      }

      // Redirect to login after successful signup
      router.push("/login");
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="w-full h-screen bg-background grid place-items-center">
      <form
        className="w-min h-min p-4 rounded-lg bg-background-dark flex flex-col gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold">Register</h1>
        
        <div className="flex flex-col gap-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-64"
            />
            {errors.email && (
              <p className="text-red-400 text-xs">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="text"
              placeholder="username"
              {...register("username")}
            />
            {errors.email && (
              <p className="text-red-400 text-xs">
                {errors.username?.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.email && (
              <p className="text-red-400 text-xs">
                {errors.password?.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
            {errors.email && (
              <p className="text-red-400 text-xs">
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
         <button type="submit" disabled={isSubmitting} style={{ padding: "8px 16px" }}>
           {isSubmitting ? "Loading..." : "Sign Up"}
         </button>
      </form>
    </div>

    // <div style={{ padding: "50px", maxWidth: "400px", margin: "0 auto" }}>
    //   <h1>Register</h1>
    //   <form onSubmit={handleSubmit(onSubmit)}>
    //     <div style={{ marginBottom: "10px" }}>
    //       <input
    //         type="email"
    //         placeholder="Email"
    //         {...register("email")}
    //         style={{ width: "100%", padding: "8px" }}
    //       />
    //       {errors.email && (
    //         <p style={{ color: "red", fontSize: "12px" }}>
    //           {errors.email.message}
    //         </p>
    //       )}
    //     </div>
    //     <div style={{ marginBottom: "10px" }}>
    //       <input
    //         type="text"
    //         placeholder="Username"
    //         {...register("username")}
    //         style={{ width: "100%", padding: "8px" }}
    //       />
    //       {errors.username && (
    //         <p style={{ color: "red", fontSize: "12px" }}>
    //           {errors.username.message}
    //         </p>
    //       )}
    //     </div>
    //     <div style={{ marginBottom: "10px" }}>
    //       <input
    //         type="text"
    //         placeholder="Name (optional)"
    //         {...register("name")}
    //         style={{ width: "100%", padding: "8px" }}
    //       />
    //       {errors.name && (
    //         <p style={{ color: "red", fontSize: "12px" }}>
    //           {errors.name.message}
    //         </p>
    //       )}
    //     </div>
    //     <div style={{ marginBottom: "10px" }}>
    //       <input
    //         type="password"
    //         placeholder="Password"
    //         {...register("password")}
    //         style={{ width: "100%", padding: "8px" }}
    //       />
    //       {errors.password && (
    //         <p style={{ color: "red", fontSize: "12px" }}>
    //           {errors.password.message}
    //         </p>
    //       )}
    //     </div>
    //     <div style={{ marginBottom: "10px" }}>
    //       <input
    //         type="password"
    //         placeholder="Confirm Password"
    //         {...register("confirmPassword")}
    //         style={{ width: "100%", padding: "8px" }}
    //       />
    //       {errors.confirmPassword && (
    //         <p style={{ color: "red", fontSize: "12px" }}>
    //           {errors.confirmPassword.message}
    //         </p>
    //       )}
    //     </div>
    //     {error && <p style={{ color: "red" }}>{error}</p>}
    //     <button type="submit" disabled={isSubmitting} style={{ padding: "8px 16px" }}>
    //       {isSubmitting ? "Loading..." : "Register"}
    //     </button>
    //   </form>
    // </div>
  );
}