# React + Vite

このディレクトリは、dept_design_feがReactについて学習を行うためのものです。
簡単なシングルページの書籍検索アプリケーションの作成を通じて、主に以下のような知識を身につけることができます。

- 基本的なReact Hooks
- 外部APIの利用([Google Books APIs](https://developers.google.com/books?hl=ja))
- LocalStorageを使用した、データの永続化

## 環境に関して

開発環境には「Docker + Dev Containers + Vite」を利用しています。これらの環境構築に関しては、[こちら](https://github.com/newbeescoltd/nb_study_react)のワークショップで詳しく扱っているため、必要な方は確認してください。

### 環境構築方法

VSCodeで`dept_design_fe_work01`ディレクトリを開いて、Dev Containersを使用してコンテナを起動してください。
(`command+shift+P`で出てくるコマンドパレットにて、`Reopen in Container`を入力。)

その後、`cd booklog && npm i`で開発環境が構築されると思います。`npm run dev`で開発環境が起動できます。

## ディレクトリ・ファイルの説明
- booklog: 開発用のディレクトリです。
- steps: 課題の各ステップの成果物を確認できるディレクトリです。`steps/index.html`が、各ステップへのリンク一覧のページとなっています。

- booklog/src/mockdata.ts: 課題で使うモックデータのためのファイルです。Google Books APIsから取得できるデータに準ずるものになっています。
- booklog/src/types/index.ts: APIから取得するデータのための型情報です。

## 課題の進め方
- `dept_design_fe_work01`という名称で個人リポジトリを作成した後、`dept_design_fe_work01/`ディレクトリ内のファイル一式をコピーして作業を行なってください。
- Step毎に作業用ブランチを切って作業を行なってください。
- issueは[nb_study_react](https://github.com/newbeescoltd/nb_study_react)で作成し、各個人リポジトリのプルリクエストからissueにリンクする。
- 作業用ブランチをマージ次第、issueをクローズする。

## 各ステップの説明
1. モックデータを使用して、任意の1冊の情報を表示する。
   - useStateを使って実装を行なってください。
   - モックデータは、`booklog/src/mockdata.ts`を使用してください。
2. モックデータを全て反映したブックリスト及び、ヘッダーを作成する。
3. 検索フォーム箇所を作成する。検索機能はまだ必要ありません。
   - useRefを使って実装を行なってください。
4. headerの読書時間タイマーを作成する。
   - useEffectを使って実装を行なってください。
5. APIの連携を行い、検索結果をブックリストに反映できるようにする。
   - APIから取得したデータの型は、 `src/types/index.ts`にて定義されている`BookItem`を使用して型アサーションを行う形で問題ありません。
   ただ本来はライブラリの使用等、別の方法を取ります。今回はできるだけ簡単にするための方法だと理解してください。
6. モックデータを使用して、Mybooksのリストを作成します。
7. localStorageを利用したMyBooksへの書籍情報の追加・削除機能の追加を行います。
   - 複数のcomponentで状態を共有できるよう、useContextを使って実装を行なってください。

### 補足
- スタイルは見本と違っても大丈夫です。
- なんか不具合あればすぐ修正するので教えてください🥹

## 課題終了後の自主学習のヒント
- [このあたり](https://developers.google.com/books/docs/v1/using?hl=ja#WorkingVolumes)のドキュメントを参考に、検索のためのフィールドの追加を行う。
- 読書時間タイマーの単位を変えたり入力式にしてみる。
  ※課題では動作確認がしやすいように5秒刻みにしています。
- MyBooksへの書籍情報の追加・削除機能に、useReducerを利用してみる。