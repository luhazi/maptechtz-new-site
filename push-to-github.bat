@echo off
echo ============================================
echo  Maptech Site - Push to GitHub Pages
echo ============================================
echo.

set SITE_DIR=C:\Users\PC\Documents\MAPTECH SITE
cd /d "%SITE_DIR%"

:: Check git is installed
git --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
  echo ERROR: Git is not installed.
  echo Download from: https://git-scm.com/download/win
  pause
  exit /b 1
)

echo [1/6] Setting up git...
git init
git config user.email "rosamaconsultancy@gmail.com"
git config user.name "Maptech"

echo [2/6] Configuring remote...
git remote remove origin 2>nul
git remote add origin https://github.com/luhazi/maptechtz-new-site.git

echo [3/6] Staging all files...
git add -A

echo [4/6] Creating commit...
git status --short
git commit -m "Fix layout bugs, remove duplicate content, improve mobile UI/UX"

echo [5/6] Pushing to GitHub...
echo.
echo NOTE: When asked for Username, type:  luhazi
echo       When asked for Password, paste: YOUR GITHUB PAT TOKEN
echo       (Get token at github.com/settings/tokens - needs repo scope)
echo.
git branch -M main
git push -f origin main

echo.
echo ============================================
if %ERRORLEVEL% == 0 (
  echo  SUCCESS! Changes pushed.
  echo  GitHub Pages will update in ~2 minutes.
  echo  Visit: https://luhazi.github.io/maptechtz-new-site/
) else (
  echo  If push failed, try running this instead:
  echo  git push -f origin master
)
echo ============================================
pause
