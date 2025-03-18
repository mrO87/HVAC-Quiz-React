import React from 'react'

const Answer=({options,handleAnswer}) =>{
    return(
        <div>
            {options.map((option, index)=> (
            <button
                key={index} onClick={()=>handleAnswer(option.isCorrect)}>
                {option.text}
            </button>
        ))}
        </div>
    );
};
export default Answer;
