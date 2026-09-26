-- Fonction exécutée à chaque création d'un nouvel utilisateur dans Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
DECLARE
  new_org_id UUID;
  company_name_input TEXT;
BEGIN
  -- Récupère le nom de l'entreprise depuis les métadonnées de l'inscription
  company_name_input := COALESCE(new.raw_user_meta_data->>'company_name', 'My Organization');

  -- 1. Création du profil utilisateur global
  INSERT INTO public.user_profiles (id, full_name, is_global_admin)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'full_name', 'Utilisateur'), 
    FALSE
  );

  -- 2. Création automatique de l'organisation
  INSERT INTO public.organizations (name, industry)
  VALUES (company_name_input, 'Cosmetics / General')
  RETURNING id INTO new_org_id;

  -- 3. Ajout de l'utilisateur comme propriétaire (owner) de l'organisation
  INSERT INTO public.organization_members (organization_id, user_id, role)
  VALUES (new_org_id, new.id, 'owner');

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Déclencheur (Trigger) sur la table auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
