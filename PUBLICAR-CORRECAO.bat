@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ==========================================
echo  ROCHA SELECAO - PUBLICACAO SEM ERROS
echo ==========================================
echo.
echo Pasta utilizada:
cd
echo.

if not exist index.html (
  echo ERRO: index.html nao encontrado nesta pasta.
  pause
  exit /b 1
)

if exist .git rmdir /s /q .git

git init
git branch -M main
git remote add origin https://github.com/diegotbyrro-ui/rocha-selecao.git
git fetch origin main
git add -A
git commit -m "Corrige codificacao de todo o site Rocha Selecao"
git push -u origin main --force-with-lease

echo.
echo Publicacao concluida. Aguarde o GitHub Pages atualizar.
pause
