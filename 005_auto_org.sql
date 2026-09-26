-- Script to automatically create an organization and organization_member for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  new_org_id UUID;
  company_name_val TEXT;
BEGIN
  -- Obtenir le nom de l'entreprise depuis les raw_user_meta_data s'il existe
  company_name_val := COALESCE(NEW.raw_user_meta_data->>'company_name', 'Mon Organisation');

  -- 1. Créer la nouvelle organisation
  INSERT INTO public.organizations (name, subscription_plan)
  VALUES (company_name_val, 'Free')
  RETURNING id INTO new_org_id;

  -- 2. Ajouter l'utilisateur en tant que membre admin de cette organisation
  INSERT INTO public.organization_members (organization_id, user_id, role)
  VALUES (new_org_id, NEW.id, 'admin');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Supprimer le trigger s'il existe déjà
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Créer le trigger sur auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Ajouter une policy INSERT pour organization_members si nécessaire
CREATE POLICY "Users can insert themselves" ON public.organization_members FOR INSERT WITH CHECK (user_id = auth.uid());
