export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      camp: {
        Row: {
          address: string
          check_in: string
          check_out: string
          company_id: string
          content: string
          created_at: string
          id: string
          layout: string
          name: string
          phone: string
          region: string
        }
        Insert: {
          address: string
          check_in: string
          check_out: string
          company_id: string
          content: string
          created_at?: string
          id?: string
          layout: string
          name: string
          phone: string
          region: string
        }
        Update: {
          address?: string
          check_in?: string
          check_out?: string
          company_id?: string
          content?: string
          created_at?: string
          id?: string
          layout?: string
          name?: string
          phone?: string
          region?: string
        }
        Relationships: [
          {
            foreignKeyName: "camp_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company_user"
            referencedColumns: ["id"]
          }
        ]
      }
      camp_area: {
        Row: {
          camp_id: string
          id: string
          max_people: number
          name: string
          photo_url: string
          price: number
        }
        Insert: {
          camp_id: string
          id: string
          max_people: number
          name: string
          photo_url: string
          price: number
        }
        Update: {
          camp_id?: string
          id?: string
          max_people?: number
          name?: string
          photo_url?: string
          price?: number
        }
        Relationships: [
          {
            foreignKeyName: "camp_area_camp_id_fkey"
            columns: ["camp_id"]
            isOneToOne: false
            referencedRelation: "camp"
            referencedColumns: ["id"]
          }
        ]
      }
      camp_facility: {
        Row: {
          camp_id: string | null
          facility_id: number | null
          id: string
        }
        Insert: {
          camp_id?: string | null
          facility_id?: number | null
          id?: string
        }
        Update: {
          camp_id?: string | null
          facility_id?: number | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "camp_facility_camp_id_fkey"
            columns: ["camp_id"]
            isOneToOne: false
            referencedRelation: "camp"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "camp_facility_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facility"
            referencedColumns: ["id"]
          }
        ]
      }
      camp_pic: {
        Row: {
          camp_id: string
          id: string
          photo_url: string
        }
        Insert: {
          camp_id: string
          id?: string
          photo_url: string
        }
        Update: {
          camp_id?: string
          id?: string
          photo_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "camp_pic_camp_id_fkey"
            columns: ["camp_id"]
            isOneToOne: false
            referencedRelation: "camp"
            referencedColumns: ["id"]
          }
        ]
      }
      comment: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comment_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      company_user: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          password: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          password: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          password?: string
        }
        Relationships: []
      }
      facility: {
        Row: {
          id: number
          option: string | null
        }
        Insert: {
          id?: number
          option?: string | null
        }
        Update: {
          id?: number
          option?: string | null
        }
        Relationships: []
      }
      hashtag: {
        Row: {
          camp_id: string
          id: string
          tag: string | null
        }
        Insert: {
          camp_id: string
          id?: string
          tag?: string | null
        }
        Update: {
          camp_id?: string
          id?: string
          tag?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hashtag_camp_id_fkey"
            columns: ["camp_id"]
            isOneToOne: false
            referencedRelation: "camp"
            referencedColumns: ["id"]
          }
        ]
      }
      like: {
        Row: {
          camp_id: string | null
          id: string
          post_id: string | null
          user_id: string
        }
        Insert: {
          camp_id?: string | null
          id?: string
          post_id?: string | null
          user_id: string
        }
        Update: {
          camp_id?: string | null
          id?: string
          post_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "like_camp_id_fkey"
            columns: ["camp_id"]
            isOneToOne: false
            referencedRelation: "camp"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "like_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "like_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      post: {
        Row: {
          content: string
          created_at: string
          id: string
          title: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          title: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          title?: string
        }
        Relationships: []
      }
      post_pic: {
        Row: {
          id: string
          photo_url: string | null
          post_id: string
        }
        Insert: {
          id?: string
          photo_url?: string | null
          post_id: string
        }
        Update: {
          id?: string
          photo_url?: string | null
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_pic_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["id"]
          }
        ]
      }
      reservation: {
        Row: {
          camp_area_id: string
          check_in_date: string
          check_out_date: string
          created_at: string
          fee: number
          id: string
          people: number
          user_id: string
        }
        Insert: {
          camp_area_id: string
          check_in_date: string
          check_out_date: string
          created_at?: string
          fee: number
          id: string
          people: number
          user_id: string
        }
        Update: {
          camp_area_id?: string
          check_in_date?: string
          check_out_date?: string
          created_at?: string
          fee?: number
          id?: string
          people?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reservation_camp_area_id_fkey"
            columns: ["camp_area_id"]
            isOneToOne: false
            referencedRelation: "camp_area"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservation_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      review: {
        Row: {
          camp_id: string
          content: string
          created_at: string
          id: string
          rating: number
          title: string
          user_id: string
        }
        Insert: {
          camp_id: string
          content: string
          created_at?: string
          id?: string
          rating: number
          title: string
          user_id: string
        }
        Update: {
          camp_id?: string
          content?: string
          created_at?: string
          id?: string
          rating?: number
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_camp_id_fkey"
            columns: ["camp_id"]
            isOneToOne: false
            referencedRelation: "camp"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user: {
        Row: {
          email: string
          id: string
          nickname: string
          password: string | null
          profile_url: string | null
          provider: string | null
        }
        Insert: {
          email: string
          id?: string
          nickname: string
          password?: string | null
          profile_url?: string | null
          provider?: string | null
        }
        Update: {
          email?: string
          id?: string
          nickname?: string
          password?: string | null
          profile_url?: string | null
          provider?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
