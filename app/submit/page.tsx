"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { ToastProvider, useToast } from "@/components/Toast";
import { LoadingSpinner, RobotIcon, RocketIcon } from "@/components/ui";

function SubmitForm() {
  const router = useRouter();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tenantName: "",
    tenantEmail: "",
    tenantUnit: "",
    description: "",
    imageUrl: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side optimization using Canvas
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1024;
        const MAX_HEIGHT = 1024;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        // Convert to WebP Base64 (highly optimized)
        const base64Str = canvas.toDataURL("image/webp", 0.7);
        setFormData({ ...formData, imageUrl: base64Str });
        setImagePreview(base64Str);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tenantName.trim() || !formData.description.trim()) {
      addToast({
        type: "error",
        title: "Missing Information",
        message: "Please provide your name and describe the issue.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit");

      const data = await res.json();

      addToast({
        type: "success",
        title: "Request Submitted!",
        message: `Your request has been classified as ${data.category} with ${data.severity} severity.`,
      });

      // Redirect to confirmation
      router.push(`/submit/confirmation?id=${data.id}`);
    } catch {
      addToast({
        type: "error",
        title: "Submission Failed",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const exampleRequests = [
    "My kitchen sink is leaking water and it's flooding the floor",
    "The hallway light on the 3rd floor has been flickering for days",
    "The heating system is not working and it's freezing in my apartment",
    "There are ants coming from under the kitchen cabinet",
    "The front door lock is broken, I can't secure my apartment",
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10 fade-in">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
          Submit Maintenance Request
        </h1>
        <p className="text-[var(--neutral-400)] text-base max-w-xl mx-auto">
          Describe your issue in your own words. Our AI will automatically
          classify, prioritize, and route your request.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="glass rounded-2xl p-6 sm:p-8 space-y-6 slide-up"
      >
        {/* Tenant Info */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="tenantName"
              className="block text-sm font-medium text-[var(--neutral-300)] mb-2"
            >
              Full Name <span className="text-[var(--danger-500)]">*</span>
            </label>
            <input
              id="tenantName"
              type="text"
              required
              value={formData.tenantName}
              onChange={(e) =>
                setFormData({ ...formData, tenantName: e.target.value })
              }
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl bg-[var(--neutral-800)] border border-[var(--neutral-700)] text-white placeholder-[var(--neutral-500)] text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="tenantEmail"
              className="block text-sm font-medium text-[var(--neutral-300)] mb-2"
            >
              Email
            </label>
            <input
              id="tenantEmail"
              type="email"
              value={formData.tenantEmail}
              onChange={(e) =>
                setFormData({ ...formData, tenantEmail: e.target.value })
              }
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-xl bg-[var(--neutral-800)] border border-[var(--neutral-700)] text-white placeholder-[var(--neutral-500)] text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="tenantUnit"
            className="block text-sm font-medium text-[var(--neutral-300)] mb-2"
          >
            Unit / Apartment Number
          </label>
          <input
            id="tenantUnit"
            type="text"
            value={formData.tenantUnit}
            onChange={(e) =>
              setFormData({ ...formData, tenantUnit: e.target.value })
            }
            placeholder="e.g., Apt 4B"
            className="w-full px-4 py-3 rounded-xl bg-[var(--neutral-800)] border border-[var(--neutral-700)] text-white placeholder-[var(--neutral-500)] text-sm"
          />
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-[var(--neutral-300)] mb-2">
            Attach a Photo (Optional)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-[var(--neutral-700)] border-dashed rounded-xl hover:border-[var(--primary-500)] transition-colors bg-[var(--neutral-800)]">
            <div className="space-y-1 text-center">
              {imagePreview ? (
                <div className="relative inline-block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imagePreview} alt="Preview" className="h-32 w-auto rounded-lg" />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData({ ...formData, imageUrl: "" });
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-lg"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <>
                  <svg className="mx-auto h-12 w-12 text-[var(--neutral-500)]" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-[var(--neutral-400)] justify-center">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-[var(--primary-400)] hover:text-[var(--primary-300)] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[var(--primary-500)]">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-[var(--neutral-500)]">
                    PNG, JPG, GIF up to 10MB (automatically compressed)
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-[var(--neutral-300)] mb-2"
          >
            Describe the Issue{" "}
            <span className="text-[var(--danger-500)]">*</span>
          </label>
          <textarea
            id="description"
            required
            rows={5}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Tell us what's wrong in your own words..."
            className="w-full px-4 py-3 rounded-xl bg-[var(--neutral-800)] border border-[var(--neutral-700)] text-white placeholder-[var(--neutral-500)] text-sm resize-none leading-relaxed"
          />
          <p className="text-xs text-[var(--neutral-500)] mt-2 flex items-center gap-1.5">
            <RobotIcon className="w-4 h-4 text-[var(--primary-400)] shrink-0" />
            <span>Our AI will analyze your description to classify and prioritize the request.</span>
          </p>
        </div>

        {/* Quick Examples */}
        <div>
          <p className="text-xs font-medium text-[var(--neutral-500)] mb-3 uppercase tracking-wider">
            Try an example
          </p>
          <div className="flex flex-wrap gap-2">
            {exampleRequests.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() =>
                  setFormData({ ...formData, description: example })
                }
                className="text-xs px-3 py-1.5 rounded-lg bg-[var(--neutral-800)] border border-[var(--neutral-700)] text-[var(--neutral-400)] hover:text-[var(--primary-300)] hover:border-[var(--primary-600)] transition-all duration-200"
              >
                {example.length > 50 ? example.substring(0, 50) + "..." : example}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--primary-600)] to-[var(--primary-500)] text-white font-semibold text-base hover:from-[var(--primary-500)] hover:to-[var(--primary-400)] transition-all duration-300 shadow-lg shadow-[rgba(99,102,241,0.3)] hover:shadow-[rgba(99,102,241,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              AI is analyzing your request...
            </>
          ) : (
            <>
              <RocketIcon className="w-5 h-5 text-white" />
              Submit Request
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function SubmitPage() {
  return (
    <ToastProvider>
      <Navbar />
      <main className="flex-1 relative">
        <div className="orb w-[400px] h-[400px] bg-[var(--primary-600)] top-[-100px] right-[-150px]" />
        <SubmitForm />
      </main>
    </ToastProvider>
  );
}
