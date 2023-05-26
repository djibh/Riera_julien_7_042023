// remove keyboard focus on active element - used in filter inputs
export function removeFocus() {
    document.activeElement?.blur();
}