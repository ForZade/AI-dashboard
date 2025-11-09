"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupInput } from "@/features/auth/lib/validation";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div style={{ padding: "50px", maxWidth: "400px", margin: "0 auto" }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.email && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {errors.email.message}
            </p>
          )}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Username"
            {...register("username")}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.username && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {errors.username.message}
            </p>
          )}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Name (optional)"
            {...register("name")}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.name && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {errors.name.message}
            </p>
          )}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.password && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {errors.password.message}
            </p>
          )}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.confirmPassword && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={isSubmitting} style={{ padding: "8px 16px" }}>
          {isSubmitting ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}