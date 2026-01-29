# Guide de Publication sur npm avec Trusted Publisher (Provenance)

## 🎯 Prérequis

Ce guide explique comment publier le package `radix-tree` sur npm en utilisant la fonctionnalité **Trusted Publisher** (Provenance), qui est maintenant le standard recommandé.

## ✅ Configuration Actuelle

Le repository est déjà configuré pour supporter la publication avec provenance:

- ✅ Workflow GitHub Actions (`.github/workflows/release.yml`)
- ✅ Permission `id-token: write` dans le workflow
- ✅ Changesets configuré avec `"access": "public"`
- ✅ Flag `--provenance` ajouté à la commande de publication

## 📋 Étapes de Publication

### Étape 1: Configuration du Token npm

Vous devez créer un **Automation Access Token** sur npm:

1. **Créez un compte npm** (si pas déjà fait):
   - Allez sur https://www.npmjs.com/signup
   - Créez votre compte

2. **Activez l'authentification à deux facteurs (2FA)**:
   - Allez sur https://www.npmjs.com/settings/YOUR_USERNAME/twofa
   - Activez la 2FA (obligatoire pour publier des packages)

3. **Créez un Automation Token**:
   - Allez sur https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   - Cliquez sur "Generate New Token" → "Classic Token"
   - Sélectionnez "Automation" (pas "Publish")
   - Copiez le token généré (vous ne pourrez le voir qu'une seule fois!)

4. **Ajoutez le token comme secret GitHub**:
   - Allez sur https://github.com/abernier/radix-tree/settings/secrets/actions
   - Cliquez sur "New repository secret"
   - Nom: `NPM_TOKEN`
   - Valeur: collez votre token npm
   - Cliquez sur "Add secret"

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
3. Il publie sur npm avec `changeset publish --provenance`
4. Le package est publié avec **attestation de provenance** ✨

## 🔐 Qu'est-ce que la Provenance?

La provenance (trusted publisher) est une fonctionnalité de sécurité npm qui:

- ✅ Prouve que le package a été construit et publié depuis GitHub Actions
- ✅ Lie le package publié au code source exact
- ✅ Empêche la publication manuelle (plus sécurisé)
- ✅ Affiche un badge vérifié sur npm

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
5. Le package est publié automatiquement!

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

- [npm Provenance Documentation](https://docs.npmjs.com/generating-provenance-statements)
- [Changesets Documentation](https://github.com/changesets/changesets)
- [GitHub Actions NPM Publishing](https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages)

## ❓ Troubleshooting

### "npm ERR! need auth"

- Vérifiez que le secret `NPM_TOKEN` est bien configuré dans GitHub
- Le token doit être de type "Automation"

### "npm ERR! 403 Forbidden"

- Vérifiez que vous êtes propriétaire du package sur npm
- Pour un nouveau package, vérifiez que le nom n'est pas déjà pris

### Le workflow ne se déclenche pas

- Vérifiez que vous avez bien poussé sur la branche `main`
- Vérifiez que le workflow est activé dans Settings → Actions

## 📝 Checklist Finale

Avant la première publication, assurez-vous que:

- [ ] Compte npm créé et 2FA activé
- [ ] Token npm "Automation" créé
- [ ] Secret `NPM_TOKEN` ajouté dans GitHub
- [ ] Changeset créé avec `pnpm changeset`
- [ ] Code poussé sur la branche `main`
- [ ] Release PR créée automatiquement
- [ ] Release PR mergée pour publier

---

**Note**: La première publication nécessite que le nom du package soit disponible sur npm. Le package `radix-tree` sera réservé lors de la première publication.
