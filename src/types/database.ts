export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          auth_user_id: string | null
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          last_login_at: string | null
          name: string
          password_hash: string | null
          role: Database["public"]["Enums"]["admin_role"]
          status: string
          updated_at: string
        }
        Insert: {
          auth_user_id?: string | null
          avatar_url?: string | null
          created_at?: string
          email: string
          id?: string
          last_login_at?: string | null
          name: string
          password_hash?: string | null
          role?: Database["public"]["Enums"]["admin_role"]
          status?: string
          updated_at?: string
        }
        Update: {
          auth_user_id?: string | null
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          last_login_at?: string | null
          name?: string
          password_hash?: string | null
          role?: Database["public"]["Enums"]["admin_role"]
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      authors: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string
          slug: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          name: string
          slug?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          slug?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      auto_news_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          message: string
          metadata: Json | null
          queue_id: string | null
          search_term_id: string | null
          status: string
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          message: string
          metadata?: Json | null
          queue_id?: string | null
          search_term_id?: string | null
          status?: string
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          message?: string
          metadata?: Json | null
          queue_id?: string | null
          search_term_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "auto_news_logs_queue_id_fkey"
            columns: ["queue_id"]
            isOneToOne: false
            referencedRelation: "auto_news_queue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "auto_news_logs_search_term_id_fkey"
            columns: ["search_term_id"]
            isOneToOne: false
            referencedRelation: "auto_news_search_terms"
            referencedColumns: ["id"]
          },
        ]
      }
      auto_news_queue: {
        Row: {
          ai_cost: number | null
          ai_error: string | null
          ai_model: string | null
          ai_tokens_input: number | null
          ai_tokens_output: number | null
          category_id: string | null
          created_at: string
          external_id: string | null
          generated_content: string | null
          generated_excerpt: string | null
          generated_image_alt: string | null
          generated_meta_description: string | null
          generated_meta_title: string | null
          generated_slug: string | null
          generated_subtitle: string | null
          generated_tags: Json | null
          generated_title: string | null
          id: string
          original_author: string | null
          original_content: string | null
          original_description: string | null
          original_image_url: string | null
          original_published_at: string | null
          original_source_name: string | null
          original_title: string
          original_url: string
          processed_at: string | null
          provider: string
          published_at: string | null
          published_news_id: string | null
          reviewed_at: string | null
          rss_source_id: string | null
          search_term_id: string | null
          source_type: string | null
          status: string
          updated_at: string
        }
        Insert: {
          ai_cost?: number | null
          ai_error?: string | null
          ai_model?: string | null
          ai_tokens_input?: number | null
          ai_tokens_output?: number | null
          category_id?: string | null
          created_at?: string
          external_id?: string | null
          generated_content?: string | null
          generated_excerpt?: string | null
          generated_image_alt?: string | null
          generated_meta_description?: string | null
          generated_meta_title?: string | null
          generated_slug?: string | null
          generated_subtitle?: string | null
          generated_tags?: Json | null
          generated_title?: string | null
          id?: string
          original_author?: string | null
          original_content?: string | null
          original_description?: string | null
          original_image_url?: string | null
          original_published_at?: string | null
          original_source_name?: string | null
          original_title: string
          original_url: string
          processed_at?: string | null
          provider: string
          published_at?: string | null
          published_news_id?: string | null
          reviewed_at?: string | null
          rss_source_id?: string | null
          search_term_id?: string | null
          source_type?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          ai_cost?: number | null
          ai_error?: string | null
          ai_model?: string | null
          ai_tokens_input?: number | null
          ai_tokens_output?: number | null
          category_id?: string | null
          created_at?: string
          external_id?: string | null
          generated_content?: string | null
          generated_excerpt?: string | null
          generated_image_alt?: string | null
          generated_meta_description?: string | null
          generated_meta_title?: string | null
          generated_slug?: string | null
          generated_subtitle?: string | null
          generated_tags?: Json | null
          generated_title?: string | null
          id?: string
          original_author?: string | null
          original_content?: string | null
          original_description?: string | null
          original_image_url?: string | null
          original_published_at?: string | null
          original_source_name?: string | null
          original_title?: string
          original_url?: string
          processed_at?: string | null
          provider?: string
          published_at?: string | null
          published_news_id?: string | null
          reviewed_at?: string | null
          rss_source_id?: string | null
          search_term_id?: string | null
          source_type?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "auto_news_queue_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "auto_news_queue_published_news_id_fkey"
            columns: ["published_news_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "auto_news_queue_rss_source_id_fkey"
            columns: ["rss_source_id"]
            isOneToOne: false
            referencedRelation: "rss_news_sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "auto_news_queue_search_term_id_fkey"
            columns: ["search_term_id"]
            isOneToOne: false
            referencedRelation: "auto_news_search_terms"
            referencedColumns: ["id"]
          },
        ]
      }
      auto_news_search_terms: {
        Row: {
          auto_process: boolean
          auto_publish: boolean
          category_id: string | null
          country: string
          created_at: string
          id: string
          is_active: boolean
          language: string
          last_searched_at: string | null
          min_interval_minutes: number
          name: string
          next_search_at: string | null
          provider: string
          query: string
          result_limit: number
          updated_at: string
        }
        Insert: {
          auto_process?: boolean
          auto_publish?: boolean
          category_id?: string | null
          country?: string
          created_at?: string
          id?: string
          is_active?: boolean
          language?: string
          last_searched_at?: string | null
          min_interval_minutes?: number
          name: string
          next_search_at?: string | null
          provider?: string
          query: string
          result_limit?: number
          updated_at?: string
        }
        Update: {
          auto_process?: boolean
          auto_publish?: boolean
          category_id?: string | null
          country?: string
          created_at?: string
          id?: string
          is_active?: boolean
          language?: string
          last_searched_at?: string | null
          min_interval_minutes?: number
          name?: string
          next_search_at?: string | null
          provider?: string
          query?: string
          result_limit?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "auto_news_search_terms_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      email_logs: {
        Row: {
          created_at: string
          error_message: string | null
          form_submission_id: string | null
          from_email: string | null
          id: string
          lead_id: string | null
          resend_email_id: string | null
          status: Database["public"]["Enums"]["email_status"]
          subject: string
          template_name: string | null
          to_email: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          form_submission_id?: string | null
          from_email?: string | null
          id?: string
          lead_id?: string | null
          resend_email_id?: string | null
          status?: Database["public"]["Enums"]["email_status"]
          subject: string
          template_name?: string | null
          to_email: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          form_submission_id?: string | null
          from_email?: string | null
          id?: string
          lead_id?: string | null
          resend_email_id?: string | null
          status?: Database["public"]["Enums"]["email_status"]
          subject?: string
          template_name?: string | null
          to_email?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_logs_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      form_email_logs: {
        Row: {
          body_html: string | null
          created_at: string
          email_type: string | null
          error_message: string | null
          form_email_id: string | null
          form_email_name: string | null
          id: string
          provider_message_id: string | null
          recipients: Json
          status: string
          subject: string | null
          submission_id: string
        }
        Insert: {
          body_html?: string | null
          created_at?: string
          email_type?: string | null
          error_message?: string | null
          form_email_id?: string | null
          form_email_name?: string | null
          id?: string
          provider_message_id?: string | null
          recipients?: Json
          status: string
          subject?: string | null
          submission_id: string
        }
        Update: {
          body_html?: string | null
          created_at?: string
          email_type?: string | null
          error_message?: string | null
          form_email_id?: string | null
          form_email_name?: string | null
          id?: string
          provider_message_id?: string | null
          recipients?: Json
          status?: string
          subject?: string | null
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "form_email_logs_form_email_id_fkey"
            columns: ["form_email_id"]
            isOneToOne: false
            referencedRelation: "form_emails"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "form_email_logs_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "admin_submission_overview"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "form_email_logs_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "form_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      form_emails: {
        Row: {
          body_html_template: string
          created_at: string
          enabled: boolean
          form_id: string
          from_name: string | null
          id: string
          name: string
          recipient_field: string | null
          recipients: Json
          reply_to_field: string | null
          sort_order: number
          subject_template: string
          type: string
          updated_at: string
        }
        Insert: {
          body_html_template: string
          created_at?: string
          enabled?: boolean
          form_id: string
          from_name?: string | null
          id?: string
          name: string
          recipient_field?: string | null
          recipients?: Json
          reply_to_field?: string | null
          sort_order?: number
          subject_template: string
          type: string
          updated_at?: string
        }
        Update: {
          body_html_template?: string
          created_at?: string
          enabled?: boolean
          form_id?: string
          from_name?: string | null
          id?: string
          name?: string
          recipient_field?: string | null
          recipients?: Json
          reply_to_field?: string | null
          sort_order?: number
          subject_template?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "form_emails_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      form_fields: {
        Row: {
          created_at: string
          default_value: string | null
          form_id: string
          help_text: string | null
          id: string
          label: string
          name: string
          options: Json
          placeholder: string | null
          required: boolean
          sort_order: number
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          default_value?: string | null
          form_id: string
          help_text?: string | null
          id?: string
          label: string
          name: string
          options?: Json
          placeholder?: string | null
          required?: boolean
          sort_order?: number
          type?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          default_value?: string | null
          form_id?: string
          help_text?: string | null
          id?: string
          label?: string
          name?: string
          options?: Json
          placeholder?: string | null
          required?: boolean
          sort_order?: number
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "form_fields_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      form_page_connections: {
        Row: {
          created_at: string
          form_id: string
          id: string
          page_key: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          form_id: string
          id?: string
          page_key: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          form_id?: string
          id?: string
          page_key?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "form_page_connections_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      form_submissions: {
        Row: {
          created_at: string
          data: Json
          form_id: string | null
          form_slug: string | null
          id: string
          ip_address: string | null
          source_url: string | null
          user_agent: string | null
          webhook_error_count: number
          webhook_status: string
          webhook_success_count: number
        }
        Insert: {
          created_at?: string
          data?: Json
          form_id?: string | null
          form_slug?: string | null
          id?: string
          ip_address?: string | null
          source_url?: string | null
          user_agent?: string | null
          webhook_error_count?: number
          webhook_status?: string
          webhook_success_count?: number
        }
        Update: {
          created_at?: string
          data?: Json
          form_id?: string | null
          form_slug?: string | null
          id?: string
          ip_address?: string | null
          source_url?: string | null
          user_agent?: string | null
          webhook_error_count?: number
          webhook_status?: string
          webhook_success_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "form_submissions_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      form_webhook_logs: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          request_headers: Json | null
          request_method: string | null
          request_payload: Json | null
          request_url: string | null
          response_body: string | null
          response_status: number | null
          status: string
          submission_id: string | null
          webhook_id: string | null
          webhook_name: string | null
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          request_headers?: Json | null
          request_method?: string | null
          request_payload?: Json | null
          request_url?: string | null
          response_body?: string | null
          response_status?: number | null
          status: string
          submission_id?: string | null
          webhook_id?: string | null
          webhook_name?: string | null
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          request_headers?: Json | null
          request_method?: string | null
          request_payload?: Json | null
          request_url?: string | null
          response_body?: string | null
          response_status?: number | null
          status?: string
          submission_id?: string | null
          webhook_id?: string | null
          webhook_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "form_webhook_logs_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "admin_submission_overview"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "form_webhook_logs_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "form_submissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "form_webhook_logs_webhook_id_fkey"
            columns: ["webhook_id"]
            isOneToOne: false
            referencedRelation: "form_webhooks"
            referencedColumns: ["id"]
          },
        ]
      }
      form_webhooks: {
        Row: {
          created_at: string
          enabled: boolean
          form_id: string
          headers: Json
          id: string
          method: string
          name: string
          payload_template: Json
          sort_order: number
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          enabled?: boolean
          form_id: string
          headers?: Json
          id?: string
          method?: string
          name: string
          payload_template?: Json
          sort_order?: number
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          enabled?: boolean
          form_id?: string
          headers?: Json
          id?: string
          method?: string
          name?: string
          payload_template?: Json
          sort_order?: number
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "form_webhooks_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      forms: {
        Row: {
          acceptance_message: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
          status: string
          submit_button_label: string
          thank_you_page_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          acceptance_message?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
          status?: string
          submit_button_label?: string
          thank_you_page_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          acceptance_message?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
          status?: string
          submit_button_label?: string
          thank_you_page_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string
          email: string | null
          id: string
          ip_address: string | null
          message: string | null
          name: string
          phone: string | null
          property_id: string | null
          source: string | null
          status: Database["public"]["Enums"]["lead_status"]
          updated_at: string
          user_agent: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          ip_address?: string | null
          message?: string | null
          name: string
          phone?: string | null
          property_id?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          ip_address?: string | null
          message?: string | null
          name?: string
          phone?: string | null
          property_id?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author_id: string | null
          category_id: string | null
          content: string | null
          cover_image_url: string | null
          created_at: string
          excerpt: string | null
          featured_image_url: string | null
          hero_image_url: string | null
          id: string
          image_alt: string | null
          main_image_url: string | null
          meta_description: string | null
          meta_title: string | null
          original_api_id: string | null
          published: boolean
          published_at: string | null
          slug: string
          source_name: string | null
          source_url: string | null
          status: string
          subtitle: string | null
          thumbnail_image_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          category_id?: string | null
          content?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          hero_image_url?: string | null
          id?: string
          image_alt?: string | null
          main_image_url?: string | null
          meta_description?: string | null
          meta_title?: string | null
          original_api_id?: string | null
          published?: boolean
          published_at?: string | null
          slug: string
          source_name?: string | null
          source_url?: string | null
          status?: string
          subtitle?: string | null
          thumbnail_image_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          category_id?: string | null
          content?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          hero_image_url?: string | null
          id?: string
          image_alt?: string | null
          main_image_url?: string | null
          meta_description?: string | null
          meta_title?: string | null
          original_api_id?: string | null
          published?: boolean
          published_at?: string | null
          slug?: string
          source_name?: string | null
          source_url?: string | null
          status?: string
          subtitle?: string | null
          thumbnail_image_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      properties: {
        Row: {
          address_line_1: string
          address_line_2: string | null
          bathrooms: number | null
          bedrooms: number | null
          city: string
          cond_active: boolean
          cond_avg_price: string | null
          cond_bathrooms: number | null
          cond_bedrooms: number | null
          cond_listed_price: string | null
          cond_number_of_houses: number | null
          cond_sqft: number | null
          contact_button_label: string | null
          contact_cta_description: string | null
          contact_cta_title: string | null
          contact_email: string | null
          contact_phone: string | null
          country: string
          county: string | null
          cover_image_url: string | null
          created_at: string
          created_by: string | null
          credit_active: boolean
          credit_new_price: number | null
          credit_old_price: number | null
          description: string | null
          garage_spaces: number | null
          id: string
          is_featured: boolean
          latitude: number | null
          longitude: number | null
          lot_size_sqft: number | null
          meta_description: string | null
          meta_title: string | null
          mls_number: string | null
          neighborhood: string | null
          parking_spaces: number | null
          price: number | null
          projected_arv: number | null
          projected_rent: number | null
          projected_roi: number | null
          property_type: Database["public"]["Enums"]["property_type"]
          published_at: string | null
          purchase_price: number | null
          rehab_estimate: number | null
          short_description: string | null
          slug: string
          sort_order: number
          sqft: number | null
          state: string
          status: Database["public"]["Enums"]["property_status"]
          stories: number | null
          title: string
          updated_at: string
          updated_by: string | null
          video_url: string | null
          virtual_tour_url: string | null
          visibility: string
          year_built: number | null
          zip_code: string | null
        }
        Insert: {
          address_line_1: string
          address_line_2?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          city: string
          cond_active?: boolean
          cond_avg_price?: string | null
          cond_bathrooms?: number | null
          cond_bedrooms?: number | null
          cond_listed_price?: string | null
          cond_number_of_houses?: number | null
          cond_sqft?: number | null
          contact_button_label?: string | null
          contact_cta_description?: string | null
          contact_cta_title?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          country?: string
          county?: string | null
          cover_image_url?: string | null
          created_at?: string
          created_by?: string | null
          credit_active?: boolean
          credit_new_price?: number | null
          credit_old_price?: number | null
          description?: string | null
          garage_spaces?: number | null
          id?: string
          is_featured?: boolean
          latitude?: number | null
          longitude?: number | null
          lot_size_sqft?: number | null
          meta_description?: string | null
          meta_title?: string | null
          mls_number?: string | null
          neighborhood?: string | null
          parking_spaces?: number | null
          price?: number | null
          projected_arv?: number | null
          projected_rent?: number | null
          projected_roi?: number | null
          property_type?: Database["public"]["Enums"]["property_type"]
          published_at?: string | null
          purchase_price?: number | null
          rehab_estimate?: number | null
          short_description?: string | null
          slug: string
          sort_order?: number
          sqft?: number | null
          state: string
          status?: Database["public"]["Enums"]["property_status"]
          stories?: number | null
          title: string
          updated_at?: string
          updated_by?: string | null
          video_url?: string | null
          virtual_tour_url?: string | null
          visibility?: string
          year_built?: number | null
          zip_code?: string | null
        }
        Update: {
          address_line_1?: string
          address_line_2?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          city?: string
          cond_active?: boolean
          cond_avg_price?: string | null
          cond_bathrooms?: number | null
          cond_bedrooms?: number | null
          cond_listed_price?: string | null
          cond_number_of_houses?: number | null
          cond_sqft?: number | null
          contact_button_label?: string | null
          contact_cta_description?: string | null
          contact_cta_title?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          country?: string
          county?: string | null
          cover_image_url?: string | null
          created_at?: string
          created_by?: string | null
          credit_active?: boolean
          credit_new_price?: number | null
          credit_old_price?: number | null
          description?: string | null
          garage_spaces?: number | null
          id?: string
          is_featured?: boolean
          latitude?: number | null
          longitude?: number | null
          lot_size_sqft?: number | null
          meta_description?: string | null
          meta_title?: string | null
          mls_number?: string | null
          neighborhood?: string | null
          parking_spaces?: number | null
          price?: number | null
          projected_arv?: number | null
          projected_rent?: number | null
          projected_roi?: number | null
          property_type?: Database["public"]["Enums"]["property_type"]
          published_at?: string | null
          purchase_price?: number | null
          rehab_estimate?: number | null
          short_description?: string | null
          slug?: string
          sort_order?: number
          sqft?: number | null
          state?: string
          status?: Database["public"]["Enums"]["property_status"]
          stories?: number | null
          title?: string
          updated_at?: string
          updated_by?: string | null
          video_url?: string | null
          virtual_tour_url?: string | null
          visibility?: string
          year_built?: number | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "properties_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "properties_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      property_complement_block_properties: {
        Row: {
          block_id: string
          created_at: string
          property_id: string
        }
        Insert: {
          block_id: string
          created_at?: string
          property_id: string
        }
        Update: {
          block_id?: string
          created_at?: string
          property_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_complement_block_properties_block_id_fkey"
            columns: ["block_id"]
            isOneToOne: false
            referencedRelation: "property_complement_blocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_complement_block_properties_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_complement_blocks: {
        Row: {
          created_at: string
          description: string | null
          eyebrow: string | null
          id: string
          is_active: boolean
          slug: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          eyebrow?: string | null
          id?: string
          is_active?: boolean
          slug: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          eyebrow?: string | null
          id?: string
          is_active?: boolean
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      property_documents: {
        Row: {
          button_label: string | null
          created_at: string
          description: string | null
          document_type: string | null
          file_type: string | null
          file_url: string
          id: string
          is_public: boolean
          position: number
          property_id: string
          title: string
          updated_at: string
        }
        Insert: {
          button_label?: string | null
          created_at?: string
          description?: string | null
          document_type?: string | null
          file_type?: string | null
          file_url: string
          id?: string
          is_public?: boolean
          position?: number
          property_id: string
          title: string
          updated_at?: string
        }
        Update: {
          button_label?: string | null
          created_at?: string
          description?: string | null
          document_type?: string | null
          file_type?: string | null
          file_url?: string
          id?: string
          is_public?: boolean
          position?: number
          property_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_documents_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_features: {
        Row: {
          created_at: string
          icon: string | null
          id: string
          is_highlight: boolean
          label: string
          position: number
          property_id: string
          updated_at: string
          value: string | null
        }
        Insert: {
          created_at?: string
          icon?: string | null
          id?: string
          is_highlight?: boolean
          label: string
          position?: number
          property_id: string
          updated_at?: string
          value?: string | null
        }
        Update: {
          created_at?: string
          icon?: string | null
          id?: string
          is_highlight?: boolean
          label?: string
          position?: number
          property_id?: string
          updated_at?: string
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_features_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_images: {
        Row: {
          alt_text: string | null
          caption: string | null
          created_at: string
          height: number | null
          id: string
          image_url: string
          is_cover: boolean
          media_group: string | null
          position: number
          property_id: string
          title: string | null
          updated_at: string
          width: number | null
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          height?: number | null
          id?: string
          image_url: string
          is_cover?: boolean
          media_group?: string | null
          position?: number
          property_id: string
          title?: string | null
          updated_at?: string
          width?: number | null
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          height?: number | null
          id?: string
          image_url?: string
          is_cover?: boolean
          media_group?: string | null
          position?: number
          property_id?: string
          title?: string | null
          updated_at?: string
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "property_images_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_videos: {
        Row: {
          created_at: string
          description: string | null
          duration_seconds: number | null
          id: string
          is_featured: boolean
          position: number
          property_id: string
          provider: string | null
          thumbnail_url: string | null
          title: string | null
          updated_at: string
          video_type: string | null
          video_url: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          id?: string
          is_featured?: boolean
          position?: number
          property_id: string
          provider?: string | null
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string
          video_type?: string | null
          video_url: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          id?: string
          is_featured?: boolean
          position?: number
          property_id?: string
          provider?: string | null
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string
          video_type?: string | null
          video_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_videos_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      reg_form_email_logs: {
        Row: {
          body_html: string | null
          created_at: string
          email_type: string | null
          error_message: string | null
          form_email_id: string | null
          form_email_name: string | null
          id: string
          provider_message_id: string | null
          recipients: Json
          status: string
          subject: string | null
          submission_id: string
        }
        Insert: {
          body_html?: string | null
          created_at?: string
          email_type?: string | null
          error_message?: string | null
          form_email_id?: string | null
          form_email_name?: string | null
          id?: string
          provider_message_id?: string | null
          recipients?: Json
          status: string
          subject?: string | null
          submission_id: string
        }
        Update: {
          body_html?: string | null
          created_at?: string
          email_type?: string | null
          error_message?: string | null
          form_email_id?: string | null
          form_email_name?: string | null
          id?: string
          provider_message_id?: string | null
          recipients?: Json
          status?: string
          subject?: string | null
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reg_form_email_logs_form_email_id_fkey"
            columns: ["form_email_id"]
            isOneToOne: false
            referencedRelation: "reg_form_emails"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reg_form_email_logs_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "reg_admin_submission_overview"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reg_form_email_logs_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "reg_form_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      reg_form_emails: {
        Row: {
          body_html_template: string
          created_at: string
          enabled: boolean
          form_id: string
          from_name: string | null
          id: string
          name: string
          recipient_field: string | null
          recipients: Json
          reply_to_field: string | null
          sort_order: number
          subject_template: string
          type: string
          updated_at: string
        }
        Insert: {
          body_html_template: string
          created_at?: string
          enabled?: boolean
          form_id: string
          from_name?: string | null
          id?: string
          name: string
          recipient_field?: string | null
          recipients?: Json
          reply_to_field?: string | null
          sort_order?: number
          subject_template: string
          type: string
          updated_at?: string
        }
        Update: {
          body_html_template?: string
          created_at?: string
          enabled?: boolean
          form_id?: string
          from_name?: string | null
          id?: string
          name?: string
          recipient_field?: string | null
          recipients?: Json
          reply_to_field?: string | null
          sort_order?: number
          subject_template?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reg_form_emails_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "reg_forms"
            referencedColumns: ["id"]
          },
        ]
      }
      reg_form_fields: {
        Row: {
          created_at: string
          default_value: string | null
          form_id: string
          help_text: string | null
          id: string
          label: string
          name: string
          options: Json
          placeholder: string | null
          required: boolean
          sort_order: number
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          default_value?: string | null
          form_id: string
          help_text?: string | null
          id?: string
          label: string
          name: string
          options?: Json
          placeholder?: string | null
          required?: boolean
          sort_order?: number
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          default_value?: string | null
          form_id?: string
          help_text?: string | null
          id?: string
          label?: string
          name?: string
          options?: Json
          placeholder?: string | null
          required?: boolean
          sort_order?: number
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reg_form_fields_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "reg_forms"
            referencedColumns: ["id"]
          },
        ]
      }
      reg_form_page_connections: {
        Row: {
          created_at: string
          form_id: string
          id: string
          page_key: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          form_id: string
          id?: string
          page_key: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          form_id?: string
          id?: string
          page_key?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reg_form_page_connections_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "reg_forms"
            referencedColumns: ["id"]
          },
        ]
      }
      reg_form_submissions: {
        Row: {
          created_at: string
          data: Json
          email: string | null
          form_id: string | null
          form_name: string | null
          form_slug: string | null
          id: string
          ip_address: string | null
          lead_id: string | null
          message: string | null
          name: string | null
          payload: Json | null
          phone: string | null
          property_id: string | null
          source_url: string | null
          subject: string | null
          user_agent: string | null
          webhook_error_count: number
          webhook_status: string
          webhook_success_count: number
        }
        Insert: {
          created_at?: string
          data?: Json
          email?: string | null
          form_id?: string | null
          form_name?: string | null
          form_slug?: string | null
          id?: string
          ip_address?: string | null
          lead_id?: string | null
          message?: string | null
          name?: string | null
          payload?: Json | null
          phone?: string | null
          property_id?: string | null
          source_url?: string | null
          subject?: string | null
          user_agent?: string | null
          webhook_error_count?: number
          webhook_status?: string
          webhook_success_count?: number
        }
        Update: {
          created_at?: string
          data?: Json
          email?: string | null
          form_id?: string | null
          form_name?: string | null
          form_slug?: string | null
          id?: string
          ip_address?: string | null
          lead_id?: string | null
          message?: string | null
          name?: string | null
          payload?: Json | null
          phone?: string | null
          property_id?: string | null
          source_url?: string | null
          subject?: string | null
          user_agent?: string | null
          webhook_error_count?: number
          webhook_status?: string
          webhook_success_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "reg_form_submissions_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "reg_forms"
            referencedColumns: ["id"]
          },
        ]
      }
      reg_form_webhook_logs: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          request_headers: Json | null
          request_method: string | null
          request_payload: Json | null
          request_url: string | null
          response_body: string | null
          response_status: number | null
          status: string
          submission_id: string | null
          webhook_id: string | null
          webhook_name: string | null
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          request_headers?: Json | null
          request_method?: string | null
          request_payload?: Json | null
          request_url?: string | null
          response_body?: string | null
          response_status?: number | null
          status: string
          submission_id?: string | null
          webhook_id?: string | null
          webhook_name?: string | null
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          request_headers?: Json | null
          request_method?: string | null
          request_payload?: Json | null
          request_url?: string | null
          response_body?: string | null
          response_status?: number | null
          status?: string
          submission_id?: string | null
          webhook_id?: string | null
          webhook_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reg_form_webhook_logs_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "reg_admin_submission_overview"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reg_form_webhook_logs_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "reg_form_submissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reg_form_webhook_logs_webhook_id_fkey"
            columns: ["webhook_id"]
            isOneToOne: false
            referencedRelation: "reg_form_webhooks"
            referencedColumns: ["id"]
          },
        ]
      }
      reg_form_webhooks: {
        Row: {
          created_at: string
          enabled: boolean
          form_id: string
          headers: Json
          id: string
          method: string
          name: string
          payload_template: Json
          sort_order: number
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          enabled?: boolean
          form_id: string
          headers?: Json
          id?: string
          method?: string
          name: string
          payload_template?: Json
          sort_order?: number
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          enabled?: boolean
          form_id?: string
          headers?: Json
          id?: string
          method?: string
          name?: string
          payload_template?: Json
          sort_order?: number
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "reg_form_webhooks_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "reg_forms"
            referencedColumns: ["id"]
          },
        ]
      }
      reg_forms: {
        Row: {
          acceptance_message: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
          status: string
          submit_button_label: string
          thank_you_page_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          acceptance_message?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
          status?: string
          submit_button_label?: string
          thank_you_page_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          acceptance_message?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
          status?: string
          submit_button_label?: string
          thank_you_page_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      reg_posts: {
        Row: {
          author_name: string
          category: string | null
          content_html: string
          cover_image_url: string | null
          created_at: string
          excerpt: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          slug: string
          sort_order: number
          status: string
          tags: Json
          title: string
          updated_at: string
        }
        Insert: {
          author_name?: string
          category?: string | null
          content_html?: string
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          slug: string
          sort_order?: number
          status?: string
          tags?: Json
          title: string
          updated_at?: string
        }
        Update: {
          author_name?: string
          category?: string | null
          content_html?: string
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          slug?: string
          sort_order?: number
          status?: string
          tags?: Json
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      reg_products: {
        Row: {
          created_at: string
          description: string | null
          discount_price: number | null
          id: string
          image_url: string | null
          name: string
          price: number
          slug: string
          sort_order: number
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          discount_price?: number | null
          id?: string
          image_url?: string | null
          name: string
          price?: number
          slug: string
          sort_order?: number
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          discount_price?: number | null
          id?: string
          image_url?: string | null
          name?: string
          price?: number
          slug?: string
          sort_order?: number
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      reg_site_settings: {
        Row: {
          created_at: string
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      rss_news_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          message: string | null
          metadata: Json
          queue_id: string | null
          rss_source_id: string | null
          status: string
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          message?: string | null
          metadata?: Json
          queue_id?: string | null
          rss_source_id?: string | null
          status: string
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          message?: string | null
          metadata?: Json
          queue_id?: string | null
          rss_source_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "rss_news_logs_queue_id_fkey"
            columns: ["queue_id"]
            isOneToOne: false
            referencedRelation: "rss_news_queue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rss_news_logs_rss_source_id_fkey"
            columns: ["rss_source_id"]
            isOneToOne: false
            referencedRelation: "rss_news_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      rss_news_queue: {
        Row: {
          ai_cost: number | null
          ai_error: string | null
          ai_model: string | null
          ai_tokens_input: number | null
          ai_tokens_output: number | null
          canonical_url: string | null
          category_id: string | null
          created_at: string
          external_id: string | null
          generated_content: string | null
          generated_excerpt: string | null
          generated_image_alt: string | null
          generated_meta_description: string | null
          generated_meta_title: string | null
          generated_slug: string | null
          generated_subtitle: string | null
          generated_title: string | null
          id: string
          original_author: string | null
          original_content: string | null
          original_description: string | null
          original_image_url: string | null
          original_published_at: string | null
          original_source_name: string | null
          original_title: string
          original_url: string
          processed_at: string | null
          published_at: string | null
          published_news_id: string | null
          reviewed_at: string | null
          rss_source_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          ai_cost?: number | null
          ai_error?: string | null
          ai_model?: string | null
          ai_tokens_input?: number | null
          ai_tokens_output?: number | null
          canonical_url?: string | null
          category_id?: string | null
          created_at?: string
          external_id?: string | null
          generated_content?: string | null
          generated_excerpt?: string | null
          generated_image_alt?: string | null
          generated_meta_description?: string | null
          generated_meta_title?: string | null
          generated_slug?: string | null
          generated_subtitle?: string | null
          generated_title?: string | null
          id?: string
          original_author?: string | null
          original_content?: string | null
          original_description?: string | null
          original_image_url?: string | null
          original_published_at?: string | null
          original_source_name?: string | null
          original_title: string
          original_url: string
          processed_at?: string | null
          published_at?: string | null
          published_news_id?: string | null
          reviewed_at?: string | null
          rss_source_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          ai_cost?: number | null
          ai_error?: string | null
          ai_model?: string | null
          ai_tokens_input?: number | null
          ai_tokens_output?: number | null
          canonical_url?: string | null
          category_id?: string | null
          created_at?: string
          external_id?: string | null
          generated_content?: string | null
          generated_excerpt?: string | null
          generated_image_alt?: string | null
          generated_meta_description?: string | null
          generated_meta_title?: string | null
          generated_slug?: string | null
          generated_subtitle?: string | null
          generated_title?: string | null
          id?: string
          original_author?: string | null
          original_content?: string | null
          original_description?: string | null
          original_image_url?: string | null
          original_published_at?: string | null
          original_source_name?: string | null
          original_title?: string
          original_url?: string
          processed_at?: string | null
          published_at?: string | null
          published_news_id?: string | null
          reviewed_at?: string | null
          rss_source_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rss_news_queue_rss_source_id_fkey"
            columns: ["rss_source_id"]
            isOneToOne: false
            referencedRelation: "rss_news_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      rss_news_sources: {
        Row: {
          auto_process: boolean
          auto_publish: boolean
          category_id: string | null
          country: string
          created_at: string
          feed_url: string
          id: string
          is_active: boolean
          language: string
          last_fetch_error: string | null
          last_fetch_status: string | null
          last_fetched_at: string | null
          min_interval_minutes: number
          name: string
          result_limit: number
          updated_at: string
        }
        Insert: {
          auto_process?: boolean
          auto_publish?: boolean
          category_id?: string | null
          country?: string
          created_at?: string
          feed_url: string
          id?: string
          is_active?: boolean
          language?: string
          last_fetch_error?: string | null
          last_fetch_status?: string | null
          last_fetched_at?: string | null
          min_interval_minutes?: number
          name: string
          result_limit?: number
          updated_at?: string
        }
        Update: {
          auto_process?: boolean
          auto_publish?: boolean
          category_id?: string | null
          country?: string
          created_at?: string
          feed_url?: string
          id?: string
          is_active?: boolean
          language?: string
          last_fetch_error?: string | null
          last_fetch_status?: string | null
          last_fetched_at?: string | null
          min_interval_minutes?: number
          name?: string
          result_limit?: number
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      thank_you_pages: {
        Row: {
          button_label: string | null
          button_url: string | null
          created_at: string
          description: string | null
          id: string
          slug: string
          status: string
          subtitle: string | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          button_label?: string | null
          button_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          slug: string
          status?: string
          subtitle?: string | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          button_label?: string | null
          button_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          slug?: string
          status?: string
          subtitle?: string | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      admin_submission_overview: {
        Row: {
          created_at: string | null
          data: Json | null
          email_error_count: number | null
          email_success_count: number | null
          email_total_count: number | null
          form_id: string | null
          form_name: string | null
          form_slug: string | null
          form_title: string | null
          id: string | null
          source_url: string | null
          webhook_error_count: number | null
          webhook_status: string | null
          webhook_success_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "form_submissions_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      reg_admin_submission_overview: {
        Row: {
          created_at: string | null
          data: Json | null
          email_error_count: number | null
          email_success_count: number | null
          email_total_count: number | null
          form_id: string | null
          form_name: string | null
          form_slug: string | null
          form_title: string | null
          id: string | null
          source_url: string | null
          webhook_error_count: number | null
          webhook_status: string | null
          webhook_success_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reg_form_submissions_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "reg_forms"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      admin_role: "admin" | "editor" | "viewer"
      email_status: "queued" | "sent" | "failed"
      lead_status:
        | "new"
        | "contacted"
        | "qualified"
        | "converted"
        | "lost"
        | "archived"
      property_status:
        | "draft"
        | "available"
        | "under_contract"
        | "sold"
        | "in_progress"
        | "archived"
        | "rented"
      property_type:
        | "single_family"
        | "multi_family"
        | "condo"
        | "townhouse"
        | "land"
        | "commercial"
        | "new_construction"
        | "flip"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      admin_role: ["admin", "editor", "viewer"],
      email_status: ["queued", "sent", "failed"],
      lead_status: [
        "new",
        "contacted",
        "qualified",
        "converted",
        "lost",
        "archived",
      ],
      property_status: [
        "draft",
        "available",
        "under_contract",
        "sold",
        "in_progress",
        "archived",
        "rented",
      ],
      property_type: [
        "single_family",
        "multi_family",
        "condo",
        "townhouse",
        "land",
        "commercial",
        "new_construction",
        "flip",
      ],
    },
  },
} as const
