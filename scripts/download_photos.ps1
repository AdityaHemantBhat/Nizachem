$images = @{
  "story-uncle.jpg" = "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=80"
  "dish-sorpotel.jpg" = "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80"
  "dish-prawn-vindaloo.jpg" = "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80"
  "dish-chicken-xacuti.jpg" = "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=80"
  "dish-crab-xec-xec.jpg" = "https://images.unsplash.com/photo-1559742811-8228636474ec?auto=format&fit=crop&w=1200&q=80"
  "dish-chicken-cafreal.jpg" = "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=80"
  "dish-pork-sausage-pulao.jpg" = "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80"
  "dish-bebinca.jpg" = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80"
  "gallery-1.jpg" = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
  "gallery-2.jpg" = "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=80"
  "gallery-3.jpg" = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80"
  "gallery-4.jpg" = "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80"
  "gallery-5.jpg" = "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=1200&q=80"
  "gallery-6.jpg" = "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=80"
  "gallery-7.jpg" = "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80"
  "gallery-8.jpg" = "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80"
}

$destDir = "d:\Adi Works\Nizachem\public\photos"
if (-not (Test-Path $destDir)) {
  New-Item -ItemType Directory -Path $destDir -Force | Out-Null
}

foreach ($item in $images.GetEnumerator()) {
  $name = $item.Key
  $url = $item.Value
  $out = Join-Path $destDir $name
  if (-not (Test-Path $out)) {
    Write-Host "Downloading $name..."
    try {
      Invoke-WebRequest -Uri $url -OutFile $out -TimeoutSec 20
    } catch {
      Write-Host "Failed to download $name : $_"
    }
  }
}

Get-ChildItem $destDir | Select-Object Name, Length
