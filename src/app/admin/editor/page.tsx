import type { Metadata } from "next";
import { EditorShell } from "@/components/EditorShell";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Live Editor",
};

export const dynamic = "force-dynamic";

export default function EditorPage() {
  return <EditorShell />;
}
