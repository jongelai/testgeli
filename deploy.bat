@echo off
echo.
echo [1/3] Preparando cambios...
git add .

echo [2/3] Guardando cambios (Commit)...
set /p msg="Introduce el mensaje del cambio: "
git commit -m "%msg%"

echo [3/3] Subiendo a GitHub...
git push origin main

echo.
echo ¡Hecho! Tu web se actualizara en 1 minuto.
pause