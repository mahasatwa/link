import { getLinkBySlug, incrementClicks } from "@/lib/db";
import { notFound } from "next/navigation";
import CountdownRedirect from "./CountdownRedirect";

interface Props {
  params: { slug: string };
}

export default async function SlugPage({ params }: Props) {
  const link = await getLinkBySlug(params.slug);

  if (!link) {
    notFound();
  }

  // Increment click count
  await incrementClicks(link.id);

  return (
    <CountdownRedirect
      targetUrl={link.target_url}
      title={link.title}
      slug={link.slug}
    />
  );
}
