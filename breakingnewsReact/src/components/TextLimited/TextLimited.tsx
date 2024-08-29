

interface PropsText {
    text: string;
    limit: number;

}

export function TextLimited ({text, limit}: PropsText) {
    if (text.length > limit) {
        return `${text.slice(0, limit)}...`;
    }
    return text;
 
}