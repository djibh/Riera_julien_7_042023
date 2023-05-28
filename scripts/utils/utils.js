// takes a text in argument and return that text with first letter only to uppercase
export function capitalize(text) {
    const uppercaseFirstLetter = text.charAt(0).toUpperCase();
    const formattedText = uppercaseFirstLetter + text.slice(1).toLowerCase();
    return formattedText;
}