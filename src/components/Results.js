import React from 'react'

const Results =({score, total}) =>{
    return (
        <div>
            <h2>
                your Score: {score} / {total}
            </h2>
        </div>
    );
};

export default Results;