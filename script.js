document.getElementById('memoForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const memoContent = document.getElementById('memoContent').value;
    if (memoContent.trim() === '') return;

    const memoDiv = document.createElement('div');
    memoDiv.className = 'memo';
    memoDiv.textContent = memoContent;

    document.getElementById('memos').appendChild(memoDiv);

    document.getElementById('memoContent').value = '';
});
