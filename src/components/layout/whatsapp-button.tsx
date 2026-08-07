import { WhatsAppIcon } from "@/components/icons/social-icons";
import { whatsappHref } from "@/content/site";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappHref("Hello Maple Furniture, I'd like to enquire about a project.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
