"use client";

import { useSearchParams } from "next/navigation";
import EnquiryForm from "@/components/EnquiryForm";

export default function ContactFormClient() {
  const sp = useSearchParams();
  const service = sp.get("service") || undefined;
  return <EnquiryForm initialService={service} />;
}
