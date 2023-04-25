export function createTagPill(elementInnerText) {
    const closeBtn = document.createElement('i');
    closeBtn.classList.add('fa-regular', 'fa-circle-xmark');

    const pill = document.createElement('span');
    pill.classList.add('badge', 'rounded-pill', 'text-bg-primary');
    pill.innerText = `${elementInnerText} `;
    pill.appendChild(closeBtn);
    return pill;
}