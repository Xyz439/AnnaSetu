-- Create Parishes Table
CREATE TABLE public.parishes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Users Table (links to auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('donor', 'volunteer', 'admin')),
    parish_id UUID REFERENCES public.parishes(id),
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Donations Table
CREATE TABLE public.donations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    expiry_time TIMESTAMP WITH TIME ZONE,
    status TEXT NOT NULL DEFAULT 'Available' CHECK (status IN ('Available', 'Accepted', 'Collected', 'Distributed', 'Rejected', 'Cancelled')),
    parish_id UUID REFERENCES public.parishes(id) NOT NULL,
    created_by UUID REFERENCES public.users(id) NOT NULL,
    accepted_by UUID REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.parishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Basic Policies (can be refined later, opening up for development purposes)
CREATE POLICY "Enable read access for all users" ON public.parishes FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Enable all access for authenticated users" ON public.users FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable read access for all users" ON public.donations FOR SELECT USING (true);
CREATE POLICY "Enable all access for authenticated users" ON public.donations FOR ALL USING (auth.role() = 'authenticated');

-- Insert Initial Parishes
INSERT INTO public.parishes (name) VALUES ('St. Mary''s Parish'), ('Holy Cross Parish');

-- Create Messages Table
CREATE TABLE public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable insert access for all users" ON public.messages FOR INSERT WITH CHECK (true);
