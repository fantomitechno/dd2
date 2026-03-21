{
  pkgs ? import <nixpkgs> { },
}:

let
  NPM_CONFIG_PREFIX = toString ./npm_config_prefix;

in
pkgs.mkShell {
  packages = with pkgs; [
    nodejs
    nodePackages.pnpm
  ];

  inherit NPM_CONFIG_PREFIX;

  shellHook = ''
    export PATH="${NPM_CONFIG_PREFIX}/bin:$PATH"
  '';
}
