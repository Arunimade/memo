document.getElementById('memoForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const memoContent = document.getElementById('memoContent').value;

    if (memoContent.trim() === '') return;

    try {
        const response = await fetch('http://localhost:3000/api/memos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: memoContent }),
        });

        if (response.ok) {
            document.getElementById('memoContent').value = '';
            loadMemos();
        }
    } catch (err) {
        console.error('Error:', err);
    }
});

async function loadMemos() {
    try {
        const response = await fetch('http://localhost:3000/api/memos');
        const memos = await response.json();

        const memoList = document.getElementById('memos');
        memoList.innerHTML = '';

        memos.forEach((memo) => {
            const memoDiv = document.createElement('div');
            memoDiv.className = 'memo';
            memoDiv.textContent = memo.content;
            memoList.appendChild(memoDiv);
        });
    } catch (err) {
        console.error('Error:', err);
    }
}

// Load memos on page load
loadMemos();
