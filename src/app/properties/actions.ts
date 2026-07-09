"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  getAdminNotificationEmail,
  getResendClient,
  getResendFromEmail,
} from "@/lib/resend";

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function getNullableStringValue(formData: FormData, key: string) {
  const value = getStringValue(formData, key);

  if (!value) {
    return null;
  }

  return value;
}

export async function createPropertyLeadAction(formData: FormData) {
  const supabase = createAdminClient();

  const propertyId = getStringValue(formData, "property_id");
  const propertySlug = getStringValue(formData, "property_slug");
  const propertyTitle = getStringValue(formData, "property_title");

  const name = getStringValue(formData, "name");
  const email = getNullableStringValue(formData, "email");
  const phone = getNullableStringValue(formData, "phone");
  const message = getNullableStringValue(formData, "message");

  if (!propertyId) {
    throw new Error("Property ID is required.");
  }

  if (!propertySlug) {
    throw new Error("Property slug is required.");
  }

  if (!name) {
    throw new Error("Name is required.");
  }

  if (!email && !phone) {
    throw new Error("Email or phone is required.");
  }

  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .insert({
      name,
      email,
      phone,
      message,
      property_id: propertyId,
      source: "property_detail_page",
      status: "new",
    })
    .select("*")
    .single();

  if (leadError) {
    console.error("Error creating lead:", leadError.message);
    throw new Error(leadError.message);
  }

  const { data: submission, error: submissionError } = await supabase
    .from("form_submissions")
    .insert({
      form_name: "property_interest",
      name,
      email,
      phone,
      subject: `Property inquiry: ${propertyTitle}`,
      message,
      property_id: propertyId,
      lead_id: lead.id,
      payload: {
        property_id: propertyId,
        property_slug: propertySlug,
        property_title: propertyTitle,
        source: "property_detail_page",
      },
    })
    .select("*")
    .single();

  if (submissionError) {
    console.error("Error creating form submission:", submissionError.message);
  }

  const resend = getResendClient();
  const adminEmail = getAdminNotificationEmail();
  const fromEmail = getResendFromEmail();

  if (resend && adminEmail) {
    const subject = `New property lead: ${propertyTitle}`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #111827;">
        <h1 style="font-size: 24px; margin-bottom: 8px;">New Property Lead</h1>
        <p style="color: #4b5563; margin-top: 0;">A new inquiry was submitted from the property detail page.</p>

        <div style="background: #f3f4f6; border-radius: 16px; padding: 20px; margin: 24px 0;">
          <p><strong>Property:</strong> ${propertyTitle}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email || "Not provided"}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-line;">${message || "No message provided."}</p>
        </div>

        <p style="font-size: 13px; color: #6b7280;">
          Source: Property detail page<br />
          Slug: ${propertySlug}
        </p>
      </div>
    `;

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject,
      html,
    });

    await supabase.from("email_logs").insert({
      to_email: adminEmail,
      from_email: fromEmail,
      subject,
      template_name: "property_interest_admin_notification",
      status: emailError ? "failed" : "sent",
      resend_email_id: emailData?.id || null,
      error_message: emailError?.message || null,
      lead_id: lead.id,
      form_submission_id: submission?.id || null,
    });

    if (emailError) {
      console.error("Error sending lead email:", emailError.message);
    }
  }

  export async function updatePropertyImagesOrderAction(formData: FormData) {
  "use server";

  const propertyId = String(formData.get("property_id") || "");
  const propertySlug = String(formData.get("property_slug") || "");
  const rawImagesOrder = String(formData.get("images_order") || "[]");

  if (!propertyId) {
    throw new Error("Property ID is required.");
  }

  let imagesOrder: {
    id: string;
    position: number;
  }[] = [];

  try {
    imagesOrder = JSON.parse(rawImagesOrder);
  } catch {
    throw new Error("Invalid images order payload.");
  }

  if (!Array.isArray(imagesOrder)) {
    throw new Error("Images order must be an array.");
  }

  const validImagesOrder = imagesOrder
    .filter((item) => {
      return (
        item &&
        typeof item.id === "string" &&
        item.id.length > 0 &&
        Number.isFinite(Number(item.position))
      );
    })
    .map((item, index) => ({
      id: item.id,
      position: index + 1,
    }));

  if (validImagesOrder.length === 0) {
    return;
  }

  const supabase = await createAdminSupabaseClient();

  for (const image of validImagesOrder) {
    const { error } = await supabase
      .from("property_images")
      .update({
        position: image.position,
      })
      .eq("id", image.id)
      .eq("property_id", propertyId);

    if (error) {
      throw new Error(error.message);
    }
  }

  revalidatePath(`/admin/properties/${propertyId}/edit`);

  if (propertySlug) {
    revalidatePath(`/properties/${propertySlug}`);
  }

  revalidatePath("/projects");
}

  redirect(`/properties/${propertySlug}?lead=success#contact`);
}