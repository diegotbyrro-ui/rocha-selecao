@echo off
chcp 65001 > nul
cd /d "%~dp0"

echo.
echo Publicando a logo oficial da Rocha...
echo.

if not exist ".git" (
  git init
  git branch -M main
  git remote add origin https://github.com/diegotbyrro-ui/rocha-selecao.git
  git fetch origin main
)

git remote set-url origin https://github.com/diegotbyrro-ui/rocha-selecao.git
git add -A
git commit -m "Aplica logo oficial e favicon da Rocha"
git push -u origin main

echo.
echo Processo finalizado.
pause
