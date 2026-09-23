# Guide de Déploiement et Sécurisation (Vercel & Supabase)

Ce document explique comment déployer l'application sur Vercel et comment configurer de manière sécurisée les clés Supabase, en particulier pour l'espace administrateur.

## 1. Sécurité Supabase (Très Important)

### Les deux types de clés :
- **`anon` / `public` key :** Cette clé est utilisée dans le code frontend de l'application (`VITE_SUPABASE_ANON_KEY`). Elle est publique et sécurisée uniquement par les politiques RLS (Row Level Security) que tu définis dans Supabase.
- **`service_role` key :** **Ne JAMAIS exposer cette clé dans le code frontend.** Elle a tous les droits d'administration et contourne les politiques RLS. Elle doit être conservée "à part", généralement utilisée uniquement dans des environnements backend sécurisés (comme les Edge Functions de Supabase ou les Serverless Functions Vercel).

### Comment protéger l'espace Admin :
L'espace admin actuel est protégé au niveau du client React :
1. Le bouton "Admin Platform" est invisible pour tout utilisateur n'ayant pas le rôle `'admin'`.
2. La route `/admin` redirige automatiquement vers le dashboard si l'utilisateur n'est pas `'admin'`.

**Protection en Base de données (RLS) :**
Pour éviter qu'un utilisateur n'interroge les tables sensibles de l'admin (via l'API ou des appels modifiés), tu dois activer le RLS sur toutes tes tables dans le Dashboard Supabase (Authentication > Policies).

Exemple de politique pour une table admin :
```sql
CREATE POLICY "Admins can view sensitive data" ON "admin_table"
FOR SELECT USING (
  (SELECT role FROM user_profiles WHERE id = auth.uid()) = 'admin'
);
```
Ainsi, la clé `anon` publique ne permettra de lire ces données que si l'utilisateur est bien admin.

## 2. Déploiement sur GitHub

Pour pouvoir déployer sur Vercel de façon automatique, ton code doit être sur GitHub.

1. Rends-toi sur [GitHub](https://github.com/) et crée un nouveau dépôt (Repository).
2. Ne coche pas l'initialisation avec un README ou un .gitignore.
3. Copie l'URL de ton dépôt (ex: `https://github.com/TonPseudo/Comvera.git`).
4. Dans le terminal de ton projet local, exécute les commandes suivantes :
   ```bash
   git add .
   git commit -m "Sécurisation de l'espace admin et préparation au déploiement"
   git remote add origin https://github.com/TonPseudo/Comvera.git
   git branch -M main
   git push -u origin main
   ```

## 3. Déploiement sur Vercel

1. Va sur [Vercel](https://vercel.com/) et connecte-toi avec ton compte GitHub.
2. Clique sur **Add New... > Project**.
3. Importe le dépôt `Comvera` que tu viens de pousser.
4. Dans la section **Environment Variables**, ajoute les clés suivantes que tu trouveras dans ton projet Supabase (Project Settings > API) :
   - `VITE_SUPABASE_URL` = `https://[ton-id-de-projet].supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `[ta-clé-anon-publique]`
   *(Assure-toi de ne PAS y mettre ta service_role key)*
5. Clique sur **Deploy**.

Vercel construira l'application (grâce à Vite) et te fournira une URL de production. À chaque fois que tu utiliseras `git push` vers GitHub, Vercel redéploiera automatiquement ton site !
