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
function addComment(user, text) {
    const date = new Date().toLocaleString();
    comments.push({ user, text, date });
    displayComments();
}

// コメント投稿フォームの処理
document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // フォームのデフォルトの動作を無効化

    const commentText = document.getElementById('commentText').value;
    if (commentText.trim() !== '') {
        // ここで実際にコメントを追加する処理を行う（例としてaddComment関数を呼び出す）
        addComment('ユーザー名', commentText);

        // コメント投稿後、フォームをクリアする
        document.getElementById('commentText').value = '';
    }
});


        // コメント投稿後、フォームをクリアする
        document.getElementById('commentText').value = '';
    }
});
