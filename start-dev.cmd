@echo off
cd /d "%~dp0"
echo Starting pet.care dev server at http://127.0.0.1:3000/
echo Keep this window open while previewing the site.
npm.cmd run dev -- --hostname 127.0.0.1 --port 3000
pause
