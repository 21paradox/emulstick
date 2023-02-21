{ pkgs ? import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/058d97782ed561787a6b2186854d29c94fd4fc0c.tar.gz") {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-16_x
    pkgs.curl
    pkgs.yarn
    pkgs.git
  ];
}
