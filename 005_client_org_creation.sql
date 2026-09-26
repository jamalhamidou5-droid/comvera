-- Run this in the Supabase SQL Editor to allow users to create their organizations upon signup

-- 1. Allow authenticated users to create organizations
CREATE POLICY "Users can create orgs" 
ON public.organizations 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- 2. Allow users to add themselves as members to organizations they just created
CREATE POLICY "Users can add themselves to orgs" 
ON public.organization_members 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);
