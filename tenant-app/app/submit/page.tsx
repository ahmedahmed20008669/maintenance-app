"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TenantNavbar from "@/components/TenantNavbar";
import { ToastProvider, useToast } from "@/components/Toast";
import { LoadingSpinner, RobotIcon } from "@/components/ui";

function SubmitForm() {
  const router = useRouter();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tenantName: "",
    tenantEmail: "",
    tenantUnit: "",
    description: "",
    images: [] as string[],
  });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    fetch('/api/tenant/data')
      .then(res => {
        if (res.status === 401) { router.push('/'); return null; }
        return res.json();
      })
      .then(data => {
        if (data?.tenant) {
          setFormData(prev => ({
            ...prev,
            tenantName: data.tenant.name,
            tenantEmail: data.tenant.email,
            tenantUnit: data.tenant.unit
          }));
        }
      })
      .catch(() => {});
  }, [router]);

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      addToast({ type: "error", title: "Invalid File", message: "Please upload an image file." });
      return;
    }
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
          if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
        } else {
          if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        const base64Str = canvas.toDataURL("image/webp", 0.7);
        setFormData((prev) => ({ ...prev, images: [...prev.images, base64Str] }));
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) { Array.from(e.target.files).forEach(processFile); }
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    if (e.dataTransfer.files) { Array.from(e.dataTransfer.files).forEach(processFile); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tenantName.trim() || !formData.description.trim()) {
      addToast({ type: "error", title: "Missing Information", message: "Please describe the issue." });
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
        message: `Classified as ${data.category} with ${data.severity} severity.`,
      });
      router.push('/dashboard');
    } catch {
      addToast({ type: "error", title: "Submission Failed", message: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

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

      <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8 space-y-6 slide-up">
        {/* Tenant Info (read-only) */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--neutral-300)] mb-2">Full Name</label>
            <input type="text" readOnly value={formData.tenantName}
              className="w-full px-4 py-3 rounded-xl bg-[var(--neutral-900)] border border-[var(--neutral-700)] text-white text-sm opacity-70 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--neutral-300)] mb-2">Email</label>
            <input type="email" readOnly value={formData.tenantEmail}
              className="w-full px-4 py-3 rounded-xl bg-[var(--neutral-900)] border border-[var(--neutral-700)] text-white text-sm opacity-70 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--neutral-300)] mb-2">Unit</label>
            <input type="text" readOnly value={formData.tenantUnit}
              className="w-full px-4 py-3 rounded-xl bg-[var(--neutral-900)] border border-[var(--neutral-700)] text-white text-sm opacity-70 cursor-not-allowed" />
          </div>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-[var(--neutral-300)] mb-2">Attach Photos (Optional)</label>
          <div 
            onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
            className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl transition-colors ${isDragging ? "border-[var(--primary-400)] bg-[rgba(0,153,173,0.1)]" : "border-[var(--neutral-700)] hover:border-[var(--primary-500)] bg-[var(--neutral-800)]"}`}
          >
            <div className="space-y-4 text-center w-full">
              {formData.images.length > 0 && (
                <div className="flex flex-wrap gap-4 justify-center">
                  {formData.images.map((img, index) => (
                    <div key={index} className="relative inline-block">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={`Preview ${index}`} className="h-24 w-auto rounded-lg shadow-md" />
                      <button type="button" onClick={() => setFormData(prev => ({...prev, images: prev.images.filter((_, i) => i !== index)}))}
                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-lg transition-colors">x</button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex flex-col items-center justify-center">
                <svg className="mx-auto h-12 w-12 text-[var(--neutral-500)]" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-[var(--neutral-400)] justify-center mt-2">
                  <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-[var(--primary-400)] hover:text-[var(--primary-300)]">
                    <span>Upload files</span>
                    <input id="file-upload" name="file-upload" type="file" multiple className="sr-only" accept="image/*" onChange={handleImageUpload} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-[var(--neutral-300)] mb-2">
            Describe the Issue <span className="text-[var(--danger-500)]">*</span>
          </label>
          <textarea required rows={5} value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Tell us what's wrong in your own words..."
            className="w-full px-4 py-3 rounded-xl bg-[var(--neutral-800)] border border-[var(--neutral-700)] text-white placeholder-[var(--neutral-500)] text-sm resize-none leading-relaxed"
          />
          <p className="text-xs text-[var(--neutral-500)] mt-2 flex items-center gap-1.5">
            <RobotIcon className="w-4 h-4 text-[var(--primary-400)] shrink-0" />
            <span>Our AI will analyze your description to classify and prioritize the request.</span>
          </p>
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading}
          className={`w-full flex items-center justify-center h-14 rounded-xl text-white font-semibold text-base transition-all ${loading ? 'bg-[var(--neutral-700)] cursor-wait' : 'bg-[var(--primary-600)] hover:bg-[var(--primary-500)] cursor-pointer'}`}
        >
          {loading ? <LoadingSpinner className="w-6 h-6" /> : 'Submit Request'}
        </button>
      </form>
    </div>
  );
}

export default function SubmitPage() {
  return (
    <ToastProvider>
      <TenantNavbar />
      <main className="flex-1 relative">
        <SubmitForm />
      </main>
    </ToastProvider>
  );
}
