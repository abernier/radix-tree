# 🚀 Quick Start: Prochaines Étapes pour Publier sur npm

## ✅ Configuration Terminée

Votre repository est maintenant configuré pour la publication avec **Trusted Publisher** (Provenance)!

## 📝 Ce qui a été fait

1. ✅ Workflow GitHub Actions mis à jour avec support npm
2. ✅ Flag `--provenance` ajouté pour la publication sécurisée
3. ✅ Documentation complète créée dans `PUBLISHING.md`

## 🎯 Vos Prochaines Actions

### 1️⃣ Créer un Token npm Automation (5 minutes)

```bash
# Si pas encore de compte npm:
# 1. Allez sur https://www.npmjs.com/signup
# 2. Créez votre compte

# Ensuite:
# 1. Activez 2FA: https://www.npmjs.com/settings/YOUR_USERNAME/twofa
# 2. Créez un token: https://www.npmjs.com/settings/YOUR_USERNAME/tokens
#    → "Generate New Token" → "Classic Token" → "Automation"
# 3. Copiez le token (vous ne le verrez qu'une fois!)
```

### 2️⃣ Ajouter le Token dans GitHub (2 minutes)

```bash
# 1. Allez sur: https://github.com/abernier/radix-tree/settings/secrets/actions
# 2. Cliquez "New repository secret"
# 3. Nom: NPM_TOKEN
# 4. Valeur: collez votre token npm
# 5. Cliquez "Add secret"
```

### 3️⃣ Créer un Changeset (1 minute)

```bash
# À la racine de votre projet
pnpm changeset

# Répondez:
# - What kind of change?: major (pour v1.0.0)
# - Summary: "Initial release of radix-tree component"
```

### 4️⃣ Pusher et Publier

```bash
# Commit le changeset
git add .changeset/*.md
git commit -m "chore: add changeset for initial release"
git push origin main

# Le workflow GitHub Actions va:
# 1. Créer une Release PR automatiquement
# 2. Quand vous la mergez → publication automatique sur npm!
```

## 📚 Documentation Complète

Pour tous les détails, consultez: **[PUBLISHING.md](./PUBLISHING.md)**

## ⚡ Résumé Ultra-Rapide

1. **Compte npm** + 2FA → **Token Automation**
2. **GitHub Secret** `NPM_TOKEN` = votre token
3. **`pnpm changeset`** pour décrire la release
4. **Push sur main** → PR automatique créée
5. **Merge la PR** → Package publié sur npm ✨

## 🔐 Sécurité Provenance

Votre package sera publié avec:

- ✅ Attestation de provenance GitHub
- ✅ Lien vers le code source exact
- ✅ Badge vérifié sur npm
- ✅ Traçabilité complète

## ❓ Besoin d'Aide?

- Questions sur changesets: https://github.com/changesets/changesets
- Questions sur npm provenance: https://docs.npmjs.com/generating-provenance-statements
- Problème de workflow: Voir le troubleshooting dans PUBLISHING.md

---

**Prêt à publier? Commencez par l'étape 1️⃣ ci-dessus! 🎉**
