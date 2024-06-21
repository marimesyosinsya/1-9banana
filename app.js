// コメントデータをローカルストレージから取得する
let comments = JSON.parse(localStorage.getItem('comments')) || [];

// コメントを表示する関数
function displayComments() {
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

// コメントを追加して保存する関数
function addComment(event) {
    event.preventDefault(); // フォームのデフォルトの動作を無効化

    const userName = document.getElementById('userName').value;
    const commentText = document.getElementById('commentText').value;
    
    if (userName.trim() === '') {
        alert('ユーザー名を入力してください。');
        return;
    }

    if (commentText.trim() === '') {
        alert('コメントを入力してください。');
        return;
    }

    const date = new Date().toLocaleString();
    const newComment = { user: userName, text: commentText, date };
    comments.push(newComment);
    saveComments(); // コメントを保存する

    // コメントを表示する
    displayComments();

    // コメント投稿後、フォームをクリアする
    document.getElementById('userName').value = '';
    document.getElementById('commentText').value = '';
}

// コメントをローカルストレージに保存する関数
function saveComments() {
    localStorage.setItem('comments', JSON.stringify(comments));
}

// ページ読み込み時にコメントを表示する
window.onload = function() {
    displayComments();
}

// コメント投稿フォームのイベントリスナーを設定
document.getElementById('commentForm').addEventListener('submit', addComment);
