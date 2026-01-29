# Guide de Publication sur npm avec Trusted Publishers

## 🎯 Prérequis

Ce guide explique comment publier le package `radix-tree` sur npm en utilisant la fonctionnalité **Trusted Publishers**, qui permet de publier sans token d'accès grâce à l'authentification OIDC.

## ✅ Configuration Actuelle

Le repository est déjà configuré pour supporter Trusted Publishers:

- ✅ Workflow GitHub Actions (`.github/workflows/release.yml`)
- ✅ Permission `id-token: write` dans le workflow (pour OIDC)
- ✅ Changesets configuré avec `"access": "public"`
- ✅ Flag `--provenance` ajouté à la commande de publication

## 📋 Étapes de Publication

### Étape 1: Configuration du Trusted Publisher sur npm

Vous devez configurer ce repository GitHub comme trusted publisher sur npm:

1. **Créez un compte npm** (si pas déjà fait):
   - Allez sur https://www.npmjs.com/signup
   - Créez votre compte

2. **Activez l'authentification à deux facteurs (2FA)**:
   - Allez sur https://www.npmjs.com/settings/YOUR_USERNAME/twofa
   - Activez la 2FA (obligatoire)

3. **Configurez le Trusted Publisher**:
   - Pour un **nouveau package** (recommandé):
     - Allez sur https://www.npmjs.com/settings/YOUR_USERNAME/packages
     - Cliquez sur "Create a new package with trusted publishing"
     - Remplissez les informations:
       - **Package name**: `radix-tree` (ou `@YOUR_USERNAME/radix-tree` pour scoped)
       - **GitHub repository**: `abernier/radix-tree`
       - **Workflow file**: `.github/workflows/release.yml`
       - **Environment** (optionnel): laissez vide
   
   - Pour un **package existant**:
     - Allez sur la page du package sur npm
     - Settings → Publishing Access → Trusted Publishers
     - Ajoutez le repository GitHub

**Important**: Avec Trusted Publishers, **AUCUN token npm n'est nécessaire**! L'authentification se fait automatiquement via OIDC.

### Étape 2: Créer un Changeset

Un changeset décrit les modifications qui justifient une nouvelle version:

```bash
# Dans le terminal, à la racine du projet
pnpm changeset
```

Répondez aux questions:
- **What kind of change is this?**: Choisissez `major` pour la première version (1.0.0)
- **Summary**: Décrivez brièvement (ex: "Initial release of radix-tree component")

Cela créera un fichier dans `.changeset/` que vous devrez committer.

### Étape 3: Commit et Push le Changeset

```bash
git add .changeset/*.md
git commit -m "chore: add changeset for initial release"
git push origin main
```

### Étape 4: Le Workflow Automatique

Une fois poussé sur `main`:

1. Le workflow **Release** se déclenche automatiquement
2. Il créera une **Release PR** qui:
   - Met à jour la version dans `package.json`
   - Génère le `CHANGELOG.md`
3. **Mergez cette PR** pour déclencher la publication

### Étape 5: Publication Automatique

Quand vous mergez la Release PR:

1. Le workflow se déclenche à nouveau
2. Il exécute `pnpm run build`
3. Il s'authentifie automatiquement via OIDC (grâce au trusted publisher)
4. Il publie sur npm avec `changeset publish --provenance`
5. Le package est publié avec **attestation de provenance** ✨

## 🔐 Qu'est-ce que Trusted Publishers?

Trusted Publishers est une fonctionnalité de sécurité npm qui:

- ✅ **Élimine les tokens d'accès** - Pas besoin de secrets NPM_TOKEN
- ✅ **Authentification OIDC** - Utilise l'identité GitHub Actions
- ✅ **Provenance automatique** - Prouve que le package vient de GitHub Actions
- ✅ **Plus sécurisé** - Pas de risque de fuite de token
- ✅ **Plus simple** - Moins de configuration de secrets

Les utilisateurs peuvent vérifier la provenance:
```bash
npm view radix-tree --json
```

## 🔄 Publications Futures

Pour les prochaines versions:

1. Faites vos modifications de code
2. Exécutez `pnpm changeset` pour documenter les changements
3. Commit et push
4. Mergez la Release PR créée automatiquement
5. Le package est publié automatiquement (sans token)!

## 🚀 Vérification Manuelle (Optionnel)

Si vous voulez vérifier que tout fonctionne avant la première publication:

```bash
# Construire le package
pnpm run build

# Vérifier le contenu qui sera publié
pnpm pack

# Vérifier les exports
pnpm run check-exports
```

## 📚 Ressources

- [npm Trusted Publishers Documentation](https://docs.npmjs.com/trusted-publishers)
- [npm Provenance Documentation](https://docs.npmjs.com/generating-provenance-statements)
- [Changesets Documentation](https://github.com/changesets/changesets)
- [GitHub OIDC Documentation](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)

## ❓ Troubleshooting

### "npm ERR! 403 Forbidden" lors de la publication
- Vérifiez que le trusted publisher est bien configuré sur npm
- Vérifiez que le repository GitHub, le workflow et l'environment (si spécifié) correspondent exactement

### "npm ERR! 403 Forbidden" - package name déjà pris
- Vérifiez que le nom n'est pas déjà pris
- Utilisez un scoped package: `@YOUR_USERNAME/radix-tree`

### Le workflow ne se déclenche pas
- Vérifiez que vous avez bien poussé sur la branche `main`
- Vérifiez que le workflow est activé dans Settings → Actions

### Permission denied sur id-token
- Vérifiez que `id-token: write` est dans les permissions du workflow
- C'est déjà configuré dans ce repository!

## 📝 Checklist Finale

Avant la première publication, assurez-vous que:

- [ ] Compte npm créé et 2FA activé
- [ ] Trusted Publisher configuré sur npm.com pour ce repository GitHub
- [ ] **PAS de secret NPM_TOKEN nécessaire** (c'est l'avantage!)
- [ ] Changeset créé avec `pnpm changeset`
- [ ] Code poussé sur la branche `main`
- [ ] Release PR créée automatiquement
- [ ] Release PR mergée pour publier

---

**Note**: La première publication avec Trusted Publishers nécessite que le package soit créé via la configuration trusted publisher sur npm.com AVANT la première publication. Vous ne pouvez pas publier un package qui existe déjà sans avoir configuré le trusted publisher.
