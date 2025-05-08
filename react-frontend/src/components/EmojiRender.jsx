import {useState} from 'react';
import useEmojiGenerator from '../hooks/useEmojiGenerator';

const EmojiRender = () => {
    const {emojiGen, emoji} = useEmojiGenerator()


    // const [emoji, setEmoji] = useState('')

    // const handleEmoji = ()=> {
    //     setEmoji(prev => {
    //         const temp = emojiGen()
    //         console.log("en componente: ", temp)
    //         return temp
    //     })
    // }
    return (
        <>
            <h1>EMOJI GENERATOR from Flask</h1>
            <p>Emoji generated{emoji && emoji}</p>
            <button onClick={emojiGen}>Generar emoji</button>
        </>
    )
}

export default EmojiRender