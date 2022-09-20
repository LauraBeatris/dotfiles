# Install homebrew
./homebrew/install.sh 2>&1

# Upgrade homebrew
echo "› brew update"
brew update

# Install all packages
brew bundle --file ./homebrew/Brewfile

# Install yarn
# https://yarnpkg.com/getting-started/install#nodejs-1610
corepack enable

# Use zsh as default shell
sudo chsh -s $(which zsh) $USER

# Bundle zsh plugins 
antibody bundle < ~/.zsh_plugins.txt > ~/.zsh_plugins.sh

# Use kitty terminal on MacOS
[ `uname -s` = 'Darwin' ] && stow kitty

# Stow dotfiles packages
stow asdf
stow git
stow kitty
stow oh-my-zsh
stow raycast
stow yarn
stow zsh

