---
description: How to deploy the merchant webapp to GitHub Pages
---

This workflow describes how to deploy the `merchant.webapp` to GitHub Pages using the configured `gh-pages` script.

1.  **Ensure you are on the main branch and your changes are committed.**
    It is best practice to deploy from a clean state on your main branch.

    ```powershell
    git checkout main
    git status
    # If you have changes, commit them:
    # git add .
    # git commit -m "Your commit message"
    ```

2.  **Run the deploy script.**
    This script will automatically run the `build` script first (creating the production build in the `build/` directory) and then push that folder to the `gh-pages` branch on GitHub.

    ```powershell
    npm run deploy
    ```

3.  **Verify the deployment.**
    Once the command completes successfully, your changes should be live on `https://tatendamatoi-wcyber.github.io/merchant.webapp` (after a few minutes for GitHub Pages to update).
