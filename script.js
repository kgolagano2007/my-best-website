document.getElementById('comments').innerHTML =
        '<div class="loading">Loading comments...</div>';
      document.getElementById('error').innerHTML = '';

      localComments = await getComments(STUDENT_NUMBER, SITE_ID);

      renderComments();

function renderComments() {
    if (localComments.length === 0) {
      document.getElementById('comments').innerHTML =
        '<p>No comments yet. Be the first to comment!</p>';
      return;
    }

    const html = localComments.map(comment => `
      <div class="comment" data-id="${comment.id}">
        <div class="comment-header">
          <div class="comment-meta">
            <strong>${comment.sender || 'Anonymous'}</strong> - 
            ${new Date(comment.ts).toLocaleString()}
          </div>
          <button class="delete-btn" onclick="removeComment('${comment.id}')">Delete</button>
        </div>
        <div>${comment.text}</div>
      </div>
    `).join('');

    document.getElementById('comments').innerHTML = html;
  }