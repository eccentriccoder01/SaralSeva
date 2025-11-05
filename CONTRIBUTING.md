## 🤝 How to Contribute  

We’re thrilled that you want to contribute to **Eventra**! Follow these steps to make meaningful contributions:

1. **⭐ Star the Repository**  
   Show your support and stay updated with the latest changes by starring the project on GitHub.  

2. **Explore Existing Issues or Create Your Own**  
   - Check out the Issues to see where help is needed.  
   - If you have a new idea or feature request, feel free to open a new issue with a clear description.  

3. **Fork the Repository and Create a Branch**  
   - Fork the repo to your GitHub account.  
   - Create a **feature branch** for the specific issue you’re working on, e.g., `feature/your-feature-name`.  

4. **Make Changes and Test**  
   - Follow the Code Standards for frontend and backend.  
   - Write unit or integration tests for new features.  
   - Test your changes thoroughly in your local environment.  

5. **Commit Changes with Clear Messages**  
   - Use Conventional Commits for descriptive commit messages, e.g., `feat: add user registration form`.  

6. **Push Your Branch and Open a Pull Request**  
   - Push your branch to your forked repository.  
   - Submit a PR with a clear title and description explaining:  
     - The problem solved  
     - Your approach  
     - Any related issues (`Closes #issue_number`)  

7. **Add Screenshots or Demos**  
   - Include images or GIFs to demonstrate UI changes or new features.  
   - This helps reviewers understand the changes quickly.  

> 💡 Tip: Always be open to feedback, respond promptly, and update your PR as needed. Your contributions help make Eventra better for everyone! 🚀

## How to make a Pull Request

**1.** Fork the repository by clicking on the Fork symbol at the top right corner.

**2.** Clone the forked repository.
```
   git clone https://github.com/YOUR_USERNAME/SaralSeva.git
```

**3.** Navigate to the project directory.
```
   cd SaralSeva
```

**4.** Create a new branch:
```
   git checkout -b YourBranchName
```

**5.** Make changes in source code.

**6.** Stage your changes and commit

```
   git add .
   git commit -m "<your_commit_message>"
```

**7.** Push your local commits to the remote repo.

```
   git push origin YourBranchName
```

**8.** Create a [PR](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)

**Note** If anyone contributes to this repository, then the changes will not be reflected in your local repository. For that:

**9.** Setup a reference(remote) to the original repository to get all the changes from the remote.
```
   git remote add upstream https://github.com/eccentriccoder01/SaralSeva.git
```

**10.** Check the remotes for this repository.
```
   git remote -v
```

**11.** Fetching from the remote repository will bring in its branches and their respective commits.
```
   git fetch upstream
```

**12.** Make sure that you're on your main branch.
```
   git checkout main
```

**13.** Now that we have fetched the upstream repository, we want to merge its changes into our local branch. This will bring that branch into sync with the upstream, without losing our local changes.
```
   git merge upstream/main
```

## ✅ Tips for a Successful Pull Request  

To increase the likelihood of your pull request being accepted, follow these best practices:

- **Follow the Style Guide**  
  Adhere to the [style guide](https://gist.github.com/lisawolderiksen/a7b99d94c92c6671181611be1641c733).  
  Any linting errors should be visible when running your project’s test commands.

- **Write and Update Tests**  
  Ensure that new features are covered by **unit or integration tests**, and update existing tests if necessary.

- **Keep Changes Focused**  
  Each pull request should address a single issue or feature.  
  If you have multiple unrelated changes, submit them as **separate pull requests**.

- **Write Clear Commit Messages**  
  Use descriptive and concise commit messages.  
  Refer to [this guide on writing good commit messages](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).

- **Provide Context**  
  Explain the purpose of your changes, why they are needed, and any relevant background in the PR description.

- **Include Screenshots or Demos**  
  For UI changes or visual updates, include screenshots or GIFs to help reviewers understand the impact.

> Following these guidelines not only speeds up the review process but also helps maintain a clean and professional project history. 🚀

## 📚 Resources  

Here are some helpful resources to guide you while contributing to **Eventra**:

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/) – A comprehensive guide for beginners and experienced contributors.  
- [Using Pull Requests](https://help.github.com/articles/about-pull-requests/) – Learn how to create, review, and manage pull requests on GitHub.  
- [GitHub Help](https://help.github.com) – Official GitHub documentation for troubleshooting, tips, and best practices.  

> 💡 Tip: Bookmark these resources—they’re invaluable when contributing to any open-source project!
