import { createContext, useState, ReactNode} from "react";


type Obj = {
    title: string,
    banner: string,
    text: string,
    setTitle: (title: string) => void,
    setBanner: (banner: string) => void,
    setText: (text: string) => void,
}

export const ContextProvider = createContext <Obj | null> (null);

export const UseContextProvider = ({children}: {children: ReactNode}) => {


    const [title, setTitle] = useState ('');
    const [banner, setBanner] = useState ('');
    const [text, setText] = useState ('');

 

    const user = {
        title,
        banner,
        text,
        setBanner,
        setText,
        setTitle,

    
    }


    return (
        <ContextProvider.Provider value={user}>
            {children}
        </ContextProvider.Provider>
    )

};

