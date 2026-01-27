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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      access_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: string | null
          resource_id: string | null
          resource_type: string | null
          user_agent: string | null
          user_id: string | null
          user_role: Database["public"]["Enums"]["app_role"] | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type?: string | null
          user_agent?: string | null
          user_id?: string | null
          user_role?: Database["public"]["Enums"]["app_role"] | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type?: string | null
          user_agent?: string | null
          user_id?: string | null
          user_role?: Database["public"]["Enums"]["app_role"] | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          is_read: boolean | null
          is_replied: boolean | null
          message: string
          name: string
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_read?: boolean | null
          is_replied?: boolean | null
          message: string
          name: string
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean | null
          is_replied?: boolean | null
          message?: string
          name?: string
          subject?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          education: string | null
          email: string | null
          github_url: string | null
          id: string
          is_primary: boolean | null
          linkedin_url: string | null
          location: string | null
          name: string
          phone: string | null
          role: string
          twitter_url: string | null
          updated_at: string
          user_id: string | null
          website_url: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          education?: string | null
          email?: string | null
          github_url?: string | null
          id?: string
          is_primary?: boolean | null
          linkedin_url?: string | null
          location?: string | null
          name?: string
          phone?: string | null
          role?: string
          twitter_url?: string | null
          updated_at?: string
          user_id?: string | null
          website_url?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          education?: string | null
          email?: string | null
          github_url?: string | null
          id?: string
          is_primary?: boolean | null
          linkedin_url?: string | null
          location?: string | null
          name?: string
          phone?: string | null
          role?: string
          twitter_url?: string | null
          updated_at?: string
          user_id?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      project_analytics: {
        Row: {
          created_at: string
          date: string
          demo_clicks: number | null
          github_clicks: number | null
          id: string
          project_id: string
          time_on_page: number | null
          unique_visitors: number | null
          views: number | null
        }
        Insert: {
          created_at?: string
          date?: string
          demo_clicks?: number | null
          github_clicks?: number | null
          id?: string
          project_id: string
          time_on_page?: number | null
          unique_visitors?: number | null
          views?: number | null
        }
        Update: {
          created_at?: string
          date?: string
          demo_clicks?: number | null
          github_clicks?: number | null
          id?: string
          project_id?: string
          time_on_page?: number | null
          unique_visitors?: number | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_analytics_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_case_studies: {
        Row: {
          architecture_notes: string | null
          constraints: string | null
          created_at: string
          decisions: string | null
          id: string
          key_learnings: string | null
          metrics: Json | null
          problem: string | null
          project_id: string
          results: string | null
          tech_deep_dive: string | null
          updated_at: string
          visibility_level: Database["public"]["Enums"]["visibility_level"]
        }
        Insert: {
          architecture_notes?: string | null
          constraints?: string | null
          created_at?: string
          decisions?: string | null
          id?: string
          key_learnings?: string | null
          metrics?: Json | null
          problem?: string | null
          project_id: string
          results?: string | null
          tech_deep_dive?: string | null
          updated_at?: string
          visibility_level?: Database["public"]["Enums"]["visibility_level"]
        }
        Update: {
          architecture_notes?: string | null
          constraints?: string | null
          created_at?: string
          decisions?: string | null
          id?: string
          key_learnings?: string | null
          metrics?: Json | null
          problem?: string | null
          project_id?: string
          results?: string | null
          tech_deep_dive?: string | null
          updated_at?: string
          visibility_level?: Database["public"]["Enums"]["visibility_level"]
        }
        Relationships: [
          {
            foreignKeyName: "project_case_studies_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          category: Database["public"]["Enums"]["project_category"]
          created_at: string
          demo_type: Database["public"]["Enums"]["demo_type"] | null
          description: string | null
          display_order: number | null
          github_repo_name: string | null
          github_repo_url: string | null
          id: string
          is_featured: boolean | null
          is_synced_from_github: boolean | null
          live_url: string | null
          owner_verified: boolean | null
          screenshots: string[] | null
          short_description: string | null
          slug: string
          stack: string[] | null
          thumbnail_url: string | null
          title: string
          type: Database["public"]["Enums"]["project_type"]
          updated_at: string
          visibility_level: Database["public"]["Enums"]["visibility_level"]
        }
        Insert: {
          category?: Database["public"]["Enums"]["project_category"]
          created_at?: string
          demo_type?: Database["public"]["Enums"]["demo_type"] | null
          description?: string | null
          display_order?: number | null
          github_repo_name?: string | null
          github_repo_url?: string | null
          id?: string
          is_featured?: boolean | null
          is_synced_from_github?: boolean | null
          live_url?: string | null
          owner_verified?: boolean | null
          screenshots?: string[] | null
          short_description?: string | null
          slug: string
          stack?: string[] | null
          thumbnail_url?: string | null
          title: string
          type?: Database["public"]["Enums"]["project_type"]
          updated_at?: string
          visibility_level?: Database["public"]["Enums"]["visibility_level"]
        }
        Update: {
          category?: Database["public"]["Enums"]["project_category"]
          created_at?: string
          demo_type?: Database["public"]["Enums"]["demo_type"] | null
          description?: string | null
          display_order?: number | null
          github_repo_name?: string | null
          github_repo_url?: string | null
          id?: string
          is_featured?: boolean | null
          is_synced_from_github?: boolean | null
          live_url?: string | null
          owner_verified?: boolean | null
          screenshots?: string[] | null
          short_description?: string | null
          slug?: string
          stack?: string[] | null
          thumbnail_url?: string | null
          title?: string
          type?: Database["public"]["Enums"]["project_type"]
          updated_at?: string
          visibility_level?: Database["public"]["Enums"]["visibility_level"]
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          features: string[] | null
          icon: string | null
          id: string
          is_active: boolean | null
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          features?: string[] | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          features?: string[] | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          title?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string
          created_at: string
          display_order: number | null
          icon: string | null
          id: string
          name: string
          proficiency: number | null
        }
        Insert: {
          category: string
          created_at?: string
          display_order?: number | null
          icon?: string | null
          id?: string
          name: string
          proficiency?: number | null
        }
        Update: {
          category?: string
          created_at?: string
          display_order?: number | null
          icon?: string | null
          id?: string
          name?: string
          proficiency?: number | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar_url: string | null
          company: string | null
          content: string
          created_at: string
          id: string
          is_featured: boolean | null
          name: string
          rating: number | null
          role: string | null
          visibility_level: Database["public"]["Enums"]["visibility_level"]
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          content: string
          created_at?: string
          id?: string
          is_featured?: boolean | null
          name: string
          rating?: number | null
          role?: string | null
          visibility_level?: Database["public"]["Enums"]["visibility_level"]
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          content?: string
          created_at?: string
          id?: string
          is_featured?: boolean | null
          name?: string
          rating?: number | null
          role?: string | null
          visibility_level?: Database["public"]["Enums"]["visibility_level"]
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "public" | "recruiter" | "investor" | "admin"
      demo_type: "production" | "demo" | "restricted"
      project_category:
        | "web"
        | "mobile"
        | "fintech"
        | "internal"
        | "experimental"
        | "design"
        | "other"
      project_type: "public" | "private"
      visibility_level: "public_teaser" | "recruiter" | "investor" | "admin"
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
      app_role: ["public", "recruiter", "investor", "admin"],
      demo_type: ["production", "demo", "restricted"],
      project_category: [
        "web",
        "mobile",
        "fintech",
        "internal",
        "experimental",
        "design",
        "other",
      ],
      project_type: ["public", "private"],
      visibility_level: ["public_teaser", "recruiter", "investor", "admin"],
    },
  },
} as const
