# limpiar-legacy.ps1
# Limpieza de archivos y carpetas sin uso tras la reestructuracion a core/ + features/.
# No borra a ciegas: las carpetas solo se borran si estan vacias al momento de
# correr el script, y los archivos "muertos" solo si su contenido todavia
# coincide con el stub documentado. Si algo no calza, se salta y se avisa.
#
# Uso:
#   cd A:\Documents\municipal-request-tracker
#   powershell -ExecutionPolicy Bypass -File .\limpiar-legacy.ps1
#
# Despues de correrlo: revisa "git status" antes de hacer commit, para
# confirmar que solo desaparecio lo esperado.

$root = Get-Location

function Remove-IfEmpty {
    param([string]$RelativePath)
    $full = Join-Path $root $RelativePath
    if (Test-Path $full) {
        $items = Get-ChildItem -Path $full -Force
        if ($items.Count -eq 0) {
            Remove-Item -Path $full -Force
            Write-Host "[OK]   Carpeta vacia eliminada: $RelativePath"
        } else {
            Write-Host "[SKIP] No esta vacia, no se toca: $RelativePath"
        }
    } else {
        Write-Host "[SKIP] No existe (puede que ya la hayas borrado): $RelativePath"
    }
}

function Remove-IfDeadStub {
    param([string]$RelativePath)
    $full = Join-Path $root $RelativePath
    if (Test-Path $full) {
        $content = Get-Content -Path $full -Raw
        if ($content -match "Archivo muerto") {
            Remove-Item -Path $full -Force
            Write-Host "[OK]   Archivo muerto eliminado: $RelativePath"
        } else {
            Write-Host "[SKIP] El contenido no coincide con el stub esperado (puede que lo hayas editado), revisalo a mano: $RelativePath"
        }
    } else {
        Write-Host "[SKIP] No existe (puede que ya lo hayas borrado): $RelativePath"
    }
}

Write-Host "== 1) Artefacto accidental de npm en la raiz =="
$rootPkg = Join-Path $root "package.json"
if (Test-Path $rootPkg) {
    $pkgContent = Get-Content -Path $rootPkg -Raw
    if ($pkgContent -match '"he"' -and $pkgContent -notmatch '"scripts"') {
        Remove-Item -Path $rootPkg -Force
        Remove-Item -Path (Join-Path $root "package-lock.json") -Force -ErrorAction SilentlyContinue
        Remove-Item -Path (Join-Path $root "node_modules") -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "[OK]   package.json / package-lock.json / node_modules de la raiz eliminados (duplicado accidental de 'he', que ya esta en nodejs-Municipal/package.json)"
    } else {
        Write-Host "[SKIP] package.json de la raiz no coincide con el patron esperado (parece tener mas contenido del que vi). Revisalo a mano antes de borrar."
    }
} else {
    Write-Host "[SKIP] No hay package.json en la raiz."
}

Write-Host ""
Write-Host "== 2) Backend: stub muerto y carpetas legacy vacias =="
Remove-IfDeadStub "nodejs-Municipal\src\data\mockDB.ts"
Remove-IfEmpty   "nodejs-Municipal\src\data"
Remove-IfEmpty   "nodejs-Municipal\src\controllers"
Remove-IfEmpty   "nodejs-Municipal\src\routes"
Remove-IfEmpty   "nodejs-Municipal\src\models"
Remove-IfEmpty   "nodejs-Municipal\src\middlewares"
Remove-IfEmpty   "nodejs-Municipal\src\utils"
Remove-IfEmpty   "nodejs-Municipal\src\config"
Remove-IfEmpty   "nodejs-Municipal\src\core\security"
Remove-IfEmpty   "nodejs-Municipal\src\core\data"
Remove-IfEmpty   "nodejs-Municipal\src\features\soporte\domain\entities"

Write-Host ""
Write-Host "== 3) Frontend: placeholders vacios que nunca se usaron =="
Write-Host "(esto no afecta git de ninguna forma, las carpetas vacias nunca se versionan; es solo orden local)"
Remove-IfEmpty "Ionic-Municipal\src\core\config"
Remove-IfEmpty "Ionic-Municipal\src\features\documentos\presentation\components"
Remove-IfEmpty "Ionic-Municipal\src\features\tickets\domain\entities"
Remove-IfEmpty "Ionic-Municipal\src\features\tramites\presentation\screens"

Write-Host ""
Write-Host "== 4) Para revisar tu mismo (no se toca automaticamente) =="
Write-Host "nodejs-Municipal\prisma.zip -> 3.5 KB, fechado 12-jun, anterior a la reestructuracion."
Write-Host "Parece backup viejo de la carpeta prisma/ que ya existe completa. Si confirmas que no lo necesitas:"
Write-Host "    Remove-Item nodejs-Municipal\prisma.zip"

Write-Host ""
Write-Host "Listo. Corre 'git status' antes de hacer commit para confirmar que solo desaparecio lo esperado."
