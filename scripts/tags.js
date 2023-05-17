export function createTagPill(htmlElement) {
    const closeBtn = document.createElement('i');
    closeBtn.classList.add('fa-regular', 'fa-circle-xmark');

    const pill = document.createElement('span');
    pill.setAttribute('data-id-selected', `${htmlElement.id}`);
    pill.classList.add('badge', 'rounded-pill', 'py-2', 'px-3');
    pill.innerText = `${htmlElement.innerText}`;
    pill.appendChild(closeBtn);

    return pill;
}
