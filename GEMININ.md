# Contexte du Projet : Comvera (CaaS Platform)

Ce fichier sert de documentation de référence pour aider un futur modèle IA à comprendre rapidement la structure, les fonctionnalités et les choix techniques du projet.

## 1. Ce que fait l'application
Comvera est une plateforme **CaaS (Compliance-as-a-Service)** destinée au commerce international. 
Son objectif principal est d'automatiser la conformité des produits pour l'e-commerce transfrontalier, en offrant une base de données réglementaire, un générateur de documents douaniers/légaux, et un suivi en temps réel des règles et alertes sur les marchés cibles.

## 2. Fonctionnalités implantées
- **Authentification et Autorisations** : Gestion des utilisateurs avec des routes protégées (`ProtectedRoute`) et un accès spécifique pour les administrateurs (`AdminRoute`).
- **Espace Public** : Page d'atterrissage (`LandingPage`) et modal d'authentification (`AuthModal`).
- **Espace Client (Dashboard)** :
  - Vue d'ensemble du tableau de bord (`DashboardOverview`).
  - Catalogue de produits et modales de détails (`ProductsCatalog`, `ProductDetailModal`).
  - Centre de conformité (`ComplianceCenter`) avec hub pour différents marchés (`MarketsHub`).
  - Générateur de documents (`DocumentGenerator`).
  - Système d'alertes en temps réel (`AlertsView`).
  - Gestion des intégrations (`IntegrationsView`) et des paramètres de facturation (`BillingSettings`).
  - Assistant d'intégration/onboarding (`OnboardingWizard`).
- **Espace Administrateur** :
  - Tableau de bord Admin (`AdminDashboard`).
  - Gestionnaire de réglementations (`RegulationsManager`).
  - Éditeur du moteur de règles (`RulesEngineEditor`).
  - Journaux d'audit (`AuditLogsView`).
- **Moteur Logique** : Moteur de conformité interne (`complianceEngine.ts`) pour analyser les produits face aux règles.

## 3. Structure des fichiers
- `/src/components/admin/` : Composants exclusifs aux administrateurs (Gestion des règles, Audit).
- `/src/components/auth/` : Wrappers de sécurité pour restreindre l'accès aux pages (AdminRoute, ProtectedRoute).
- `/src/components/client/` : L'interface complète du Dashboard pour les utilisateurs/clients finaux.
- `/src/components/public/` : Les pages et composants accessibles sans connexion (Landing Page).
- `/src/context/` : Contextes globaux React (ex: `AuthContext.tsx` pour l'état utilisateur).
- `/src/engine/` : Logique métier complexe (ex: `complianceEngine.ts`).
- `/src/data/` : Données statiques ou "mock" (`mockData.ts`) utilisées en l'absence d'une DB complète.
- `/src/lib/` : Fichiers utilitaires, configuration de services externes (`supabase.ts`, `validations.ts`).
- `/src/types/` : Définitions des types TypeScript (`index.ts`).

## 4. Technologies utilisées
- **Framework Front-end** : React (v18) propulsé par Vite.
- **Langage** : TypeScript (pour le typage strict).
- **Routage** : React Router DOM.
- **Icônes** : Lucide React.
- **Validation des données** : Zod.
- **Backend / Authentification / Base de données** : Supabase.
- **Style** : Vanilla CSS (`index.css`), sans framework utilitaire type Tailwind (par choix de design).

## 5. Décisions de Design
- **Architecture Modulaire** : Séparation stricte entre les composants Publics, Clients et Admins pour une meilleure sécurité et scalabilité.
- **Approche "Mock-First"** : Utilisation de données simulées (`mockData.ts`) permettant le prototypage et le développement de l'interface indépendamment du backend.
- **State Management** : Utilisation de l'API Context de React pour l'authentification (plutôt que Redux) afin de garder le code léger et natif.
- **Séparation des préoccupations** : La logique métier de validation douanière/conformité est extraite du rendu visuel et placée dans `complianceEngine.ts`.
- **Aesthetic First** : Styles personnalisés riches en CSS Vanilla (glassmorphism, couleurs vibrantes, animations fluides) pour un rendu "Premium".

## 6. Instructions pour un futur modèle IA
- **Supabase** : Lors du passage en production, les variables dans `.env.local` doivent être remplacées par les clés réelles du projet Supabase. Veillez à implémenter les requêtes RLS (Row Level Security) adéquates dans Supabase.
- **Styling** : Maintenir l'utilisation du Vanilla CSS global (`index.css`) en respectant les tokens de design existants. Éviter d'ajouter Tailwind sauf si explicitement demandé.
- **Moteur de Conformité** : Toute nouvelle règle légale pour les produits doit être intégrée ou validée par le `complianceEngine.ts` et idéalement stockée dans la base de données.
- **Déploiement** : L'application est optimisée pour Vercel ou Netlify. Les variables d'environnement (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) doivent impérativement être injectées dans l'outil de déploiement avant la phase de "build".
