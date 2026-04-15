import { NextResponse } from "next/server";

import { submitContactForm } from "@/features/contact/actions";

export async function POST(request: Request) {
	try {
		const payload = await request.json();
		const result = await submitContactForm(payload);
		const status = result.success ? 200 : 400;

		return NextResponse.json(result, { status });
	} catch {
		return NextResponse.json(
			{ error: "Invalid request payload." },
			{ status: 400 }
		);
	}
}
