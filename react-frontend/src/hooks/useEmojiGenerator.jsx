import {useState} from 'react';

const useEmojiGenerator = (initialPassword = "") => {

    const [emoji, setEmoji] = useState('')
    const emojiGen = ()=> {
        fetch('http://localhost:8000/random-emoji')
        .then(res => res.json())
        .then(data => {
            setEmoji(data.emoji)
            console.log("emoji: ", data.emoji)
        })
    }

    return {
        emojiGen, emoji
    }
}

export default useEmojiGenerator