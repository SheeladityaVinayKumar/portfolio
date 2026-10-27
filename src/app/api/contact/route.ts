import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    const { name, email, message } = body || {};

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const accessKey =
      process.env.WEB3FORMS_ACCESS_KEY ||
      process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
      "";

    // If Web3Forms access key is configured, forward submission to Web3Forms
    if (accessKey && accessKey !== "YOUR_WEB3FORMS_KEY") {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          from_name: `${name.trim()} (Portfolio Contact)`,
          subject: `Portfolio Message from ${name.trim()}`
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        return NextResponse.json({
          success: true,
          message: "Message sent successfully to inbox!"
        });
      }

      return NextResponse.json(
        {
          success: false,
          error: data.message || "Failed to deliver message via Web3Forms."
        },
        { status: response.status || 500 }
      );
    }

    // If key not configured yet, log message and return pendingSetup indicator
    console.log(
      `[Portfolio Contact] From: ${name.trim()} <${email.trim()}> - Message: ${message.trim()}`
    );

    return NextResponse.json({
      success: true,
      pendingSetup: true,
      message:
        "Message received! To deliver directly to your inbox, add WEB3FORMS_ACCESS_KEY in .env.local."
    });
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Server error while processing your message."
      },
      { status: 500 }
    );
  }
}
