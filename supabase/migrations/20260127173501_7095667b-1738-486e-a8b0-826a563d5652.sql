-- Create app role enum
CREATE TYPE public.app_role AS ENUM ('public', 'recruiter', 'investor', 'admin');

-- Create project type enum
CREATE TYPE public.project_type AS ENUM ('public', 'private');

-- Create project category enum
CREATE TYPE public.project_category AS ENUM ('web', 'mobile', 'fintech', 'internal', 'experimental', 'design', 'other');

-- Create visibility level enum
CREATE TYPE public.visibility_level AS ENUM ('public_teaser', 'recruiter', 'investor', 'admin');

-- Create demo type enum
CREATE TYPE public.demo_type AS ENUM ('production', 'demo', 'restricted');

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL DEFAULT 'EagerBeaver',
    role TEXT NOT NULL DEFAULT 'Full-stack Developer / Product Builder',
    bio TEXT,
    education TEXT,
    location TEXT,
    phone TEXT,
    email TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    twitter_url TEXT,
    website_url TEXT,
    avatar_url TEXT,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'public',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Create projects table
CREATE TABLE public.projects (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    type project_type NOT NULL DEFAULT 'public',
    category project_category NOT NULL DEFAULT 'web',
    description TEXT,
    short_description TEXT,
    visibility_level visibility_level NOT NULL DEFAULT 'public_teaser',
    github_repo_url TEXT,
    github_repo_name TEXT,
    live_url TEXT,
    demo_type demo_type DEFAULT 'production',
    stack TEXT[],
    thumbnail_url TEXT,
    screenshots TEXT[],
    is_featured BOOLEAN DEFAULT false,
    is_synced_from_github BOOLEAN DEFAULT false,
    owner_verified BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create project case studies table
CREATE TABLE public.project_case_studies (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL UNIQUE,
    problem TEXT,
    constraints TEXT,
    decisions TEXT,
    results TEXT,
    architecture_notes TEXT,
    key_learnings TEXT,
    tech_deep_dive TEXT,
    metrics JSONB,
    visibility_level visibility_level NOT NULL DEFAULT 'recruiter',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create analytics table
CREATE TABLE public.project_analytics (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    views INTEGER DEFAULT 0,
    demo_clicks INTEGER DEFAULT 0,
    github_clicks INTEGER DEFAULT 0,
    time_on_page INTEGER DEFAULT 0,
    unique_visitors INTEGER DEFAULT 0,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (project_id, date)
);

-- Create access logs table
CREATE TABLE public.access_logs (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    user_role app_role,
    action TEXT NOT NULL,
    resource_type TEXT,
    resource_id UUID,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create skills table
CREATE TABLE public.skills (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    proficiency INTEGER DEFAULT 80,
    icon TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create services table
CREATE TABLE public.services (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    features TEXT[],
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create testimonials table
CREATE TABLE public.testimonials (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    company TEXT,
    content TEXT NOT NULL,
    avatar_url TEXT,
    rating INTEGER DEFAULT 5,
    is_featured BOOLEAN DEFAULT false,
    visibility_level visibility_level NOT NULL DEFAULT 'public_teaser',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE public.contact_messages (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    is_replied BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to get user's highest role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id uuid)
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT role FROM public.user_roles WHERE user_id = _user_id ORDER BY 
      CASE role 
        WHEN 'admin' THEN 1 
        WHEN 'investor' THEN 2 
        WHEN 'recruiter' THEN 3 
        ELSE 4 
      END
    LIMIT 1),
    'public'::app_role
  )
$$;

-- Profiles policies
CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
USING (is_primary = true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all profiles" 
ON public.profiles FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- User roles policies
CREATE POLICY "Users can view their own roles" 
ON public.user_roles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" 
ON public.user_roles FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Projects policies - role-based visibility
CREATE POLICY "Public projects visible to all" 
ON public.projects FOR SELECT 
USING (
  visibility_level = 'public_teaser' OR
  (visibility_level = 'recruiter' AND (
    public.has_role(auth.uid(), 'recruiter') OR 
    public.has_role(auth.uid(), 'investor') OR 
    public.has_role(auth.uid(), 'admin')
  )) OR
  (visibility_level = 'investor' AND (
    public.has_role(auth.uid(), 'investor') OR 
    public.has_role(auth.uid(), 'admin')
  )) OR
  (visibility_level = 'admin' AND public.has_role(auth.uid(), 'admin'))
);

CREATE POLICY "Admins can manage projects" 
ON public.projects FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Case studies policies - role-based visibility
CREATE POLICY "Case studies visible by role" 
ON public.project_case_studies FOR SELECT 
USING (
  visibility_level = 'public_teaser' OR
  (visibility_level = 'recruiter' AND (
    public.has_role(auth.uid(), 'recruiter') OR 
    public.has_role(auth.uid(), 'investor') OR 
    public.has_role(auth.uid(), 'admin')
  )) OR
  (visibility_level = 'investor' AND (
    public.has_role(auth.uid(), 'investor') OR 
    public.has_role(auth.uid(), 'admin')
  )) OR
  (visibility_level = 'admin' AND public.has_role(auth.uid(), 'admin'))
);

CREATE POLICY "Admins can manage case studies" 
ON public.project_case_studies FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Analytics policies
CREATE POLICY "Admins and investors can view analytics" 
ON public.project_analytics FOR SELECT 
USING (
  public.has_role(auth.uid(), 'admin') OR 
  public.has_role(auth.uid(), 'investor')
);

CREATE POLICY "System can insert analytics" 
ON public.project_analytics FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can manage analytics" 
ON public.project_analytics FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Access logs policies
CREATE POLICY "Admins can view access logs" 
ON public.access_logs FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "System can insert access logs" 
ON public.access_logs FOR INSERT 
WITH CHECK (true);

-- Skills policies
CREATE POLICY "Skills are viewable by everyone" 
ON public.skills FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage skills" 
ON public.skills FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Services policies
CREATE POLICY "Active services are viewable by everyone" 
ON public.services FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage services" 
ON public.services FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Testimonials policies
CREATE POLICY "Testimonials visible by role" 
ON public.testimonials FOR SELECT 
USING (
  visibility_level = 'public_teaser' OR
  (visibility_level = 'recruiter' AND (
    public.has_role(auth.uid(), 'recruiter') OR 
    public.has_role(auth.uid(), 'investor') OR 
    public.has_role(auth.uid(), 'admin')
  )) OR
  (visibility_level = 'investor' AND (
    public.has_role(auth.uid(), 'investor') OR 
    public.has_role(auth.uid(), 'admin')
  )) OR
  (visibility_level = 'admin' AND public.has_role(auth.uid(), 'admin'))
);

CREATE POLICY "Admins can manage testimonials" 
ON public.testimonials FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Contact messages policies
CREATE POLICY "Anyone can submit contact messages" 
ON public.contact_messages FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view and manage contact messages" 
ON public.contact_messages FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_case_studies_updated_at
    BEFORE UPDATE ON public.project_case_studies
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();