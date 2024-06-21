// コメントを保存する関数
function saveCommentToCookie(userName, commentText) {
    // 現在の日時を取得
    const date = new Date().toLocaleString();
    
    // 新しいコメントオブジェクトを作成
    const newComment = { user: userName, text: commentText, date };

    // 保存するコメントリストを取得
    let comments = JSON.parse(getCookie('comments')) || [];

    // 新しいコメントを追加
    comments.push(newComment);

    // コメントリストを Cookie に保存
    setCookie('comments', JSON.stringify(comments), 365); // 365日間有効な Cookie

    // コメントを表示する（任意の表示処理を追加）
    displayComments(comments);
}

// Cookie からコメントリストを取得する関数
function getCommentsFromCookie() {
    return JSON.parse(getCookie('comments')) || [];
}

// Cookie にコメントを保存するための関数
function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Cookie から指定した名前の値を取得するための関数
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

// コメントを表示する関数
function displayComments(comments) {
    const commentsContainer = document.getElementById('commentsContainer');
    commentsContainer.innerHTML = ''; // コメント一覧をクリア

    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
            <strong>${comment.user}</strong> (${comment.date}):<br>
            ${comment.text}
        `;
        commentsContainer.appendChild(commentElement);
    });
}

// コメント投稿フォームのイベントリスナーを設定
document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // フォームのデフォルトの動作を無効化

    const userName = document.getElementById('userName').value;
    const commentText = document.getElementById('commentText').value;

    if (userName.trim() === '') {
        alert('ユーザー名を入力してください。');
        return;
    }

    if (commentText.trim() === '') {
        alert('メモを入力してください。');
        return;
    }

    // コメントを Cookie に保存する
    saveCommentToCookie(userName, commentText);

    // コメント投稿後、フォームをクリアする
    document.getElementById('userName').value = '';
    document.getElementById('commentText').value = '';
});

// ページ読み込み時にコメントを表示する
window.onload = function() {
    // Cookie からコメントを取得して表示する
    const comments = getCommentsFromCookie();
    displayComments(comments);
}
