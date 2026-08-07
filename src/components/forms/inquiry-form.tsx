"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { projectCategories } from "@/content/projects";

type Status = "idle" | "submitting" | "success" | "error";

export function InquiryForm({ dict }: { dict: Dictionary }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-3 border border-border-subtle bg-surface p-8">
        <CheckCircle2 className="h-7 w-7 text-accent" />
        <p className="font-serif text-xl">{dict.contact.formSuccessTitle}</p>
        <p className="text-sm text-foreground/60">{dict.contact.formSuccessBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={dict.contact.formName} name="name" required />
        <Field label={dict.contact.formCompany} name="company" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={dict.contact.formEmail} name="email" type="email" required />
        <Field label={dict.contact.formPhone} name="phone" type="tel" />
      </div>
      <div>
        <label className="mb-2 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-foreground/50">
          {dict.contact.formProjectType}
        </label>
        <select
          name="projectType"
          required
          defaultValue=""
          className="w-full border-b border-border-subtle bg-transparent py-2.5 text-sm outline-none transition-colors focus:border-ink"
        >
          <option value="" disabled>
            —
          </option>
          {projectCategories.map((c) => (
            <option key={c.value} value={c.value}>
              {dict.categories[c.labelKey]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-2 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-foreground/50">
          {dict.contact.formMessage}
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full border border-border-subtle bg-transparent px-3 py-2.5 text-sm outline-none transition-colors focus:border-ink"
        />
      </div>

      {status === "error" && <p className="text-sm text-red-600">{dict.contact.formErrorBody}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex bg-ink px-9 py-4 text-[0.8rem] font-medium uppercase tracking-[0.12em] text-paper transition-colors hover:bg-wood disabled:opacity-60"
      >
        {status === "submitting" ? "…" : dict.contact.formSubmit}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-foreground/50">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full border-b border-border-subtle bg-transparent py-2.5 text-sm outline-none transition-colors focus:border-ink"
      />
    </div>
  );
}
