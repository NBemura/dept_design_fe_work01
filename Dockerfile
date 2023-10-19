# ベースイメージとして、Node.js 18.17.0 の公式イメージ(Debian系)を使用
FROM node:18.18-bullseye-slim

# 不要なパッケージの削除を実行し、軽量化。一応vimをインストール。
RUN apt update && \
    apt install -y --no-install-recommends vim && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*