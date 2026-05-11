import ArchiveClient from "./ArchiveClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archive | Echoes of Identity",
  description: "Explore our digital archive of Jewish and Muslim oral histories, immigration stories, and cultural testimonies. Preserving the lived experiences of the diaspora.",
  alternates: {
    canonical: "https://echoesofidentity.org/archive",
  },
};

export default function ArchivePage() {
  return <ArchiveClient />;
}
