# 備用網路配置腳本

# 如果 QUIC 協議錯誤持續存在，可以嘗試以下解決方案

# 1. 清除 Chrome 緩存和 cookies

# 在 Chrome 中按 Ctrl+Shift+Delete，清除所有瀏覽數據

# 2. 重置網路設定 (Windows)

# 以管理員身份運行命令提示符，執行：

# netsh winsock reset

# netsh int ip reset

# ipconfig /flushdns

# 然後重啟電腦

# 3. 檢查 Windows 防火牆設定

# 確保 Node.js 和瀏覽器被允許通過防火牆

# 4. 嘗試不同的 DNS 服務器

# 設定 DNS 為 8.8.8.8 和 8.8.4.4

# 5. 檢查 hosts 文件

# 確保 C:\Windows\System32\drivers\etc\hosts 中沒有阻擋 Google 服務的條目
