// ダミーのコメントデータ
let comments = [];

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

// コメントを追加する関数
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
    comments.push({ user: userName, text: commentText, date });
    displayComments();

    // コメント投稿後、フォームをクリアする
    document.getElementById('userName').value = '';
    document.getElementById('commentText').value = '';
}

// コメント投稿フォームのイベントリスナーを設定
document.getElementById('commentForm').addEventListener('submit', addComment);
