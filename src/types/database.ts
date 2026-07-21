export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          auth_user_id: string | null;
          name: string;
          email: string;
          role: "admin" | "editor" | "viewer";
          status: string;
          avatar_url: string | null;
          last_login_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          auth_user_id?: string | null;
          name: string;
          email: string;
          role?: "admin" | "editor" | "viewer";
          status?: string;
          avatar_url?: string | null;
          last_login_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          auth_user_id?: string | null;
          name?: string;
          email?: string;
          role?: "admin" | "editor" | "viewer";
          status?: string;
          avatar_url?: string | null;
          last_login_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      analytics_events: {
        Row: {
          id: string;
          event_name: string | null;
          payload: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_name?: string | null;
          payload?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          event_name?: string | null;
          payload?: Json | null;
          created_at?: string;
        };
      };

      forms: {
        Row: {
          id: string;
          name: string;
          slug: string;
          title: string;
          description: string | null;
          status: "draft" | "published" | "archived";
          submit_button_label: string;
          acceptance_message: string | null;
          thank_you_page_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          title: string;
          description?: string | null;
          status?: "draft" | "published" | "archived";
          submit_button_label?: string;
          acceptance_message?: string | null;
          thank_you_page_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          title?: string;
          description?: string | null;
          status?: "draft" | "published" | "archived";
          submit_button_label?: string;
          acceptance_message?: string | null;
          thank_you_page_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      form_fields: {
        Row: {
          id: string;
          form_id: string;
          label: string;
          name: string;
          type:
            | "text"
            | "email"
            | "phone"
            | "number"
            | "textarea"
            | "select"
            | "checkbox"
            | "radio"
            | "hidden"
            | "state";
          placeholder: string | null;
          help_text: string | null;
          required: boolean;
          options: Json;
          default_value: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          form_id: string;
          label: string;
          name: string;
          type:
            | "text"
            | "email"
            | "phone"
            | "number"
            | "textarea"
            | "select"
            | "checkbox"
            | "radio"
            | "hidden"
            | "state";
          placeholder?: string | null;
          help_text?: string | null;
          required?: boolean;
          options?: Json;
          default_value?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          form_id?: string;
          label?: string;
          name?: string;
          type?:
            | "text"
            | "email"
            | "phone"
            | "number"
            | "textarea"
            | "select"
            | "checkbox"
            | "radio"
            | "hidden"
            | "state";
          placeholder?: string | null;
          help_text?: string | null;
          required?: boolean;
          options?: Json;
          default_value?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };

      form_webhooks: {
        Row: {
          id: string;
          form_id: string;
          name: string;
          url: string;
          method: "POST" | "PUT" | "PATCH";
          enabled: boolean;
          headers: Json;
          payload_template: Json;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          form_id: string;
          name: string;
          url: string;
          method?: "POST" | "PUT" | "PATCH";
          enabled?: boolean;
          headers?: Json;
          payload_template?: Json;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          form_id?: string;
          name?: string;
          url?: string;
          method?: "POST" | "PUT" | "PATCH";
          enabled?: boolean;
          headers?: Json;
          payload_template?: Json;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };

      form_webhook_logs: {
        Row: {
          id: string;
          submission_id: string | null;
          webhook_id: string | null;
          webhook_name: string | null;
          status: "success" | "error";
          request_url: string | null;
          request_method: string | null;
          request_headers: Json | null;
          request_payload: Json | null;
          response_status: number | null;
          response_body: string | null;
          error_message: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          submission_id?: string | null;
          webhook_id?: string | null;
          webhook_name?: string | null;
          status: "success" | "error";
          request_url?: string | null;
          request_method?: string | null;
          request_headers?: Json | null;
          request_payload?: Json | null;
          response_status?: number | null;
          response_body?: string | null;
          error_message?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          submission_id?: string | null;
          webhook_id?: string | null;
          webhook_name?: string | null;
          status?: "success" | "error";
          request_url?: string | null;
          request_method?: string | null;
          request_headers?: Json | null;
          request_payload?: Json | null;
          response_status?: number | null;
          response_body?: string | null;
          error_message?: string | null;
          created_at?: string;
        };
      };

      properties: {
        Row: {
          id: string;

          title: string;
          slug: string;
          short_description: string | null;
          description: string | null;

          property_type:
            | "single_family"
            | "multi_family"
            | "condo"
            | "townhouse"
            | "land"
            | "commercial"
            | "new_construction"
            | "flip";

          status:
            | "draft"
            | "available"
            | "under_contract"
            | "sold"
            | "rented"
            | "in_progress"
            | "archived";

          visibility: string;

          address_line_1: string;
          address_line_2: string | null;
          city: string;
          state: string;
          zip_code: string | null;
          country: string;

          latitude: number | null;
          longitude: number | null;

          price: number | null;
          purchase_price: number | null;
          rehab_estimate: number | null;
          projected_arv: number | null;
          projected_rent: number | null;
          projected_roi: number | null;

          bedrooms: number | null;
          bathrooms: number | null;
          sqft: number | null;
          lot_size_sqft: number | null;
          year_built: number | null;

          garage_spaces: number | null;
          parking_spaces: number | null;
          stories: number | null;
          neighborhood: string | null;
          county: string | null;
          mls_number: string | null;

          cover_image_url: string | null;
          video_url: string | null;
          virtual_tour_url: string | null;

          contact_cta_title: string | null;
          contact_cta_description: string | null;
          contact_button_label: string | null;
          contact_phone: string | null;
          contact_email: string | null;

          is_featured: boolean;
          published_at: string | null;

          cond_active: boolean;
          cond_number_of_houses: number | null;
          cond_listed_price: string | null;
          cond_avg_price: string | null;
          cond_sqft: number | null;
          cond_bedrooms: number | null;
          cond_bathrooms: number | null;

          meta_title: string | null;
          meta_description: string | null;

          created_by: string | null;
          updated_by: string | null;

          created_at: string;
          updated_at: string;
        };

        Insert: {
          id?: string;

          title: string;
          slug: string;
          short_description?: string | null;
          description?: string | null;

          property_type?:
            | "single_family"
            | "multi_family"
            | "condo"
            | "townhouse"
            | "land"
            | "commercial"
            | "new_construction"
            | "flip";

          status?:
            | "draft"
            | "available"
            | "under_contract"
            | "sold"
            | "rented"
            | "in_progress"
            | "archived";

          visibility?: string;

          address_line_1: string;
          address_line_2?: string | null;
          city: string;
          state: string;
          zip_code?: string | null;
          country?: string;

          latitude?: number | null;
          longitude?: number | null;

          price?: number | null;
          purchase_price?: number | null;
          rehab_estimate?: number | null;
          projected_arv?: number | null;
          projected_rent?: number | null;
          projected_roi?: number | null;

          bedrooms?: number | null;
          bathrooms?: number | null;
          sqft?: number | null;
          lot_size_sqft?: number | null;
          year_built?: number | null;

          garage_spaces?: number | null;
          parking_spaces?: number | null;
          stories?: number | null;
          neighborhood?: string | null;
          county?: string | null;
          mls_number?: string | null;

          cover_image_url?: string | null;
          video_url?: string | null;
          virtual_tour_url?: string | null;

          contact_cta_title?: string | null;
          contact_cta_description?: string | null;
          contact_button_label?: string | null;
          contact_phone?: string | null;
          contact_email?: string | null;

          is_featured?: boolean;
          published_at?: string | null;

          cond_active?: boolean;
          cond_number_of_houses?: number | null;
          cond_listed_price?: string | null;
          cond_avg_price?: string | null;
          cond_sqft?: number | null;
          cond_bedrooms?: number | null;
          cond_bathrooms?: number | null;

          meta_title?: string | null;
          meta_description?: string | null;

          created_by?: string | null;
          updated_by?: string | null;

          created_at?: string;
          updated_at?: string;
        };

        Update: {
          id?: string;

          title?: string;
          slug?: string;
          short_description?: string | null;
          description?: string | null;

          property_type?:
            | "single_family"
            | "multi_family"
            | "condo"
            | "townhouse"
            | "land"
            | "commercial"
            | "new_construction"
            | "flip";

          status?:
            | "draft"
            | "available"
            | "under_contract"
            | "sold"
            | "rented"
            | "in_progress"
            | "archived";

          visibility?: string;

          address_line_1?: string;
          address_line_2?: string | null;
          city?: string;
          state?: string;
          zip_code?: string | null;
          country?: string;

          latitude?: number | null;
          longitude?: number | null;

          price?: number | null;
          purchase_price?: number | null;
          rehab_estimate?: number | null;
          projected_arv?: number | null;
          projected_rent?: number | null;
          projected_roi?: number | null;

          bedrooms?: number | null;
          bathrooms?: number | null;
          sqft?: number | null;
          lot_size_sqft?: number | null;
          year_built?: number | null;

          garage_spaces?: number | null;
          parking_spaces?: number | null;
          stories?: number | null;
          neighborhood?: string | null;
          county?: string | null;
          mls_number?: string | null;

          cover_image_url?: string | null;
          video_url?: string | null;
          virtual_tour_url?: string | null;

          contact_cta_title?: string | null;
          contact_cta_description?: string | null;
          contact_button_label?: string | null;
          contact_phone?: string | null;
          contact_email?: string | null;

          is_featured?: boolean;
          published_at?: string | null;

          cond_active?: boolean;
          cond_number_of_houses?: number | null;
          cond_listed_price?: string | null;
          cond_avg_price?: string | null;
          cond_sqft?: number | null;
          cond_bedrooms?: number | null;
          cond_bathrooms?: number | null;

          meta_title?: string | null;
          meta_description?: string | null;

          created_by?: string | null;
          updated_by?: string | null;

          created_at?: string;
          updated_at?: string;
        };
      };

      property_images: {
        Row: {
          id: string;
          property_id: string;
          image_url: string;
          title: string | null;
          alt_text: string | null;
          caption: string | null;
          media_group: string | null;
          width: number | null;
          height: number | null;
          position: number;
          is_cover: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          image_url: string;
          title?: string | null;
          alt_text?: string | null;
          caption?: string | null;
          media_group?: string | null;
          width?: number | null;
          height?: number | null;
          position?: number;
          is_cover?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string;
          image_url?: string;
          title?: string | null;
          alt_text?: string | null;
          caption?: string | null;
          media_group?: string | null;
          width?: number | null;
          height?: number | null;
          position?: number;
          is_cover?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      property_complement_blocks: {
        Row: {
          id: string;
          slug: string;
          title: string;
          eyebrow: string | null;
          description: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          eyebrow?: string | null;
          description?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          eyebrow?: string | null;
          description?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      property_complement_block_properties: {
        Row: {
          block_id: string;
          property_id: string;
          created_at: string;
        };
        Insert: {
          block_id: string;
          property_id: string;
          created_at?: string;
        };
        Update: {
          block_id?: string;
          property_id?: string;
          created_at?: string;
        };
      };

      property_videos: {
        Row: {
          id: string;
          property_id: string;
          title: string | null;
          description: string | null;
          video_url: string;
          provider: string | null;
          thumbnail_url: string | null;
          duration_seconds: number | null;
          video_type: string | null;
          is_featured: boolean;
          position: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          title?: string | null;
          description?: string | null;
          video_url: string;
          provider?: string | null;
          thumbnail_url?: string | null;
          duration_seconds?: number | null;
          video_type?: string | null;
          is_featured?: boolean;
          position?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string;
          title?: string | null;
          description?: string | null;
          video_url?: string;
          provider?: string | null;
          thumbnail_url?: string | null;
          duration_seconds?: number | null;
          video_type?: string | null;
          is_featured?: boolean;
          position?: number;
          created_at?: string;
          updated_at?: string;
        };
      };

      property_documents: {
        Row: {
          id: string;
          property_id: string;
          title: string;
          description: string | null;
          file_url: string;
          file_type: string | null;
          document_type: string | null;
          button_label: string | null;
          is_public: boolean;
          position: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          title: string;
          description?: string | null;
          file_url: string;
          file_type?: string | null;
          document_type?: string | null;
          button_label?: string | null;
          is_public?: boolean;
          position?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string;
          title?: string;
          description?: string | null;
          file_url?: string;
          file_type?: string | null;
          document_type?: string | null;
          button_label?: string | null;
          is_public?: boolean;
          position?: number;
          created_at?: string;
          updated_at?: string;
        };
      };

      property_features: {
        Row: {
          id: string;
          property_id: string;
          label: string;
          value: string | null;
          icon: string | null;
          position: number;
          is_highlight: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          label: string;
          value?: string | null;
          icon?: string | null;
          position?: number;
          is_highlight?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string;
          label?: string;
          value?: string | null;
          icon?: string | null;
          position?: number;
          is_highlight?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };

      leads: {
        Row: {
          id: string;
          name: string;
          email: string | null;
          phone: string | null;
          status:
            | "new"
            | "contacted"
            | "qualified"
            | "converted"
            | "lost"
            | "archived";
          source: string | null;
          message: string | null;
          property_id: string | null;
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          utm_content: string | null;
          utm_term: string | null;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email?: string | null;
          phone?: string | null;
          status?:
            | "new"
            | "contacted"
            | "qualified"
            | "converted"
            | "lost"
            | "archived";
          source?: string | null;
          message?: string | null;
          property_id?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          utm_content?: string | null;
          utm_term?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string | null;
          phone?: string | null;
          status?:
            | "new"
            | "contacted"
            | "qualified"
            | "converted"
            | "lost"
            | "archived";
          source?: string | null;
          message?: string | null;
          property_id?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          utm_content?: string | null;
          utm_term?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      form_submissions: {
        Row: {
          id: string;
          form_id: string | null;
          form_slug: string | null;
          form_name: string | null;
          name: string | null;
          email: string | null;
          phone: string | null;
          subject: string | null;
          message: string | null;
          payload: Json | null;
          data: Json;
          source_url: string | null;
          user_agent: string | null;
          ip_address: string | null;
          webhook_status:
            | "pending"
            | "success"
            | "partial_error"
            | "error"
            | "not_configured";
          webhook_success_count: number;
          webhook_error_count: number;
          property_id: string | null;
          lead_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          form_id?: string | null;
          form_slug?: string | null;
          form_name?: string | null;
          name?: string | null;
          email?: string | null;
          phone?: string | null;
          subject?: string | null;
          message?: string | null;
          payload?: Json | null;
          data?: Json;
          source_url?: string | null;
          user_agent?: string | null;
          ip_address?: string | null;
          webhook_status?:
            | "pending"
            | "success"
            | "partial_error"
            | "error"
            | "not_configured";
          webhook_success_count?: number;
          webhook_error_count?: number;
          property_id?: string | null;
          lead_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          form_id?: string | null;
          form_slug?: string | null;
          form_name?: string | null;
          name?: string | null;
          email?: string | null;
          phone?: string | null;
          subject?: string | null;
          message?: string | null;
          payload?: Json | null;
          data?: Json;
          source_url?: string | null;
          user_agent?: string | null;
          ip_address?: string | null;
          webhook_status?:
            | "pending"
            | "success"
            | "partial_error"
            | "error"
            | "not_configured";
          webhook_success_count?: number;
          webhook_error_count?: number;
          property_id?: string | null;
          lead_id?: string | null;
          created_at?: string;
        };
      };

      form_emails: {
        Row: {
          id: string;
          form_id: string;
          name: string;
          type: "user" | "admin";
          enabled: boolean;
          recipient_field: string | null;
          recipients: Json;
          subject_template: string;
          body_html_template: string;
          from_name: string | null;
          reply_to_field: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          form_id: string;
          name: string;
          type: "user" | "admin";
          enabled?: boolean;
          recipient_field?: string | null;
          recipients?: Json;
          subject_template: string;
          body_html_template: string;
          from_name?: string | null;
          reply_to_field?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          form_id?: string;
          name?: string;
          type?: "user" | "admin";
          enabled?: boolean;
          recipient_field?: string | null;
          recipients?: Json;
          subject_template?: string;
          body_html_template?: string;
          from_name?: string | null;
          reply_to_field?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };

      form_email_logs: {
        Row: {
          id: string;
          submission_id: string;
          form_email_id: string | null;
          form_email_name: string | null;
          status: "success" | "error";
          email_type: "user" | "admin" | null;
          recipients: Json;
          subject: string | null;
          body_html: string | null;
          provider_message_id: string | null;
          error_message: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          submission_id: string;
          form_email_id?: string | null;
          form_email_name?: string | null;
          status: "success" | "error";
          email_type?: "user" | "admin" | null;
          recipients?: Json;
          subject?: string | null;
          body_html?: string | null;
          provider_message_id?: string | null;
          error_message?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          submission_id?: string;
          form_email_id?: string | null;
          form_email_name?: string | null;
          status?: "success" | "error";
          email_type?: "user" | "admin" | null;
          recipients?: Json;
          subject?: string | null;
          body_html?: string | null;
          provider_message_id?: string | null;
          error_message?: string | null;
          created_at?: string;
        };
      };

      email_logs: {
        Row: {
          id: string;
          to_email: string;
          from_email: string | null;
          subject: string;
          template_name: string | null;
          status: "queued" | "sent" | "failed";
          resend_email_id: string | null;
          error_message: string | null;
          lead_id: string | null;
          form_submission_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          to_email: string;
          from_email?: string | null;
          subject: string;
          template_name?: string | null;
          status?: "queued" | "sent" | "failed";
          resend_email_id?: string | null;
          error_message?: string | null;
          lead_id?: string | null;
          form_submission_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          to_email?: string;
          from_email?: string | null;
          subject?: string;
          template_name?: string | null;
          status?: "queued" | "sent" | "failed";
          resend_email_id?: string | null;
          error_message?: string | null;
          lead_id?: string | null;
          form_submission_id?: string | null;
          created_at?: string;
        };
      };

      site_settings: {
        Row: {
          id: string;
          key: string;
          value: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          value?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
    };

    Views: {
      admin_submission_overview: {
        Row: {
          id: string;
          form_id: string | null;
          form_slug: string | null;
          form_name: string | null;
          form_title: string | null;
          data: Json;
          source_url: string | null;
          webhook_status:
            | "pending"
            | "success"
            | "partial_error"
            | "error"
            | "not_configured";
          webhook_success_count: number;
          webhook_error_count: number;
          email_success_count: number;
          email_error_count: number;
          email_total_count: number;
          created_at: string;
        };
      };
    };

    Functions: {
      set_updated_at: {
        Args: Record<PropertyKey, never>;
        Returns: unknown;
      };
    };

    Enums: {
      property_status:
        | "draft"
        | "available"
        | "under_contract"
        | "sold"
        | "rented"
        | "in_progress"
        | "archived";

      property_type:
        | "single_family"
        | "multi_family"
        | "condo"
        | "townhouse"
        | "land"
        | "commercial"
        | "new_construction"
        | "flip";

      admin_role: "admin" | "editor" | "viewer";

      lead_status:
        | "new"
        | "contacted"
        | "qualified"
        | "converted"
        | "lost"
        | "archived";

      email_status: "queued" | "sent" | "failed";
    };

    CompositeTypes: Record<string, never>;
  };
};
