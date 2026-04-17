---
title: Git Aliases (Repost)
date: 2023-3-5
externalUrl: https://tech.lgbt/@moony/109973614187292820

summary: How to use multiple git 'accounts' on one computer.

authors:
  - name: kaylie
    url: https://afterlight3149.net/

tags:
  - computers
  - reposts
---

**SOURCE:** <https://tech.lgbt/@moony/109973614187292820>

> If you need multiple aliases when working with repos (say, for example, you have a work alt), an easy way to do so is with ssh keys. Give each account you wish to use a unique ssh key, with your main account being your primary local key.  
> Then, in .ssh/config, create a new host entry like so:
>
> Host my-fancy-alt  
> HostName \<git server, for example github.com\>  
> User git  
> IdentityFile ~/.ssh/my-fancy-alt-key
>
> Finally, change the remote you wish to use the alt on to use this new ssh host, the new url being:
>
> my-fancy-alt:my-repo-owner/repo-name-here
>
> From there, make sure that the worktree you're in has had the git user and email set to match your alt and you should be set.

My additional notes:
Remember, if you want to rebase and change the author of _ALL_ commits in a repository, you can do:

```bash
git rebase --root --interactive
```

Then, set all of the commits you want to change authorship of to `edit`, and then for each commit run:

```bash
git commit --amend --author="Author Name <git-email@mail.com>" --no-edit && git rebase --continue
```

I mostly use this for times I accidentally use a personal account for a project I want to publish on my professional github account.
