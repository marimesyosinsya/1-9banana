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
function addComment(userName, text) {
    const date = new Date().toLocaleString();
    comments.push({ user: userName, text, date });
    displayComments();
}

// コメント投稿フォームの処理
document.getElementById('commentForm').addEventListener('submit', function(event) {
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

    // ここで実際にコメントを追加する処理を行う（例としてaddComment関数を呼び出す）
    addComment(userName, commentText);

    // コメント投稿後、フォームをクリアする
    document.getElementById('userName').value = '';
    document.getElementById('commentText').value = '';
});

