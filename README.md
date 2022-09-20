# Laura's Dotfiles 🥯

I've not aimed (yet) to create a appropriate Dotfiles repository that comes with installation scripts, therefore symlinks have to be created manually as well as installing Brew dependencies, refer to the instructions below

## Homebrew
*Learning resource: https://pumpingco.de/blog/brewfile/*

### Install all packages
The following command will install the listed packages from [Brewfile](./Brewfile) or bring team all to the latest version 
```bash
brew bundle --file ./Brewfile
``` 

### Update Brewfile 
The Brewfile from this repository should be updated accordingly when installing new dependencies on your current machine 

- `brew` for regular Homebrew command-line apps
- `cask` for desktop applications
- `mas` for Apple App Store applications

```bash
brew bundle dump
```

## Symlinks

*Learning resource: https://www.jakewiesler.com/blog/managing-dotfiles#understanding-stow*

Use `stow` to create symlinks for each package 
```bash
stow ./zsh
```
