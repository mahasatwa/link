import { NextResponse } from "next/server";
import { getLinkById, getLinkBySlug, updateLink, deleteLink } from "@/lib/db";
import { getAuth } from "@/lib/auth";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const auth = await getAuth();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const link = await getLinkById(Number(id));

  if (!link) {
    return NextResponse.json({ error: "Tautan tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json(link);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
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

    // Check if link exists
    const existing = await getLinkById(Number(id));
    if (!existing) {
      return NextResponse.json({ error: "Tautan tidak ditemukan" }, { status: 404 });
    }

    // Check for duplicate slug (excluding current)
    const slugConflict = await getLinkBySlug(slug);
    if (slugConflict && slugConflict.id !== Number(id)) {
      return NextResponse.json(
        { error: "Slug sudah digunakan" },
        { status: 409 }
      );
    }

    await updateLink(Number(id), {
      slug,
      target_url,
      title,
      category: category || "lainnya",
    });
    const updated = await getLinkById(Number(id));

    return NextResponse.json(updated);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Gagal memperbarui: ${message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const auth = await getAuth();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const existing = await getLinkById(Number(id));
    if (!existing) {
      return NextResponse.json({ error: "Tautan tidak ditemukan" }, { status: 404 });
    }

    await deleteLink(Number(id));
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Gagal menghapus: ${message}` },
      { status: 500 }
    );
  }
}
