document.addEventListener('DOMContentLoaded', () => {
    hljs.initHighlightingOnLoad();

    const codeBlock = document.getElementById('code');
    const copyButton = document.getElementById('copy-button');
    const copySuccess = document.getElementById('copy-success');

    const copyTextHandler = () => {
        const text = codeBlock.innerText;
        //   second version - Clipboard API
        navigator.clipboard.writeText(text).then(
            () => {
                copySuccess.classList.add('show-message');
                setTimeout(() => {
                    copySuccess.classList.remove('show-message');
                }, 4000);
            },
            () => {
                console.log('Error writing to the clipboard');
            }
        );
    };

    copyButton.addEventListener('click', copyTextHandler);
});