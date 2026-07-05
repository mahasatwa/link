import { NextResponse } from "next/server";
import { getAllLinks, searchLinks, getLinkBySlug, createLink } from "@/lib/db";
import { getAuth } from "@/lib/auth";

export async function GET(request: Request) {
  const auth = await getAuth();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const category = searchParams.get("category");

  let links = search ? await searchLinks(search) : await getAllLinks();

  if (category) {
    links = links.filter((l) => l.category === category);
  }

  return NextResponse.json(links);
}

export async function POST(request: Request) {
  const auth = await getAuth();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { slug, target_url, title, category } = body;

    if (!slug || !target_url || !title) {
      return NextResponse.json(
        { error: "Slug, URL tujuan, dan judul wajib diisi" },
        { status: 400 }
      );
    }

    // Validate slug format
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json(
        { error: "Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung" },
        { status: 400 }
      );
    }

    // Check for duplicate slug
    const existing = await getLinkBySlug(slug);
    if (existing) {
      return NextResponse.json(
        { error: "Slug sudah digunakan" },
        { status: 409 }
      );
    }

    const newLink = await createLink({
      slug,
      target_url,
      title,
      category: category || "lainnya",
    });

    return NextResponse.json(newLink, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Gagal menyimpan: ${message}` },
      { status: 500 }
    );
  }
}
