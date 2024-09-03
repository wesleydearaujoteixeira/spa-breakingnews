    type SearchProps = {
        title: string,
        banner: string,
        text: string,
    }
    
    export function SearchObj ({title, banner, text}: SearchProps) {
        return {
            title,
            banner,
            text,
        }
    
    }
    