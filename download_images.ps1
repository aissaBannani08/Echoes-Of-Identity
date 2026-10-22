$dest = "c:\Users\dell\Echoes Of Identity\public\images\archive"
$headers = @{
    "User-Agent" = "EchoesOfIdentity/1.0 (educational project) PowerShell"
    "Accept" = "image/jpeg,image/png,image/*"
}

function Download-Image {
    param($url, $outFile, $name)
    try {
        Start-Sleep -Seconds 4
        Invoke-WebRequest -Uri $url -OutFile $outFile -Headers $headers -UseBasicParsing -TimeoutSec 60
        $size = (Get-Item $outFile).Length
        Write-Host "$name downloaded ($size bytes)"
    } catch {
        Write-Host "$name failed: $($_.Exception.Message)"
    }
}

# Culture - Gnawa musicians Essaouira 2010 festival (CC-BY-SA)
Download-Image `
    "https://upload.wikimedia.org/wikipedia/commons/e/e0/Gnaoua_%28Gnawa%29_musicians_performing_during_the_2010_Gnaoua_festival_in_the_city_of_Essaouira%2C_Morocco.jpg" `
    "$dest\culture_real.jpg" `
    "Culture-Gnawa"

# Identity - Grande Mosquee de Paris (CC-BY-SA) - North African Muslim identity in France
Download-Image `
    "https://upload.wikimedia.org/wikipedia/commons/e/e0/Grande_Mosqu%C3%A9e_de_Paris.JPG" `
    "$dest\identity_real.jpg" `
    "Identity-Mosque"

# Hardship - African hardship/displacement
Download-Image `
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/UNHCR_refugee_camp.jpg/1280px-UNHCR_refugee_camp.jpg" `
    "$dest\hardship_real.jpg" `
    "Hardship-Refugees"

Write-Host "Script complete."
Get-ChildItem "$dest\*_real*" | Select-Object Name, Length
